import { useUserInfoQuery } from "@/redux/features/auth/auth.api";
import type { TRole } from "@/types";
import type { ComponentType } from "react";
import { Navigate } from "react-router";


export const withAuth = (Component : ComponentType, requiredRole? : TRole) => {
  return function AuthWrapper(){
     const {data, isLoading} = useUserInfoQuery(undefined);
     console.log("inside auth wrapper" , data);

     if(!isLoading && !data?.data?.email){
        return <Navigate to={"/login"}></Navigate>
     } 

     if(!isLoading && requiredRole && data?.data?.role !== requiredRole){
        return <Navigate to={"/unauthorized"}></Navigate>
     }
    return <Component></Component>
  }
};

