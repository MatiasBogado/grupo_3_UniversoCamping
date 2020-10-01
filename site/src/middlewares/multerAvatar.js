const path = require('path');
const multer = require('multer');

let storage = multer.diskStorage({
    destination:(req,file,callback)=>{
        callback(null,'../public/img/avatares')
    },
    filename:(req,file,callback)=>{
        callback(null,file.fieldname + Date.now() + path.extname(file.originalname))
    }
});

let upload = multer({storage:storage});

module.exports = upload;