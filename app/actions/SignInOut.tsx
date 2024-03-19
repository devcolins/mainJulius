import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import AuthForm from "./auth";

export  function SignInOut() {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button className="top-4 dark:invert"  variant="outline">
          Sign in
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AuthForm />
      </AlertDialogContent>
    </AlertDialog>
  );
}
