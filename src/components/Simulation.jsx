import React, { useState, useContext, createContext } from 'react';
import './Simulation.css';

// Create Context for managing global states
const SimulationContext = createContext();

// Provider Component for Simulation Context
function SimulationProvider({ children }) {
  const [longerLasting, setLongerLasting] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <SimulationContext.Provider value={{ longerLasting, setLongerLasting, isPlaying, setIsPlaying }}>
      {children}
    </SimulationContext.Provider>
  );
}

// Cell Component receiving props from parent (Simulation)
function Cell({ isAlive, onClick }) {
  return (
    <div
      className={`cell ${isAlive ? 'alive' : 'dead'}`}
      onClick={onClick}
    ></div>
  );
}

// Main Simulation Component
function Simulation() {
  const [rows, setRows] = useState(20);
  const [cols, setCols] = useState(20);
  const [grid, setGrid] = useState([]);
  const [livingCells, setLivingCells] = useState(0);
  const { longerLasting, setLongerLasting } = useContext(SimulationContext); // Use context for longerLasting state

  // Initialize the grid with clustered or random setup
  const initializeGrid = (clustered = false) => {
    const newGrid = [];
    let liveCount = 0;

    if (clustered) {
      const clusterCenters = [];
      const clusterCount = Math.max(Math.floor((rows * cols) * 0.05 / 5), 1);

      for (let i = 0; i < clusterCount; i++) {
        clusterCenters.push([
          Math.floor(Math.random() * rows),
          Math.floor(Math.random() * cols),
        ]);
      }

      for (let i = 0; i < rows; i++) {
        const row = [];
        for (let j = 0; j < cols; j++) {
          let cellState = 0;
          for (const [cx, cy] of clusterCenters) {
            const distance = Math.sqrt((i - cx) ** 2 + (j - cy) ** 2);
            if (distance < 3 && Math.random() < 0.7) {
              cellState = 1;
            }
          }
          if (cellState === 1) liveCount++;
          row.push(cellState);
        }
        newGrid.push(row);
      }
    } else {
      for (let i = 0; i < rows; i++) {
        const row = [];
        for (let j = 0; j < cols; j++) {
          const cellState = Math.random() < 0.05 ? 1 : 0;
          if (cellState === 1) liveCount++;
          row.push(cellState);
        }
        newGrid.push(row);
      }
    }

    setGrid(newGrid);
    setLivingCells(liveCount);
  };

  // Toggle the state of a specific cell
  const toggleCell = (row, col) => {
    const newGrid = grid.map((currentRow, rowIndex) =>
      currentRow.map((cell, colIndex) => {
        if (rowIndex === row && colIndex === col) {
          const newState = cell ? 0 : 1;
          setLivingCells(prev => prev + (newState ? 1 : -1));
          return newState;
        }
        return cell;
      })
    );
    setGrid(newGrid);
  };

  // Calculate the next generation of the grid based on the rules
  const calculateNextGeneration = () => {
    let liveCount = 0;

    const getNeighbors = (row, col) => {
      let count = 0;
      const directions = [
        [-1, -1], [-1, 0], [-1, 1],
        [0, -1],           [0, 1],
        [1, -1], [1, 0], [1, 1],
      ];

      directions.forEach(([dx, dy]) => {
        const newRow = row + dx;
        const newCol = col + dy;
        if (newRow >= 0 && newRow < rows && newCol >= 0 && newCol < cols) {
          count += grid[newRow][newCol];
        }
      });

      return count;
    };

    const newGrid = grid.map((row, rowIndex) =>
      row.map((cell, colIndex) => {
        const neighbors = getNeighbors(rowIndex, colIndex);

        if (cell === 1) {
          if (neighbors < 2 || neighbors > 3) return 0;
          liveCount += 1;
          return 1;
        } else {
          if (neighbors === 3) return 1;

          if (longerLasting) {
            const directions = [
              [-1, 0], [1, 0], [0, -1], [0, 1],
            ];
            for (const [dx, dy] of directions) {
              const newRow = rowIndex + dx;
              const newCol = colIndex + dy;
              if (
                newRow >= 0 &&
                newRow < rows &&
                newCol >= 0 &&
                newCol < cols &&
                grid[newRow][newCol] === 1
              ) {
                return 1;
              }
            }
          }
          return 0;
        }
      })
    );

    setGrid(newGrid);
    setLivingCells(liveCount);
  };

  return (
    <div className="simulation">
      <h1>Conway's Game of Life</h1>
      <p>Living Cells: {livingCells}</p>
      <div className="grid">
        {grid.map((row, rowIndex) => (
          <div key={rowIndex} className="row">
            {row.map((cell, colIndex) => (
              <Cell
                key={`${rowIndex}-${colIndex}`}
                isAlive={cell}
                onClick={() => toggleCell(rowIndex, colIndex)}
              />
            ))}
          </div>
        ))}
      </div>
      <div className="controls">
        <label>
          <input
            type="checkbox"
            checked={longerLasting}
            onChange={() => setLongerLasting(!longerLasting)}
          />
          Longer Lasting Cells
        </label>
        <button onClick={() => initializeGrid(false)}>Random Grid</button>
        <button onClick={() => initializeGrid(true)}>Clustered Grid</button>
        <button onClick={calculateNextGeneration}>Next Frame</button>
      </div>
    </div>
  );
}

// Main App Component
function App() {
  return (
    <SimulationProvider>
      <Simulation />
    </SimulationProvider>
  );
}

export default App;
