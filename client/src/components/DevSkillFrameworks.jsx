import React, {useEffect, useState} from "react";
import { Link } from "react-router-dom";
import axios from "axios";



const DevSkillFrameworks = () => {
    const [pickedFrameworks, setPickedFrameworks] = useState([]);
    const [progress, setProgress] = useState(0);

    const pickFramework = (frameworkId) => {
        setPickedFrameworks([...pickedFrameworks, frameworkId]);
        if((pickedFrameworks.length + 1) % 5 === 0){
            setProgress(progress + 20);
        }
    };

    useEffect(() => {
        axios.get('http://localhost:8000/api/frameworks')
            .then((res) => {
                console.log(res.data);
                setFrameworks(res.data);
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
        <div class="container px-5 my-5">
            <div class="progress">
                <div class="progress-bar" role="progressbar" style={{width: progress + "%"}} aria-valuenow={progress} aria-valuemin="0" aria-valuemax="100"></div>
            </div>
        </div>

        <div>
            {pickedFrameworks.map((framework) => (
                <div key={framework._id}>
                    <button type="button" class="btn btn-primary" onClick={() => pickFramework(framework._id)}>{framework.name}</button>
        </div>
            ))}
        </div>
        <div>
            <p>inspirational quote</p>
        </div>

        <div>
            <Link to={'/Devs/Skills/Frameworks'}><button type="button" class="btn btn-primary">COMPLETE PROFILE</button></Link>
        </div>
        </>
    );

}

export default DevSkillFrameworks;