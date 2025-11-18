const pool = require('../config/db.js');
const Auto = {};

Auto.osszes = async () => {
    try {
        const [rows] = await pool.execute('SELECT * FROM osszes_auto');
        return rows;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

Auto.egy = async (id) => {
    try {
        const [rows] = await pool.execute('SELECT * FROM osszes_auto WHERE id = ?', [id]);
        return rows[0];
    } catch (error) {
        console.error(error);
        throw error;
    }
};

Auto.hoozzaad = async (autoData) => {
    try {
        const { marka_id, model, valto_id, kiadasiev, uzemanyag_id, motormeret, km, ar, ajtoszam, szemelyek, szin_id, irat, leiras } = autoData;
        const [result] = await pool.execute(
            'INSERT INTO osszes_auto (marka_id, model, valto_id, kiadasiev, uzemanyag_id, motormeret, km, ar, ajtoszam, szemelyek, szin_id, irat, leiras) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
            [marka_id, model, valto_id, kiadasiev, uzemanyag_id, motormeret, km, ar, ajtoszam, szemelyek, szin_id, irat, leiras]
        );
        return { id: result.insertId, ...autoData };
    } catch (error) {
        console.error(error);
        throw error;
    }
};

Auto.modosit = async (id, autoData) => {
    try {
        const { marka_id, model, valto_id, kiadasiev, uzemanyag_id, motormeret, km, ar, ajtoszam, szemelyek, szin_id, irat, leiras } = autoData;
        await pool.execute(
            'UPDATE osszes_auto SET marka_id = ?, model = ?, valto_id = ?, kiadasiev = ?, uzemanyag_id = ?, motormeret = ?, km = ?, ar = ?, ajtoszam = ?, szemelyek = ?, szin_id = ?, irat = ?, leiras = ? WHERE id = ?',
            [marka_id, model, valto_id, kiadasiev, uzemanyag_id, motormeret, km, ar, ajtoszam, szemelyek, szin_id, irat, leiras, id]
        );
        return { id, ...autoData };
    } catch (error) {
        console.error(error);
        throw error;
    }
};
Auto.torol = async (id) => {
    try {
        await pool.execute('DELETE FROM osszes_auto WHERE id = ?', [id]);
    } catch (error) {
        console.error(error);
        throw error;
    }
};
Auto.getMarka = async () => {
    try {
        const [rows] = await pool.execute('SELECT * FROM marka');
        return rows;
    } catch (error) {
        console.error(error);
        throw error;
    }
};
Auto.getSzin = async () => {
    try {
        const [rows] = await pool.execute('SELECT * FROM szin');
        return rows;
    } catch (error) {
        console.error(error);
        throw error;
    }
};
Auto.getUzemanyag = async () => {
    try {
        const [rows] = await pool.execute('SELECT * FROM uzemanyag');
        return rows;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

module.exports = Auto;
