import { Column, DataType, Model, Table } from 'sequelize-typescript';

@Table({ timestamps: true, tableName: 'cities' })
export class City extends Model {
    @Column({ allowNull: false, type: DataType.STRING ,unique:true})
    name: string;

    @Column({ type: DataType.TEXT, allowNull: true })
    description: string;

    @Column({ type: DataType.TEXT, allowNull: false })
    region: string;

    @Column({ type: DataType.TEXT, allowNull: true })
    history: string;

    @Column({ type: DataType.TEXT, allowNull: true })
    climate: string;

    @Column({ type: DataType.STRING, allowNull: true })
    city_image: string;

    @Column({ type: DataType.STRING, allowNull: true }) 
    city_video: string;
}
