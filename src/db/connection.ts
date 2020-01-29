
import { Sequelize } from 'sequelize'

export const connection = new Sequelize(
    "c",
    "sequelize",
    "israel18900",
    {
        host: "localhost",
        port: 1433, // <----------------The port number you copied
        dialect: "mssql",
        
        // operatorsAliases: false,
        pool: {
            max: 5,
            min: 0,
            acquire: 30000,
            idle: 10000
        }
    });
