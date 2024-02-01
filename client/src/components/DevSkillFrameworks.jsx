import React, {useEffect, useState} from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import axios from "axios";



const DevSkillFrameworks = () => {
    const [pickedFrameworks, setPickedFrameworks] = useState([]);
    const [pickFrameworks, setPickFrameworks] = useState([]);
    const {id} = useParams();
    const [progress, setProgress] = useState(0);
    const navigate = useNavigate()

    const [errors, setErrors] = useState({})



    const sortedFrameworks = pickFrameworks.sort((a, b) => a.name.localeCompare(b.name));


    const frameworkPicked = (frameworkId) => {
        let newPickedFrameworks;
        if (pickedFrameworks.includes(frameworkId)) {
          // Deselect the language if it's already picked
            newPickedFrameworks = pickedFrameworks.filter(id => id !== frameworkId);
        } else {
          // Otherwise, select the language
            newPickedFrameworks = [...pickedFrameworks, frameworkId];
        }
        setPickedFrameworks(newPickedFrameworks);
        const newProgress = Math.min((newPickedFrameworks.length / 5) * 100, 100);
        setProgress(newProgress);
        };

    const onSubmit = (e) => {
        e.preventDefault();
        axios.patch(`http://localhost:8000/api/developers/${id}`, {pickedFrameworks: pickedFrameworks})
            .then((res) => {
                console.log(res);
                if(pickedFrameworks.length === 5){setPickedFrameworks([]);
                    navigate('/devs/register');                   
                } 
                    else {
                        alert("Please pick 5 frameworks")
                    }             
            })
            .catch((err) => {
                console.log(err.response.data.errors);
                setErrors(err.response.data.errors);
            });
        };

    useEffect(() => {
        axios.get('http://localhost:8000/api/frameworks')
            .then((res) => {
                console.log(res.data);

                setPickFrameworks(res.data.frameworks);

            })
            .catch((err) => {
                console.log(err);
            });
    }, []);


    return (
        <>
        <header class="bg-warning mb-3 d-flex align-items-center justify-content-between">
            <h1 class='display-2'>DevsOnDeck</h1>
            <Link to={'/devs/register'}><button type="button" class="btn btn-dark btn-lg m-2">Logout</button></Link>
        </header>

        <form onSubmit={onSubmit}>

        <div class="container border border-dark rounded mb-3">
        <div class=' bg-info row mb-3 align-items-center justify-content-evenly'>
            <h1 class='col-sm-3 display-4'>Add Your Skills</h1>
        
            <div class="progress col-sm-6" style={{height: '3em'}}>
                <div
                    className="progress-bar progress-bar-striped progress-bar-animated"
                    role="progressbar"
                    style={{ width: `${progress}%` }}
                    aria-valuenow={progress}
                    aria-valuemin="0"
                    aria-valuemax="100"
                    >{progress}%</div>
                    </div>
            
        </div>
                    <h2 class='display-2 mb-4'>Pick your top 5 Frameworks or libraries</h2>
        <div className="row">
            {sortedFrameworks.map((framework) => (
                <div key={framework._id + 1} className="col-6-sm-4 col-md-2 mb-2">
                <div
                    className={`d-flex flex-column align-items-center ${pickedFrameworks.includes(framework._id) ? 'selected' : ''}`}
                    onClick={() => frameworkPicked(framework._id)}
                    >
                <i className={`devicon-${framework.icon}-plain colored mb-2 ${pickedFrameworks.includes(framework._id) ? 'glow' : ''}`} style={{ fontSize: '5rem' }}></i>
                <p className="mb-2 fs-3">{framework.name}</p>
                <input
                    class="d-none"
                    type="checkbox"
                    name="frameworks"
                    id="frameworks"
                    readOnly
                    checked={pickedFrameworks.includes(framework.icon)}
                    onChange={() => frameworkPicked(framework.icon)}
                    />
                </div>
            </div>
            ))}
        </div>
        <div>
            <label class="mt-4"><h2>Inspirational quotes:</h2></label>
            <p class='fs-2'>"Coding is not just about building things; it's about creating possibilities, solving problems, and shaping the future." <br></br>-ChatGPT</p>
            <p class="fs-2">"you miss 100% of the shots you don't take. -wayne gretzky" <br></br>- Michael Scott </p>
        </div>
        <div>
            <button type="submit" class="btn btn-primary mb-4 mt-3">COMPLETE PROFILE</button>
        </div>
            </div>
        </form>
        </>
    );
    
}

export default DevSkillFrameworks;