import {config} from "dotenv";
import mailgun from "../mailguns"
import Appdata from "../datasource/datasource";
import { User } from "../entities/User.entity";
import bcrypt from "bcrypt"
import {jwtGenerator} from "../utils/jwtgenerator" 
import {validation} from "../middlewares/vaalidation"
import authorization from "../middlewares/authorization"
import { Router } from "express";
// import cors from "cors"
config();
//DB inititalize
Appdata.initialize().then(()=>{
    console.log("Database successfully connected..!");
    }).catch((err)=>{
    console.error("Database connection error");
    })
//maligun
const router = Router();
router.post("/register",validation,async(req,res)=>{
    try {
            //1.destructure user
const {name,email,password}=req.body, emailInfo={
    from:'"Siva Raman"<sivabhuvi9344@gmail.com>',
    to:`${email}`,
    subject:`${name}`,
    html:"successfully register...!"
}
let userRepo=Appdata.getRepository(User);
//2.check whether user exist or not
let existingUser = await userRepo.findOne({ where: { email:email } });
if( existingUser)
    {
       return  res.json("user already exists..")
    }

// res.json(await userRepo.save(user1)

mailgun().messages().send(emailInfo,(err,body)=>{
    if(err)
        {
            console.log(err);
        //    res.status(500).json({
        //         message:"something went wrong in sending email  "
        //     })
        }
        else{
        //   res.json({message:"Email send successfully..."})
        }})
// 3.create bcrypt password
    const saltRound=10;
   const salt= await bcrypt.genSalt(saltRound)
   const bcryptpass= await bcrypt.hash(password,salt);
//    res.send(bcryptpass);

// //4insert query
// 1.Store user data
const user1=new User();
user1.name=name;
user1.email=email;
user1.password=bcryptpass;
await userRepo.save(user1)
// const newUser=await pool.query("insert into register (name,email,password)values($1,$2,$3) returning *",[name,email,bcryptpass])
// //5.create Token
let userid=user1.id;
let token=jwtGenerator({id:userid});
 res.json({token})
   
} catch (error) {
        console.error(error);
        res.json("error .....")
}
})
router.post("/login",validation,async(req,res)=>{
    try {
//1. destructure        
const {email,password}=req.body,emailInfo={
    from:'"Siva Raman"<sivabhuvi9344@gmail.com>',
    to:`${email}`,
    subject:"Login ",
    html:"successfully Login...!"
}
console.log("login");
mailgun().messages().send(emailInfo,(err,body)=>{
    if(err)
        {
            console.log(err);
            // res.status(500).json({
            //     message:"something went wrong in sending email  "
            // })
        }
        else{
            //  res.json({message:"Email send successfully..."})
        }
})
//2. chech if the user already exist or not
let userRepo=Appdata.getRepository(User);
let existingUser = await userRepo.findOne({ where: { email:email } });
if( !existingUser)
    {
    
    return res.send("password or email invalid")
}
//3.check the coming password and DB password same or not
const validpass=bcrypt.compare(password,existingUser.password)
if (!validpass)
{
    return res.send("password in valid")
}
//4.give them jwt Token
let userid=existingUser.id;
let token=jwtGenerator({id:userid});

res.send({token})
} catch (error) {
        console.error(error);
    }
})
router.get("/verify",authorization,(req,res)=>{
    try {
        res.json(true)
    } catch (error) {
        console.error(error);
    }
})
export default router;