module.exports = (sequelize, Sequelize) => {
    const User_achievement = sequelize.define("user_achievements", {
        user_achievement_id: {
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
        achievement_type: {
            type: Sequelize.ENUM,
            values: ['challenge', 'badge'],
            allowNull: false
        },
        badge_challenge_id: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        total_achieved_by_user: {
            type: Sequelize.INTEGER,
            defaultValue: 0,
            allowNull: false
        },
        is_complete: {
            type: Sequelize.BOOLEAN,
            defaultValue: false,
            allowNull: false
        },
        is_recursive: {
            type: Sequelize.BOOLEAN,
            defaultValue: false,
            allowNull: false
        },
        start_time: {
            type: 'DATETIME',
            allowNull: false
        },
        end_time: {
            type: 'DATETIME',
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
    }, {
        timestamps: false,
    });

    return User_achievement;
};