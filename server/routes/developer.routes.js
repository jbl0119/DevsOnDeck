const DeveloperController = require('../controllers/developer.controller');
 
module.exports = app => {
    app.get('/api/developers', DeveloperController.findAllDevelopers);
    app.get('/api/developers/:id', DeveloperController.findOneSingleDeveloper);
    app.patch('/api/developers/:id', DeveloperController.updateExistingDeveloper);
    app.post('/api/developers', DeveloperController.createNewDeveloper);
    app.delete('/api/developers/:id', DeveloperController.deleteAnExistingDeveloper);
    app.get('/api/languages', DeveloperController.findAllLanguages);
}
