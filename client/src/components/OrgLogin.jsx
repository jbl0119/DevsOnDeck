
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
            <div class="bg-warning mb-3 d-flex align-items-center justify-content-between">
                <h1 class="display-2 ">DevsOnDeck</h1>
                <div>
                <Link to={'/devs/register'}>
                    <button type="button" class="btn btn-dark btn-lg m-2">Dev Registration</button>
                </Link>
                <Link to={'/orgs/register'}>
                    <button type="button" class="btn btn-dark btn-lg m-2">Org Registration</button>
                </Link>
                </div>
            </div>
            <form onSubmit={onSubmit}>
                <div class="container px-5 my-5 border border-dark rounded p-3">
                    <h1 class="display-1 mb-5">Welcome Back!</h1>
                    <h3 class='mb-5'>Let's Find You Some Candidates!</h3>
                    <div class="row mb-3">
                        <label htmlFor="contactEmail" class="col-sm-3 col-form-label "><h3>Email</h3></label>
                        <div class="col-sm-9">
                        <input type="text" className="form-control border-dark" id="contactEmail" name="contactEmail" value={User.contactEmail} onChange={onChange} />
                        {errors.contactEmail && <p className="text-danger">{errors.contactEmail}</p>}
                        </div>
                    </div>
                    <div class="row mb-3">
                        <label htmlFor="password" class="col-sm-3 col-form-label "><h3>Password</h3></label>
                        <div class="col-sm-9">
                        <input type="password" className="form-control border-dark" id="password" name="password" value={User.password} onChange={onChange} />
                        {errors.password && <p className="text-danger">{errors.password}</p>}
                        </div>
                    </div>
                    <button type="submit" class="mt-2 btn btn-success btn-lg">Log In</button>
                </div>
            </form>
        </>
    );
};

export default OrgLogin;
