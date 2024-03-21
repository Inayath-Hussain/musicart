import { genSalt, hash } from "bcrypt";
import { IUser, User } from "../models/user"

/**
 * provides functions to handle database operations on users collection
 */
class UserService {

    /**
     * search user document by email or mobile number
     */
    async getUserByEmailorNumber(identifier: string) {
        return await User.findOne({ $or: [{ email: identifier }, { mobile_number: identifier }] })
    }

    /**
     * create's a new document in users collection
     * @param payload user details
     * @returns 
     */
    async addNewUser(payload: IUser) {
        const salt = await genSalt(10)
        const hashedPassword = await hash(payload.password, salt)

        const userDoc = new User({ ...payload, password: hashedPassword });

        return await userDoc.save()
    }
}


export const userService = new UserService();