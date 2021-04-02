var jwt = require("jsonwebtoken");
const logging = require("./logging");
const secret = process.env.SECRET;

module.exports = {
    sign: function (data) {
        return jwt.sign(data, secret, { expiresIn: '2d' });
    },
    verify: async function (token) {
        try {
            var data = await jwt.verify(token, secret);
            return { data };
        } catch (error) {
            logging.error(`Error occurred while verifing token - ${error.message}`);
            return { error };
        }
    }
}