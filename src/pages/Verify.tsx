import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { cn } from "@/lib/utils";
import { useSendOtpMutation, useVerifyOtpMutation } from "@/redux/features/auth/auth.api";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router";
import { toast } from "sonner";
import z from "zod";

const verifySchema = z.object({
  pin: z.string().min(6, {
    message: "Your one-time password must be 6 characters.",
  }),
});
const Verify = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [email] = useState(location.state);
  const [confirmed, setConfirmed] = useState(false);
  const [timer, setTimer] = useState(5);
  const [sendOtp] = useSendOtpMutation();
  const [verifyOtp] = useVerifyOtpMutation();



  const form = useForm<z.infer<typeof verifySchema>>({
    resolver: zodResolver(verifySchema),
    defaultValues: {
      pin: "",
    },
  });

  const handleSendOTP = async () => {
    const toastId = toast.loading("sending OTP");
    try {
      const res = await sendOtp({email: email}).unwrap();
      
      if(res.success){
        toast.success("OTP sent successfully", {id: toastId});
        setTimer(5)
        setConfirmed(true);
      }
      
    } catch (error) {
      console.log(error);
    }
  }

  // For the time being for development

  useEffect(() => {
     if(!email){
      navigate("/")
     }
  }, [email])

  useEffect(() => {
    if(!email || !confirmed){
      return;
    }
    const timerId = setInterval(() => {
        setTimer(prev => (prev > 0 ? prev -1 : 0) )
        console.log("Tick");
    }, 1000)

    return () => clearInterval(timerId);
  }, [email, confirmed])

  const onSubmit = async (values: z.infer<typeof verifySchema>) => {
     const toastId = toast.loading("Verifying OTP");
     const userInfo = {
      email, 
      otp : values.pin
     }
     try {
      const res = await verifyOtp(userInfo).unwrap();
      if(res.success){
        toast.success("OTP verified successfully", {id: toastId});
        setConfirmed(true);
      }
     } catch (error) {
      console.log(error);
     }
  };
  return (
    <div className="grid place-content-center h-screen">
      {
        confirmed ? (  <Card>
        <CardHeader>
          <CardTitle className="text-xl">Verify your email address</CardTitle>
          <CardDescription>Please enter the code we sent to</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form
              id="otp-form"
              onSubmit={form.handleSubmit(onSubmit)}
              className="w-2/3 space-y-6"
            >
              <FormField
                control={form.control}
                name="pin"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>One-Time Password</FormLabel>
                    <FormControl>
                      <InputOTP maxLength={6} {...field}>
                        <InputOTPGroup>
                          <InputOTPSlot index={0} />
                        </InputOTPGroup>
                        <InputOTPGroup>
                          <InputOTPSlot index={1} />
                        </InputOTPGroup>
                        <InputOTPGroup>
                          <InputOTPSlot index={2} />
                        </InputOTPGroup>
                        <InputOTPGroup>
                          <InputOTPSlot index={3} />
                        </InputOTPGroup>
                        <InputOTPGroup>
                          <InputOTPSlot index={4} />
                        </InputOTPGroup>
                        <InputOTPGroup>
                          <InputOTPSlot index={5} />
                        </InputOTPGroup>
                      </InputOTP>
                    </FormControl>
                    <FormDescription>
                      <Button disabled={timer !== 0} onClick={handleSendOTP} type="button" variant="link" className={cn("p-0 m-0", {"cursor-pointer" : timer === 0, "text-gray-500": timer !== 0})}>Resent OTP</Button> :  {" "}
                      {timer}
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </form>
          </Form>
        </CardContent>
        <CardFooter className="flex justify-end">
          <Button form="otp-form" type="submit">
            Submit
          </Button>
        </CardFooter>
      </Card> ) : (  <Card>
        <CardHeader>
          <CardTitle className="text-xl">Verify your email address</CardTitle>
          <CardDescription>We will send you and OTP to </CardDescription> {email}
        </CardHeader>
       
        <CardFooter className="flex justify-end">
          <Button onClick={handleSendOTP} className="w-[300px]">
            Confirm
          </Button>
        </CardFooter>
      </Card>)
      }
    </div>
  );
};

export default Verify;
