const DeveloperController = require('../controllers/developer.controller');

module.exports = (app) => {
    console.log('Setting up developer routes');
    app.get('/api/developers', DeveloperController.findAllDevelopers);
    app.get('/api/developers/:id', DeveloperController.findOneSingleDeveloper);
    app.patch('/api/developers/:id', DeveloperController.updateExistingDeveloper);
    app.delete('/api/developers/:id', DeveloperController.deleteAnExistingDeveloper);
    app.get('/api/languages', DeveloperController.findAllLanguages);   
    app.get('/api/frameworks', DeveloperController.findAllFramework);   
    app.post('/api/developers/register', DeveloperController.registerDeveloper);
    app.post('/api/developers/login', DeveloperController.loginDeveloper);
    app.post ('/api/logout',  DeveloperController.logOutDeveloper);  
}