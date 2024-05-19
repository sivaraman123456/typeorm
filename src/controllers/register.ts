import {config} from "dotenv";
import mailgun from "../mailguns"
import Appdata from "../datasource/datasource";
import { User } from "../entities/User.entity";
import bcrypt from "bcrypt"
import {jwtGenerator} from "../utils/jwtgenerator" 
import { Request,Response} from "express";

config();

Appdata.initialize().then(()=>{
    console.log("Database successfully connected..!");
    }).catch((err)=>{
    console.error("Database connection error");
    })


 const register=async(req:Request,res:Response)=>{
    try {
            
const {name,email,password}=req.body;
// , emailInfo={
//     from:'"Siva Raman"<sivabhuvi9344@gmail.com>',
//     to:`${email}`,
//     subject:`${name}`,
//     html:"successfully register...!"
// }
let userRepo=Appdata.getRepository(User);

let existingUser = await userRepo.findOne({ where: { email:email } });
if( existingUser)
    {
    //    return  res.json("user already exists..")
    }

// mailgun().messages().send(emailInfo)

    const saltRound=10;
   const salt= await bcrypt.genSalt(saltRound)
   const bcryptpass= await bcrypt.hash(password,salt);

const user1=new User();
user1.name=name;
user1.email=email;
user1.password=bcryptpass;
await userRepo.save(user1)

let userid=user1.id;
let token=jwtGenerator({id:userid});
 res.json({token:token})
   
} catch (error) {
        console.error(error);
        res.json("error .....")
}
}
export default register;