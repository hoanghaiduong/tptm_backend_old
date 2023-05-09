import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { User } from '../../users/entities/User.entity';


@Entity()
export class Role {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ nullable: false })
    name: string;

    @OneToMany(() => User, user => user.role, { onDelete: "SET NULL", onUpdate: 'CASCADE' })
    users: User[];
}
