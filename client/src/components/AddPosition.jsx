import React, {useState, useEffect} from 'react';
// import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';


const AddPosition = () => {
    const [newPosition, setNewPosition] = useState({
        title: "",
        description: ""
    })
    const {id} = ""
    const [organization, setOrganization] = useState([])

    useEffect(() => {
        axios.get(`http://localhost:8000/api/organizations/${id}`)
        .then((res) => {
            setOrganization(res.data.oneOrganization)
        })
        .catch((err) => console.log(err))
    })


    const onSubmit = (e) => {
        e.preventDefault()
        setOrganization({...organization, Position: [...Position, newPosition]})
        axios.patch(`/api/organization/${id}`, organization)
            .then((res) => {
                console.log(res)
                navigate('/')
                setNewPosition({
                title: "",
                description: ""
                })
                navigate('/orgs/dashboard')
                })
            .catch((err) => {
                console.log(err.response.data.errors)
                setErrors(err.response.data.errors)
            })
        }

        const onChange = (e) => {
            setNewPosition({...position, [e.target.name]: e.target.value})
        }


    return (
        <>
        <div>
            <div>
                Add a Position
            </div>
            <div>
                <form onSubmit={onSubmit}>
                    <div>
                        <label for="title">Name: </label>
                        <input type="text" name="title" value={newPosition.title} onChange={onChange}/><br/>
                        <label for="description">Description: </label>
                        <input type="text" name="description" value={newPosition.description} onChange={onChange}/>
                    </div>
                    <div>
                        {/* Skills Area */}
                    </div>
                    <div>
                        <input type='submit' value='Register'/>
                    </div>
                </form>
            </div>
        </div>
        </>
    )
}

export default AddPosition