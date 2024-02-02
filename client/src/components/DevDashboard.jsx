import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const DevDashboard = () => {
  const [allPositions, setAllPositions] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/positions');
        console.log(response);
        setAllPositions(response.data.positions);
      } catch (error) {
        console.error("Error fetching positions:", error);
        setError("Error fetching positions. Please try again later.");
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <header className="bg-warning mb-3 d-flex align-items-center justify-content-between">
        <h1 className='display-2'>DevsOnDeck</h1>
        <Link to={'/devs/register'}>
          <button type="button" className="btn btn-dark btn-lg m-2">Logout</button>
        </Link>
      </header>
      <div className='header-container'>
        <div>
          {error ? (
            <p>{error}</p>
          ) : (
            <table className="table">
              <thead>
                <tr>
                  <th>Position</th>
                  <th>Description</th>
                </tr>
              </thead>
              <tbody>
                {allPositions.length > 0 && (
                  allPositions.map((position, index) => (
                    <tr key={index}>
                      <td>{position.title}</td>
                      <td>{position.description}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </>
  );
};

export default DevDashboard;
