# Conway's Game of Life

## About This Project
This project was developed individually by Qinghao Yang as part of an assignment to implement Conway's Game of Life in React. The project makes use of the following packages and libraries:

- `react` and `react-dom`: Core libraries for building the app.
- `react-router-dom`: For implementing routing between pages.
- `react-bootstrap` and `bootstrap`: For styling and layout components.
- `react-scripts`: For managing the React development and build processes.

The app is a simulation of Conway's Game of Life, featuring customizable grids, interactive controls, and advanced cell behaviors.

---

## Write-Up

### What were some challenges you faced while making this app?
One of the biggest challenges was managing the grid's dynamic updates and ensuring efficient state management. Implementing clustered setups and "longer-lasting cells" required careful consideration of performance and logic to avoid excessive computation. Another challenge was resolving Git conflicts during collaboration with the remote repository, which consumed additional time.

### Given more time, what additional features, functional or design changes would you make
With more time, I would enhance the app with:
- A more visually appealing heatmap gradient for cell states.
- Support for importing and exporting grid configurations.
- Real-time performance optimization for larger grid sizes.

### What assumptions did you make while working on this assignment?
While working on this assignment, I assumed that users would primarily interact with the app on desktop browsers. Additionally, I assumed that the clustered setup algorithm could focus on proximity-based randomness to form groups.

### How long did this assignment take to complete?
This assignment took approximately 12-14 hours to complete, including planning, coding, debugging, and styling.

---

## Rubric

### Clustered Setup - 2pts
Conway’s Game of Life works best when cells are clustered together in interesting patterns. This requirement was met by implementing an algorithm that generates clusters of live cells based on proximity.

Code snippet demonstrating the implementation:
```javascript
if (clustered) {
  const clusterCenters = [];
  const clusterCount = Math.max(Math.floor((rows * cols) * 0.05 / 5), 1);

  for (let i = 0; i < clusterCount; i++) {
    clusterCenters.push([
      Math.floor(Math.random() * rows),
      Math.floor(Math.random() * cols),
    ]);
  }
}
```

### Longer Lasting Cells - 3pts
A toggle was added to enable "longer-lasting cells," allowing cells set to die to potentially move one grid space to survive. This feature was implemented by checking adjacent cells during the calculation of the next generation.

Code snippet demonstrating the implementation:
```javascript
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
```

---

## Render App
The deployed app can be accessed at:

**[Conway's Game of Life](https://qhmadoka-conway-life-game.onrender.com/)**

---

