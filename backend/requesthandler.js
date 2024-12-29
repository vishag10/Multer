const { fileURLToPath } = require("url");
const userSchema = require("./multer.model.js");
const path = require("path");
const fs = require("fs")

async function addUser(req, res) {
    try {
        const file = req.file;
        console.log(req.body);
        

        const { username, email, phone } = req.body;
        const data = await userSchema.create({ username, email, phone, file });

        res.status(200).send({ data });
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
}

async function getUser(req, res) {
    try {
        const user = await userSchema.find()
        res.status(200).send(user);
    } catch (error) {
        console.log(error);
        
    }

}

async function loadImage(req, res){
    const {filename}=req.params
    return res.sendFile(path.resolve(`./uploads/${filename}`))
}

async function deleteUser(req, res) {
    const {_id} = req.params;
    const user=await userSchema.findOne({_id})
    console.log(user);
    if(!user){
        return res.status(500).send({message: "User not found"})
    }
    // ======================================================
    // used for es6(import statement)
    // const __filename=fileURLToPath(import.meta.url)
    // const __dirname=path.dirname(__filename)
    // ==========================================================
    console.log(__dirname);
    const fullpath=path.join(__dirname,"uploads",user.file.filename)
    await fs.unlink(fullpath,(error)=>{

    })
    await userSchema.deleteOne({_id}).then(()=>{
        res.status(200).send({msg: "User deleted successfully"})
    }).catch((error)=>{
        res.status(500).send({error})
    })
    
}


async function updateUser(req, res){
    const {_id}=req.params;
    const user=await userSchema.findOne({_id})
    console.log(user);
    res.status(200).send(user);
    

    
}

module.exports = {
    addUser,
    getUser,
    loadImage,
    deleteUser,
    updateUser
};