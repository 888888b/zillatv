import { toast } from "react-toastify";

export const showSuccessMsg = (msg: string) => {
    toast.success(msg, { position: 'bottom-right', autoClose: 3000 });
};