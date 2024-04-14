import axios from "axios";
import MySecurity from "./mySecurity";
export const endPoint = "http://127.0.0.1:3000/dummydata/";

<<<<<<< HEAD
export default class ClientAPI {
    static async post(action, data, selectedImage = null) {
        let formData = new FormData();
        switch (action) {
            case "login":
            case "register":
            case "logout":

=======
export default class ClientAPI{ 
    static async post(action,data,selectedImage =null){
        let formData = new FormData();
        switch(action){
            case "login":                
            case "register":               
            case "logout":
            
>>>>>>> 846aab61 (...)
            //profile
            case "getUserFullName":
            case "updateUser":
            case "deleteUser":

            //user
            case "getClient":
            case "updateClient":
            case "deleteClient":
<<<<<<< HEAD
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

            //review
            case "getComments":
            case "addComments":
            case "deleteComments":
            case "updateComments":
            case "getCommentsDetail":
                console.log("data send: ", data);
                formData = MySecurity.encryptedPackage(action, data, selectedImage);
                console.log(formData)
=======

            /* product
            case "getProduct":                
            case "getProductDetail": 
            case "getNewestProduct": 
            case "removeProduct":
            case "getCategories":
            case "addProduct":
            case "updateProduct":
            // order
            case "addCart":     
            case "getNumberCartItem":          
            case "getCartItem":
            case "updateCartItem":
            case "checkOutCart":
            case "getContact":
            case "getOrderHistory":                
            case "getOrderHistoryDeatail":                
            case "updateOrderStatus":*/
                ////console.log("data send: ",data);
                formData = MySecurity.encryptedPackage(action, data, selectedImage);  
>>>>>>> 846aab61 (...)
                break;
            default:
                //console.log("Bad request");
                return null;
<<<<<<< HEAD
        }
        return await axios.post(endPoint, formData);
    }


}
=======
        }       
        return await axios.post(endPoint, formData);        
    }
    

}
>>>>>>> 846aab61 (...)
