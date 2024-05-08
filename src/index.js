require('dotenv').config();
const express = require('express');
const heroesRoute = require('./routes/heroes.routes');
const battleRoutes = require('./routes/battles.routes')

const app = express();
const port = process.env.PORT || 3000;  // Default to 3000 if PORT is not set

app.use(express.json());

app.use('/', heroesRoute);
app.use('/', battleRoutes);

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}🧙🪄✨`);
});