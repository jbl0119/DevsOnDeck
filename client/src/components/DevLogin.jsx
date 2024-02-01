import React, {useState} from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

const DevLogin = () => {
    const [loginInfo, setLoginInfo] = 
    useState({email: "", password:""});

    const onChange = (e) => {
        setLoginInfo({...loginInfo, [e.target.name]: e.target.value})
    };

    const [errors, setErrors] = useState({})
    const navigate = useNavigate()

    const onSubmit = (e) => {
        e.preventDefault()
        axios.post('http://localhost:8000/api/developers/login', loginInfo)
            .then((res) => {
                console.log(res)
                if (res.data.success) {
                    setLoginInfo({
                    email: "",
                    password: "",
                })
                navigate(`/devs/dashboard`)
            } else {
                console.log(res.data.error)
                setErrors(res.data.error)
            }})
            .catch((err) => {
                //console.log(err.response.data.error)
                setErrors(err.response.data.error)
            })
}

return (
    <>
    
    <div>
        <h1>DevsOnDeck</h1>
        <Link to={'/devs/register'}><button type="button" class="btn btn-primary">Dev Registration</button></Link>
        <Link to={'/orgs/register'}><button type="button" class="btn btn-primary">Org Registration</button></Link>
    </div>
    <form onSubmit={onSubmit}>
    <div className="container px-5 my-5">
        <h1>Welcome Back, Developer</h1>
        <h4>Let's Connect You To A Job!</h4>
        <div>
            <label htmlFor="email" className="form-label">Email</label>
            <input type="text" className="form-control" id="email"  name="email" value={loginInfo.email} onChange={onChange}/>
            {errors.email && <p className="text-danger">{errors.email}</p>}
        </div>
        <div>
            <label htmlFor="password" className="form-label">Password</label>
            <input type="password" className="form-control" id="password" name="password" value={loginInfo.password} onChange={onChange}/>
            {errors.password && <p className="text-danger">{errors.password}</p>}
        </div>
        <button type="submit">Log In</button>
    </div>
    </form>
    </>
)
}

export default DevLogin


