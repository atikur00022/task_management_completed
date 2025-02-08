import bcrypt from "bcrypt";
import UsersModel from "../models/UsersModel.js";
import {TokenEncode} from "../utility/TokenUtility.js";
import {ObjectId} from "mongodb";
import SendEmail from "../utility/EmailUtility.js";
import OtpModel from "../models/OtpModel.js";

// Registration
export const RegistrationService = async (req, res) => {
    try{

        const reqBody = req.body;
        const { email, password } = reqBody;
        const EncryptedPassword = await bcrypt.hash(password, 10);
        reqBody.password = EncryptedPassword;

        const isUserExist = await UsersModel.findOne({email});

        if(isUserExist){
            return{ status: 'fail', message: 'User already exist!' };
        }else{

            const data = await UsersModel.create(reqBody);

            return{ status: 'success', message: 'Registration Completed successfully', data: data };
        }
    }catch (e) {
        return { status: 'error', message: e.toString() };
    }
}

// Login
export const LoginService = async (req, res) => {

    try{

        const {email, password} = req.body;

        const data = await UsersModel.aggregate([
            { $match: { email } },
        ]);

        const userDetails = {
            email: data[0]["email"],
            firstName: data[0]["firstName"],
            lastName: data[0]["lastName"],
            mobile: data[0]["mobile"],
            photo: data[0]["photo"],
        }

        if(data.length > 0){

            const MatchingPassword = await bcrypt.compare(password, data[0]['password']);

            if(MatchingPassword){

                const token = await TokenEncode(data[0]['email'],data[0]['_id']);

                return{ status: 'success', message: 'Login Completed successfully', data: {token, userDetails} };

            }else {
                return{ status: 'fail', message: 'Credential Incorrect!' };
            }

        }else{
            return{ status: 'fail', message: 'User not exist!' };
        }
    }catch (e) {
        return { status: 'error', message: e.toString() };
    }

}

// Profile Update
export const ProfileUpdateService = async (req, res) => {
    try{

        const userId = new ObjectId(req.headers['userId']);
        const reqBody = req.body;

        if (reqBody.hasOwnProperty('password')) {

            const EncryptedPassword = await bcrypt.hash(reqBody['password'], 10);
            reqBody['password'] = EncryptedPassword;

            const data = await UsersModel.updateOne({_id: userId}, reqBody);

            return { status: 'success', message: 'Profile updated successfully', data: data }

        } else {

            const data = await UsersModel.updateOne({_id: userId}, reqBody);

            return { status: 'success', message: 'Profile updated successfully', data: data }

        }

    }catch (e) {
        return { status: 'error', message: e.toString() };
    }
}

// Profile Details
export const ProfileDetailsService = async (req, res) => {
    try{

        const userId = new ObjectId(req.headers['userId']);

        const data = await UsersModel.aggregate([
            { $match: { _id: userId } },
        ]);

        return { status: 'success', message: 'Profile get successfully', data: data }

    }catch (e) {
        return { status: 'error', message: e.toString() };
    }
}

// Send Otp
export const SendOtpService = async (req, res) => {
    try{

        const email = req.params['email'];
        const OtpCode = Math.floor(100000 + Math.random() * 900000);

        const data = await UsersModel.aggregate([
            { $match: { email } },
            { $project: { _id: 0} }
        ]);

        if(data.length > 0){

            await OtpModel.updateOne({ email: email },{ $set: { otp: OtpCode } },{ upsert: true });

            await SendEmail(email,`Your verification code is ${OtpCode}`, "Check your verification code");

            return { status: 'success', message: 'Otp send successfully!', data: data }
        }else{
            return{ status: 'fail', message: 'User not exist!' };
        }


    }catch (e) {
        return { status: 'error', message: e.toString() };
    }
}

// Verify Otp
export const VerifyOtpService = async (req, res) => {
    try{

        const {email, otp} = req.body;
        const status = 0;
        const statusUpdate = 1;

        const userCount = await OtpModel.aggregate([
            { $match: { email: email, otp: otp, status: status } },
            { $count: "total" }
        ]);

        if(userCount.length > 0){

            await OtpModel.updateOne({email: email, otp: otp, status: status},{status:statusUpdate});
            return { status: 'success', message: "Otp verified successfully!" };

        }else{
            return { status: 'fail', message: "Invalid email or OTP!" };
        }

    }catch (e) {
        return { status: 'error', data: e.toString() }
    }
}

// Reset Password
export const ResetPassService = async (req, res) => {
    try{

        const { email, newPassword, otp } = req.body;
        const EncryptedPassword = await bcrypt.hash(newPassword, 10);
        const statusUpdate = 1;

        const otpUserCount = await OtpModel.aggregate([
            { $match: { email: email, otp: otp, status: statusUpdate } },
            { $count: "total" }
        ]);

        if(otpUserCount.length > 0){

            await UsersModel.updateOne({email: email}, {password: EncryptedPassword});
            await OtpModel.deleteOne({email: email});
            return { status: 'success', message: 'Password reset successfully' };

        }else{
            return { status: 'fail', message: 'Invalid request!' };
        }

    }catch (e) {
        return { status: 'error', message: e.toString() };
    }
}

























