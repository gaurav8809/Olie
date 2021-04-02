module.exports = (sequelize, Sequelize) => {
    const Setting = sequelize.define("settings", {
        setting_id: {
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
        created_time: {
            type: 'TIMESTAMP',
            defaultValue: new Date(),
            allowNull: false
        }
    }, {
        timestamps: false,
    });

    return Setting;
};