const { startMining, stopMining } = require('./mine');
const { getBalance } = require('./balance');
const { PORT } = require('../config');
const { utxos, blockchain } = require('./db');
const express = require('express');
const app = express();
const cors = require('cors');

// localhost can have cross origin errors
// depending on the browser you use!
app.use(cors());
app.use(express.json());

app.post('/', (req, res) => {
    const { method, params } = req.body;
    if (method === 'startMining') {
        startMining();
        res.send({ blockNumber: blockchain.blockHeight() });
        return;
    }

    if (method === 'stopMining') {
        stopMining();
        res.send({ blockNumber: blockchain.blockHeight() });
        return;
    }

    if (method === "getBalance") {
        const [address] = params;
        const balance = getBalance(address);
        res.send({ balance: balance.toString() });
    }
});

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}!`);
});
