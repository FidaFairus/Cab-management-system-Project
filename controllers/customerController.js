const db = require('../models/signup');


module.exports.home = (req, res, next)=>{
    res.render('home');
}


module.exports.booking = (req, res, next)=>{
    res.render('search');
}

module.exports.create = (req, res, next) => {
    res.render('signup');
}

module.exports.userprofile = (req, res, next) => {
    res.render('userprofile',{data : req.identity.user});
}
module.exports.updateUser = (req, res, next) => {
    res.render('updateuser');
}



// module.exports.createPost = (req, res, next) => {
//     db.create({
//         Full_name: req.body.Full_name,
//         Email: req.body.Email,
//         Mobile_number: req.body.Mobile_number,
//         Username: req.body.Username,
//         Password: req.body.Password, 
//         })
//         .then(user => {
//             res.redirect("/login");
//         })
// }

module.exports.login = (req, res, next)=>{
    res.render('login');
}



module.exports.createPost = async (req, res, next)=>{
    const {Full_name, Email,Mobile_number, Username,Password } = req.body;
    let existingUser = await db.findOne({
        where: {
            Email: Email
        }
    });

    if(existingUser){
        return res.render('signup', {message: 'Already registered.'});
    }

    await db.create({
         Full_name: req.body.Full_name,
         Email: req.body.Email,
         Mobile_number: req.body.Mobile_number,
         Username: req.body.Username,
         Password: req.body.Password, 
    });

    res.redirect('/login');
}



module.exports.loginPost = async (req, res, next)=>{
    const Username = req.body.Username;
    const Password = req.body.Password;
    console.log(Username,Password)

    const userFromDb = await db.findOne({
        where: {Username: Username, Password: Password}
    });

    if(userFromDb==null){
        res.render('login', {message: 'No user with this Username or password was found.'})
        
    }
    else{
    req.session.user_id = userFromDb.id;
    req.session.role = 1;
    res.render('home')
    return res.redirect('/home');
    }

}


module.exports.update = (req, res, next) => {
    db.findByPk(req.params.id)
        .then(user => {
            res.render('updateuser', {
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
            Password: req.body.Password
        },
        {
            where: {id: req.params.id}
        }
    )
    res.redirect('/login');
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
    res.redirect('/login')
 }

//  module.exports.payment = (req, res, next) => {
//     res.render('payment');
// }