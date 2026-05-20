import * as React from "react";

import { cn } from "./utils";

function Textarea({ className, ...props }: React.ComponentProps<"textarea">) {
  return (
    <textarea
      data-slot="textarea"
      className={cn(
        "resize-none border-input placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-ring/25 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive dark:bg-input/30 flex field-sizing-content min-h-20 w-full rounded-lg border bg-white px-3 py-2.5 text-base shadow-[0_1px_2px_rgba(10,27,69,0.06)] transition-[background-color,border-color,box-shadow,color] outline-none focus-visible:ring-[3px] focus-visible:shadow-[0_0_0_3px_rgba(48,130,121,0.14),0_1px_2px_rgba(10,27,69,0.08)] disabled:cursor-not-allowed disabled:bg-[#F3F8FA] disabled:opacity-70 md:text-sm",
        className,
      )}
      {...props}
    />
  );
}

export { Textarea };
