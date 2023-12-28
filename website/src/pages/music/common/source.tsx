import { Button } from "@nextui-org/react";
import { ExternalLink } from "lucide-react";

export default function Source({ link }: { link: string }) {
  return (
    <Button
      onClick={() => {
        window.open(link);
      }}
      size="lg"
      variant="ghost"
      className="mt-8 p-4"
      color="secondary"
    >
      <span className="text-xl">Go to source</span>
      <ExternalLink size={20} />
    </Button>
  );
}
