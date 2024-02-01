
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
                    <h1 class="display-1 mb-5">Welcome Back, Developer</h1>
                    <h3 class='mb-5'>Let's Connect You To A Job!</h3>
                    <div class="row mb-3">
                        <label htmlFor="email" class="col-sm-3 col-form-label "><h3>Email</h3></label>
                        <div class="col-sm-9">
                        <input type="text" className="form-control border-dark" id="email" name="email" value={Developer.email} onChange={onChange} />
                        {errors.email && <p className="text-danger">{errors.email}</p>}
                        </div>
                    </div>
                    <div class="row mb-3">
                        <label htmlFor="password" class="col-sm-3 col-form-label "><h3>Password</h3></label>
                        <div class="col-sm-9">
                        <input type="password" className="form-control border-dark" id="password" name="password" value={Developer.password} onChange={onChange} />
                        {errors.password && <p className="text-danger">{errors.password}</p>}
                        </div>
                    </div>
                    <button type="submit" class="mt-2 btn btn-success btn-lg">   Log In   </button>
                </div>
            </form>
        </>
    );
};

export default DevLogin;

