const DeveloperController = require('../controllers/developer.controller');

module.exports = (app) => {
    console.log('Setting up developer routes');
    app.get('/api/developers', DeveloperController.findAllDevelopers);
    app.get('/api/developers/:id', DeveloperController.findOneSingleDeveloper);
    app.patch('/api/developers/:id', DeveloperController.updateExistingDeveloper);
    app.delete('/api/developers/:id', DeveloperController.deleteAnExistingDeveloper);
    app.get('/api/languages', DeveloperController.findAllLanguages);    
    app.post('/api/developers/register', DeveloperController.registerDeveloper);
    app.post('/api/developers/login', DeveloperController.loginDeveloper);
}