const bcrypt = require("bcrypt");
const Op = require('sequelize').Op;
const { isEmail } = require("validator");
const { User } = require("../database/index");
const { logging } = require("../helper/logging");
const jwtHelper = require("../helper/jwtHelper");
const default_value = require("../helper/default_value");

exports.register = async (req, res) => {
    try {
        const posted_data = req.body;

        if (!posted_data.email) return res.status(400).send({ error: true, message: "Email field is required!" });
        if (!isEmail(posted_data.email)) return res.status(400).send({ error: true, message: "Email address in not valid!" });
        if (!posted_data.password) return res.status(400).send({ error: true, message: "Password field is required!" });
        if (!posted_data.confirm_password) return res.status(400).send({ error: true, message: "Confirm password field is required!" });
        if (posted_data.password !== posted_data.confirm_password) return res.status(400).send({ error: true, message: "Your password and confirmation password dose not match!" });

        const is_registerd = await User.findOne({ where: { email: posted_data.email } });
        logging.log(is_registerd);
        if (is_registerd !== null) return res.status(400).send({ error: true, message: "Email is already registerd!" });

        const password = await bcrypt.hash(posted_data.password, 8)
        const user_data = {
            email: posted_data.email,
            password,
            first_name: '',
            last_name: '',
            login_type: 'email',
            remaining_time: default_value.app_usage_time
        };
        const user = await User.create(user_data);

        const token = jwtHelper.sign({ _id: user.user_id, email: user.email, login_type: user.login_type });
        return res.header({ 'auth_token': token }).json(user.toJSON());

    } catch (error) {
        logging.error(`Error occurred! - ${error.message}`);
        logging.error(`Error stack - ${error.stack}`);
        res.status(500).send({ error: true, message: `Error occured while registering user.` });
    }
};

exports.login = async (req, res) => {
    try {
        const posted_data = req.body;
        if (!posted_data.email) return res.status(400).send({ error: true, message: "Email field is required!" });
        if (!isEmail(posted_data.email)) return res.status(400).send({ error: true, message: "Email address in not valid!" });
        if (!posted_data.password) return res.status(400).send({ error: true, message: "Password field is required!" });
        
        const user = await User.findOne({ where: { email: posted_data.email } });
        if (!user) return res.status(404).send({ error: true, message: "Email or Password are incorrect." });
        if (!bcrypt.compareSync(posted_data.password, user.password)) return res.status(404).send({ error: true, message: "Email or Password are incorrect." });

        const token = jwtHelper.sign({ _id: user.user_id, email: user.email, login_type: user.login_type });
        return res.header({ 'auth_token': token }).json(user.toJSON());
    } catch (error) {
        logging.error(`Error occurred! - ${error.message}`);
        logging.error(`Error stack - ${error.stack}`);
        res.status(500).send({ error: true, message: `Error occured while login.` });
    }
};

exports.external_login = async (req, res) => {
    try {
        const posted_data = req.body;
        if (!posted_data.email) return res.status(400).send({ error: true, message: "Email field is required!" });
        if (!isEmail(posted_data.email)) return res.status(400).send({ error: true, message: "Email address in not valid!" });
        if (!posted_data.provider_id) return res.status(400).send({ error: true, message: "Provider id field is required!" });
        if (!posted_data.login_type) return res.status(400).send({ error: true, message: "Login type field is required!" });
        
        let user = await User.findOne({
            where: {
                [Op.or]: {
                    email: posted_data.email,
                    provider_id: posted_data.provider_id
                }
            }
        });
        if (user && user.login_type === 'email') return res.status(404).send({ error: true, message: "User already registered using email and password." });
        if (user && user.email !== posted_data.email) return res.status(404).send({ error: true, message: "Email not match with Provider id." });
        if (user && user.provider_id !== posted_data.provider_id) return res.status(404).send({ error: true, message: "Provider id not match with Email." });
        if (user && user.login_type !== posted_data.login_type) return res.status(404).send({ error: true, message: "Login type not match." });

        if (!user) {
            const user_data = {
                email: posted_data.email,
                provider_id: posted_data.provider_id,
                login_type: posted_data.login_type,
                password: '',
                first_name: '',
                last_name: '',
                remaining_time: default_value.app_usage_time
            };
            user = await User.create(user_data);
        }

        const token = jwtHelper.sign({ _id: user.user_id, email: user.email, login_type: user.login_type });
        return res.header({ 'auth_token': token }).json(user.toJSON());
    } catch (error) {
        logging.error(`Error occurred! - ${error.message}`);
        logging.error(`Error stack - ${error.stack}`);
        res.status(500).send({ error: true, message: `Error occured while login.` });
    }
};
