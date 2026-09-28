import Image from "next/image";
import type { ProjectImage } from "@/lib/types";
import { Lightbox } from "@/components/ui/lightbox";
import { Expand } from "@/components/ui/icons";
import { cn } from "@/lib/utils";

/** A screenshot in a light "window" frame that opens full size on click. */
export function Screenshot({
  image,
  sizes,
  preload = false,
  className,
}: {
  image: ProjectImage;
  sizes: string;
  preload?: boolean;
  className?: string;
}) {
  return (
    <figure className={cn("group", className)}>
      <div className="overflow-hidden rounded-lg border border-line bg-surface shadow-soft">
        <div className="flex items-center gap-1.5 border-b border-line bg-sunken/70 px-3 py-2" aria-hidden="true">
          <span className="size-2 rounded-full bg-line-strong" />
          <span className="size-2 rounded-full bg-line-strong" />
          <span className="size-2 rounded-full bg-line-strong" />
        </div>
        <Lightbox
          image={image}
          caption={image.caption}
          label={`Enlarge image: ${image.caption ?? image.alt}`}
          triggerClassName="relative block w-full cursor-zoom-in bg-white"
        >
          <Image
            src={image.src}
            alt={image.alt}
            width={image.width}
            height={image.height}
            sizes={sizes}
            preload={preload}
            className="h-auto w-full"
          />
          <span className="absolute bottom-3 right-3 inline-flex items-center gap-1.5 rounded-full bg-ink/85 px-3 py-1.5 text-xs font-medium text-white opacity-0 transition-opacity group-hover:opacity-100 group-focus-within:opacity-100">
            <Expand className="size-3.5" /> Enlarge
          </span>
        </Lightbox>
      </div>
      {image.caption ? <figcaption className="mt-3 text-sm text-muted">{image.caption}</figcaption> : null}
    </figure>
  );
}
