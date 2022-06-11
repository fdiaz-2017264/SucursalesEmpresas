'use strict'

const empresaController = require('../controllers/empresa.controller');
const mdAuth = require('../services/authenticated');
const express = require('express');
const api = express.Router();

//Rutas 
api.get('/pruebaEmpresa',empresaController.pruebaEmpresa);

api.post('/saveEmpresa',empresaController.saveEmpresa);
api.post('/loginCompany',empresaController.loginCompany);

api.delete('/deleteCompany/:id', [mdAuth.ensureAuth, mdAuth.isAdmin],empresaController.deleteCompany);
api.put('/updateCompany/:id',[mdAuth.ensureAuth, mdAuth.isAdmin], empresaController.updateCompany);

//Account 
api.put('/updateAccount', [mdAuth.ensureAuth], empresaController.updateAccount);
api.delete('/deleteAccount', [mdAuth.ensureAuth], empresaController.deleteAccount);

/*This*/
api.post('/adminCompany', [mdAuth.ensureAuth,mdAuth.admin], empresaController.adminComany);
api.delete('/deleteAdminCompany/:id',[mdAuth.ensureAuth, mdAuth.admin] ,empresaController.deleteAdminCompany);
api.get('/getCompany', [mdAuth.ensureAuth, mdAuth.admin], empresaController.getCompany);
api.get('/getIdCompany/:id', mdAuth.ensureAuth, empresaController.getCompanyId); /**/
api.put('/updateAdminCompany/:id',[mdAuth.ensureAuth, mdAuth.admin], empresaController.updateAdminCompany);

module.exports = api; 