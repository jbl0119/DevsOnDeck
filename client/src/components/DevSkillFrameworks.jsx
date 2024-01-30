import React, {useEffect, useState} from "react";
import { Link } from "react-router-dom";
import axios from "axios";



const DevSkillFrameworks = () => {
    const [pickedFrameworks, setPickedFrameworks] = useState([]);
    const [pickFrameworks, setPickFrameworks] = useState([]);
    const [progress, setProgress] = useState(0);

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
        axios.post('http://localhost:8000/api/frameworks', pickedFrameworks)
            .then((res) => {
                console.log(res);
                navigate('/');
                setPickedFrameworks({framework: ""});
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
                setPickFrameworks(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);


    return (
        <>
        <div>
            <h1>DevsOnDeck</h1>
            <Link to={'/'}><button type="button" class="btn btn-primary">Logout</button></Link>
        </div>

        <div class="container px-5 my-5">
            <h1>Add Your Skills</h1>
            <h2>Pick your top 5 Frameworks or libraries</h2>
        </div>
        <form onSubmit={onSubmit}>
        <div class="container px-5 my-5">
            <div class="progress">
                <div
                    className="progress-bar"
                    role="progressbar"
                    style={{ width: `${progress}%` }}
                    aria-valuenow={progress}
                    aria-valuemin="0"
                    aria-valuemax="100"
                ></div>
            </div>
        </div>
        <div className="row">
            {sortedFrameworks.map((framework) => (
                <div key={framework._id + 1} className="col-6-sm-4 col-md-2 mb-2">
                <div
                    className={`d-flex flex-column align-items-center ${pickedFrameworks.includes(framework.icon) ? 'selected' : ''}`}
                    onClick={() => frameworkPicked(framework.icon)}
                >
                <i className={`devicon-${framework.icon}-plain colored mb-2 ${pickedFrameworks.includes(framework.icon) ? 'glow' : ''}`} style={{ fontSize: '5rem' }}></i>
                <p className="mb-2 fs-3">{framework.name}</p>
                    <input class='d-none'type="checkbox" readOnly checked={pickedFrameworks.includes(framework.icon)}></input>
                </div>
            </div>
            ))}
        </div>
        <div>
            <p class="fs-2">"you miss 100% of the shots you don't take. -wayne gretzky" - Michael Scott </p>
        </div>

        <div>
            <Link to={'/Devs/Skills/Frameworks'}><button type="button" class="btn btn-primary">COMPLETE PROFILE</button></Link>
        </div>
        </form>
        </>
    );
    
}

export default DevSkillFrameworks;