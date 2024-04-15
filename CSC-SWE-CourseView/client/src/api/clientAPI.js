import axios from "axios";
import MySecurity from "./mySecurity";
export const endPoint = "http://127.0.0.1:3000/dummydata/";

export default class ClientAPI {
    static async post(action, data, selectedImage = null) {
        let formData = new FormData();
        switch (action) {
            case "login":
            case "register":
            case "logout":

            //profile
            case "getUserFullName":
            case "updateUser":
            case "deleteUser":

            //user
            case "getClient":
            case "updateClient":
            case "deleteClient":
            case "getClientDetail":

            //course
            case "getCourses":
            case "deleteCourses":
            case "addCourses":
            case "updateCourses":
            case "getCoursesDetail":

            //feedback
            case "getFeedback":
            case "deleteFeedback":
            case "updateFeedback":
            case "addFeedback":
            case "getFeedbackDetail":

            //review
            case "getComments":
            case "addComments":
            case "deleteComments":
            case "updateComments":
            case "getCommentsDetail":
                console.log("data send: ", data);
                formData = MySecurity.encryptedPackage(action, data, selectedImage);
                console.log(formData)
                break;
            default:
                //console.log("Bad request");
                return null;
        }
        return await axios.post(endPoint, formData);
    }


}