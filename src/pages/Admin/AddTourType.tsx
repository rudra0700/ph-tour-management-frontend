import { DeleteConfirmation } from "@/components/ConfirmationDelete";
import { AddTourTypeModal } from "@/components/modules/Admin/AddTourTypeModal";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useGetTourTypesQuery, useRemoveTourTypeMutation } from "@/redux/features/tour/tour.api";
import { Trash2 } from "lucide-react";
import { toast } from "sonner";

const AddTourType = () => {
  const { data } = useGetTourTypesQuery(undefined);
  const [removeTourType] = useRemoveTourTypeMutation();

  const handleTourTypeRemove = async (tourTypeId : string) => {
    try {
      const toastId = toast.loading("Removing")
      const res = await removeTourType(tourTypeId).unwrap();
      
      if(res.success){
        toast.success("Tour type removed successfully", {id : toastId})
      }
    } catch (error) {
      // toast.error("Failed to remove tour type", { id: toastId });
      console.log(error);
    }
  }
  return (
    <div className=" w-full max-w-7xl mx-auto px-5">
      <div className="flex justify-between mb-5">
        <h1 className="font-semibold">Add Tour Type</h1>
         <AddTourTypeModal></AddTourTypeModal>
      </div>
      <div className="border border-muted rounded-md">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Name</TableHead>
              <TableHead className="text-right">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data?.map((item : {_id : string; name : string}) => (
              <TableRow className="">
                <TableCell className="font-medium w-full">{item?.name}</TableCell>
                <TableCell className="font-medium">
                  <DeleteConfirmation onConfirm={() => handleTourTypeRemove(item._id)}>
                  <Button size={"sm"}><Trash2/></Button>
                  </DeleteConfirmation>
                  </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default AddTourType;
