import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog";
import { RegisterVendor } from "@/app/actions/Register";

export function RegisterDialog() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="rounded-md bg-white px-3.5 py-2.5 text-sm font-semibold text-gray-900 shadow-sm hover:bg-gray-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white">
          Register Now
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <RegisterVendor />

        <DialogFooter>
          <Button type="submit">Save changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
