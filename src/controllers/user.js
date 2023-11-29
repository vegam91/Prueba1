const bcrypt = require("bcrypt");
const User = require("../models/user");

const register = async (req,res) =>{
    const {email, password:plainTextPassword, ...userDetails}= req.body;
    if(!email){
        return res 
        .status(400)
        .json({error : "el campo de correo electronico es obligatorio"})
    }if (!plainTextPassword) {
        return res.status(400).json({ error: "La contraseña es obligatoria" });
      }
    const salt = await bcrypt.genSalt(10);
    const password = await bcrypt.hash(plainTextPassword, salt);
    
    try{
        const user = await User.create({email,password,...userDetails}) 
        const token = user.generateJWT();
    
        res.setHeader("Access-Control-Expose-Headers", "x-auth-token");
    
        res.setHeader("x-auth-token", token)
        res.status(201).json({message:"Ususario registrado exitosamente"});
    
    
    } catch (error) {
        console.error('Error al cifrar la contraseña:', error);
        res.status(500).json({ error: 'Error al cifrar la contraseña', detalle: error.message });
      }};

module.exports = { register };
