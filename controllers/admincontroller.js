const db = require('../models/admin');
const db2 = require('../models/booking');
const db3 = require('../models/amount');


module.exports.admin = (req, res, next)=>{
    res.render('admin');
}

module.exports.adminPost = async (req, res, next)=>{
    const Username = req.body.Username;
    const Password = req.body.Password;
    console.log(Username,Password)
    const userFromDb = await db.findOne({
        where: {Username: Username, Password: Password}
    });

    if(userFromDb==null){
        res.render('admin', {message: 'You are not an admin'})
        
    }
    else{
    req.session.user_id = userFromDb.id;
    req.session.role = 3;
    res.redirect('/index');
    }
}



module.exports.index = (req, res, next) => {
    db2.findAll().then(bookings => {
        console.log(bookings);
        res.render('index', {
            data: bookings

        });
    })
}


module.exports.indexRoute = (req, res, next) => {
    db3.findAll().then(routes => {
        res.render('index-routes', {
            data: routes
        });
    })
}

module.exports.create = (req, res, next) => {
    res.render('create-routes');
}

module.exports.createPost = (req, res, next) => {
    db3.create({
            pickupPoint: req.body.pickupPoint,
            destination: req.body.destination,
            amount: req.body.amount
            
        })
        .then(routes => {
            res.redirect("/index-routes");
        })
}

module.exports.update = (req, res, next) => {
    db3.findByPk(req.params.id)
        .then(routes => {
            res.render('update-routes', {
                data: routes
            })
        });
}


module.exports.updatePost = async (req, res, next) => {
    var user = await db3.findByPk(req.params.id);
    await db3.update(
        {
            pickupPoint: req.body.pickupPoint,
            destination: req.body.destination,
            amount: req.body.amount
        },
        {
            where: {amountId: req.params.id}
        }
    )
    res.redirect('/index-routes');
}

module.exports.deleteroutes = async (req, res, next) => {
    let amountId = req.params.id;
    let routes = await db3.findByPk(amountId);
    if (routes) {
        await db3.destroy({
            where: {
                amountId:amountId
            }
        });
        res.redirect("/index-routes");
    }
}

module.exports.logout= (req , res,next)=>{
    req.session=null;
    res.redirect('/admin')
 }