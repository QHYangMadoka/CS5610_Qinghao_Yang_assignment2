import React from 'react';
import { Link } from 'react-router-dom';
import example1 from './example1.png';
import example2 from './example2.png';

function Home() {
  return (
    <div className="container mt-4">
      <h1>Welcome to Conway's Game of Life</h1>
      <p>
        Conway's Game of Life is a simulation where cells on a grid live, die, or generate new cells
        based on their neighbors. Here are the rules:
      </p>
      <ul>
        <li>A living cell with less than two living neighbors dies.</li>
        <li>A living cell with two or three living neighbors lives.</li>
        <li>A living cell with more than three living neighbors dies.</li>
        <li>A dead cell with exactly three living neighbors becomes a living cell.</li>
      </ul>

      <div className="examples">
        {/* Insert example images here */}
        <img src={example1} alt="Example of initial grid state" style={{ width: '300px', height: 'auto', margin: '10px 0' }} />
        <p>In the above examples, we can understand the white boxes to be dead cells and the black cells to be alive. In the next iteration, most of the cells would stay the same. </p>
        <p>The exceptions here would be cell 3, which would turn from dead (white) to alive (black), due to rule number 4.</p>
        <p>Additionally, 8 would turn from alive (black) to dead (white) due to rule 1. On the next iteration,
        the board would like this:</p>
        <img src={example2} alt="Example of next iteration grid state" style={{ width: '300px', height: 'auto', margin: '10px 0' }} />
      </div>

      <p>
        <Link to="/simulation" className="btn btn-primary">Navigate to the Simulation page to play the game!</Link>
      </p>
    </div>
  );
}

export default Home;


