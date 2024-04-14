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
            const { userID, email, phone, department, school, major, minor } = inputData;
            if (!userID) {
                throw new Error("User ID is missing or undefined.");
            }

            let updateFields = [];
            let updateValues = [];

            if (email) {
                updateFields.push('email = ?');
                updateValues.push(email);
            }
            if (department) {
                updateFields.push('department = ?');
                updateValues.push(department);
            }
            if (major) {
                updateFields.push('major = ?');
                updateValues.push(major);
            }
            if (school) {
                updateFields.push('school = ?');
                updateValues.push(school);
            }
            if (minor) {
                updateFields.push('minor = ?');
                updateValues.push(minor);
            }
            if (phone) {
                updateFields.push('phone = ?');
                updateValues.push(phone);
            }

            if (updateFields.length === 0) {
                throw new Error("No fields provided to update.");
            }

            // Construct the SQL query to update user details
            const updateQuery = `UPDATE user SET ${updateFields.join(', ')} WHERE userID = ?`;
            updateValues.push(userID);

            // Execute SQL query to update user details
            db.execute(updateQuery, updateValues, (err, data) => {
                if (err) {
                    console.error("Error executing SQL query:", err);
                    return res.status(500).json(err);
                }
                return res.status(200).json("User details updated successfully.");
            });
        }
        catch (error) {
            console.error("Error updating user details:", error);
            return res.status(500).json("Failed to update user details. " + error);
        }
    }

}