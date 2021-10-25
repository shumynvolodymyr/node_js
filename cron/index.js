const cron = require('node-cron');

const removeOldTokens = require('./old_token_remove.job');

module.exports = () => {
    cron.schedule('0 0 * * *', async () => {
        await removeOldTokens();
    });
};
