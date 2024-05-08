const poll = require('../config/dbconfig')

async function getAllHeros(req, res) {
    try {
        const result = await pool.query('SELECT * FROM herois');
        res.json({
            total : result.rowCount,
            heroes : result.rows
        });
    } catch (error) {
        console.error('Error executing query', error);
        res.json({ error: error.message });
    }
}