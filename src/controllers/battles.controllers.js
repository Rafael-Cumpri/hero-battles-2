const pool = require('../config/dbconfig')

async function postBattle(req, res) {
    const { id1, id2 } = req.params;
    try {
        if (id1 === id2) {
            res.json({ error: 'Cannot fight against yourself' });
            return;
        }
        const result1 = await pool.query('SELECT * FROM herois WHERE id = $1', [id1]);
        const result2 = await pool.query('SELECT * FROM herois WHERE id = $1', [id2]);
        const hero1 = result1.rows[0];
        const hero2 = result2.rows[0];
        let total1 = hero1.forca + hero1.resistencia + hero1.velocidade;
        let total2 = hero2.forca + hero2.resistencia + hero2.velocidade;
        const statusWinner = total1 > total2 ? hero1 : hero2;
        const advantageByBencao = giveadvantage(hero1, hero2);

        if(advantageByBencao == null) {
            const result = await pool.query('INSERT INTO batalhas (heroi_id1, heroi_id2, vencedor_id) VALUES ($1, $2, $3) RETURNING *', [id1, id2, statusWinner.id]);
            res.json({
                winnerFromBattle : statusWinner,
            });
        } else if (advantageByBencao.id == hero1.id) {
            total1 = total1 + 5;
            const statusWinner = total1 > total2 ? hero1 : hero2;
            const result = await pool.query('INSERT INTO batalhas (heroi_id1, heroi_id2, vencedor_id) VALUES ($1, $2, $3) RETURNING *', [id1, id2, statusWinner.id]);
            res.json({
                winnerFromBattle : statusWinner,
            });
        } else {
            total2 = total2 + 5;
            const statusWinner = total1 > total2 ? hero1 : hero2;
            const result = await pool.query('INSERT INTO batalhas (heroi_id1, heroi_id2, vencedor_id) VALUES ($1, $2, $3) RETURNING *', [id1, id2, statusWinner.id]);
            res.json({
                winnerFromBattle : statusWinner,
            });
        }
    } catch (error) {
        console.error('Error executing query', error);
        res.json({ error: error.message });
    }   
}

async function getAllBattle(req, res) {
    try {
        const result = await pool.query('SELECT batalhas.id, batalhas.heroi_id1, batalhas.heroi_id2, batalhas.vencedor_id, herois.nome, herois.bencaodivina, herois.forca, herois.resistencia, herois.velocidade, herois.bencaooumaldicaoo, herois.equipamento FROM batalhas JOIN herois ON batalhas.vencedor_id = herois.id');
        res.json({
            total : result.rowCount,
            battles : result.rows.map(row => ({
                id: row.id,
                heroi_id1: row.heroi_id1,
                heroi_id2: row.heroi_id2,
                vencedor_id: row.vencedor_id,
                winnerDetails: {
                    nome: row.nome,
                    bencaodivina: row.bencaodivina,
                    forca: row.forca,
                    resistencia: row.resistencia,
                    velocidade: row.velocidade,
                    bencaooumaldicaoo: row.bencaooumaldicaoo,
                    equipamento: row.equipamento
                }
            }))
        });
    } catch (error) {
        console.error('Error executing query', error);
        res.json({ error: error.message });
    }
}

async function getAllBattleByHeroName(req, res) {
    const { heroname } = req.params;
    try {
        const result = await pool.query('SELECT batalhas.id, batalhas.heroi_id1, batalhas.heroi_id2, batalhas.vencedor_id, herois.nome, herois.bencaodivina, herois.forca, herois.resistencia, herois.velocidade, herois.bencaooumaldicaoo, herois.equipamento FROM batalhas JOIN herois ON batalhas.vencedor_id = herois.id WHERE herois.nome Like $1', [`%${heroname}%`]);
        res.json({
            total : result.rowCount,
            battles : result.rows.map(row => ({
                id: row.id,
                heroi_id1: row.heroi_id1,
                heroi_id2: row.heroi_id2,
                vencedor_id: row.vencedor_id,
                winnerDetails: {
                    nome: row.nome,
                    bencaodivina: row.bencaodivina,
                    forca: row.forca,
                    resistencia: row.resistencia,
                    velocidade: row.velocidade,
                    bencaooumaldicaoo: row.bencaooumaldicaoo,
                    equipamento: row.equipamento
                }
            })
        )});
    } catch (error) {
        console.error('Error executing query', error);
        res.json({ error: error.message });
    }
}