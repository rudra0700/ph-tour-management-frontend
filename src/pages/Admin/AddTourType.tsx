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
import { useGetTourTypesQuery } from "@/redux/features/tour/tour.api";
import { Trash2 } from "lucide-react";

const AddTourType = () => {
  const { data } = useGetTourTypesQuery(undefined);
  console.log(data);
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
            {data?.map((item : {name : string}) => (
              <TableRow className="">
                <TableCell className="font-medium w-full">{item?.name}</TableCell>
                <TableCell className="font-medium"><Button size={"sm"}><Trash2/></Button></TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default AddTourType;
