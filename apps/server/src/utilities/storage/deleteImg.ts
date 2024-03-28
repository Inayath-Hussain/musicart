import { getStorage } from "firebase-admin/storage"
import { firebaseApp } from "../../config/firebase";

export const deleteImageFromFirebase = async (path: string) => {
    const storage = getStorage(firebaseApp);

    await storage.bucket().file(path).delete({ ignoreNotFound: true })
}