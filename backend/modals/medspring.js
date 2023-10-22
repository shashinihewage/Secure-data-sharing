const mongoose = require('mongoose');

const schema = mongoose.Schema;

const Userschema = new schema({
    user_id :{
        type:String,
        required : true
    },
    user_name : {
        type : String,
        required : true
    },
    email_address : {
        type : String,
        required : true
    },

    type : {
        type :String ,
        required : true
    },

    nic : {
        type :String ,
        required : true
    },

    password : {
        type :String ,
        required : true
    },

})

const User = mongoose.model("User",Userschema);

module.exports = User;