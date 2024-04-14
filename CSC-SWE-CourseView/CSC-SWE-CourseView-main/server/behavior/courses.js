import { db } from "../db.js"
import MySecurity from "./myServerSecurity.js";


export default class Courses {
    /*---------------------------COURSES------------------------------ */
    static async getCourses(key, inputD, res) {
        try {
            db.execute(`
                SELECT *
                FROM course
                ORDER BY course.courseID DESC`, (err, data) => {
                if (err) return res.status(500).json(err);
                const courses = data.map(course => ({
                    id: course.courseID,
                    crn: course.crn,
                    subject: course.subject,
                    courseNumber: course.courseNumber,
                    section: course.section,
                    hours: course.hours,
                    title: course.title,
                    professor: course.professor,
                    schedule_type: course.schedule_type,
                }));
                const encryptedData = MySecurity.encryptedData(MySecurity.getUserToken(key), courses);
                return res.status(200).json(encryptedData);
            });
        }
        catch (error) {
            return res.status(500).json("Failed to get courses. " + error);
        }
    }


    static addCourses(inputD, res) {
        try {
            const { crn, subject, courseNumber, section, hours, title, professor, schedule_type } = inputD;
            console.log("course ", inputD)

            console.log("course backend", crn)
            if (!crn || !subject || !courseNumber || !section || !hours || !title || !professor || !schedule_type) {
                throw new Error("Course name is missing or undefined.");
            }
            const insertQuery = `            
            INSERT INTO course (crn, subject, courseNumber, section, hours, title, professor, schedule_type) 
            VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;
            db.execute(insertQuery, [crn, subject, courseNumber, section, hours, title, professor, schedule_type], (err, data) => {
                if (err) {
                    console.error("Error executing SQL query:", err);
                    return res.status(500).json(err);
                }
                return res.status(200).json("Term Added Successfully.");
            });
        }
        catch (error) {
            console.error("Error adding course:", error);
            return res.status(500).json("Failed to add course. " + error);
        }
    }


    static deleteCourses(inputD, res) {
        try {
            const { courseID } = inputD;
            if (!courseID) {
                throw new Error("Courses ID is missing or undefined.");
            }
            const deleteQuery = `DELETE FROM course WHERE courseID = ?`;
            db.execute(deleteQuery, [courseID], (err, data) => {
                if (err) {
                    console.error("Error executing SQL query:", err);
                    return res.status(500).json(err);
                }
                return res.status(200).json("Courses Deleted Successfully.");
            });
        }
        catch (error) {
            console.error("Error deleting Courses:", error);
            return res.status(500).json("Failed to delete Courses. " + error);
        }
    }

    static async updateCourses(inputData, res) {
        try {
            console.log('Received data:', inputData);
            const { courseID, crn, subject, courseNumber, section, hours, title, professor, schedule_type } = inputData;

            // Check if required fields are provided
            if (!courseID) {
                throw new Error("Course ID is missing or undefined.");
            }

            // Execute SQL query to update the Courses
            const updateQuery = `
                UPDATE course 
                SET crn = ?, subject = ?, courseNumber = ?, section = ?, hours = ?, title = ?, professor = ?, schedule_type = ?
                WHERE courseID = ?`;

            const updateValues = [crn, subject, courseNumber, section, hours, title, professor, schedule_type, courseID];

            // Promisify the database operation
            const [rows, fields] = await db.promise().execute(updateQuery, updateValues);

            return res.status(200).json("Course updated successfully.");
        }
        catch (error) {
            console.error("Error updating course:", error);
            return res.status(500).json("Failed to update course. " + error.message);
        }
    }



    static getCoursesDetail(key, inputD, res) {
        try {
            const courseID = inputD.courseID;
            if (!courseID) {
                return res.status(400).json("Courses ID is missing.");
            }

            db.execute(`SELECT * FROM course WHERE courseID = ?`, [courseID], (err, data) => {
                if (err) {
                    return res.status(500).json(err);
                }

                if (data.length === 0) {
                    return res.status(404).json("Course not found.");
                }

                const courseData = data[0];
                const encryptedData = MySecurity.encryptedData(MySecurity.getUserToken(key), courseData);
                return res.status(200).json(encryptedData);
            });
        } catch (error) {
            console.error("Error getting course detail:", error);
            return res.status(500).json("Failed to get course detail. " + error);
        }
    }


}