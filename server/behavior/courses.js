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
            const { coursesID, courseID, departmentID } = inputData;
            if (!coursesID || !courseID || !departmentID) {
                throw new Error("Courses ID, courseID, or departmentID is missing or undefined.");
            }
            // Execute SQL query to update the Courses
            const updateQuery = `UPDATE courses SET courseID = ?, departmentID = ? WHERE coursesID = ?`;
            db.execute(updateQuery, [courseID, departmentID, coursesID], (err, data) => {
                if (err) {
                    console.error("Error executing SQL query:", err);
                    return res.status(500).json(err);
                }
                return res.status(200).json("Courses updated successfully.");
            });
        }
        catch (error) {
            console.error("Error updating Courses:", error);
            return res.status(500).json("Failed to update Courses. " + error);
        }
    }


    static getCoursesDetail(key, inputD, res) {
        try {
            const coursesID = inputD.coursesID;
            if (!coursesID) {
                return res.status(400).json("Courses ID is missing.");
            }

            db.execute(`                
                SELECT courses.*, terms.type AS term_type, department.type AS department_type
                FROM courses
                LEFT JOIN terms ON courses.termsID = terms.termsID
                LEFT JOIN department ON courses.departmentID = department.departmentID
                ORDER BY courses.coursesID DESC
            `, [coursesID], (err, data) => {
                if (err) {
                    return res.status(500).json(err);
                }

                if (data.length === 0) {
                    return res.status(404).json("Courses not found.");
                }

                const coursesData = data[0];
                const encryptedData = MySecurity.encryptedData(MySecurity.getUserToken(key), coursesData);
                return res.status(200).json(encryptedData);
            });
        } catch (error) {
            console.error("Error getting courses detail:", error);
            return res.status(500).json("Failed to get courses detail. " + error);
        }
    }


    /*---------------------------COURSES------------------------------ */
    static async getCoursePrefix(key, res) {
        try {
            db.execute(`
                SELECT DISTINCT coursePrefix
                FROM courses
                ORDER BY coursePrefix ASC`, (err, data) => {
                if (err) return res.status(500).json(err);

                const coursePrefixes = data.map((course, index) => ({
                    id: index + 1, // You can use index + 1 as a simple unique identifier
                    name: course.coursePrefix
                }));

                const encryptedData = MySecurity.encryptedData(MySecurity.getUserToken(key), coursePrefixes);
                return res.status(200).json(encryptedData);
            });
        } catch (error) {
            return res.status(500).json("Failed to get course prefixes. " + error);
        }
    }

    static async getCourseNumber(key, res) {
        try {
            db.execute(`
                SELECT DISTINCT courseNumber
                FROM courses
                ORDER BY courseNumber ASC`, (err, data) => {
                if (err) return res.status(500).json(err);

                const courseNumber = data.map((course, index) => ({
                    id: index + 1, // You can use index + 1 as a simple unique identifier
                    coursenumber: parseInt(course.courseNumber)
                }));

                const encryptedData = MySecurity.encryptedData(MySecurity.getUserToken(key), courseNumber);
                return res.status(200).json(encryptedData);
            });
        } catch (error) {
            return res.status(500).json("Failed to get course number. " + error);
        }
    }


    //Courses Filter Controller
    static async filterCourses(inputData, res) {
        try {
            const { termsID, departmentID, coursePrefix, courseNumber } = inputData;
            console.log(termsID, departmentID, coursePrefix, courseNumber);
            let query = `SELECT courses.*, terms.type AS term_type, department.type AS department_type
                 FROM courses
                 LEFT JOIN terms ON courses.termsID = terms.termsID
                 LEFT JOIN department ON courses.departmentID = department.departmentID
                 WHERE 1`;

            const params = [];

            if (termsID && termsID !== "All") {
                query += ` AND courses.termsID = ?`;
                params.push(termsID);
            }

            if (departmentID && departmentID !== "All") {
                query += ` AND courses.departmentID = ?`;
                params.push(departmentID);
            }

            if (coursePrefix && coursePrefix !== "All") {
                query += ` AND courses.coursePrefix = ?`;
                params.push(coursePrefix);
            }

            if (courseNumber && courseNumber !== "All") {
                query += ` AND courses.courseNumber = ?`;
                params.push(courseNumber);
            }
            console.log("param", params);

            db.execute(query, params, async (error, data) => {

                if (error) {
                    console.error("Error filtering courses:", error);
                    return res.status(500).json("Failed to filter courses. " + error.message);
                }
                console.log("data data", data);


                const courses = data.map(course => ({
                    id: course.coursesID,
                    crn: course.CRN,
                    prefix: course.coursePrefix,
                    number: course.courseNumber,
                    professor: course.professor,
                    term: course.term_type,
                    department: course.department_type
                }));
                console.log("hellllooo", courses);
                return res.status(200).json(courses);
            });

        } catch (error) {
            console.error("Error filtering courses:", error);
            return res.status(500).json("Failed to filter courses. " + error.message);
        }
    }

}