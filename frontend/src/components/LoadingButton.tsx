import { Loader2Icon } from "lucide-react";
import { Button } from "./ui/button";

export default function LoadingButton({
  size,
}: {
  size: "default" | "sm" | "lg" | "icon" | null | undefined;
}) {
  return (
    <Button size={size}>
      <Loader2Icon />
      Please wait
    </Button>
  );
}
