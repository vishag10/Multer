const userSchema = require("./multer.model.js");

async function addUser(req, res) {
    try {
        const file = req.files;
        console.log(req.body);
        

        const { username, email, phone } = req.body;
        const data = await userSchema.create({ username, email, phone, file });

        res.status(200).send({ data });
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
}

module.exports = {
    addUser
};