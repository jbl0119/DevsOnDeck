import React, {useState} from 'react';
// import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';


const DevRegister = () => {
    const [stateOptions, setStateOptions] = useState(["AL", "AK", "AZ", "AR", "CA", "CO", "CT", "DE", "FL", "GA","HI", "ID", "IL", "IN", "IA", "KS", "KY", "LA", "ME", "MD","MA", "MI", "MN", "MS", "MO", "MT", "NE", "NV", "NH", "NJ","NM", "NY", "NC", "ND", "OH", "OK", "OR", "PA", "RI", "SC","SD", "TN", "TX", "UT", "VT", "VA", "WA", "WV", "WI", "WY"])
    const [Developer, setDeveloper] = useState({
        firstName: "",
        lastName: "",
        email: "",
        address: "",
        city: "",
        state: "",
        password: "",
        confirmPassword: ""
    })
    const onChange = (e) => {
        setDeveloper({...Developer, [e.target.name]: e.target.value})
    }
    const [errors, setErrors] = useState({})
    const navigate = useNavigate()

    const onSubmit = (e) => {
        e.preventDefault()
        axios.post('/api/Developer', Developer)
            .then((res) => {
                console.log(res)
                navigate('/')
                setDeveloper({
                    firstName: "",
                    lastName: "",
                    email: "",
                    address: "",
                    city: "",
                    state: "",
                    password: "",
                    confirmPassword: ""
                })
                })
            .catch((err) => {
                console.log(err.response.data.errors)
                setErrors(err.response.data.errors)
            })

    }
    
    return (
        <>
        <div>
            <h1>DevsOnDeck</h1>
            <Link to={'/'}><button type="button" class="btn btn-primary">DevLogin</button></Link>
            <Link to={'/'}><button type="button" class="btn btn-primary">OrgLogin</button></Link>
        </div>
        <form onSubmit={onSubmit}>
        <div class="container px-5 my-5">
            <h1>Developer Sign Up</h1>
            <div>
                <label for="name" class="form-label">First Name</label>
                <input type="text" class="form-control"   name="firstName" value={Developer.firstName} onChange={onChange}/>
            </div>
            <div>
                <label for="name" class="form-label">Last Name</label>
                <input type="text" class="form-control" id="name" name="lastName" value={Developer.lastName} onChange={onChange}/>
            </div>
            <div>
                <label for="name" class="form-label">Email</label>
                <input type="text" class="form-control" id="name"  name="email" value={Developer.email} onChange={onChange}/>
            </div>
            <div>
                <label for="name" class="form-label">address</label>
                <input type="text" class="form-control" id="name" name="address" value={Developer.address} onChange={onChange}/>
            </div>
            <div>
                <label for="name" class="form-label">City</label>
                <input type="text" class="form-control" id="name" name="city" value={Developer.city} onChange={onChange}/>
            </div>
            <div>
                <label for="name" class="form-label">State</label>
                <select class="form-control bfh-states" data-country="US" data-state="CA" name="state" value={Developer.state} onChange={onChange}>{stateOptions.map((state) => {
                    return <option key={state} value={state}>{state}</option>
                })}</select>
            </div>
            <div>
                <label for="name" class="form-label">Password</label>
                <input type="password" class="form-control" id="name" name="password" value={Developer.password} onChange={onChange}/>
            </div>
            <div>
                <label for="name" class="form-label">Confirm Password</label>
                <input type="password" class="form-control" id="name" name="confirmPassword" value={Developer.confirmPassword} onChange={onChange}/>
            </div>
            <button type="button">Register</button>
        </div>
        </form>
        <a href="/OrgRegister">need to Sign Up and Organization?</a>
        </>
    )
}

export default DevRegister