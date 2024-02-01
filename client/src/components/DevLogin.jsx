
import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

const DevLogin = (props) => {
const [Developer, setDeveloper] = useState({ email: "", password: "" });
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();

    const onChange = (e) => {
        setDeveloper({ ...Developer, [e.target.name]: e.target.value });
    };

    const onSubmit = (e) => {
        e.preventDefault()
        axios.post('http://localhost:8000/api/developers/login', Developer)
            .then((res) => {
                console.log(res)
                if (res.data.success) {
                setDeveloper({
                    email: "",
                    password: "",
                })
                navigate(`/devs/dashboard/${res.data.developer._id}`);
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
                    <h1>Welcome Back, Developer</h1>
                    <h4>Let's Connect You To A Job!</h4>
                    <div>
                        <label htmlFor="email" className="form-label">Email</label>
                        <input type="text" className="form-control" id="email" name="email" value={Developer.email} onChange={onChange} />
                        {errors.email && <p className="text-danger">{errors.email}</p>}
                    </div>
                    <div>
                        <label htmlFor="password" className="form-label">Password</label>
                        <input type="password" className="form-control" id="password" name="password" value={Developer.password} onChange={onChange} />
                        {errors.password && <p className="text-danger">{errors.password}</p>}
                    </div>
                    <button type="submit" className="btn btn-primary">Log In</button>
                </div>
            </form>
        </>
    );
};

export default DevLogin;

