const db = require('../models/booking');
const db2 = require('../models/amount');



module.exports.book = (req, res, next) => {
    res.render("search")
}

module.exports.payment = (req, res, next) => {
    res.render('payment');
}

module.exports.bookPost = (req, res, next) => {
    
    console.log("hi")
    db.create({
            pickupPoint: req.body.pickupPoint,
            destination: req.body.destination,
            date: req.body.date,
            time: req.body.time,
            userId : req.identity.user.id
        })
        .then(user => {
            const pickupPoint=req.body.pickupPoint;
            const destination=req.body.destination;
            console.log(pickupPoint)
            db2.findOne({
                where: {pickupPoint:pickupPoint,destination:destination}
            })
            .then(amount=>{
                console.log(amount.amount)
                    res.render("payment",{
                        amount:amount.amount,
                        amountId:amount.amountId,
                        pickupPoint : amount.pickupPoint,
                        destination:amount.destination
                    })
                    
                })
                
           
             });
            
        }
       
   
    


module.exports.payment = (req, res, next) => {
        res.render('payment') 
            
}

// module.exports.invoice = (req, res, next) => {
//     res.render('invoice') 
        
// }
module.exports.invoice = (req, res, next) => {
    let id=req.params.id;
    db2.findByPk(id)
        .then(amount => {
            console.log("..........",amount)
            res.render('invoice',{
                amount:amount.amount,
                amountId:amount.amountId,
                pickupPoint : amount.pickupPoint,
                destination:amount.destination,
                user: req.identity.user
        })
           
            });
        }

module.exports.mybookings=(req, res, next) =>{
    let userId=req.identity.user.id;
    console.log(userId)
    db.findAll({
        where:
        {userId:userId}
    })
    .then(bookings => {
        res.render('mybookings', {
            data: bookings
        });
    })
}


