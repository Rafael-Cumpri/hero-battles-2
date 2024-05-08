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

async function getHeroByParam(req, res) {
    const { param } = req.params;
    try {
        if (isNaN(param)) {
            const result = await pool.query('SELECT * FROM herois WHERE nome Like $1', [`%${param}%`]);
            res.json({
                total : result.rowCount,
                heroes : result.rows
            });
        } else {
            const result = await pool.query('SELECT * FROM herois WHERE id = $1', [param]);
            res.json({
                total : result.rowCount,
                heroes : result.rows
            });
        }
    } catch (error) {
        console.error('Error executing query', error);
        res.json({ error: error.message });
    }
}

async function creteHero(req, res) {
    const { nome, bencaodivina, forca, resistencia, velocidade, bencaooumaldicaoo, equipamento } = req.body;
    try {
        const result = await pool.query('INSERT INTO herois (nome, bencaodivina, forca, resistencia, velocidade, bencaooumaldicaoo, equipamento) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *', [nome, bencaodivina, forca, resistencia, velocidade, bencaooumaldicaoo, equipamento]);
        res.json(result.rows[0]);
    } catch (error) {
        console.error('Error executing query', error);
        res.json({ error: error.message });
    }
}