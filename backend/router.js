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
// router.route("/adduser").post(upload.array('file',15),rh.addUser)
router.route("/adduser").post(upload.single('file'),rh.addUser)
router.route("/getusers").get(rh.getUser)
router.route("/image/:filename").get(rh.loadImage)
router.route("/delete/:_id").delete(rh.deleteUser)
router.route("/update/:_id").put(rh.updateUser)

module.exports=router;