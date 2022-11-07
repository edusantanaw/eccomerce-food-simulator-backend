const multer = require("multer");

const storage = multer.diskStorage(
  {
    destination: (req, file, cb) => {
    const type = req.url.split('/')[1]
    if(type === 'user') cb(null, 'public/users')
    else if(type === 'product'){
     cb(null, 'public/products')
    }
    else cb(null, 'public/restaurant')
  }
  ,
  filename: (req, file, cb) => {
    cb(null, file.fieldname + "-" + Date.now() + ".jpg" || ".png" || ".wepg");
  },
}
);


const upload = multer({storage: storage}).array('image')

const uploadImages = (req, res, next) => {
    upload(req, res, (err)=>{
        if(err) console.log(err)
        next(undefined, true)
    })
}

module.exports= uploadImages