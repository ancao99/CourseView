import { db } from "../db.js"
import MySecurity from "./myServerSecurity.js";

export default class Profile {

    static async deleteUser(inputD, res) {
        try {
            const { userID } = inputD;
            if (!userID) {
                throw new Error("User ID is missing or undefined.");
            }

            // Optional: Delete user token (if userToken table exists)
            const deleteTokenQuery = `DELETE FROM userToken WHERE userID = ?`;
            await db.execute(deleteTokenQuery, [userID]);


            const deleteUserQuery = `DELETE FROM user WHERE userID = ?`;
            await db.execute(deleteUserQuery, [userID]);

            return res.status(200).json("User Deleted Successfully.");
        } catch (error) {
            console.error("Error deleting user:", error);
            return res.status(500).json("Failed to delete user. " + error);
        }
    }


    static async updateUser(inputData, res) {
        try {
            console.log('Received data:', inputData); // Log received data
            const { userID, fullName,email,phone,department,major,minor,school} = inputData;
            if (!userID || !fullName || !email || !department || !major || !school || !minor || !phone) {
                throw new Error("Information is missing or undefined.");
            }

            // Execute SQL query to update the term
            const updateQuery = `UPDATE user SET  fullName = ?, email = ?,department = ?,major = ?,school = ?,minor = ?,phone = ? WHERE userID = ?`;
            db.execute(updateQuery, [fullName, email, department, major, school, minor, phone, userID], (err, data) => {
                if (err) {
                    console.error("Error executing SQL query:", err);
                    return res.status(500).json(err);
                }
                return res.status(200).json("User updated successfully.");
            });
        }
        catch (error) {
            console.error("Error updating user:", error);
            return res.status(500).json("Failed to update user. " + error);
        }
    }

}