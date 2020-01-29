import {
    Sequelize,
    DataTypes
} from 'sequelize';

export interface NeibghorAttributes {
    firstName ? : string;
    lastName ? : string;
    email ? : string;

}

export interface NeibghorInstance {
    id: number;
    createdAt: Date;
    updatedAt: Date;

    firstName: string;
    lastName: string;
    email: string;

}

// export = (sequelize: Sequelize, DataTypes: DataTypes) => {
//     var neibghor = sequelize.define('neibghor', {
//         firstName: DataTypes.STRING,
//         lastName: DataTypes.STRING,
//         email: DataTypes.STRING
//     });

//     neibghor.associate = function(models) {
//         // associations can be defined here
//     };

//     return neibghor;
// };
