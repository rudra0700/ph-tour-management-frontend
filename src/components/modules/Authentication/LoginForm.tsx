import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Link, useNavigate } from "react-router"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod"
import { Input } from "@/components/ui/input";
import { useLoginMutation } from "@/redux/features/auth/auth.api";
import { toast } from "sonner";
import config from "@/config";

const loginSchema = z.object({
  email: z.email(),
  password: z.string()
});


export function LoginForm({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
      const [login] = useLoginMutation();
        console.log("Cookie",document.cookie);
      const navigate = useNavigate()
      const form = useForm<z.infer<typeof loginSchema  >>({
         resolver : zodResolver(loginSchema),
         defaultValues : {
          email: "",
          password: ""
         }
      });

      const onSubmit = async (data : z.infer<typeof loginSchema>) => {

        const loginInfo = {
          email : data.email,
          password: data.password
        }
        console.log(loginInfo);
        try {
          const result  = await login(loginInfo).unwrap();
          if(result.success){
            toast.success("User logged in successfully")
            navigate("/")
          }
        } catch (error) {
          console.log(error);
          if(error.data.message === "Password does not match"){
            toast.error('Invalid Cridential')
          }
          if(error.data.message === "User is not verified"){
            toast.error("You account is not verified");
            navigate("/verify" , {state: data.email})
          }
        }
      }
  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-2xl font-bold">Login to your account</h1>
        <p className="text-muted-foreground text-sm text-balance">
          Enter your email below to login to your account
        </p>
      </div>
      <div className="grid gap-6">
      <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
               <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="Email" {...field} />
                  </FormControl>
                  <FormDescription className="sr-only">
                    This is your public display name.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            /> 
             <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input placeholder="*********" {...field} />
                  </FormControl>
                  <FormDescription className="sr-only">
                    This is your public display name.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
        <Button type="submit" className="w-full">
          Login
        </Button>
          </form>
      </Form>
       

        <div className="after:border-border relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t">
          <span className="bg-background text-muted-foreground relative z-10 px-2">
            Or continue with
          </span>
        </div>
        <Button onClick={() => window.open(`${config.baseUrl}/auth/google`)} type="button" variant="outline" className="w-full">
          Login with Google
        </Button>
      </div>
      <div className="text-center text-sm">
        Don&apos;t have an account?{" "}
        <Link to={"/register"} className="underline underline-offset-4">
          register
        </Link>
      </div>
    </div>
  )
}
