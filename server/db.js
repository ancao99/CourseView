import mysql from "mysql2"
import fs from "fs"
import { CourseData } from "./courses_array.js";

const dbConfig = {
     
    host: "127.0.0.1",
    user: "root",
    password: "pass",
    database: "courseview"

// host: "127.0.0.1",
// user: "taone",
// password: "taothik",
// database: "courseview"
}
export const db = mysql.createConnection(dbConfig)

const insertCourseData = () => {
    // Loop through the CourseData array and insert each course into the database
    CourseData.forEach(course => {
        const [crn, subject, courseNumber, section, hours, title, professor, schedule_type] = course;
        const query = `
            INSERT INTO course (crn, subject, courseNumber, section, hours, title, professor, schedule_type) 
            VALUES (?, ?, ?, ?, ?, ?, ?, ?)
        `;
        db.execute(query, [crn, subject, courseNumber, section.toString(), hours, title, professor, schedule_type], (err, results) => {
            if (err) {
                console.error('Error inserting course data:', err);
            } else {
                console.log('Course data inserted successfully.');
            }
        });
    });
};

// Call the function to insert course data
//insertCourseData();


export const checkDatabase = async () => {   
    let db3 = mysql.createConnection({
        host: dbConfig.host,
        user: dbConfig.user,
        password: dbConfig.password,
    });
    // check if database exist
    db3.execute(`SHOW DATABASES LIKE "courseview"`, async (err, results) => {    
        if (err || results.length <= 0) {            
            console.log('Database does not exist.');   
            //create
            await db3.execute(`CREATE DATABASE courseview`, (err, results) => {
                if (err) return console.error('Created database error:', err);
                console.log("created database");
                // insert
                fs.readFile("initial_DB.sql", 'utf8', (err, data) => {
                    if (err) return console.error('Error reading file:', err);
                    console.log('Readed File initial_DB.sql');
                    db3.execute(data, (err, results) => {
                        if (err) {
                            console.error('Insert Table fail', err);
                            return console.error("Please manual insert in workbench");
                        } 
                        console.log('Initial Database sucessful');
                    });
                });
            });
        }
        else {
            console.log('Found Database');
            // count table
            await db3.execute(`SELECT COUNT(*) AS tableCount FROM information_schema.tables WHERE table_schema = "courseview"`, async (err, results) => {
                if (err) return console.error('Error counting tables:', err);
                const tableCount = results[0].tableCount;
                /*if (tableCount < 2) {
                    //drop
                    await db3.execute(`DROP DATABASE IF EXISTS courseview`, async (err, results) => {
                        if (err) return console.error('Drop database error:', err);
                        console.log('Dropped Database');   
                        // create
                        await db3.execute(`CREATE DATABASE courseview`, (err, results) => {
                            if (err) return console.error('Created database error:', err);
                            console.log("created database");
                            // insert
                            fs.readFile("initial_DB.sql", 'utf8', (err, data) => {
                                if (err) return console.error('Error reading file:', err);
                                console.log('Readed File initial_DB.sql');
                                db3.execute(data, (err, results) => {
                                    if (err){
                                        console.error('Insert Table fail', err);
                                        return console.error("Please manual insert in workbench");
                                    } 
                                    console.log('Initial Database sucessful');
                                });
                            });
                        });
                    });
                }
                else {
                    // pass
                    return console.log('Database maybe ok');
                }*/             
            });
        } 
    });
}
