const router = require("express").Router();
let User = require("../modals/medspring");
const bcrypt = require('bcrypt');

router.route("/add").post(async(req,res) => {

    const user_id = req.body.user_id;
    const user_name = req.body.user_name;
    const email_address = req.body.email_address;
    const type = req.body.type;
    const nic = req.body.nic;

    //encrypt the password
    const password = await bcrypt.hash(req.body.password, 10);


    //create new User 
    const newUser = new User({
        user_id,
        user_name,
        email_address,
        type,
        nic,
        password
        
    })

    //save user
    newUser.save().then(()=>{
        res.json("New User Added")
    }).catch((err) => {
        console.log(err);
    })

})

router.route("/update/:userId").put(async(req,res)=>{
    let userId = req.params.userId;
    //get existing values from the database
    const {user_id, user_name, email_address, type, nic, password} = req.body;

    //get new user values
    const updateUser = {
        user_id, 
        user_name, 
        email_address, 
        type, 
        nic, 
        password
    }

    //save the datbase
    const update = await User.findOneAndUpdate(userId, updateUser).then(() => {
        res.status(200).send({status: "User Updated"})
    }).catch((err) =>{
        console.log(err);
        res.status(500).send({status: "Error with updation data"});
    })

    
})

router.route("/delete/:id").delete(async (req,res) =>{
     let userId = req.params.id; 

     await User.findByIdAndDelete(userId).then(() => {
        res.status(200).send({status: "Remove User"});
     }).catch((err)=>{
        console.log(err.message);
        res.status(500).send({status: "Error with remove user", error: err.message});
     })
})

router.route("/get/:user_id").get(async (req,res) => {
    let user_id = req.params.user_id;
    
    const user = await User.findById(user_id)
    .then((user) => {
        res.json(user);
    })
    .catch((err) => {
        res.status(500).send({status: "Error with finding data", error: err.message});
    });
})

router.route("/get").get((req,res) =>{
    User.find().then((user)=>{
        res.json(user)
    }).catch((err) =>{
        console.log(err)
    })
})

module.exports = router;