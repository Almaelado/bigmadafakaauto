const pool = require('../config/db');
const Auto = {};

Auto.osszes = async () => {
    try {
        const [rows] = await pool.execute('SELECT * FROM osszes_auto');
        return rows;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

module.exports = Auto;
