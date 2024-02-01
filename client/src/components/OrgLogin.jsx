import React, {useState} from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

const DevLogin = () => {
    const [loginInfo, setLoginInfo] = 
    useState({email: "", password:""});

    const onChange = (e) => {
        setLoginInfo({...loginInfo, [e.target.name]: e.target.value})
    };

    const [error, setError] = useState({})
    const navigate = useNavigate()

    const onSubmit = (e) => {
        e.preventDefault()
        axios.post('http://localhost:8000/api/organitaion/login', loginInfo)
            .then((res) => {
                console.log(res)
                    setLoginInfo({
                    email: "",
                    password: "",
                })
                navigate(`/devs/dashboard`)
            } )
            .catch(err=>{
                console.log(err.response.data.error.errors)
                setError(err.response.data.error.errors)
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
            {console.log(error)}
            {error.email && <p className="text-danger">{error.email}</p>}
        </div>
        <div>
            <label htmlFor="password" className="form-label">Password</label>
            <input type="password" className="form-control" id="password" name="password" value={loginInfo.password} onChange={onChange}/>
            {error.password && <p className="text-danger">{error.password}</p>}
        </div>
        <button type="submit">Log In</button>
    </div>
    </form>
    </>
)
}

export default DevLogin


