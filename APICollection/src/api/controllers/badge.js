const { Badge } = require("../database/index");
const { logging } = require("../helper/logging");

exports.create = async (req, res) => {
    try {
        if (!req.body.title) {
            res.status(400).send({
                message: "title required!"
            });
            return;
        }
    
        const badge = {
            title: req.body.title,
            description: req.body.description
        };
    
        const data = await Badge.create(badge);
        res.send(data);
    } catch (error) {
        logging.error(`Error occurred! - ${error.message}`);
        logging.error(`Error stack - ${error.stack}`);
        res.status(500).send({ message: "Some error occurred while creating the badge." });
    }
};

exports.findAll = async (req, res) => {
    try {
        const data = await Badge.findAll();
        res.send(data);
    } catch (error) {
        logging.error(`Error occurred! - ${error.message}`);
        logging.error(`Error stack - ${error.stack}`);
        res.status(500).send({ message: "Some error occurred while retrieving the badge." });
    }
};