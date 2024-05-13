import express,{Request,Response} from "express";
import Appdata from "./datasource/datasource";
import { User } from "./entities/User.entity";
import { Profile } from "./entities/profile.entity";
import jwtAuth from "./routes/user.routes"
import {swagger_api} from './swagger'
import swaggerui from "swagger-ui-express"
import cors from "cors"
const PORT=5000
const app=express();
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended:true}))//--destructure req.body
Appdata.initialize().then(()=>{
console.log("Database successfully connected..!");
}).catch((err)=>{
console.error("Database connection error");
})

//swager
app.use("/api-docs",swaggerui.serve,swaggerui.setup(swagger_api))

app.get("/",async(req:Request,res:Response)=>{
let userRepo=Appdata.getRepository(User);
await Appdata.dropDatabase();

})

app.use("/auth",jwtAuth)

app.listen(PORT,()=>{
console.log("Server running successfully on:",PORT);
})