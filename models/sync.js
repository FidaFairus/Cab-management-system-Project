const Signup = require('./signup')
const booking = require('./booking')
const driver = require('./driver')
const amount = require('./amount')
const admin = require('./admin')

Signup.hasOne(booking);
booking.belongsTo(Signup,{
    foreignKey:{
        name:'userId',
        field:'userId',
        allowNull:false
    }
});

Signup.sync({alter: true});
booking.sync({alter: true});
driver.sync({alter: true});
amount.sync({alter: true});
admin.sync({alter: true});