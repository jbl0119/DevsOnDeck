import React, {useState, useEffect, useParams} from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';


const OrgPage = () => {
    const [organization, setOrganization] = useState([]);
    const [positions, setPositions] = useState([]);
    const navigate = useNavigate();
    const [developers, setDevelopers] = useState([]);
    const {id} = useParams();


    useEffect(() => {
        axios.get(`http://localhost:8000/api/organizations/${id}`)
            .then((res) => {
                setOrganization(res.data.organization)
            })
            .catch((err) => console.log(err))
    }, [id])

    useEffect(() => {
        setPositions(organization.Position)
    }, [organization])

    useEffect(() => {
        axios.get(`http://localhost:8000/api/developers`)
            .then((res) => {
                setDevelopers(res.data.allDaDevelopers)
            })
            .catch((err) => console.log(err))
    }, [])


    return (
        <>
        <div>
            <div>
                <div>
                    <a href="/orgs/jobs/add">List a New Position</a>
                </div>
                <div>
                    <h2>Positions To Fill</h2>
                    {
                        positions.map((pos, idx) => (
                            <div key={idx}>
                                <Link to={`/orgs/jobs/${pos._id}`}>{pos.title}</Link>
                            </div>
                        ))
                    }
                </div>
            </div>
            <div>
                <h2>Available Developers</h2>
                {
                    developers.map((dev, idx) => (
                        <div key={idx}>
                            <h3>{dev.firstName} {dev.lastName}</h3>
                            <p>{dev.biography}</p>
                        </div>
                    ))
                }
            </div>
        </div>
        </>
    )
}


export default OrgPage;