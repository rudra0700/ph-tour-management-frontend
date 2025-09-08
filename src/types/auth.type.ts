export interface ISendOtp {
   email: string;
}

export interface IOtpVerify{
    email: string;
    otp: string
}