const driver = require('../models/driver');
const Signup = require('../models/signup');
const admin = require('../models/admin');
module.exports = {
    auth : async (req,res,next)=>{
        req.identity = {
            isAuthenticated : false,
            user : null
        }
        var role=req.session.role;
        if(role==3){
            if(req.url == "/login" || req.url == "/signup" || req.url == "/driversignup" || req.url == "/driverlogin" || req.url=="/admin")
            {
                return next();
            }
    
            let id = req.session.user_id;
            if(!id || id == null){
                return res.render("admin")
            }
            let userFromDb = await admin.findByPk(id);
            console.log(userFromDb);
            if(userFromDb == null){
                return res.render("admin");
            }
            req.identity.isAuthenticated = true;       
            req.identity.user = {
                id : id,
                Username : userFromDb.dataValues.Username
            }
            return next();
    }
        

else if(role==2){
    if(req.url == "/login" || req.url == "/signup" || req.url == "/driversignup" || req.url == "/driverlogin" || req.url=="/admin" )
    {
        return next();
    }

    let id = req.session.user_id;
    if(!id || id == null){
        return res.redirect("/driverlogin")
    }
    let userFromDb = await driver.findByPk(id);
    console.log(userFromDb);
    if(userFromDb == null){
        return res.redirect("/driverlogin");
    }
    req.identity.isAuthenticated = true;       
    req.identity.user = {
        id : id,
        Full_name : userFromDb.dataValues.Full_name,
        Email : userFromDb.dataValues.Email,
        Mobile_number : userFromDb.dataValues.Mobile_number,
        Username : userFromDb.dataValues.Username,
        license : userFromDb.dataValues.license,
        vehicleno : userFromDb.dataValues.vehicleno,
    }
    return next();
}


else {
    if(req.url == "/login" || req.url == "/signup" || req.url == "/driversignup" || req.url == "/driverlogin" || req.url=="/admin")
        {
            return next();
        }

        let id = req.session.user_id;
        if(!id || id == null){
            return res.redirect("/login")
        }
        let userFromDb = await Signup.findByPk(id);
        console.log(userFromDb);
        if(userFromDb == null){
            return res.redirect("/login");
        }
        req.identity.isAuthenticated = true;       
        req.identity.user = {
            id : id,
            Full_name : userFromDb.dataValues.Full_name,
            Email : userFromDb.dataValues.Email,
            Mobile_number : userFromDb.dataValues.Mobile_number,
            Username : userFromDb.dataValues.Username
        }
        return next();
    }
    }
}
