
import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

const OrgLogin = (props) => {
const [User, setUser] = useState({ email: "", password: "" });
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();

    const onChange = (e) => {
        setUser({ ...User, [e.target.name]: e.target.value });
    };

    const onSubmit = (e) => {
        e.preventDefault()
        axios.post('http://localhost:8000/api/organizations/login', User)
            .then((res) => {
                console.log(res)
                if (res.data.success) {
                setDeveloper({
                    email: "",
                    password: "",
                })
                navigate(`/orgs/dashboard/${res.data.organizition._id}`);
            } else {
                setErrors(res.data.error)
            }})
            .catch((err) => {
                console.log(err.response.data.error)
                setErrors(err.response.data.error)
            })
    }

    return (
        <>
            <div>
                <h1>DevsOnDeck</h1>
                <Link to={'/devs/register'}>
                    <button type="button" className="btn btn-primary">Dev Registration</button>
                </Link>
                <Link to={'/orgs/register'}>
                    <button type="button" className="btn btn-primary">Org Registration</button>
                </Link>
            </div>
            <form onSubmit={onSubmit}>
                <div className="container px-5 my-5">
                    <h1>Welcome Back!</h1>
                    <h4>Let's Find You Some Candidates!</h4>
                    <div>
                        <label htmlFor="contactEmail" className="form-label">Email</label>
                        <input type="text" className="form-control" id="contactEmail" name="contactEmail" value={User.contactEmail} onChange={onChange} />
                        {errors.contactEmail && <p className="text-danger">{errors.contactEmail}</p>}
                    </div>
                    <div>
                        <label htmlFor="password" className="form-label">Password</label>
                        <input type="password" className="form-control" id="password" name="password" value={User.password} onChange={onChange} />
                        {errors.password && <p className="text-danger">{errors.password}</p>}
                    </div>
                    <button type="submit" className="btn btn-primary">Log In</button>
                </div>
            </form>
        </>
    );
};

export default OrgLogin;
