import * as multer from "multer";
import * as path from "path";

export const multerConfig = {
    storage: multer.diskStorage({
        destination(req,file, callback) {
            return callback(null, './uploads')
        },
        filename: function (req, file, cb) {
            const extname = path.extname(file.originalname);
            const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9)
            cb(null, file.fieldname + '-' + uniqueSuffix + extname)
        }
    })
}