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
        confirmPassword: ""
    })
    const navigate = useNavigate();
    const [errors, setErrors] = useState("");

    const onChange = (e) => {
        setOrganization({...organization, [e.target.name]: e.target.value})
    }

    // const onSubmit = (e) => {
    //     e.preventDefault()
    //     axios.post('http://localhost:8000/api/organizations', organization)
    //         .then((res) => {
    //             console.log(res)
    //             navigate('/')
    //             if(res.data.success) {
    //                 setOrganization({
    //                     organizationName: "",
    //                     firstName: "",
    //                     lastName: "",
    //                     contactEmail: "",
    //                     orgAddress: "",
    //                     orgCity: "",
    //                     state: "",
    //                     password: "",
    //                     confirmPassword: "",
    //                 })
    //                 navigate(`/orgs/dashboard/${res.data.organization._id}`)
    //             }
    //             else {
    //                 setErrors(res.data.error)
    //             }
    //             })
    //         .catch((err) => {
    //             console.log(err.response.data.error)
    //             setErrors(err.response.data.error)
    //         })
    //     }

        const onSubmit = (e) => {
        e.preventDefault()
        axios.post('http://localhost:8000/api/organizations', organization)
            .then((res) => {
                console.log(res)
                if (res.data.success) {
                setOrganization({
                    organizationName: "",
                    firstName: "",
                    lastName: "",
                    contactEmail: "",
                    orgAddress: "",
                    orgCity: "",
                    state: "",
                    password: "",
                    confirmPassword: ""
                })
                navigate(`/orgs/dashboard/${res.data.organization._id}`)
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
        <form onSubmit={onSubmit}>
            <div>
            <h1>Organization Sign Up</h1>
            <div>
                <label htmlFor="organizationName" className="form-label">Organization Name</label>
                <input type="text" className="form-control"  id="organizationName" name="organizationName" value={organization.organizationName} onChange={onChange}/>
                {errors.organizationName && <p className="text-danger">{errors.organizationName}</p>}
            </div>
            <div>
                <label htmlFor="firstName" className="form-label">First Name</label>
                <input type="text" className="form-control"  id="firstName" name="firstName" value={organization.firstName} onChange={onChange}/>
                {errors.firstName && <p className="text-danger">{errors.firstName}</p>}
            </div>
            <div>
                <label htmlFor="lastName" className="form-label">Last Name</label>
                <input type="text" className="form-control"  id="lastName" name="lastName" value={organization.lastName} onChange={onChange}/>
                {errors.lastName && <p className="text-danger">{errors.lastName}</p>}
            </div>
            <div>
                <label htmlFor="contactEmail" className="form-label">Email</label>
                <input type="text" className="form-control" id="contactEmail"  name="contactEmail" value={organization.contactEmail} onChange={onChange}/>
                {errors.contactEmail && <p className="text-danger">{errors.contactEmail}</p>}
            </div>
            <div>
                <label htmlFor="orgAddress" className="form-label">Org Address</label>
                <input type="text" className="form-control" name="orgAddress" id="orgAddress" value={organization.orgAddress} onChange={onChange}/>
                {errors.orgAddress && <p className="text-danger">{errors.orgAddress}</p>}
            </div>
            <div>
                <label htmlFor="orgCity" className="form-label">Org City</label>
                <input type="text" className="form-control" name="orgCity" id="orgCity" value={organization.orgCity} onChange={onChange}/>
                {errors.orgCity && <p className="text-danger">{errors.orgCity}</p>}
            </div>
            <div>
                <label htmlFor="state" className="form-label">State</label>
                <select className="form-control bfh-states" data-country="US" data-state="CA" name="state" value={organization.state} onChange={onChange}>{stateOptions.map((state) => {
                        return <option key={state} value={state}>{state}</option>
                    })}</select>
                {errors.state && <p className="text-danger">{errors.state}</p>}
            </div>
            <div>
                <label htmlFor="password" className="form-label">Password</label>
                <input type="password" className="form-control" id="password" name="password" value={organization.password} onChange={onChange}/>
                {errors.password && <p className="text-danger">{errors.password}</p>}
            </div>
            <div>
                <label htmlFor="confirmPassword" className="form-label">Confirm Password</label>
                <input type="password" className="form-control" id="confirmPassword" name="confirmPassword" value={organization.confirmPassword} onChange={onChange}/>
                {errors.confirmPassword && <p className="text-danger">{errors.confirmPassword}</p>}
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