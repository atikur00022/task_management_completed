import {
    LoginService,
    ProfileDetailsService,
    ProfileUpdateService,
    RegistrationService, ResetPassService, SendOtpService, VerifyOtpService
} from "../services/UsersServices.js";

// Registration
export const Registration = async (req, res) => {
    const result = await RegistrationService(req, res);
    res.json(result);
}

// Login
export const Login = async (req, res) => {
    const result = await LoginService(req, res);
    res.json(result);
}

// Profile Update
export const ProfileUpdate = async (req, res) => {
    const result = await ProfileUpdateService(req, res);
    res.json(result);
}

// Profile Details
export const ProfileDetails = async (req, res) => {
    const result = await ProfileDetailsService(req, res);
    res.json(result);
}

// Send Otp
export const SendOtp = async (req, res) => {
    const result = await SendOtpService(req, res);
    res.json(result);
}

// Verify Otp
export const VerifyOtp = async (req, res) => {
    const result = await VerifyOtpService(req, res);
    res.json(result);
}

// Reset Password
export const ResetPassword = async (req, res) => {
    const result = await ResetPassService(req, res);
    res.json(result);
}





























