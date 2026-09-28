import { ButtonLink } from "@/components/ui/button";
import { ArrowRight } from "@/components/ui/icons";

export default function NotFound() {
  return (
    <div className="container-page flex min-h-[60vh] flex-col items-start justify-center py-24">
      <p className="font-mono text-sm text-muted">
        <span className="text-brand">SELECT</span> * <span className="text-brand">FROM</span> pages{" "}
        <span className="text-brand">WHERE</span> url = this;
        <br />
        <span className="text-accent">0 rows returned.</span>
      </p>
      <h1 className="mt-6 text-4xl font-semibold tracking-tight sm:text-5xl">Page not found</h1>
      <p className="mt-4 max-w-md text-lg text-muted">The page you were looking for doesn&apos;t exist or has moved.</p>
      <div className="mt-8 flex flex-wrap gap-3">
        <ButtonLink href="/">Back to home</ButtonLink>
        <ButtonLink href="/projects" variant="secondary" icon={<ArrowRight className="size-4" />}>
          Browse projects
        </ButtonLink>
      </div>
    </div>
  );
}
