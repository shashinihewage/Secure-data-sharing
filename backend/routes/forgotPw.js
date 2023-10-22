const router = require("express").Router();
const nodemailer = require('nodemailer');
const {EMAIL, PASSWORD} = require('./env.js');
const Mailge = require('mailgen');
let User = require("../modals/medspring.js");


router.route("/update/:email").get(async(req,res)=>{
    let email = req.params.email;
    const password = req.body.password;
    const user_id = req.body.user_id;
    const user_name = req.body.user_name;
    const type = req.body.type;
    const nic = req.body.nic;
   
    let config = {
        service:'gmail',
        auth:{
            user:EMAIL,
            pass:PASSWORD
        }
    }
    
    let transpoter = nodemailer.createTransport(config);

    let MailGenereto = new Mailge({
        theme:'default',
        product: {
            name: "MedSpring",
            link: "https://mailgen.js/"
        }
    })

    let response = {
        body:{
            name:user_name,
            intro:"!!! Password Reset !!!",
            table:{
                data:[
                    {
                    "Click this link to reset your password ":"https://www.google.lk/?gws_rd=ssl",
                    }
                ]
            },
            outro:"Hope to do more business !!!"
        }
    }

    let mail = MailGenereto.generate(response)

    let message = {
        from : EMAIL,
        to : email,
        subject:"Forgot Password",
        html: mail
    }

    transpoter.sendMail(message)

    const user = await User.findById(user_id)
    .then((users) => {
        
    })
    .catch((err) => {
        res.status(500).send({status: "Error with finding data", error: err.message});
    });

    
})
module.exports = router;