import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate, useParams } from 'react-router-dom';

const OrgPage = () => {
    const [organization, setOrganization] = useState({});
    const [positions, setPositions] = useState([]);
    const navigate = useNavigate();
    const [developers, setDevelopers] = useState([]);
    const { id } = useParams();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const orgResponse = await axios.get(`http://localhost:8000/api/organizations/${id}`);
                setOrganization(orgResponse.data.organization || {});

                const devResponse = await axios.get('http://localhost:8000/api/developers');
                setDevelopers(devResponse.data.allDaDevelopers || []);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, [id]);

    useEffect(() => {
        setPositions(organization.Position || []);
    }, [organization]);

    return (
        <>
            <div className="bg-warning mb-3 d-flex align-items-center justify-content-between">
                <h1 className="display-2">DevsOnDeck</h1>
                <div>
                    <Link to={'/'}><button type="button" className="btn btn-dark btn-lg m-2">DevLogin</button></Link>
                    <Link to={'/orgs/login'}><button type="button" className="btn btn-dark btn-lg m-2">OrgLogin</button></Link>
                </div>
            </div>
            <div>
                <div>
                    <Link to="/orgs/jobs/add">List a New Position</Link>
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
        </>
    );
}

export default OrgPage;
