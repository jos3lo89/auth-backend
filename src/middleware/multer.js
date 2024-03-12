import multer from "multer";
import path from "path";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/uploads");
  },
  filename: function (req, file, cb) {
    cb(
      null,
      `${Date.now()}-${Math.floor(
        Math.random() * (9999 - 1000 + 1) + 1000
      )}-${Math.floor(Math.random() * (99 - 10 + 1) + 10)}${path.extname(
        file.originalname
      )}`
    );
  },
});

const upload = multer({ storage: storage });

const fotoUser = upload.single("foto");

export default fotoUser;
