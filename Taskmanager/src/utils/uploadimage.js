import { API_PATHS } from "./apiPaths";
import axiosInstance from "./axiosinstance";

const uploadImage = async (imagefile) => {
    try {
        const formData = new FormData();
        formData.append("image", imagefile);

        const response = await axiosInstance.post(
            API_PATHS.IMAGE.UPLOAD_IMAGE,
            formData
            // ❌ DO NOT set Content-Type manually
        );

        return response.data;
    } catch (error) {
        console.error("Error uploading image:", error);
        throw error;
    }
};

export default uploadImage;
