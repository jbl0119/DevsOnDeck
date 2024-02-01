import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const DevDashboard = () => {

  const [ allPositions, setAllPositions]  = useState([]);


  useEffect(() => {
    axios.get('http://localhost:8000/api/positions')
      .then(res => {
        setAllPositions(res.data);
        console.log(res);
      })
      .catch(err => console.log(err));
  }, []);

  const filteredPositions = allPositions.filter((position) => position.createdAt);
  filteredPositions.sort((position1, position2) => position1.createdAt - position2.createdAt);

  return (
    <>
      <div className='header-container'>
        <div>
            <h1>DevsOnDeck</h1>
            <Link to={'/devs/logout'}><button type="button" class="btn btn-primary">Logout</button></Link>
        </div>
        <div>
        {
            filteredPositions?.map((position,index) => (
                <div key={index}>
                    <h2>{position.title}</h2>
                    <h3>{position.body}</h3>
                </div>
            ))
        }
        </div>
    </div>
    </>
  );
};

export default DevDashboard;
