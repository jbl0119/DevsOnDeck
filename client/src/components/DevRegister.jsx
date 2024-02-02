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
        

        <div class="bg-warning mb-3 d-flex align-items-center justify-content-between">
            <h1 class="display-2 ">DevsOnDeck</h1>
            <div>
            <Link to={'/'}><button type="button" class="btn btn-dark btn-lg m-2">DevLogin</button></Link>
            <Link to={'/orgs/login'}><button type="button" class="btn btn-dark btn-lg m-2">OrgLogin</button></Link>
            </div>
        </div>
        <form onSubmit={onSubmit}>
        <div class="container px-5 my-5 border border-dark rounded p-3">
            <h1 class="display-1 mb-5">Developer Sign Up</h1>
            <div class="row mb-3">
                <label for="firstName" class="col-sm-3 col-form-label "><h3>First Name</h3></label>
                <div class="col-sm-9">
                <input type="text" class="form-control border-dark"  id="firstName" name="firstName" value={Developer.firstName} onChange={onChange}/>
                {errors.firstName && <p className="text-danger">{errors.firstName}</p>}
                </div>
            </div>

            <div class='row mb-3'>
                <label for="lastName" class="col-sm-3 col-form-label"><h3>Last Name</h3></label>
                <div class="col-sm-9">
                <input type="text" class="form-control border-dark" id="lastName" name="lastName" value={Developer.lastName} onChange={onChange}/>
                {errors.lastName && <p className="text-danger">{errors.lastName}</p>}
                </div>
            </div>
            <div class="row mb-3">
                <label for="email" class="col-sm-3 col-form-label"><h3>Email</h3></label>
                <div class="col-sm-9">
                <input type="text" class="form-control border-dark" id="email"  name="email" value={Developer.email} onChange={onChange}/>

                {errors.email && <p className="text-danger">{errors.email}</p>}
                </div>
            </div>

            <div class="row mb-3">
                <label for="address" class="col-sm-3 col-form-label"><h3>Address</h3></label>
                <div class="col-sm-9">
                <input type="text" class="form-control border-dark" id="address" name="address" value={Developer.address} onChange={onChange}/>
                {errors.address && <p className="text-danger">{errors.address}</p>}
                </div>
            </div>
            <div class="row mb-3">
                <label for="city" class="col-sm-3 col-form-label"><h3>City</h3></label>
                <div class="col-sm-9">
                <input type="text" class="form-control border-dark" id="city" name="city" value={Developer.city} onChange={onChange}/>
                {errors.city && <p className="text-danger">{errors.city}</p>}
                </div>
            </div>
            <div class="row mb-3">
                <label for="street" class="col-sm-3 col-form-label"><h3>State</h3></label>
                <div class="col-sm-9">
                <select class="form-control bfh-states border-dark" data-country="US" data-state="CA" id="state" name="state" value={Developer.state} onChange={onChange}>{stateOptions.map((state) => {
                    return <option key={state} value={state}>{state}</option>
                })}</select>
                {errors.state && <p className="text-danger">{errors.state}</p>}
                </div>
            </div>


            <div class="row mb-3">
                <label for="password" class="col-sm-3 col-form-label"><h3>Password</h3></label>
                <div class="col-sm-9">
                <input type="password" class="form-control border-dark" id="password" name="password" value={Developer.password} onChange={onChange}/>
                {errors.password && <p className="text-danger">{errors.password}</p>}
                </div>
            </div>

            <div class="row mb-3">
                <label for="confirmPassword" class="col-sm-3 col-form-label"><h3>Confirm Password</h3></label>
                <div class="col-sm-9">
                <input type="password" class="form-control border-dark" id="confirmPassword" name="confirmPassword" value={Developer.confirmPassword} onChange={onChange}/>
                {errors.confirmPassword && <p className="text-danger">{errors.confirmPassword}</p>}
                </div>
            </div>
            <div class="d-flex justify-content-end">
                <button type="submit" class="mt-2 btn btn-success btn-lg">Register</button>
            </div>

        </div>
        </form>
        <a href="/Orgs/Register"><h4>Need to Sign Up an Organization?</h4></a>
        </>
    )
}

export default DevRegister