import Swal from 'sweetalert2';
import { DeleteTaskRequest } from "../ApiRequest/ApiRequest.js";

export const DeleteAlert = async (id) => {
    try {
        const result = await Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            customClass: {
                confirmButton: "custom-confirm-button",
                cancelButton: "custom-cancel-button"
            },
            confirmButtonText: "Yes, delete it!"
        });

        if (result.isConfirmed) {
            return await DeleteTaskRequest(id);
        }

        return null; // Return null if deletion is canceled
    } catch (error) {
        console.error("Error in DeleteAlert:", error);
        return { status: "error", message: "Something went wrong!" };
    }
};
