import { db } from "../db.js"
import MySecurity from "./myServerSecurity.js";

export default class feedback {

    static async getFeedback(key, inputD, res) {
        try {
            db.execute(`SELECT feedback.*, user.fullName AS userFullName FROM feedback JOIN user ON feedback.userID = user.userID ORDER BY feedback.feedbackID DESC`, (err, data) => {
                if (err) return res.status(500).json(err);
    
                const feedback = data.map(feedback => ({
                    id: feedback.feedbackID,
                    userID: feedback.userID,
                    userFullName: feedback.userFullName, 
                    role: feedback.role,
                    type: feedback.type,
                    comment: feedback.comment,
                    recommend: feedback.recommend,
                    edit: feedback.edit,
                }));
                const encryptedData = MySecurity.encryptedData(MySecurity.getUserToken(key), feedback);
                return res.status(200).json(encryptedData);
            });
        }
        catch (error) {
            return res.status(500).json("Failed to get feedback. " + error);
        }
    }
    
    static deleteFeedback(inputD, res) {
        try {
            const { feedbackID } = inputD;
            if (!feedbackID) {
                throw new Error("Feedback ID is missing or undefined.");
            }
            const deleteQuery = `DELETE FROM feedback WHERE feedbackID = ?`;
            db.execute(deleteQuery, [feedbackID], (err, data) => {
                if (err) {
                    console.error("Error executing SQL query:", err);
                    return res.status(500).json(err);
                }
                return res.status(200).json("Feedback Deleted Successfully.");
            });
        }
        catch (error) {
            console.error("Error deleting feedback:", error);
            return res.status(500).json("Failed to delete feedback. " + error);
        }
    }

    static async addFeedback(inputData, res) {
        try {
            // Extract data from the request body
            const { userID, role, type,comment,recommend } = inputData;
            
            // Validate input data
            if ( !userID || !role || !type || !comment || !recommend) {
                throw new Error("Missing required fields.");
            }

            // Construct the SQL query to insert the comment into the database
            const insertQuery = `INSERT INTO feedback (userID, role, type,comment,recommend,edit) VALUES (?, ?, ?, ?,?,?)`;
            
            // Execute the SQL query
            db.execute(insertQuery, [ userID, role, type,comment,recommend], (err, data) => {
                if (err) {
                    console.error("Error executing SQL query:", err);
                    return res.status(500).json(err);
                }
                return res.status(200).json("Feedback added successfully.");
            });
        } catch (error) {
            console.error("Error adding feedback:", error);
            return res.status(500).json("Failed to add feedback. " + error);
        }
    }
    static async updateFeedback(inputData, res) {
        try {
            console.log('Received data:', inputData); // Log received data
            const { feedbackID, edit } = inputData;
            if (!feedbackID || !edit) {
                throw new Error("Feedback ID or edit information is missing or undefined.");
            }
    
            // Execute SQL query to update the school field
            const updateQuery = `UPDATE feedback SET edit = ? WHERE feedbackID = ?`;
            db.execute(updateQuery, [feedbackID, edit], (err, data) => {
                if (err) {
                    console.error("Error executing SQL query:", err);
                    return res.status(500).json(err);
                }
                return res.status(200).json("Feedback's edit updated successfully.");
            });
        }
        catch (error) {
            console.error("Error updating feedback's edit:", error);
            return res.status(500).json("Failed to update feedback's edit. " + error.message);
        }
    }
    
}