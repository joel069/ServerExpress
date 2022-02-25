const multer = require("multer");
const fs = require("fs");

function upload() {
  const cedula = "0106588437";
  let myfile;
  let youpath;

  if (fs.existsSync(cedula)) {
    
    youpath = __dirname + "/" + cedula + "/";
    console.log("RUTA" + youpath);
    console.log("RUTA" + myfile);
    const storage = multer.diskStorage({
      destination: youpath,
      filename: function (_req, file, cb) {
        const extension = file.originalname.slice(
          file.originalname.lastIndexOf(".")
        );
        cb(null, Date.now() + extension);
      },
    });
   const upload = multer({ storage: storage }).single("file");

   return upload;
   
  }
}

module.exports = upload;
