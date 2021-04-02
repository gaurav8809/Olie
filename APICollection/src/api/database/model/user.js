module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define("users", {
        user_id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        first_name: {
            type: Sequelize.STRING(20),
            allowNull: false
        },
        last_name: {
            type: Sequelize.STRING(20),
            allowNull: false
        },
        email: {
            type: Sequelize.STRING(200),
            unique: true,
            allowNull: false
        },
        password: {
            type: Sequelize.STRING,
            allowNull: false
        },
        phone : {
            type: Sequelize.STRING(20),
        },
        profile_image: {
            type: Sequelize.TEXT
        },
        home_address: {
            type: Sequelize.STRING
        },
        work_address: {
            type: Sequelize.STRING
        },
        provider_id: {
            type: Sequelize.STRING
        },
        user_type: {
            type: Sequelize.ENUM,
            values: ['user', 'admin'],
            defaultValue: 'user',
            allowNull: false
        },
        login_type: {
            type: Sequelize.ENUM,
            values: ['email', 'fb', 'insta', 'google', 'twitter', 'mobile'],
            allowNull: false
        },
        remaining_time: { // time in the form of seconds
            type: Sequelize.INTEGER,
            allowNull: false
        },
        total_spend_time: { // time in the form of seconds
            type: Sequelize.INTEGER,
            defaultValue: 0,
            allowNull: false
        },
        created_by: {
            type: Sequelize.INTEGER,
            references: {
                model: "users",
                key: 'user_id'
            }
        },
        created_time: {
            type: 'TIMESTAMP',
            defaultValue: new Date(),
            allowNull: false
        },
        status: {
            type: Sequelize.BOOLEAN,
            defaultValue: true,
            allowNull: false
        }
    }, {
        timestamps: false,
    });

    return User;
};