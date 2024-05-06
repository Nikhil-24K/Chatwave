const Users = require("../model/userModel");
const bcrypt = require("bcrypt");

module.exports.register = async(req,res,next)=>{
   try{
    const { username, email, password} = req.body;
    const usernameCheck = await Users.findOne({username});
    if(usernameCheck)
    return res.json({msg:"Username already used", status:false});
    const emailCheck = await Users.findOne({email});
    if(emailCheck) 
    return res.json({msg:"Email already used", status :false});
    const hashedPassword = await bcrypt.hash(password,10);
    const user = await Users.create({
        email,
        username,
        password:hashedPassword,
        
    });
    delete user.password;
    return res.json({status:true, user}); 
   } catch(err){
        next(err);
   }
};

module.exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await Users.findOne({ email });

    if (!user) {
      return res.status(401).json({ msg: "Incorrect email", status: false });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ msg: "Incorrect password", status: false });
    }
    delete user.password;

    return res.status(200).json({ status: true, user });
  } catch (err) {
    next(err);
  }
};

module.exports.getAllUsers = async(req,res,next)=>{
  try{
      const users = await Users.find({_id:{$ne:req.params.id}}).select([
        "email",
        "username",
        "_id",
      ]);
      return res.json(users);
  }catch(ex){
      next(ex);
  }
}
  
  
 
  
  