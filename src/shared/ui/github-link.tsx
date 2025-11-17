import { Button } from "@/shared/ui/button";
import Link from "next/link";
import { SiGithub } from "react-icons/si";

export function GithubLink() {
  return (
    <Button
      asChild
      size="icon"
      variant="outline"
      aria-label="View on GitHub"
    >
      <Link href='https://github.com/demianeen/tube-map' target="_blank" rel="noreferrer">
        <SiGithub className="h-4 w-4" />
      </Link>
    </Button>
  );
}

