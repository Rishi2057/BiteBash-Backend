const users = require("../model/userModel")
const jwt = require("jsonwebtoken")

exports.userRegisterController = async (req, res) => {
    const { fullName, email, password, phoneNumber } = req.body
    console.log(fullName, email, password, phoneNumber);

    try {
        const existingUser = await users.findOne({ email })
        if (existingUser) {
            res.status(406).json("User already Registered")
        } else {
            const userRegister = new users({
                fullName,
                email,
                password,
                phoneNumber
            })
            await userRegister.save()
            res.status(200).json(userRegister)
        }
    } catch (error) {
        res.status(500).json(error)
    }

}

exports.googleAuthController = async (req, res) => {
    // NOTE: Ensure jwt is imported at the top of this file: 
    // const jwt = require('jsonwebtoken');
    
    const { fullName, email, uid, photoURL } = req.body;
    console.log( fullName, email, uid, photoURL);
    
    try {
        // 1. Find or Create User
        let user = await users.findOne({ email });

        if (!user) {
            // New user, save it to the database
            user = new users({
                fullName,
                email,
                uid,
                profile: photoURL,
            });

            await user.save();
        }

        // 2. Generate JWT (Corrected Line)
        // Use the 'user' variable for the email
        const token = jwt.sign({ userMail: user.email }, process.env.secret);
        
        // 3. Send Response with User Data and Token
        // Send the user object (as 'existingUser' for consistency with local login) and the token
        res.status(200).json({ existingUser: user, token: token });

    } catch (error) {
        console.error("ERROR IN googleAuthController:", error); // Added console log for debugging
        res.status(500).json(error);
    }
};


exports.userLogincontroller = async (req, res) => {
    const { email, password } = req.body
    console.log(email, password);

    try {
        const existingUser = await users.findOne({ email })
        if (existingUser) {
            if (existingUser.password == password) {
                const token = jwt.sign({ userMail: existingUser.email }, process.env.secret)
                res.status(200).json({ existingUser, token })
            } else {
                res.status(400).json("Incorrect Credentials")
            }
        } else {
            res.status(406).json("User Does Not Exists")
        }
    } catch (error) {
        res.status(500).json(error)
    }
}


// add address of user

exports.addUserAddressController = async (req, res) => {
    const userMail = req.payload
    console.log(userMail);
    const { houseNo,
        area,
        landmark,
        city,
        profile } = req.body

    pro = req.file ? req.file.filename : profile

    try {
        const addUserAddress = await users.findOneAndUpdate({ email: userMail }, {
            houseNo,
            area,
            landmark,
            city,
            profile: pro
        }, { new: true })
        res.status(200).json(addUserAddress)
    } catch (error) {
        res.status(500).json(error)
    }
}

// get user fulladdress

exports.getUserAdderssController = async (req, res) => {
    const userMail = req.payload
    try {
        const allAddress = users.findOne({ email: userMail })
        res.status(200).json(allAddress)
    } catch (error) {
        res.status(500).json(error)
    }
}

exports.getAllUsersController = async (req, res) => {
    try {
        const allUsers = await users.find()
        res.status(200).json(allUsers)

    } catch (error) {
        res.status(500).json(error)
    }
}



exports.getUserDetailsController = async (req,res)=>{
    
    const {itemData} = req.params
    console.log(itemData);
    
    try {
        const getUser = await users.find({email:itemData})
        res.status(200).json(getUser)
    } catch (error) {
        res.status(500).json(error)
    }
}