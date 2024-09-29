import { Column, DataType, Model, Table } from 'sequelize-typescript';

@Table({ timestamps: true, tableName: 'galery' })
export class Galery extends Model {
    @Column({ allowNull: false, type: DataType.STRING })
    city_name: string;

    @Column({ type: DataType.STRING, allowNull: true })
    image: string;
}
