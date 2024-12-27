const {Router}=require("express")
const rh=require("./requesthandler.js")
const multer=require("multer")
const storage = multer.diskStorage({
    destination:"./uploads",
    filename: function (req, file, cb) {
        console.log(file);
        
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      cb(null,uniqueSuffix + '-' + file.originalname)
    }
  })
  const upload = multer({ storage })


const router=Router();
router.route("/adduser").post(upload.array('file',15),rh.addUser)

module.exports=router;