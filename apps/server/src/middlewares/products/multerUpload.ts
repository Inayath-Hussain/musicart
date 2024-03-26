import { getStorage } from "firebase-admin/storage"
import multer from "multer"

import { firebaseApp } from "../../config/firebase"
import { FirebaseMulterStorage } from "../../config/multerStorageEngine"

// const storage = diskStorage({
//     destination: "./product-image-temp/",
//     filename(req, file, callback) {
//         console.log(path.extname(file.originalname))
//         callback(null, file.originalname + Date.now().toString() + "." + file.mimetype)
//     },
// })


const storage = new FirebaseMulterStorage({ storage: getStorage(firebaseApp) })


const whitelist = [
    'image/png',
    'image/jpeg',
    'image/jpg',
    'image/webp'
]


export const multerUpload = multer({
    storage,
    fileFilter(req, file, callback) {
        if (whitelist.includes(file.mimetype)) callback(null, true)
        else callback({ message: "file should be either png, jpeg, jpg or webp", name: "Invalid file type" })
    },
})