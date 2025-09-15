import MultipleImageUploader from "@/components/MultipleImageUploader";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import type { FileMetadata } from "@/hooks/use-file-upload";
import { cn } from "@/lib/utils";
import { useGetDivisionQuery } from "@/redux/features/division/division.api";
import {
  useAddTourMutation,
  useGetTourTypesQuery,
} from "@/redux/features/tour/tour.api";
import { format, formatISO } from "date-fns";
import { CalendarIcon, Plus, Trash2 } from "lucide-react";
import { useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";

export const AddTour = () => {
  const { data: divisionData, isLoading: divisionDataLoading } =
    useGetDivisionQuery(undefined);
  const { data: tourTypeData, isLoading: typeTypeLoading } =
    useGetTourTypesQuery(undefined);

  const [images, setImages] = useState<(File | FileMetadata)[] | []>([]);
  const [addTour] = useAddTourMutation();

  const divisionOptions = divisionData?.map(
    (item: { _id: string; name: string }) => ({
      value: item._id,
      label: item.name,
    })
  );

  const toutTypeOptions = tourTypeData?.map(
    (item: { _id: string; name: string }) => ({
      value: item._id,
      label: item.name,
    })
  );

  console.log(divisionOptions);
  const form = useForm({
    defaultValues: {
      title: "",
      division: "",
      tourType: "",
      description: "",
      startDate: "",
      endDate: "",
      included: [{ value: "" }],
      excluded : [{value: ""}]
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "included",
  });

  const {
    fields: excludedFields,
    append: excludedAppend,
    remove: excludedRemove,
  } = useFieldArray({
    control: form.control,
    name: "excluded",
  });

  console.log(fields);

  const handleSubmit = async (data) => {
    // const toastId = toast.loading("Adding tour...");
    const tourData = {
      ...data,
      startDate: formatISO(data.startDate),
      endDate: formatISO(data.endDate),
      included: data.included.map((item: { value: string }) => item.value),
      excluded: data.excluded.map((item: { value: string }) => item.value),
    };

    console.log(tourData);

    const formData = new FormData();
    formData.append("data", JSON.stringify(tourData));
    images.forEach((image) => formData.append("files", image as File));

    // try {
    //   const res = await addTour(formData).unwrap();
    //   console.log(res);
    //   if (res.success) {
    //     toast.success("Tour added successfully", { id: toastId });
    //   }
    // } catch (error) {
    //   toast.error("Tour added successfully", { id: toastId });
    // }
  };

  return (
    <div className="w-full max-w-4xl mx-auto px-5 mt-16">
      <Card>
        <CardHeader>
          <CardTitle>Add New Tour</CardTitle>
          <CardDescription>Add a new tour to the system</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form
              id="add-tour-form"
              className="space-y-5"
              onSubmit={form.handleSubmit(handleSubmit)}
            >
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tour Title</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex gap-5">
                <FormField
                  control={form.control}
                  name="tourType"
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormLabel>Tour Type</FormLabel>
                      <Select
                        disabled={typeTypeLoading}
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select Tour Type" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {toutTypeOptions?.map(
                            (item: { value: string; label: string }) => (
                              <SelectItem value={item.value} key={item.value}>
                                {item.label}
                              </SelectItem>
                            )
                          )}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="division"
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormLabel>Division</FormLabel>
                      <Select
                        disabled={divisionDataLoading}
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select a division" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {divisionOptions?.map(
                            (item: { value: string; label: string }) => (
                              <SelectItem key={item.value} value={item.value}>
                                {item.label}
                              </SelectItem>
                            )
                          )}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Date picker */}
              <div className="flex gap-5">
                <FormField
                  control={form.control}
                  name="startDate"
                  render={({ field }) => (
                    <FormItem className="flex flex-col flex-1">
                      <FormLabel>Start Date</FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant={"outline"}
                              className={cn(
                                "w-full pl-3 text-left font-normal",
                                !field.value && "text-muted-foreground"
                              )}
                            >
                              {field.value ? (
                                format(field.value, "PPP")
                              ) : (
                                <span>Pick a date</span>
                              )}
                              <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={new Date(field.value)}
                            onSelect={field.onChange}
                            disabled={(date) =>
                              date <
                              new Date(
                                new Date().setDate(new Date().getDate() - 1)
                              )
                            }
                            captionLayout="dropdown"
                          />
                        </PopoverContent>
                      </Popover>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="endDate"
                  render={({ field }) => (
                    <FormItem className="flex flex-col flex-1">
                      <FormLabel>End Date</FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant={"outline"}
                              className={cn(
                                "w-full pl-3 text-left font-normal",
                                !field.value && "text-muted-foreground"
                              )}
                            >
                              {field.value ? (
                                format(field.value, "PPP")
                              ) : (
                                <span>Pick a date</span>
                              )}
                              <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={new Date(field.value)}
                            onSelect={field.onChange}
                            disabled={(date) =>
                              date <
                              new Date(
                                new Date().setDate(new Date().getDate() - 1)
                              )
                            }
                            captionLayout="dropdown"
                          />
                        </PopoverContent>
                      </Popover>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="flex gap-5 items-stretch">
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormLabel>Description</FormLabel>
                      <FormControl>
                        <Textarea {...field} className="h-[205px]" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="flex-1 mt-5">
                  <MultipleImageUploader
                    onChange={setImages}
                  ></MultipleImageUploader>
                </div>
              </div>
              <div className="border-t border-muted w-full"></div>
               {/* included fields */}
              <div>
                <div className="flex justify-between">
                  <p className="font-semibold">Include</p>
                  <Button
                    size="icon"
                    type="button"
                    variant="outline"
                    onClick={() => append({ value: "" })}
                  >
                    <Plus></Plus>
                  </Button>
                </div>

                <div className="space-y-4 mt-4">
                  {fields?.map((item, index) => (
                    <div className="flex gap-2">
                      <FormField
                        control={form.control}
                        name={`included.${index}.value`}
                        key={item.id}
                        render={({ field }) => (
                          <FormItem className="flex-1">
                            <FormControl>
                              <Input {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <Button
                        onClick={() => remove(index)}
                        size="icon"
                        variant="destructive"
                        type="button"
                      >
                        <Trash2></Trash2>
                      </Button>
                    </div>
                  ))}
                </div>
              </div>

              {/* excluded fields */}
              <div>
                <div className="flex justify-between">
                  <p className="font-semibold">Exclude</p>
                  <Button
                    size="icon"
                    type="button"
                    variant="outline"
                    onClick={() => excludedAppend({ value: "" })}
                  >
                    <Plus></Plus>
                  </Button>
                </div>

                <div className="space-y-4 mt-4">
                  {excludedFields?.map((item, index) => (
                    <div className="flex gap-2">
                      <FormField
                        control={form.control}
                        name={`excluded.${index}.value`}
                        key={item.id}
                        render={({ field }) => (
                          <FormItem className="flex-1">
                            <FormControl>
                              <Input {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <Button
                        onClick={() => excludedRemove(index)}
                        size="icon"
                        variant="destructive"
                        type="button"
                      >
                        <Trash2></Trash2>
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            </form>
          </Form>
        </CardContent>
        <CardFooter className="flex justify-end">
          <Button type="submit" form="add-tour-form">
            Create Tour
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};
