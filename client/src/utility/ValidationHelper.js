import { toast } from 'react-toastify';

class ValidationHelper{

    static IsLater(value) {
        let  OnlyLaterRegx =/^[A-Za-z\'\s\.\,\-\!\@\#\$\%\^\&\*\(\)\[\]\{\}\:\;\"\<\>\?\/\+\=\_\\\|`\~]+$/
        return OnlyLaterRegx.test(value);
    }
    static IsEmail(value) {
        let EmailRegx = /\S+@\S+\.\S+/;
        return EmailRegx.test(value);
    }
    static IsMobile(value) {
        let  MobileRegx = /(^(\+88|0088)?(01){1}[3456789]{1}(\d){8})$/;
        return MobileRegx.test(value);
    }
    static IsNumber(value) {
        let  OnlyNumberRegx = /^\d+(\.\d+)?$/;
        return OnlyNumberRegx.test(value);
    }
    static IsNull(value) {
        return value == null;
    }
    static  IsEmpty(value) {
        return value.length === 0;
    }
    static ErrorToast(value) {
        return toast.error(value);
    }
    static SuccessToast(value) {
        return toast.success(value);
    }
    static WarningToast(value) {
        return toast.warn(value);
    }
    static getBase64(file){
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result);
            reader.onerror = (error) => reject(error);
        })
    }
}
export default ValidationHelper