import React, {useState, useEffect} from 'react';
// import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';


const OrgPage = () => {
    const [organization, setOrganization] = useState([]);
    const [positions, setPositions] = useState([]);
    const navigate = useNavigate();
    const {id} = ""


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



    return (
        <>
        <div>
            <div>
                <div>
                    <a href="/orgs/add/position">List a New Position</a>
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
                {/* Developer Divs */}
            </div>
        </div>
        </>
    )
}


export default OrgPage;