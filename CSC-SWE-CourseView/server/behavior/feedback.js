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
<<<<<<< HEAD
            const { userID, role, type,comment,recommend } = inputData;
            
            // Validate input data
            if ( !userID || !role || !type || !comment || !recommend) {
=======
            const { userID, name, role, type,comment,recommed } = inputData;
            console.log(inputData)
            // Validate input data
            if ( !userID || !name || !role || !type || !comment || !recommed) {
>>>>>>> Pal_gpc_v1
                throw new Error("Missing required fields.");
            }

            // Construct the SQL query to insert the comment into the database
<<<<<<< HEAD
            const insertQuery = `INSERT INTO feedback (userID, role, type,comment,recommend,edit) VALUES (?, ?, ?, ?,?,?)`;
            
            // Execute the SQL query
            db.execute(insertQuery, [ userID, role, type,comment,recommend], (err, data) => {
=======
            const insertQuery = `INSERT INTO feedback (userID,name, role, type,comment,recommed) VALUES (?, ?, ?, ?,?, ?)`;
            
            // Execute the SQL query
            db.execute(insertQuery, [ userID,name, role, type,comment,recommed], (err, data) => {
>>>>>>> Pal_gpc_v1
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
<<<<<<< HEAD
            db.execute(updateQuery, [feedbackID, edit], (err, data) => {
=======
            db.execute(updateQuery, [edit,feedbackID], (err, data) => {
>>>>>>> Pal_gpc_v1
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
<<<<<<< HEAD
    
=======
    static getFeedbackDetail(key, inputD, res) {
        try {
            const feedbackID = inputD.feedbackID;
            console.log(feedbackID);
            if (!feedbackID) {
                return res.status(400).json("Feedback ID is missing.");
            }

            // Fetch term details including the term name
            db.execute(`SELECT feedbackID, edit FROM feedback WHERE feedbackID = ?`, [feedbackID], (err, data) => {
                if (err) {
                    return res.status(500).json(err);
                }

                if (data.length === 0) {
                    return res.status(404).json("Feedback not found.");
                }

                const feedbackData = data[0];
                const encryptedData = MySecurity.encryptedData(MySecurity.getUserToken(key), feedbackData);
                return res.status(200).json(encryptedData);
            });
        } catch (error) {
            console.error("Error getting feedback detail:", error);
            return res.status(500).json("Failed to get feedback detail. " + error);
        }
    }
>>>>>>> Pal_gpc_v1
}