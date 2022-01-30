const { utxos } = require('./db');

function getBalance(address) {
    const ourUTXOs = utxos.filter(x => x.owner === address && !x.spent);
    const sum = ourUTXOs.reduce((p, c) => p + c.amount, 0);
    return sum;
}

module.exports = {
    getBalance
};