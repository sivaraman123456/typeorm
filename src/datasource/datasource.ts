import { DataSource } from "typeorm";
import { User } from "../entities/User.entity";
import { Profile } from "../entities/profile.entity"; 
const Appdata=new DataSource({
    type:"postgres",
    host:"localhost",
    port:5432,
    username:"postgres",
    password:"root",
    database:"test",
    logging:true,
    synchronize:true,
    entities:[
        User,
        Profile
    ]
})
export default Appdata;
