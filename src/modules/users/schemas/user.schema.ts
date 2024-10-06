import { Column, DataType, Model, Table } from 'sequelize-typescript';

export enum UserRoles {
    user = "USER",
    admin = "ADMIN"
}

@Table({ timestamps: true, tableName: 'users' })
export class User extends Model {
    @Column({ allowNull: false, type: DataType.STRING })
    name: string;

    @Column({ type: DataType.INTEGER, allowNull: false })
    age: number;

    @Column({ type: DataType.TEXT, allowNull: false })
    country: string;

    @Column({ type: DataType.TEXT, allowNull: false })
    email: string;

    @Column({ type: DataType.TEXT, allowNull: false })
    phone: string;

    @Column({ type: DataType.ENUM,values: [UserRoles.user, UserRoles.admin], allowNull:false,defaultValue:UserRoles})
    role: UserRoles;
    
    @Column({ type: DataType.STRING, allowNull: false })
    image: string;

}
