import SingleImageUploader from "@/components/SingleImageUploader";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useAddDivisionMutation } from "@/redux/features/division/division.api";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

export function AddDivisionModal() {
    const [image, setImage] = useState<File | null>(null);
    const [addDivision] = useAddDivisionMutation();
    const [open, setOpen] = useState(false);

  const form = useForm({
    defaultValues: {
      name: "",
      description: "",
    },
  });

  const handleDivision = async (data) => {
    const formData = new FormData();
    formData.append("data", JSON.stringify(data));
    formData.append("file", image as File);

    console.log(formData.get("data"));
    console.log(formData.get("file"));

    try {
      const toastId = toast.loading("Adding Division")
      const res = await addDivision(formData).unwrap();
      console.log(res);
      if(res.success){
         toast.success("Divison added successfully", {id: toastId})
         setOpen(false)
      }
    } catch (error) {
      console.log(error);
    }
  };

   console.log("Inside add division model",image);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>Add Divsion</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add Division</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form className="space-y-4" id="add-division" onSubmit={form.handleSubmit(handleDivision)}>
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Division name</FormLabel>
                  <FormControl>
                    <Input placeholder="Division" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea  placeholder="Description" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          <SingleImageUploader onChange={setImage}></SingleImageUploader>
          </form>
        </Form>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
          <Button disabled={!image} form="add-division" type="submit">
            Submit
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
