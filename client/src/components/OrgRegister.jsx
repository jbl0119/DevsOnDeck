import React, {useState} from 'react';
// import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';


const OrgRegister = () => {
    const [stateOptions, setStateOptions] = useState(["AL", "AK", "AZ", "AR", "CA", "CO", "CT", "DE", "FL", "GA","HI", "ID", "IL", "IN", "IA", "KS", "KY", "LA", "ME", "MD","MA", "MI", "MN", "MS", "MO", "MT", "NE", "NV", "NH", "NJ","NM", "NY", "NC", "ND", "OH", "OK", "OR", "PA", "RI", "SC","SD", "TN", "TX", "UT", "VT", "VA", "WA", "WV", "WI", "WY"])
    const [organization, setOrganization] = useState({
        organizationName: "",
        firstName: "",
        lastName: "",
        contactEmail: "",
        orgAddress: "",
        orgCity: "",
        state: "",
        password: "",
        confirmPassword: "",
    })
    const navigate = useNavigate();
    const [errors, setErrors] = useState("");

    const onChange = (e) => {
        setOrganization({...organization, [e.target.name]: e.target.value})
    }

    const onSubmit = (e) => {
        e.preventDefault()
        axios.post('/api/Organization', organization)
            .then((res) => {
                console.log(res)
                navigate('/')
                setOrganization({
                    organizationName: "",
                    firstName: "",
                    lastName: "",
                    contactEmail: "",
                    orgAddress: "",
                    orgCity: "",
                    state: "",
                    password: "",
                    confirmPassword: "",
                })
                navigate('/orgs/dashboard')
                })
            .catch((err) => {
                console.log(err.response.data.errors)
                setErrors(err.response.data.errors)
            })
        }


    return (
        <>
        <form onSubmit={onSubmit}>
            <div>
            <h1>Organization Sign Up</h1>
            <div>
                <label for="organizationName" class="form-label">Organization Name</label>
                <input type="text" class="form-control" name="organizationName" value={organization.organizationName} onChange={onChange}/>
            </div>
            <div>
                <label for="firstName" class="form-label">First Name</label>
                <input type="text" class="form-control" name="firstName" value={organization.firstName} onchange={onChange}/>
            </div>
            <div>
                <label for="lastName" class="form-label">Last Name</label>
                <input type="text" class="form-control" name="lastName" value={organization.lastName} onchange={onChange}/>
            </div>
            <div>
                <label for="contactEmail" class="form-label">Contact Email</label>
                <input type="text" class="form-control" name="contactEmail" value={organization.contactEmail} onchange={onChange}/>
            </div>
            <div>
                <label for="orgAddress" class="form-label">Org Address</label>
                <input type="text" class="form-control" name="orgAddress" value={organization.orgAddress} onChange={onChange}/>
            </div>
            <div>
                <label for="orgCity" class="form-label">Org City</label>
                <input type="text" class="form-control" name="orgCity" value={organization.orgCity} onChange={onChange}/>
            </div>
            <div>
                <label for="state" class="form-label">State</label>
                <select class="form-control bfh-states" data-country="US" data-state="CA" name="state" value={organization.state} onChange={onChange}>{stateOptions.map((state) => {
                        return <option key={state} value={state}>{state}</option>
                    })}</select>
            </div>
            <div>
                <label for="password" class="form-label">Password</label>
                <input type="password" class="form-control" name="password" value={organization.password} onChange={onChange}/>
            </div>
            <div>
                <label for="confirmPassword" class="form-label">Confirm</label>
                <input type="password" class="form-control" name="confirmPassword" value={organization.confirmPassword} onchange={onChange}/>
            </div>
            <div>
                <input type='submit' value='Register'/>
            </div>
            </div>
        </form>
        <a href="/DevRegister">Need to Sign Up a Developer?</a>
        </>
    )
}

export default OrgRegister;