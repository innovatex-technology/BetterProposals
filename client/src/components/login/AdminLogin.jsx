import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../common/RequestService';
import { ToastContainer, toast } from "react-toastify";
import { apiService } from '../common/apiService';


const AdminLogin = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [confirmPasswordError, setConfirmPasswordError] = useState('');
    const [error, setError] = useState(null);
    const history = useNavigate();
    const [isLogin, setIsLogin] = useState(false);
    const [otpSend, setOtpSend] = useState(false);
    const [otpVerified, setOtpVerified] = useState(false);
    const [otpError, setOtpError] = useState('');
    const [otp, setOtp] = useState('');
    const [rememberme, setRememberme] = useState(false);


    const validateEmail = () => {
        if (email === "") {
            setEmailError("Email address cannot be empty");
            return false;
        }
        const isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
        setEmailError(isValid ? '' : 'Please enter a valid email address');
        return isValid;
    };

    const validatePassword = () => {
        if (password === "") {
            setPasswordError("Password cannot be empty");
            return false;
        }
        const isValid = password.length >= 6;
        setPasswordError(isValid ? '' : 'Your password is too short, please enter a valid password');
        return isValid;
    };

    const validateConfirmPassword = () => {
        if (confirmPassword === "") {
            setConfirmPasswordError("Password cannot be empty");
            return false;
        }
        const isValid = password.length >= 6;
        setConfirmPasswordError(isValid ? '' : 'Your password is too short, please enter a valid password');

        if (!(password === confirmPassword))
            setConfirmPasswordError("Passworda and Confirm Password Not Match");
        return isValid;
    };
    const validateOTP = () => {
        if (otp === "") {
            setOtpError("Password cannot be empty");
            return false;
        }
        const isValid = otp.length != 6;
        setOtpError(isValid ? 'Enter Six Digit OTP sent in your email' : '');
        return isValid;
    }

    console.log(otpError)

    const handleChange = (e) => {
        console.log("hello",rememberme)
        e.preventDefault();
        
        const isEmailValid = validateEmail();
        const isPasswordValid = validatePassword();
        if (isEmailValid && isPasswordValid) {
            handleSubmit({
                email: email,
                password: password
            });
        } else {
            console.log('Form Fields Contain errors');
        }
    };

    const handleSubmit = async (data) => {
        try {
            const responseData = await login(data);
            localStorage.setItem('userLoginData', btoa(JSON.stringify(responseData)));
            history.push('/wp-admin/dashboard');
        } catch (error) {
            console.error('Error:', error);
            setError(error.message);
        }
    };

    //send OTP
    const sendEmailOtp = async (e) => {
        e.preventDefault();
        validateEmail();
        if (email && emailError.length === 0) {
            try {
                const request = {
                    path: '/reset-pass-otp',
                    method: 'POST',
                    body: { email: email }
                }
                const responseData = await apiService(request);
                if (responseData.status === 200) {
                    toast("OTP Send, Please check your email")
                    setOtpSend(true)
                }
            }
            catch (error) {
                console.error('Error:', error);
                setOtpSend(false)
                toast(error?.message || "Something wrong, Try latter")
            }
        }
        else {
            toast(error?.message || "Email is a required field, Please Check")
        }
    }

    //Update Password
    const updatePassword = async (e) => {
        e.preventDefault();
    
        if (!email || !password || !confirmPassword || !otp) {
            toast("Please fill in all fields.");
            return;
        }
    
        if (password !== confirmPassword) {
            toast("Password and Confirm Password do not match.");
            return;
        }
    
        const updateUserBody = {
            email,
            password,
            otp
        };
    
        try {
            const response = await apiService({ path: '/update-pass', method: 'PUT', body: updateUserBody });
    
            if (response.status === 200) {
                {
                    toast("Password reset successfully");
                    setPassword('')
                    setOtp('')
                    setConfirmPassword('')
                    setEmail('')
                    setIsLogin(false)
                    setOtpSend(false)
                    setOtpVerified(false)
                }
            } else {
                toast(response?.message || "Unknown error occurred.");
            }
        } catch (err) {
            console.error("Error updating password:", err);
            toast("Something went wrong, please try again later.");
        }
    };
    

    const handleFormChange = () => {
        setIsLogin(!isLogin)
    }

    const verifyOTP = async (e) => {
        e.preventDefault();
        validateOTP();
        validateEmail();
        console.log((otpError.length === 0), (emailError.length === 0))
        if ((otpError.length === 0) && (emailError.length === 0)) {
            try {
                const request = {
                    path: '/verify-otp',
                    method: 'POST',
                    body: { email: email, otp: otp }
                }
                const responseData = await apiService(request);
                if (responseData.status === 200) {
                    toast(responseData.message)
                    setOtpVerified(true)
                }
                else {
                    toast(responseData.message)
                }
            }
            catch (error) {
                console.error('Error:', error);
                setOtpSend(false)
                toast(error?.message || "Something wrong, Try latter")
            }
        }
        else {
            toast("Please enter required values")
        }
    }

    

    return (
        <div className="flex min-h-screen">
            {!isLogin &&
                <div className="flex flex-1 flex-col justify-center px-6 py-12 lg:px-8 bg-gray-100">
                    <div className="sm:mx-auto sm:w-full sm:max-w-md">
                        <img
                            className="mx-auto h-12 w-auto"
                            src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                            alt="Your Company"
                        />
                        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                            Sign in to your Admin account
                        </h2>
                    </div>
                    <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
                            <form className="space-y-6" onSubmit={handleChange}>
                                <div>
                                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                                        Email address
                                    </label>
                                    <div className="mt-1">
                                        <input
                                            id="email"
                                            name="email"
                                            type="email"
                                            autoComplete="email"
                                            onChange={(e) => setEmail(e.target.value)}
                                            onBlur={validateEmail}
                                            required
                                            className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                        />
                                        {emailError && <p className="mt-2 text-sm text-red-600">{emailError}</p>}
                                    </div>
                                </div>
                                <div>
                                    <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                                        Password
                                    </label>
                                    <div className="mt-1">
                                        <input
                                            id="password"
                                            name="password"
                                            type="password"
                                            onChange={(e) => setPassword(e.target.value)}
                                            onBlur={validatePassword}
                                            autoComplete="current-password"
                                            required
                                            className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                        />
                                        {passwordError && <p className="mt-2 text-sm text-red-600">{passwordError}</p>}
                                    </div>
                                </div>
                                <div className="flex items-center justify-between">
                                    <div className="text-sm">
                                        <button
                                            type="button"
                                            onClick={handleFormChange}
                                            className="font-medium text-indigo-600 hover:text-indigo-500"
                                        >
                                            Forgot your password?
                                        </button>
                                    </div>
                                </div>
                                <div>
                                    <button
                                        type="submit"
                                        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                    >
                                        Sign in
                                    </button>
                                </div>

                                <div className="flex items-center justify-center">
                                    <div>
                                        <input 
                                        type="checkbox" 
                                        id="rememberMe" 
                                        name="rememberMe"
                                        value={rememberme}
                                        onChange={(e) => setRememberme(!rememberme)}
                                        />
                                        <label htmlFor="rememberMe" className="ml-2">Remember Me</label>
                                    </div>
                                </div>


                            </form>
                            {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
                        </div>
                    </div>
                </div>}

            {isLogin &&
                <div className="flex flex-1 flex-col justify-center px-6 py-12 lg:px-8 bg-gray-100">
                    <div className="sm:mx-auto sm:w-full sm:max-w-md">
                        <img
                            className="mx-auto h-12 w-auto"
                            src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                            alt="Your Company"
                        />
                        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                            Lets Reset You Passsword
                        </h2>
                    </div>
                    <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
                            <form className="space-y-6" onSubmit={updatePassword}>
                                <div>
                                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                                        Email Address
                                    </label>
                                    <div className="mt-1">
                                        <input
                                            id="email"
                                            name="email"
                                            type="email"
                                            autoComplete="email"
                                            onChange={(e) => setEmail(e.target.value)}
                                            onBlur={validateEmail}
                                            required
                                            className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                        />
                                        {emailError && <p className="mt-2 text-sm text-red-600">{emailError}</p>}
                                    </div>
                                </div>
                                {otpSend &&
                                    <div>
                                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                                            Enter OTP
                                        </label>
                                        <div className="mt-1">
                                            <input
                                                id="otp"
                                                name="otp"
                                                type="text"
                                                autoComplete="otp"
                                                onChange={(e) => setOtp(e.target.value)}
                                                onBlur={validateOTP}
                                                required
                                                className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                            />
                                            {otpError && <p className="mt-2 text-sm text-red-600">{otpError}</p>}
                                        </div>
                                    </div>
                                }
                                {
                                    otpVerified && otpSend && <div>
                                        <div>
                                            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                                                Password
                                            </label>
                                            <div className="mt-1">
                                                <input
                                                    id="password"
                                                    name="password"
                                                    type="password"
                                                    onChange={(e) => setPassword(e.target.value)}
                                                    onBlur={validatePassword}
                                                    autoComplete="current-password"
                                                    required
                                                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                                />
                                                {passwordError && <p className="mt-2 text-sm text-red-600">{passwordError}</p>}
                                            </div>
                                        </div>
                                        <div>
                                            <label htmlFor="password" className="block text-sm font-medium text-gray-700" style={{ paddingTop: 15 }}>
                                                Confirm Password
                                            </label>
                                            <div className="mt-1">
                                                <input
                                                    id="confirm_password"
                                                    name="confirm_password"
                                                    type="confirm_password"
                                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                                    onBlur={validateConfirmPassword}
                                                    autoComplete="auto"
                                                    required
                                                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                                />
                                                {confirmPasswordError && <p className="mt-2 text-sm text-red-600">{confirmPasswordError}</p>}
                                            </div>
                                        </div>
                                    </div>
                                }

                                <div className="flex items-center justify-between">
                                    <div className="text-sm">
                                        <button
                                            type="button"
                                            onClick={handleFormChange}
                                            className="font-medium text-indigo-600 hover:text-indigo-500"
                                        >
                                            Sign In
                                        </button>
                                    </div>
                                </div>
                                <div>
                                    {otpSend && !otpVerified &&
                                        <button
                                            onClick={verifyOTP}
                                            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                        >
                                            Verify OTP
                                        </button>}
                                    {otpSend && otpVerified &&
                                        <button
                                            onClick={updatePassword}
                                            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                        >
                                            Reset Password
                                        </button>}
                                    {!otpSend &&
                                        <button
                                            onClick={sendEmailOtp}
                                            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                        >
                                            Send OTP
                                        </button>
                                    }
                                </div>
                            </form>
                            {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
                        </div>
                    </div>
                </div>}
            <div className="hidden lg:block relative w-1/2 bg-cover bg-center" style={{ backgroundImage: `url('https://source.unsplash.com/random/800x600')` }}>
                <div className="absolute inset-0 bg-indigo-900 opacity-50"></div>
                <div className="absolute inset-0 flex items-center justify-center text-white p-10">
                    <div className="max-w-md text-center">
                        <h2 className="text-3xl font-bold mb-4">Welcome Back!</h2>
                        <p className="text-lg">Sign in to continue to your dashboard.</p>
                    </div>
                </div>
            </div>
            <ToastContainer />
        </div>
    );
};

export default AdminLogin;
