import mailgun from "../mailguns"
import Appdata from "../datasource/datasource";
import { User } from "../entities/User.entity";
import bcrypt from "bcrypt"
import {jwtGenerator} from "../utils/jwtgenerator" 
import { Request,Response} from "express";


const login=async(req:Request,res:Response)=>{
    try {
     
const {email,password}=req.body
// ,emailInfo={
//     from:'"Siva Raman"<sivabhuvi9344@gmail.com>',
//     to:`${email}`,
//     subject:"Login ",
//     html:"successfully Login...!"
// }
console.log("login");
// mailgun().messages().send(emailInfo)
  
let userRepo=Appdata.getRepository(User);
let existingUser = await userRepo.findOne({ where: { email:email } });
if( !existingUser)
    {
    
    return res.send("password or email invalid")
}

const validpass=bcrypt.compare(password,existingUser.password)
if (!validpass)
{
    return res.send("password in valid")
}

let userid=existingUser.id;
let token=jwtGenerator({id:userid});

res.send({token:token})
} 

catch (error) {
        console.error(error);
    }
}


export default login;