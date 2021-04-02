module.exports = (sequelize, Sequelize) => {
    const Permissions_setting = sequelize.define("permissions_settings", {
        permissions_setting_id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        user_id: {
            type: Sequelize.INTEGER,
            references: {
                model: "users",
                key: 'user_id'
            },
            allowNull: false
        },
        title: {
            type: Sequelize.STRING(100),
            allowNull: false
        },
        technical_name: {
            type: Sequelize.STRING(50),
            allowNull: false
        },
        is_enabled: {
            type: Sequelize.BOOLEAN,
            defaultValue: false,
            allowNull: false
        },
        created_time: {
            type: 'TIMESTAMP',
            defaultValue: new Date(),
            allowNull: false
        }
    }, {
        timestamps: false,
    });

    return Permissions_setting;
};