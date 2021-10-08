module.exports = {
    accountUser: (req, res) => {
        try {
            const {login} = req.body;

            res.json(`WELCOME ${login}`);
        } catch (e) {
            res.json(e.message);
        }
    }
};
