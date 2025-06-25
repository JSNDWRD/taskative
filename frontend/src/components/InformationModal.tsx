import { AlertCircleIcon, BadgeInfo, CheckCircle2Icon } from "lucide-react";
import { Alert, AlertTitle } from "./ui/alert";
import useAuthStore from "@/store/useAuthStore";
import { useEffect } from "react";

export default function InformationModal() {
  const information = useAuthStore((state) => state.information);
  const setInformation = useAuthStore((state) => state.setInformation);

  useEffect(() => {
    const clearInformation = setTimeout(() => {
      setInformation(null);
    }, 2500); // Reset after 2.5s

    return () => clearTimeout(clearInformation);
  }, [!!information]);
  if (!!information) {
    return (
      <Alert
        variant={information?.type == "Error" ? "destructive" : "default"}
        className="fixed bottom-4 right-4 w-96"
      >
        {information?.type == "Error" && <AlertCircleIcon />}
        {information?.type == "Success" && <CheckCircle2Icon />}
        {information?.type == "Info" && <BadgeInfo />}
        <AlertTitle className="w-full flex">
          <span>{information?.message}</span>
        </AlertTitle>
      </Alert>
    );
  }
}
