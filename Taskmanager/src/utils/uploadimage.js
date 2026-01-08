import { API_PATHS } from "./apiPaths";
import axiosInstance from "./axiosinstance";

const uploadImage = async (imagefile) => {
    //Append image file to form data
    formData.append("image", imagefile);

    try {
        const response = await axiosInstance.post(API_PATHS.IMAGE.UPLOAD_IMAGE, formData, {
            headers: {
                "Content-Type": "multipart/form-data"   //set header for file upload
            }
        });
        return response.data;    // return resonse data 
    } catch (error) {
        console.log("Error uploading image", error);
        throw error; // Rethroe error for handling at the caller function
    }
};

export default uploadImage;
