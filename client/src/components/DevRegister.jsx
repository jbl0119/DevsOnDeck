import React, {useState} from 'react';
import axios from 'axios';
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
        axios.post('http://localhost:8000/api/developers/register', Developer)
            .then((res) => {
                console.log(res)
                if (res.data.success) {
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
                navigate(`/devs/skills/languages/${res.data.developer._id}`)
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
            <Link to={'/dev/login'}><button type="button" class="btn btn-primary">DevLogin</button></Link>
            <Link to={'/org/login'}><button type="button" class="btn btn-primary">OrgLogin</button></Link>
        </div>
        <form onSubmit={onSubmit}>
        <div class="container px-5 my-5">
            <h1>Developer Sign Up</h1>
            <div>
                <label for="firstName" class="form-label">First Name</label>
                <input type="text" class="form-control"  id="firstName" name="firstName" value={Developer.firstName} onChange={onChange}/>
                {errors.firstName && <p className="text-danger">{errors.firstName}</p>}
            </div>
            <div>
                <label for="lastName" class="form-label">Last Name</label>
                <input type="text" class="form-control" id="lastName" name="lastName" value={Developer.lastName} onChange={onChange}/>
                {errors.lastName && <p className="text-danger">{errors.lastName}</p>}
            </div>
            <div>
                <label for="email" class="form-label">Email</label>
                <input type="text" class="form-control" id="email"  name="email" value={Developer.email} onChange={onChange}/>
                {errors.email && <p className="text-danger">{errors.email}</p>}
            </div>
            <div>
                <label for="address" class="form-label">address</label>
                <input type="text" class="form-control" id="address" name="address" value={Developer.address} onChange={onChange}/>
                {errors.address && <p className="text-danger">{errors.address}</p>}
            </div>
            <div>
                <label for="city" class="form-label">City</label>
                <input type="text" class="form-control" id="city" name="city" value={Developer.city} onChange={onChange}/>
                {errors.city && <p className="text-danger">{errors.city}</p>}
            </div>
            <div>
                <label for="street" class="form-label">State</label>
                <select class="form-control bfh-states" data-country="US" data-state="CA" id="state" name="state" value={Developer.state} onChange={onChange}>{stateOptions.map((state) => {
                    return <option key={state} value={state}>{state}</option>
                })}</select>
                {errors.state && <p className="text-danger">{errors.state}</p>}
            </div>

            <div>
                <label for="password" class="form-label">Password</label>
                <input type="password" class="form-control" id="password" name="password" value={Developer.password} onChange={onChange}/>
                {errors.password && <p className="text-danger">{errors.password}</p>}
            </div>
            <div>
                <label for="confirmPassword" class="form-label">Confirm Password</label>
                <input type="password" class="form-control" id="confirmPassword" name="confirmPassword" value={Developer.confirmPassword} onChange={onChange}/>
                {errors.confirmPassword && <p className="text-danger">{errors.confirmPassword}</p>}
            </div>
            <button type="submit">Register</button>
        </div>
        </form>
        <a href="/Orgs/Register">need to Sign Up and Organization?</a>
        </>
    )
}

export default DevRegister