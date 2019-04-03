const app = require('./config/server')

const rotaHome = require('./controllers/routes/home')(app);
const rotaGetAcces = require('./controllers/routes/get_access_token')(app);
const rotaAuth = require('./controllers/routes/auth')(app);
const rotaTransactions = require('./controllers/routes/transactions')(app);
const rotaBalanco = require('./controllers/routes/get_balance')(app)
const PORT = 5000;
const HOST = '0.0.0.0';

app.listen(PORT, HOST);
console.log(`Rodando em  http://${HOST}:${PORT}`);