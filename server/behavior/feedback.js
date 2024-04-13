import { db } from "../db.js"
import MySecurity from "./myServerSecurity.js";

export default class feedback {

    static async getFeedback(key, inputD, res) {
        try {
            db.execute(`SELECT feedback.*, user.fullName AS userFullName FROM feedback JOIN user ON feedback.userID = user.userID ORDER BY feedback.feedback DESC`, (err, data) => {
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

    static async updateFeedback(inputData, res) {
        try {
            console.log('Received data:', inputData); // Log received data
            const { feedbackID, edit } = inputData;
            if (!feedbackID || !edit) {
                throw new Error("Feedabck ID or edit value is missing or undefined.");
            }
            // Execute SQL query to update the edit value
            const updateQuery = `UPDATE feedback SET edit = ? WHERE feedbackID = ?`;
            db.execute(updateQuery, [edit, feedbackID], (err, data) => {
                if (err) {
                    console.error("Error executing SQL query:", err);
                    return res.status(500).json(err);
                }
                return res.status(200).json("Feedback edit updated successfully.");
            });
        }
        catch (error) {
            console.error("Error updating feedback edit:", error);
            return res.status(500).json("Failed to update feedback edit. " + error);
        }
    }
        // Execute SQL query to update the edit value


}