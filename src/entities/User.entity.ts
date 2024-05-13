import { Entity, PrimaryGeneratedColumn, Column,OneToOne ,JoinColumn} from "typeorm"
// import { Profile } from "./profile.entity"
@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number
    @Column()
    name: string
    @Column()
    email: string
    @Column()
    password: string
    // @OneToOne(()=>Profile,{cascade:true,eager:true})
    // @JoinColumn()
    // profile:Profile;
}
