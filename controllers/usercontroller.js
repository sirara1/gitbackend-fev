const userModel = require('../models/userSchema');
const InterventionModel = require('../models/InterventionSchema');
const jwt = require('jsonwebtoken');
const maxTime = 24 *60 * 60 //24H
//const maxTime = 1 * 60 //1min
const createToken = (id) => {
    return jwt.sign({id},'net secret pfe', {expiresIn: maxTime })
}

module.exports.addUserTechnicien = async (req,res) => {
    try {
        const {username , email , password ,} = req.body;
        const roleTechnicien = 'Technicien'
        // if (!checkIfUserExists) {
        //     throw new Error("User not found");
        //   }
        const user = await userModel.create({
            username,email ,password,role :roleTechnicien 
        })
        // const user = new userModel({name,age,address,moy});
        //   const adduser = await user.save();
        res.status(200).json({user});
    } catch (error) {
        res.status(500).json({message: error.message});
    }   } 

    module.exports.addUserAdmin = async (req,res) => {
        try {
            const {username , email , password ,} = req.body;
            const roleAdmin = 'admin'
            // if (!checkIfUserExists) {
            //     throw new Error("User not found");
            //   }
            const user = await userModel.create({
                username,email ,password,role :roleAdmin
            })
            // const user = new userModel({name,age,address,moy});
            //   const adduser = await user.save();
            res.status(200).json({user});
        } catch (error) {
            res.status(500).json({message: error.message});
        }   } 


        module.exports.getAllUsers= async (req,res) => {
            try {
                const userListe = await userModel.find()
                res.status(200).json({userListe});
            } catch (error) {
                res.status(500).json({message: error.message});
            }
        }
        module.exports.getUserById= async (req,res) => {
            try {
                //const id = req.params.id
                const {id} = req.params
                //console.log(req.params.id)
                const user = await userModel.findById(id)
        
                res.status(200).json({user});
            } catch (error) {
                res.status(500).json({message: error.message});
            }
        }

        module.exports.deleteUserById= async (req,res) => {
            try {
                const {id} = req.params
        
                const checkIfUserExists = await userModel.findById(id);
                if (!checkIfUserExists) {
                  throw new Error("User not found");
                }
                await userModel.findByIdAndDelete(id)
        
                res.status(200).json("deleted");
            } catch (error) {
                res.status(500).json({message: error.message});
            }
        }

        module.exports.updateuserById = async (req, res) => {
try {
    const {id} = req.params
    const {email , username} = req.body;

    await userModel.findByIdAndUpdate(id,{$set : {email , username }})
    const updated = await userModel.findById(id)

    res.status(200).json({updated})
} catch (error) {
    res.status(500).json({message: error.message});
}
}
module.exports.searchUserByUsername = async (req, res) => {
    try {

        const { username } = req.query
        if(!username){
            throw new Error("Veuillez fournir un nom pour la recherche.");
        }

        const userListe = await userModel.find({
            username: {$regex: username , $options: "i"}
        })

        if (!userListe) {
            throw new Error("User not found");
          }
          const count = userListe.length
        res.status(200).json({userListe,count})
    } catch (error) {
        res.status(500).json({message: error.message});
    }
    }

    module.exports.getAllTechnicien= async (req,res) => {
        try {

            const userListe = await userModel.find({role : "Technicien"})
    
            res.status(200).json({userListe});
        } catch (error) {
            res.status(500).json({message: error.message});
        }
    }

    module.exports.getAllAdmin= async (req,res) => {
        try {

            const userListe = await userModel.find({role : "admin"})
    
            res.status(200).json({userListe});
        } catch (error) {
            res.status(500).json({message: error.message});
        }
    }
    module.exports.login= async (req,res) => {
        try {
            const { email , password } = req.body;
            const user = await userModel.login(email, password)
            const token = createToken(user._id)
            res.cookie("jwt_token_sarra", token, {httpOnly:false,maxAge:maxTime * 1000})
            res.status(200).json({user})
        } catch (error) {
            res.status(500).json({message: error.message});
        }
    }; 