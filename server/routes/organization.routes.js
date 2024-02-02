//ROUTES FOR ORGANIZATION

const OrganizationController = require('../controllers/organization.controller');
 
module.exports = app => {
    // READ ROUTES
    app.get('/api/organizations', OrganizationController.findAllOrganizations);
    app.get('/api/organizations/:id', OrganizationController.findOneOrganization);
    app.get('/api/positions', OrganizationController.findAllPositions);
    app.get('/api/positions/:id', OrganizationController.findOnePosition);

    // UPDATE ROUTE
    app.patch('/api/organizations/:id', OrganizationController.updateExistingOrganization);

    // CREATE ROUTE
    app.post('/api/organizations', OrganizationController.registerOranization);
    app.post('/api/organizations/newposition', OrganizationController.createPosition);
    
    //DELETE ROUTE
    app.delete('/api/organizations/:id', OrganizationController.deleteAnExistingOrganization);
    app.post('/api/organizations/login', OrganizationController.loginOrganization);
}
