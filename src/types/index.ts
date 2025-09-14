import type { ComponentType } from "react"

export type {ISendOtp, IOtpVerify} from "./auth.type"

export interface IResponse <T> {
  statusCode: number
  success: boolean
  message: string
  data:  T
}

export interface ISidebaritems {
   title : string;
   items : {
      title: string;
      url : string;
      component : ComponentType;
   }[]
}

export type TRole = "SUPER_ADMIN" | "ADMIN" | "USER";

