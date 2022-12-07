const db = require('../models/driver');

module.exports.home = (req, res, next)=>{
    res.render('driverhome');
}
module.exports.login = (req, res, next)=>{
    res.render('login');
}

module.exports.booking = (req, res, next)=>{
    res.render('search');
}

module.exports.create = (req, res, next) => {
    res.render('driversignup');
}

module.exports.driverprofile = (req, res, next) => {
    res.render('driverprofile',{data : req.identity.user});
}

// module.exports.createPost = (req, res, next) => {
//     db.create({
//         Full_name: req.body.Full_name,
//         Email: req.body.Email,
//         Mobile_number: req.body.Mobile_number,
//         Username: req.body.Username,
//         license: req.body.license,
//         vehicleno: req.body.vehicleno,
//         Password: req.body.Password, 
//         })
//         .then(user => {
//             res.redirect("/driverlogin");
//         })
// }

module.exports.createPost = async (req, res, next)=>{
    const {Full_name, Email,Mobile_number, Username,license,vehicleno,Password } = req.body;
    let existingUser = await db.findOne({
        where: {
            Email: Email
        }
    });

    if(existingUser){
        return res.render('driversignup', {message: 'Already registered.'});
    }

    await db.create({
         Full_name: req.body.Full_name,
         Email: req.body.Email,
         Mobile_number: req.body.Mobile_number,
         Username: req.body.Username,
         license: req.body.license,
         vehicleno: req.body.vehicleno,
         Password: req.body.Password, 
    });

    res.redirect('/driverlogin');
}


module.exports.driverLogin = (req, res, next)=>{
    res.render('driverlogin');
}

module.exports.driverloginPost = async (req, res, next)=>{
    const Username = req.body.Username;
    const Password = req.body.Password;
    console.log(Username,Password)
    const userFromDb = await db.findOne({
        where: {Username: Username, Password: Password}
    });

    if(userFromDb==null){
        res.render('driverlogin', {message: 'No user with this Username or password was found.'})
        
    }
    else{
    req.session.user_id = userFromDb.id;
    req.session.role= 2;
    res.render('driverhome');
    }
}

module.exports.update = (req, res, next) => {
    db.findByPk(req.params.id)
        .then(user => {
            res.render('driverupdate', {
                data: user
            })
        });
}


module.exports.updatePost = async (req, res, next) => {
    var user = await db.findByPk(req.params.id);
    console.log(user)
    await db.update(
        {
            Full_name: req.body.Full_name,
            Email: req.body.Email,
            Mobile_number: req.body.Mobile_number,
            Username: req.body.Username,
            license: req.body.license,
            vehicleno: req.body.vehicleno,
            Password: req.body.Password, 
        },
        {
            where: {id: req.params.id}
        }
    )
    res.redirect('/driverlogin');
}

module.exports.delete = async (req, res, next) => {
    let id = req.params.id;
    let user = await db.findByPk(req.params.id);
    if (user) {
        await db.destroy({
            where: {
                id: id
            }
        });
        res.redirect("/signup");
    }
}
module.exports.logout = (req , res,next)=>{
    req.session=null;
    res.redirect('/driverlogin')
 }
