module.exports = (sequelize, Sequelize) => {
    const Group_user = sequelize.define("group_users", {
        group_user_id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        group_id: {
            type: Sequelize.INTEGER,
            references: {
                model: "groups",
                key: 'group_id'
            },
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
        is_admin: {
            type: Sequelize.BOOLEAN,
            defaultValue: false,
            allowNull: false
        },
        created_by: {
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
        },
        status: {
            type: Sequelize.BOOLEAN,
            defaultValue: true,
            allowNull: false
        }
    },
    {
        timestamps: false
    });

    return Group_user;
};