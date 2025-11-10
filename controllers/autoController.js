const Auto = require('../models/autoModell');

const autoController = {
    async osszes(req, res) {
        try {
            const autos = await Auto.osszes();
            res.status(200).json(autos);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
};
module.exports = autoController;