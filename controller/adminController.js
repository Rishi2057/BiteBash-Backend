const admins = require("../model/adminModel")
const jwt = require("jsonwebtoken");
const clients = require("../model/clientmodel");

exports.adminRegisterController = async (req, res) => {
    const { userName, email, password } = req.body
    console.log(userName, email, password);

    try {
        const existingAdmin = await admins.findOne({ email })
        if (existingAdmin) {
            res.status(406).json("User Already Exist")
        } else {
            try {  
                const newAdmin = new admins({
                    userName,
                    email,
                    password,
                })
                console.log("hai");
                await newAdmin.save()
                res.status(200).json(newAdmin)
            } catch (error) {
                res.status(400).json("Something Went Wrong")
            }
        }
    } catch (error) {
        res.status(500).json(error)
    }
}

// login

exports.adminLoginController = async (req,res)=>{
    const {email,password}= req.body
    console.log(email,password);
    
    try {
        const existingAdmin = await admins.findOne({email})
        console.log(existingAdmin);
        
        if (existingAdmin.password == password) {
            const token = jwt.sign({userMail:existingAdmin.email},process.env.secret)
            res.status(200).json({existingAdmin,token})
        }else{
            res.status(406).json("Password might be Incorrect")
        }
    } catch (error) {
        res.status(500).json("Incorrect Email")
    }
}


// approve clients status

exports.approveClientController = async (req,res)=>{

    const {id} = req.params
    console.log(id);

    try {
        const approveClient = await clients.findByIdAndUpdate({_id:id},{status : "Approved"},{new:true})
                    res.status(200).json(approveClient)
    } catch (error) {
        res.status(500).json("Incorrect Email")
    }
}