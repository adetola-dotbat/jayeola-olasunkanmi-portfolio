"use client";

import Image from "next/image";
import { useRef, type ReactNode } from "react";
import { Close } from "./icons";

interface LightboxProps {
  image: { src: string; width: number; height: number; alt: string };
  caption?: string;
  /** Accessible label for the trigger button. */
  label: string;
  triggerClassName?: string;
  children: ReactNode;
}

/**
 * Opens an image full-screen in a native modal <dialog>, which provides
 * focus trapping, Escape to close and inert background content.
 */
export function Lightbox({ image, caption, label, triggerClassName, children }: LightboxProps) {
  const ref = useRef<HTMLDialogElement>(null);

  return (
    <>
      <button
        type="button"
        className={triggerClassName}
        onClick={() => ref.current?.showModal()}
        aria-haspopup="dialog"
        aria-label={label}
      >
        {children}
      </button>
      <dialog
        ref={ref}
        aria-label={image.alt}
        className="m-auto max-h-[94dvh] w-[min(96vw,1400px)] max-w-none overflow-visible bg-transparent p-0"
        onClick={(e) => {
          if (e.target === e.currentTarget) ref.current?.close();
        }}
      >
        <div className="flex max-h-[94dvh] flex-col">
          <div className="flex justify-end pb-3">
            <button
              type="button"
              onClick={() => ref.current?.close()}
              className="inline-flex h-10 items-center gap-2 rounded-full bg-white px-4 text-sm font-medium text-ink"
              autoFocus
            >
              Close <Close className="size-4" />
            </button>
          </div>
          <div className="min-h-0 overflow-auto rounded-lg bg-white">
            <Image
              src={image.src}
              alt={image.alt}
              width={image.width}
              height={image.height}
              sizes="96vw"
              className="mx-auto h-auto max-h-[80dvh] w-auto max-w-full object-contain"
            />
          </div>
          {caption ? <p className="pt-3 text-center text-sm text-white/85">{caption}</p> : null}
        </div>
      </dialog>
    </>
  );
}
