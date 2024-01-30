import React, {useEffect, useState} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';




const DevSkillLanguages = () => {
    const [pickLanguages, setPickLanguages] = useState([]);
    const [pickedLanguages, setPickedLanguages] = useState([]);
    const [progress, setProgress] = useState(0);

    const sortedLanguages = pickLanguages.sort((a, b) => a.name.localeCompare(b.name));

    
    const languagePicked = (languageId) => {
        let newPickedLanguages;
        if (pickedLanguages.includes(languageId)) {
          // Deselect the language if it's already picked
            newPickedLanguages = pickedLanguages.filter(id => id !== languageId);
        } else {
          // Otherwise, select the language
            newPickedLanguages = [...pickedLanguages, languageId];
        }
        setPickedLanguages(newPickedLanguages);
        const newProgress = Math.min((newPickedLanguages.length / 5) * 100, 100);
        setProgress(newProgress);
        };

    const onSubmit = (e) => {
        e.preventDefault();
        axios.post('http://localhost:8000/api/languages', pickedLanguages)
            .then((res) => {
                console.log(res);
                navigate('/');
                setPickedLanguages({language: ""});
                setBio({bio: ""});
            })
            .catch((err) => {
                console.log(err.response.data.errors);
                setErrors(err.response.data.errors);
            }); 
        };

    useEffect(() => {
        axios.get('http://localhost:8000/api/languages')
            .then((res) => {
                console.log(res.data.languages);
                setPickLanguages(res.data.languages);
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
            {sortedLanguages.map((language) => (
                <div key={language._id + 1} className="col-6-sm-4 col-md-2">
                <div
                    className={`d-flex flex-column align-items-center ${pickedLanguages.includes(language.name) ? 'selected' : ''}`}
                    onClick={() => languagePicked(language.name)}
                >
                <i
                    name="language"
                    className={`devicon-${language.name}-plain colored mb-2`}
                    style={{ fontSize: '5rem' }}
                ></i>
                    <input type="checkbox" readOnly checked={pickedLanguages.includes(language.name)}></input>
                </div>
            </div>
            ))}
        </div>
        <div>
            <label>Short Bio</label>
            <textarea name="bio" class="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
        </div>

        <div>
            <Link to={'/Devs/Skills/Frameworks'}><button type="button" class="btn btn-primary">Skip This Step</button></Link>
            <Link to={'/Devs/Skills/Frameworks'}><button type="button" class="btn btn-primary">NEXT STEP: Frameworks & Libraries</button></Link>
        </div>
        </form>
        </>
    );
}

export default DevSkillLanguages;