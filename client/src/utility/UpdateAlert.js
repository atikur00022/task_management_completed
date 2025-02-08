import Swal from 'sweetalert2';
import {UpdateTaskRequest} from "../ApiRequest/ApiRequest.js";

export const UpdateAlert = async (id, status) => {
    try {
        const result = await Swal.fire({
            title: "Are you sure to change status?",
            icon: "warning",
            input: "select",
            inputOptions: {new: "new", completed: "completed", progress: "progress", canceled: "canceled"},
            inputValue: status,
            showCancelButton: true,
            customClass: {
                confirmButton: "custom-confirm-button",
                cancelButton: "custom-cancel-button"
            },
            confirmButtonText: "Update"
        });

        if (result.isConfirmed) {
            return await UpdateTaskRequest(id, result.value);
        }

        return null; // Return null if deletion is canceled
    } catch (error) {
        console.error("Error in DeleteAlert:", error);
        return { status: "error", message: "Something went wrong!" };
    }
};
