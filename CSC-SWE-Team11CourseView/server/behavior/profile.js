import { db } from "../db.js"
import MySecurity from "./myServerSecurity.js";

export default class profile  {

    static async getProfile(key, inputD, res) {
        try {
            db.execute(`SELECT user.* FROM user`, (err, data) => {
                if (err) return res.status(500).json(err);
    
                const user = data.map(user=> ({
                    userID: user.userID,
                    userFullName: user.fullName, 
                    pass: user.password,
                }));
    
                const encryptedData = MySecurity.encryptedData(MySecurity.getUserToken(key), user);
                return res.status(200).json(encryptedData);
            });
        }
        catch (error) {
            return res.status(500).json("Failed to get comment. " + error);
        }
    }
    
    static deleteUser(inputD, res) {
        try {
            const { userID } = inputD;
            if (!userID) {
                throw new Error("User ID is missing or undefined.");
            }
            const deleteQuery = `DELETE FROM user WHERE userID = ?`;
            db.execute(deleteQuery, [userID], (err, data) => {
                if (err) {
                    console.error("Error executing SQL query:", err);
                    return res.status(500).json(err);
                }
                return res.status(200).json("User Deleted Successfully.");
            });
        }
        catch (error) {
            console.error("Error deleting user:", error);
            return res.status(500).json("Failed to delete uer. " + error);
        }
    }


    static async updateUser(inputData, res) {
        try {
            console.log('Received data:', inputData); // Log received data
            const { userID} = inputData;
            if (!userID) {
                throw new Error("User ID is missing or undefined.");
            }
            // Execute SQL query to update the comment
            const updateQuery = `UPDATE user SET password = ? WHERE userID = ?`;
            db.execute(updateQuery, [userID], (err, data) => {
                if (err) {
                    console.error("Error executing SQL query:", err);
                    return res.status(500).json(err);
                }
                return res.status(200).json("Review updated successfully.");
            });
        }
        catch (error) {
            console.error("Error updating review:", error);
            return res.status(500).json("Failed to update review. " + error);
        }
    }    
}