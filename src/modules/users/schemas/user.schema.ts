import { Column, DataType, Model, Table } from 'sequelize-typescript';

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

    @Column({ type: DataType.STRING, allowNull:false  })
    role: string;
    
    @Column({ type: DataType.STRING, allowNull: false, defaultValue:"user" })
    image: string;

}
