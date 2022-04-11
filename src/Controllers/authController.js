const Teacher = require('../models/Teacher');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const errorHandler = err => {
    console.log("ERROR : ",err);
}

const teacherRegister = async (req,res)=>{
    try {
        const {email , password}= req.body;
        if(!(email && password)){
            return res.status(422).json({error:"Invalid credentials , check all fields are filled properly"});
        }
        const oldUser = await Teacher.findOne({ where:{email}})
       
        if(oldUser){
            return res.status(409).json({error:`Teacher with ${email} already exists`});
        } else {
       
            let encryptedPassword = await bcrypt.hash(password,10);

            const user  = await Teacher.create({
                email,
                password:encryptedPassword,
            })

            const token  = jwt.sign({ user_id:user.id, email : user.email},"your-secret",{expiresIn:"2h",});
            
            res.cookie("token",token,{expires:new Date(Date.now()+25892000000),ttpOnly:true})
            
            Teacher.findByPk(user.id)
              .then(function (elem) {
                    if (elem) {
                        user.update({token:token});
                    } 
              }).catch(errorHandler);
        
          return res.status(200).json({token ,message :`successfully registered in !!`})
        }
    } catch (err) {
        console.log(err);
        res.status(400).json({error : `some error occured`})
    }
}

const teacherLogin = async (req,res) =>{
        try {
            const { email, password } = req.body;
              if (!(email && password)) {
                return res.status(422).json({error:"Invalid credentials , check all fields are filled properly"});
              }
              const user = await Teacher.findOne({where:{ email }});
              if(user ==null){
                return res.status(404).json({error:`Teacher with ${email} does not exists`});
              }
          
              if (user && (await bcrypt.compare(password, user.password))) {
                  const token = jwt.sign({ user_id: user.Id, email },"your-secret", {expiresIn: "2h",});
                  user.token = token;
                  res.cookie("token",token,{
                      expires:new Date(Date.now()+25892000000),
                      httpOnly:true
                  })
                  return res.status(200).json({token , message :`successfully logged in !!`})
              } else {
                return res.status(422).json({error:"Invalid credentials , check all fields are filled properly"});
              }
        } catch (err) {
          console.log(err);
        }
}

const teacherLogout = async (req,res)=>{
    res.clearCookie('token');
    res.status(200).json({message : "successfully logged out !!"});
}

module.exports = {
    teacherRegister,
    teacherLogin,
    teacherLogout
}