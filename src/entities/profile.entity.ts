import { Entity, PrimaryGeneratedColumn, Column } from "typeorm"

@Entity({name:"Profile"})
export class Profile {
    @PrimaryGeneratedColumn()
    id: number

    @Column({nullable:false})
    gender: string

    @Column({nullable:true})
    skills: string

}