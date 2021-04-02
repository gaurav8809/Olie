module.exports = (sequelize, Sequelize) => {
    const Repair_shop = sequelize.define("repair_shops", {
        repair_shop_id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        title: {
            type: Sequelize.STRING(100),
            allowNull: false
        },
        description: {
            type: Sequelize.TEXT,
            allowNull: false
        },
        work_hours: {
            type: Sequelize.JSON,
            defaultValue: {
                "0": { "is_open": false, "start": "", "end": "" },
                "1": { "is_open": false, "start": "", "end": "" },
                "2": { "is_open": false, "start": "", "end": "" },
                "3": { "is_open": false, "start": "", "end": "" },
                "4": { "is_open": false, "start": "", "end": "" },
                "5": { "is_open": false, "start": "", "end": "" },
                "6": { "is_open": false, "start": "", "end": "" }
            },
            allowNull: false
        },
        website: {
            type: Sequelize.TEXT
        },
        contact_no: {
            type: Sequelize.STRING(20),
            allowNull: false
        },
        location_id: {
            type: Sequelize.INTEGER,
            references: {
                model: "locations",
                key: 'location_id'
            },
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

    return Repair_shop;
};
