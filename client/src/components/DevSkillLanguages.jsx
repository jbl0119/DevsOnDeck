import React, {useEffect, useState} from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';




const DevSkillLanguages = () => {
    const [pickLanguages, setPickLanguages] = useState([]);
    const [pickedLanguages, setPickedLanguages] = useState([]);

    const [biography, setBiography] = useState("");
    const {id} = useParams();
    const [progress, setProgress] = useState(0);
    const navigate = useNavigate()

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

        axios.patch(`http://localhost:8000/api/developers/${id}`, {pickedLanguages, biography})
            .then((res) => {
                console.log(res);
                if(pickedLanguages.length === 5){setPickedLanguages([]);
                setBiography("");

                navigate(`/devs/skills/frameworks/${id}`);} 
                else {
                    alert("Please pick 5 languages")
                }
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
        <header class="d-flex justify-content-space-evenly">
            <h1>DevsOnDeck</h1>
            <Link to={'/devs/register'}><button type="button" class="btn btn-primary">Logout</button></Link>
        </header>

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
                <div key={language._id + 1} className="col-6-sm-4 col-md-2 mb-2">
                <div
                    className={`d-flex flex-column align-items-center ${pickedLanguages.includes(language.icon) ? 'selected' : ''}`}

                    onClick={() => languagePicked(language._id)}
                >
                <i className={`devicon-${language.icon}-plain colored mb-2 ${pickedLanguages.includes(language.icon) ? 'glow' : ''}`} style={{ fontSize: '5rem' }}></i>
                <p className="mb-2 fs-3">{language.name}</p>
                <input
                    class="d-none"
                    type="checkbox"
                    name="languages"
                    id="languages"
                    readOnly
                    checked={pickedLanguages.includes(language.icon)}
                    onChange={() => languagePicked(language.icon)}
                    />
                   
                </div>
            </div>
            ))}
        </div>
        <div>
            <label>Short Bio</label>

            <textarea
                name="biography"
                value={biography}
                onChange={(e) => setBiography(e.target.value)}
                className="form-control"
                id="biography"
                rows="3"
                ></textarea>
                
       </div>

        <div>
            <Link to={`/devs/skills/frameworks/${id}`}><button type="button" class="btn btn-primary">Skip This Step</button></Link>
            <button type="submit" class="btn btn-primary">NEXT STEP: Frameworks & Libraries</button>
        </div>
        </form>
        </>
    );
}

export default DevSkillLanguages;