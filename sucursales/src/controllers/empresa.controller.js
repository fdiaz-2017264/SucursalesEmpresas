'use strict'

const Empresa = require('../models/empresa.model');
const { searchUser, encrypt, validateData, searchComany, checkPass, checkPermission, checkUpdate, checkUpdatEmpresa, checkUpdateAdmin } = require('../utils/validate');
const jwt = require('../services/jwt');


exports.pruebaEmpresa = async (req, res) => {
    await res.send({ message: 'Controller run' });
}

/*
exports.saveEmpresa = async (req, res) => {
    try {
        const params = req.body;
        let data = {
            name: params.name,
            typeOfCompany: params.typeOfCompany,
            town: params.town,
            password: params.password,
            role: 'COMPANY'
        }
        let msg = validateData(data);
        if (!msg) {
            let empresaExist = await searchComany(params.name);
            if (!empresaExist) {
                data.password = await encrypt(params.password);
                let empresa = new Empresa(data);
                await empresa.save();
                return res.send({ message: 'Company Saved' })
            } else {
                return res.send({ message: 'Name in use' })
            }

        } else {
            return res.status(400).send(msg);
        }
    } catch (err) {
        console.log(err)
        return res.status(500).send({ err, message: 'Error saving' })
    }
}
*/

exports.saveEmpresa = async (req, res) => {

    try {
        const params = req.body;
        let data = {
            name: params.name,
            typeOfCompany: params.typeOfCompany,
            town: params.town,
            password: params.password,
            role: 'COMPANY'
        }
        let msg = validateData(data);
        if (msg) return res.status(400).send(msg);
        let already = await searchComany(data.name);
        if (already) return res.status(400).send({ message: 'Company en uso' });
        data.email = params.email;
        data.password =await encrypt(params.password);

        let empresa = new Empresa(data)
        await empresa.save();
        return res.send({ message: 'Company creado' });
    } catch (err) {
        console.log(err);
        return res.status(500).send({ err, message: 'Error saving Company' })
    }

}


exports.loginCompany = async (req, res) => {
    try {
        const params = req.body;
        const data = {
            name: params.name,
            password: params.password
        }
        let msg = validateData(data);

        if (msg) return res.status(400).send(msg);
        let alreadyEmpresa = await searchComany(data.name);
        console.log(data.password)
        if (alreadyEmpresa && await checkPass(data.password, alreadyEmpresa.password)) {
            let token = await jwt.createToken(alreadyEmpresa);
            delete alreadyEmpresa.password;

            return res.send({ token, message: 'Welcome', alreadyEmpresa })

        } else return res.status(401).send({ message: 'User or Password incorrect' });

    } catch (err) {
        console.log(err);
        return res.status(500).send({ err, message: 'Error' })
    }
}



exports.deleteCompany = async (req, res) => {
    try {
        const empresaId = req.params.id;
        const permission = await checkPermission(empresaId, req.user.sub);
        if (permission == false) return res.status(403).send({ message: 'Insuficient permissions' });
        const companyDeleted = await Empresa.findOneAndDelete({ _id: empresaId });
        if (companyDeleted) return res.send({ message: 'Company deleted', companyDeleted });
        return res.send({ message: 'Company not found or already deleted' });
    } catch (err) {
        console.log(err);
        return res.status(500).send({ err, message: 'Error deleting' });
    }
}

/*
exports.updateCompany = async (req, res) => {
    try {
        const empresaId = req.params.id;
        const params = req.body;
        if (params.password) return res.send({ message: 'Password cannot updated' });
        const companyEdit = await checkUpdatEmpresa(params);
        if (companyEdit === false) return res.status(400).send({ message: 'Params not received' });
        const permission = await checkPermission(empresaId, req.user.sub);
        
        if(permission === false) return res.status(401).send({message: 'Insuficient Permission'});
        const empresaUpdate = await Empresa.findOneAndUpdate({ _id: empresaId }, params, { new: true });
        if (!empresaUpdate) return res.send({ message: 'Company not found or not updated' });
        return res.send({ message: 'Company Updated'});
    } catch (err) {
        console.log(err);
        return res.status(500).send({ message: 'Error actualizando' })
    }
}
*/


exports.updateCompany = async(req,res)=>{
    try{
        const params = req.body; 
        const idCompany = req.params.id; 

        const companyExist = await Empresa.findOne({_id: idCompany})
        if(!companyExist)
        return res.send({ message: 'Comany no encontrado' })
        const access = await checkPermission(idCompany, req.user.sub); 
        if(access === false)
            return res.status(401).send({message: 'Usuario no autorizado' });

        const validateUp = await checkUpdatEmpresa(params);
        if(validateUp === false)
            return res.status(400).send({message: 'Parametros invaldos o no tienes autorización'})

         let nameCompany = await searchComany(params.name); 
         if(nameCompany && companyExist.name != params.name) 
             return res.send({ message: 'Company en uso' }); 

        const updateCompany = await Empresa.findOneAndUpdate({_id: idCompany}, params, {new: true}).lean();
        if(updateCompany){
            res.send({ updateCompany, message: 'Usuario actualizado' });
        }else{
            return res.send({ message: 'Usuario no actualizado' });
        }

    }catch(err){
        console.log(err); 
        return res.status(500).send({ err, message: 'Failed to update Company' })
    }
}




exports.createAdmin = async (req, res) => {
    try {
        if (await Empresa.find() == '' || !await Empresa.findOne({name: 'SuperAdmin'})) {
            const data = {
                name: 'SuperAdmin',
                password: '123456',
                role: 'ADMIN'
            }
            const admin = new Empresa(data);
            await admin.save();
        }
    } catch (err) {
        console.log(err);
        return res.status(500).send({ message: 'Error saving ADMIN' })
    }
}


/*Eliminar Empresa*/
exports.deleteAdminCompany = async(req,res)=>{
    try{
        const searchComany = req.params.id; 
        const searchCompany = await Empresa.findOne({_id: searchComany});
        if(!searchCompany) return res.status(404).send({message: 'Company not found or already deleted'})

        if(!searchComany) return res.send({message: 'Insuficient permissions'}); 
        if(searchCompany.role === 'ADMIN') return res.send({message: 'Cannot delete company'});
        const companyDeleted = await Empresa.findOneAndDelete({_id: searchComany});
        if(!companyDeleted) return res.send({message: 'Insuficient permissions'}); 
        return res.send({companyDeleted, message: 'Company deleted'})
    }catch(err){
        console.log(err);
        return res.status(500).send({message: 'Error deleting'})
    }
}

/*Crear una empresa*/
exports.adminComany = async(req,res)=>{
    try{
        const params = req.body; 
        const data = {
            name: params.name, 
            typeOfCompany: params.typeOfCompany, 
            municipality: params.municipality, 
            password: params.password, 
            role: params.role
        }
        const msg = validateData(data);
        if(msg) return res.status(400).send(msg);
        const companyExist = await searchComany(params.name);
        if(companyExist) return res.send({message: 'Warning: Name in use'});
        if(params.role != 'ADMIN') return res.status(400).send({message: 'Invalid role'}); 
        data.name = params.name; 
        data.password = params.password; 

        const company = new Empresa(data);
        await company.save();
        return res.send({message: 'Empresa created'})
    }catch(err){
        console.log(err);
        return res.status(500).send({message: 'Error creating'}); 
    }
}

/*Verificar Empresas*/
exports.getCompany = async (req,res)=>{
    try{
        const dentCompany = await Empresa.find();
        return res.send({message: 'Company Found:', dentCompany}); 
    }catch(err){
        console.log(err);
        return res.status(500).send('Error Get Company')
    }
}


exports.getCompanyId = async(req,res)=>{
    try{
        const idCompany = req.params.id;  
        const company = await Empresa.findOne({_id: idCompany});
        
        if(!company){
            return res.send({message: 'Compañia no encontrada'})
        } else{
            return res.send({message: 'Usuario encontrado', company})
        }

    }catch(err){
        console.log(err); 
        return res.status().send('Error Get Company Id'); 
    }
}


exports.updateAdminCompany = async(req,res)=>{
    try{
        const dentCompany = req.params.id; 
        const params = req.body; 

        const searchCompany = await Empresa.findOne({_id: dentCompany});
        if(!searchComany) return res.send({message: 'Company not found, try again'}); 
        const companyParams = await checkUpdateAdmin(params); 

        if(companyParams === false) return res.send({message: 'Params not received'}); 
        if(searchComany.role === 'ADMIN') return res.send({message: 'Action not allowed'});

        const nameCompany = await searchComany(params.name);
        if(nameCompany && searchComany.name != params.name) return res.send({message: 'Name in use'});
        if(params.role === 'ADMIN') return res.status(400).send({message: 'Invalid role' });

        const companyUpdate = await Empresa.findOneAndUpdate({_id: dentCompany},params,{new: true});
        if(!companyUpdate) return req.send({message: 'Company not Update'}); 
        return res.send({companyUpdate, message: 'Company Updated'});

    } catch(err){
        console.log(err); 
        return res.status(500).send('Error Updating');
    }
}

//------------------------- Account ------------------------------


exports.deleteAccount = async (req, res) => {
    try {
        const empresaId = req.user.sub;
        const permission = await checkPermission(empresaId, req.user.sub);
        if (permission == false) return res.status(403).send({ message: 'Insuficient permissions' });
        const companyDeleted = await Empresa.findOneAndDelete({ _id: empresaId });
        if (companyDeleted) return res.send({ message: 'Deleted', companyDeleted });
        return res.send({ message: 'Not found or already deleted' });
    } catch (err) {
        console.log(err);
        return res.status(500).send({ err, message: 'Error deleting' });
    }
}

exports.updateAccount = async(req,res)=>{
    try{
        const params = req.body; 
        const idCompany = req.user.sub; 

        const companyExist = await Empresa.findOne({_id: idCompany})
        if(!companyExist)
        return res.send({ message: 'Not found' })
        const access = await checkPermission(idCompany, req.user.sub); 
        if(access === false)
            return res.status(401).send({message: 'Unauthorized' });

        const validateUp = await checkUpdatEmpresa(params);
        if(validateUp === false)
            return res.status(400).send({message: 'Invalid Params'})

         let nameCompany = await searchComany(params.name); 
         if(nameCompany && companyExist.name != params.name) 
             return res.send({ message: 'Name in use' }); 

        const updateCompany = await Empresa.findOneAndUpdate({_id: idCompany}, params, {new: true}).lean();
        if(updateCompany){
            res.send({ updateCompany, message: 'Updated' });
        }else{
            return res.send({ message: 'Company not updated' });
        }

    }catch(err){
        console.log(err); 
        return res.status(500).send({ err, message: 'Failed to update Company' })
    }
}