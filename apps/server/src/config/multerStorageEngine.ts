import { Request } from "express";
import { ParamsDictionary } from "express-serve-static-core";
import { getDownloadURL, Storage } from "firebase-admin/storage";
import { StorageEngine } from "multer";
import path from "path";
import { ParsedQs } from "qs";


interface Options {
    storage: Storage
}

export class FirebaseMulterStorage implements StorageEngine {

    private storage: Storage;

    constructor(uploaderOptions: Options) {
        this.storage = uploaderOptions.storage
    }


    _handleFile(req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>, file: Express.Multer.File, callback: (error?: any, info?: Partial<Express.Multer.File> | undefined) => void): void {

        // checks if storage is provided when object was created
        if (!this.storage) callback("Firebase storage is required in multer's custom storage engine")


        const fileExtension = path.extname(file.originalname)   // extracting file extension
        // creating a unique file name, this name is used to name the current file in firebase storage
        const fileName = `${file.originalname}_${Date.now().toString()}${fileExtension}`


        const bucket = this.storage.bucket();

        const bucketFile = bucket.file(fileName)    // create's a file object, used to upload to firebase storage
        const writeableFileStream = bucketFile.createWriteStream()  // writeable stream to upload in firebase storage

        const readableFileStream = file.stream // readable stream to read the file present in request form data

        readableFileStream.pipe(writeableFileStream)
            .on("error", (err) => {
                console.log(err)

                writeableFileStream.end()    // end write stream
                bucketFile.delete({ ignoreNotFound: true })   // delete file created in firebase

                callback(err)
            })
            .on("finish", async () => {
                const fileURL = await getDownloadURL(bucketFile)    // get download able url of uploaded image
                callback(null, { path: fileURL })
            })

    }


    _removeFile(req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>, file: Express.Multer.File, callback: (error: Error | null) => void): void {

    }
}