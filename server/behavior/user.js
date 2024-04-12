import { db } from "../db.js"
import MySecurity from "./myServerSecurity.js";
export default class User {
    static async getClient(key, inputD, res) {
        try {
            db.execute(`SELECT * FROM user`, (err, data) => {
                if (err) return res.status(500).json(err);

                const users = data.map(user => ({
                    id: user.userID,
                    fullName: user.fullName,
                    email: user.email,
                    isAdmin:user.isAdmin,
                    department: user.department,
                    major: user.major,
                    school:user.school,
                    minor:user.minor,
                    phone:user.phone
                }));

                const encryptedData = MySecurity.encryptedData(MySecurity.getUserToken(key), users);
                return res.status(200).json(encryptedData);
            });
        }
        catch (error) {
            return res.status(500).json("Failed to get users. " + error);
        }

    }
    static getClientDetail(key, inputD, res) {
        try {
            const userID = inputD.userID;
            console.log(userID);
            if (!userID) {
                return res.status(400).json("User ID is missing.");
            }

            // Fetch term details including the term name
            db.execute(`SELECT * FROM user WHERE userID = ?`, [userID], (err, data) => {
                if (err) {
                    return res.status(500).json(err);
                }

                if (data.length === 0) {
                    return res.status(404).json("User not found.");
                }

                const userData = data[0];
                const encryptedData = MySecurity.encryptedData(MySecurity.getUserToken(key), userData);
                return res.status(200).json(encryptedData);
            });
        } catch (error) {
            console.error("Error getting user detail:", error);
            return res.status(500).json("Failed to get user detail. " + error);
        }
    }

    static deleteClient(inputD, res) {
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
            return res.status(500).json("Failed to delete user. " + error);
        }
    }

    static async updateClient(inputData, res) {
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