import React, {useEffect, useState} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';


const DevSkillLanguages = () => {
    const [pickedLanguages, setPickedLanguages] = useState([]);
    const [progress, setProgress] = useState(0);

    const pickLanguage = (languageId) => {
        setPickedLanguages([...pickedLanguages, languageId]);
        if((pickedLanguages.length + 1) % 5 === 0){
            setProgress(progress + 20);
        }
    };

    useEffect(() => {
        axios.get('http://localhost:8000/api/languages')
            .then((res) => {
                console.log(res.data);
                setLanguages(res.data);
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
            <h2>Pick your top 5 languages</h2>
        </div>
        <div class="container px-5 my-5">
            <div class="progress">
                <div class="progress-bar" role="progressbar" style={{width: progress + "%"}} aria-valuenow={progress} aria-valuemin="0" aria-valuemax="100"></div>
            </div>
        </div>

        <div>
            {pickedLanguages.map((language) => (
                <div key={language._id}>
                    <button type="button" class="btn btn-primary" onClick={() => pickLanguage(language._id)}>{language.name}</button>
        </div>
            ))}
        </div>
        </>
    );
}

export default DevSkillLanguages;