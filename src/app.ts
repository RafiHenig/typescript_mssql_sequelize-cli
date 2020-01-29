
import { Sequelize, Model, DataTypes, BuildOptions } from 'sequelize';
import { HasManyGetAssociationsMixin, HasManyAddAssociationMixin, HasManyHasAssociationMixin, Association, HasManyCountAssociationsMixin, HasManyCreateAssociationMixin } from 'sequelize';
import { connection } from './db/connection'

class User extends Model {
    public id!: number;
    public name!: string;
    public preferredName!: string | null;

    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;

    public getProjects!: HasManyGetAssociationsMixin<Project>; // Note the null assertions!
    public addProject!: HasManyAddAssociationMixin<Project, number>;
    public hasProject!: HasManyHasAssociationMixin<Project, number>;

    public countProjects!: HasManyCountAssociationsMixin;
    public createProject!: HasManyCreateAssociationMixin<Project>;
    public readonly projects?: Project[];

    public static associations: {
        projects: Association<User, Project>;
    };
}

class Project extends Model {
    public id!: number;
    public ownerId!: number;
    public name!: string;

    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

class Address extends Model {
    public userId!: number;
    public address!: string;

    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

Project.init({
    id: {
        type: DataTypes.INTEGER.UNSIGNED, // you can omit the `new` but this is discouraged
        autoIncrement: true,
        primaryKey: true,
    },
    ownerId: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
    },
    name: {
        type: new DataTypes.STRING(128),
        allowNull: false,
    }
}, {
    sequelize: connection,
    tableName: 'project',
});

User.init({
    id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
    },
    name: {
        type: new DataTypes.STRING(128),
        allowNull: false,
    },
    preferredName: {
        type: new DataTypes.STRING(128),
        allowNull: true
    }
}, {
    tableName: 'user',
    sequelize: connection, // this bit is important
});

Address.init({
    // userId: {
    //     type: DataTypes.INTEGER.UNSIGNED,
    // },
    address: {
        type: new DataTypes.STRING(128),
        allowNull: false,
    }
}, {
    tableName: 'address',
    sequelize: connection, // this bit is important
});

// Here we associate which actually populates out pre-declared `association` static and other methods.
User.hasMany(Project, {
    sourceKey: 'id',
    foreignKey: 'ownerId',
    as: 'projects' // this determines the name in `associations`!
});

Address.belongsTo(User, { targetKey: 'id' });
User.hasOne(Address, { sourceKey: 'id' });

async function stuff() {
    try {
        await connection.sync();

        const newUser = await User.create({
            name: 'Johnny',
            preferredName: 'John',
        });
        console.log(newUser.id, newUser.name, newUser.preferredName);

        const project = await newUser.createProject({
            name: 'first!',
        });

        console.log(newUser.hasProject)

        const ourUser = await User.findByPk(1, {
            include: [User.associations.projects],
            rejectOnEmpty: true, // Specifying true here removes `null` from the return type!
        });
        console.log(ourUser.projects![0].name); // Note the `!` null assertion since TS can't know if we included
        // the model or not
    } catch (error) {
        console.log(error)
    }

}
stuff()


// import { Sequelize, STRING, Model, } from 'sequelize'
// import { sequelize } from './db/connection'
// import { User } from './db/models/user.model';

// (async () => {

//     try {
//         await sequelize.authenticate();
//         console.log('Connection has been established successfully.');
//     } catch (error) {
//         console.error('Unable to connect to the database:', error);
//     }

//     await User.create({
//       firstName: 'John',
//       lastName: 'Hancock'
//     });


//     // try {
//     //     await sequelize.close()
//     //     console.log('Connection has been closed successfully.');
//     // } catch (error) {
//     //     console.error('Unable to close to the connection:', error);
//     // }

// })()


// // User.sync({ force: true }).then(() => {
// //     // Now the `users` table in the database corresponds to the model definition
// //     // return User.create({
// //     //   firstName: 'John',
// //     //   lastName: 'Hancock'
// //     // });
// //   });