import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate, useParams } from 'react-router-dom';

const AddPosition = () => {
  const { id } = useParams();
  const [newPosition, setNewPosition] = useState({
    title: "",
    description: "",
    organization: id,
    languages: []
  });
  const [organization, setOrganization] = useState({});
  const [pickedLanguages, setPickedLanguages] = useState([]);
  const [errors, setErrors] = useState({
    title: '',
    description: '',
    generic: ''
  });
  const navigate = useNavigate();
  const sortedLanguages = pickedLanguages
    .filter(language => language.name)  // Remove undefined values
    .sort((a, b) => (a.name || '').localeCompare(b.name || ''));

  useEffect(() => {
    const fetchOrganizationDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/api/organizations/${id}`);
        setOrganization(response.data.oneOrganization);
      } catch (err) {
        console.error(err);
      }
    };

    fetchOrganizationDetails();
  }, [id]);

  const languagePicked = (languageId) => {
    const newPickedLanguages = pickedLanguages.includes(languageId)
      ? pickedLanguages.filter(id => id !== languageId)
      : [...pickedLanguages, languageId];

    setPickedLanguages(newPickedLanguages);
  };

  useEffect(() => {
    const fetchLanguages = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/languages');
        setPickedLanguages(response.data.languages);
      } catch (err) {
        console.error(err);
      }
    };

    fetchLanguages();
  }, []);

  const onSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const response = await axios.post('http://localhost:8000/api/organizations/newposition', {
        ...newPosition,
        languages: pickedLanguages.map(language => ({ _id: language._id }))
      });
  
      if (!response || !response.data) {
        throw new Error("Invalid response format");
      }
  
      const updatedOrganization = {
        ...organization,
        Position: [...(organization.Position || []), response.data._id]
      };
  
      await axios.patch(`http://localhost:8000/api/organizations/${id}`, updatedOrganization);
  
      navigate(`/orgs/dashboard/${organization._id}`);
    } catch (err) {
      console.error(err.message);
  
      if (err.response && err.response.data.errors) {
        setErrors(err.response.data.errors);
      } else {
        setErrors({ generic: "An error occurred while creating the position. Please try again." });
      }
    }
  };
  const onChange = (e) => {
    setNewPosition({ ...newPosition, [e.target.name]: e.target.value });
  };

  return (
    <>
      <header className="bg-warning mb-3 d-flex align-items-center justify-content-between">
        <h1 className='display-2'>DevsOnDeck</h1>
        <Link to={'/devs/register'}>
          <button type="button" className="btn btn-dark btn-lg m-2">Logout</button>
        </Link>
      </header>
      <form onSubmit={onSubmit}>
        <div className="container border border-dark rounded mb-3">
          <div className=' bg-info row mb-3 align-items-center justify-content-evenly'>
            <h1 className='col-sm-3 display-4'>Add a Position</h1>
            <div>
              <label htmlFor="title">Name: </label>
              <input type="text" name="title" value={newPosition.title} onChange={onChange} />
              {errors.title && <p className="text-danger">{errors.title}</p>}
            </div>
            <div>
              <label htmlFor="description">Description: </label>
              <textarea name="description" value={newPosition.description} onChange={onChange} className="form-control border-dark mb-3" rows="3"></textarea>
              {errors.description && <p className="text-danger">{errors.description}</p>}
            </div>
          </div>
          <div>
            <label htmlFor="title">Skills: </label>
          </div>
          <div>
            <input type='submit' value='Add Position' />
            <div className="row">
              {sortedLanguages.map((language) => (
                <div key={language._id + 1} className="col-6-sm-4 col-md-2 mb-2">
                  <div
                    className={`d-flex flex-column align-items-center ${pickedLanguages.includes(language._id) ? 'selected' : ''}`}
                    onClick={() => languagePicked(language._id)}
                  >
                    <i className={`devicon-${language.icon}-plain colored mb-2 ${pickedLanguages.includes(language._id) ? 'glow' : ''}`} style={{ fontSize: '5rem' }}></i>
                    <p className="mb-2 fs-3">{language.name}</p>
                    <input
                      className="d-none"
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
          </div>
          {errors.generic && <p className="text-danger">{errors.generic}</p>}
        </div>
      </form>
    </>
  );
};

export default AddPosition;
