import {
    Sequelize,
    DataTypes
} from 'sequelize';

export interface UserAttributes {
    firstName?: string;
    lastName?: string;
    email?: string

}

export interface UserInstance {
    id: number;
    createdAt: Date;
    updatedAt: Date;

    firstName: string;
    lastName: string;
    email: string

}

export default (sequelize: Sequelize, DataTypes: any) => {
    var User = sequelize.define('User', {
        firstName: DataTypes.STRING,
        lastName: DataTypes.STRING,
        email: DataTypes.STRIN
    });

    // User.associate = function(models) {
    //     // associations can be defined here
    // };

    return User;
};

