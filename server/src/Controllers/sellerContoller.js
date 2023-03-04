const {SellerModel} = require("../Models/model")
const { isValid, isValidName, isvalidEmail, isvalidMobile, isValidPassword, keyValid, validString } = require('../Validator/validation')


const bcrypt = require('bcrypt')

const jwt = require('jsonwebtoken')

const { isValidObjectId } = require("mongoose")

const createUser = async function (req, res) {
    try {
        const data = req.body
       

        if (!keyValid(data)) return res.status(400).send({ status: false, message: "Please Enter data to register the Customer" })

        const { name, email, phone, password } = data

        if (!isValid(name)) return res.status(400).send({ status: false, message: "name is mandatory and should have non empty String" })

        if (!isValidName.test(name)) return res.status(400).send({ status: false, message: "Please Provide name in valid formate and Should Starts with Capital Letter" })

        
        if (!isValid(email)) return res.status(400).send({ status: false, message: "email is mandatory and should have non empty String" })

        if (!isvalidEmail.test(email)) return res.status(400).send({ status: false, message: "email should be in  valid Formate" })

        let user1=await SellerModel.findOne({ email })
        
        if(user1) throw new Error("User Exist")


        if (!isValid(phone)) return res.status(400).send({ status: false, message: "Phone is mandatory and should have non empty Number" })

        if (!isvalidMobile.test(phone)) return res.status(400).send({ status: false, message: "please provide Valid phone Number with 10 digits starts with 6||7||8||9" })

        if (await SellerModel.findOne({ phone })) return res.status(400).send({ status: false, message: "This Phone is already Registered Please give another Phone" })

        if (!isValid(password)) return res.status(400).send({ status: false, message: "Password is mandatory and should have non empty String" })

        if (!isValidPassword(password)) return res.status(400).send({ status: false, message: "please provide Valid password with 1st letter should be Capital letter and contains spcial character with Min length 8 and Max length 15" })

       
        


        const encyptPassword = await bcrypt.hash(password, 10)

        let obj = {
            name, email, phone, password: encyptPassword
        }

        const newUser = await SellerModel.create(obj)

        return res.status(201).send({ status: true, message: "User created successfully", data: newUser })

    } catch (error) {
        return res.status(500).send({ error: error.message })
    }
}

const loginUser = async function (req, res) {
    try {
        let data = req.body
        const { email, password } = data
        //=====================Checking the validation=====================//
        if (!keyValid(data)) return res.status(400).send({ status: false, msg: "Email and Password Required !" })

        //=====================Validation of EmailID=====================//
        if (!email) return res.status(400).send({ status: false, msg: "email is required" })


        //=====================Validation of Password=====================//
        if (!password) return res.status(400).send({ status: false, msg: "password is required" })

        //===================== Checking User exsistance using Email and password=====================//
        const user = await SellerModel.findOne({ email: email })
        if (!user) return res.status(400).send({ status: false, msg: "Email is Invalid Please try again !!" })

        const verifyPassword = await bcrypt.compare(password, user.password)

        if (!verifyPassword) return res.status(400).send({ status: false, msg: "Password is Invalid Please try again !!" })


        //===================== Creating Token Using JWT =====================//
        const token = jwt.sign({
            userId: user._id.toString()
        }, "this is a private key", { expiresIn: '25h' })

        res.setHeader("x-api-key", token)

        let obj = {
            userId: user._id,
            name:user.name,
            token: token,
            password:user.password,
            email:user.email
        }

        res.status(200).send({ status: true, message: "User login successfull", data: obj })
    } catch (error) {
        return res.status(500).send({ status: false, message: error.message })
    }
}






module.exports = { createUser, loginUser }