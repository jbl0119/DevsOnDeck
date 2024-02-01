import React, {useState} from 'react';
import axios from 'axios';
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
                navigate(`/orgs/dashboard/${res.data.organization._id}`)
                })
            .catch((err) => {
                console.log(err.response.data.errors)
                setErrors(err.response.data.errors)
            })
        }


    return (
        <>
        <div class="bg-warning mb-3 d-flex align-items-center justify-content-between">
            <h1 class="display-2 ">DevsOnDeck</h1>
            <div>
            <Link to={'/dev/login'}><button type="button" class="btn btn-dark btn-lg m-2">DevLogin</button></Link>
            <Link to={'/org/login'}><button type="button" class="btn btn-dark btn-lg m-2">OrgLogin</button></Link>
            </div>
        </div>
        <form onSubmit={onSubmit}>
            <div class="container px-5 my-5 border border-dark rounded p-3">
            <h1 class="display-1 mb-5">Organization Sign Up</h1>
            <div class="row mb-3">
                <label for="organizationName" class="col-sm-3 col-form-label "><h3>Organization Name</h3></label>
                <div class="col-sm-9">
                <input type="text" class="form-control border-dark" name="organizationName" value={organization.organizationName} onChange={onChange}/>
                </div>
            </div>
            <div class="row mb-3">
                <label for="firstName" class="col-sm-3 col-form-label "><h3>First Name</h3></label>
                <div class="col-sm-9">
                <input type="text" class="form-control border-dark" name="firstName" value={organization.firstName} onchange={onChange}/>
                </div>
            </div>
            <div class="row mb-3">
                <label for="lastName" class="col-sm-3 col-form-label "><h3>Last Name</h3></label>
                <div class="col-sm-9">
                <input type="text" class="form-control border-dark" name="lastName" value={organization.lastName} onchange={onChange}/>
                </div>
            </div>
            <div class="row mb-3">
                <label for="contactEmail" class="col-sm-3 col-form-label "><h3>Contact Email</h3></label>
                <div class="col-sm-9">
                <input type="text" class="form-control border-dark" name="contactEmail" value={organization.contactEmail} onchange={onChange}/>
                </div>
            </div>
            <div class="row mb-3">
                <label for="orgAddress" class="col-sm-3 col-form-label "><h3>Org Address</h3></label>
                <div class="col-sm-9">
                <input type="text" class="form-control border-dark" name="orgAddress" value={organization.orgAddress} onChange={onChange}/>
                </div>
            </div>
            <div class="row mb-3">
                <label for="orgCity" class="col-sm-3 col-form-label "><h3>Org City</h3></label>
                <div class="col-sm-9">
                <input type="text" class="form-control border-dark" name="orgCity" value={organization.orgCity} onChange={onChange}/>
                </div>
            </div>
            <div class="row mb-3">
                <label for="state" class="col-sm-3 col-form-label "><h3>State</h3></label>
                <div class="col-sm-9">
                <select class="form-control bfh-states border-dark" data-country="US" data-state="CA" name="state" value={organization.state} onChange={onChange}>{stateOptions.map((state) => {
                        return <option key={state} value={state}>{state}</option>
                    })}</select>
                    </div>
            </div>
            <div class="row mb-3">
                <label for="password" class="col-sm-3 col-form-label "><h3>Password</h3></label>
                <div class="col-sm-9">
                <input type="password" class="form-control border-dark" name="password" value={organization.password} onChange={onChange}/>
                </div>
            </div>
            <div class="row mb-3">
                <label for="confirmPassword" class="col-sm-3 col-form-label "><h3>Confirm Password</h3></label>
                <div class="col-sm-9">
                <input type="password" class="form-control border-dark" name="confirmPassword" value={organization.confirmPassword} onchange={onChange}/>
                </div>
            </div>
            <div class="d-flex justify-content-end">
                <button type="submit" class="mt-2 btn btn-success btn-lg">Register</button>
            </div>
            <div>
                <input type='submit' value='Register'/>
            </div>
            </div>
        </form>
        <a href="/devs/register"><h4>Need to Sign Up a Developer?</h4></a>
        </>
    )
}

export default OrgRegister;