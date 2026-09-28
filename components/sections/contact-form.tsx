"use client";

import { useActionState, useEffect, useRef } from "react";
import { sendContactMessage } from "@/app/actions";
import { initialContactState, type ContactField } from "@/lib/contact";
import { Alert, ArrowRight, Check } from "@/components/ui/icons";
import { cn } from "@/lib/utils";

const fieldBase =
  "mt-2 block w-full rounded-lg border bg-surface px-4 py-3 text-base text-ink placeholder:text-muted/70 transition-colors focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/20";

export function ContactForm() {
  const [state, formAction, pending] = useActionState(sendContactMessage, initialContactState);
  const startedRef = useRef<HTMLInputElement>(null);
  const statusRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);

  // Record when the form became interactive; very fast submissions are treated as bots.
  useEffect(() => {
    if (startedRef.current) startedRef.current.value = String(Date.now());
  }, []);

  useEffect(() => {
    if (state.status === "idle") return;
    if (state.status === "success") formRef.current?.reset();
    const firstError = state.errors ? (Object.keys(state.errors)[0] as ContactField) : undefined;
    if (firstError) formRef.current?.querySelector<HTMLElement>(`[name="${firstError}"]`)?.focus();
    else statusRef.current?.focus();
  }, [state]);

  const err = (f: ContactField) => state.errors?.[f];
  const value = (f: ContactField) => (state.status === "error" ? state.values?.[f] : undefined);

  return (
    <form ref={formRef} action={formAction} noValidate className="rounded-xl border border-line bg-paper p-6 sm:p-8">
      <div
        ref={statusRef}
        tabIndex={-1}
        role={state.status === "error" ? "alert" : "status"}
        aria-live="polite"
        className="focus:outline-none"
      >
        {state.status === "success" ? (
          <p className="mb-6 flex items-start gap-3 rounded-lg bg-success-soft px-4 py-3 text-sm text-success">
            <Check className="mt-0.5 size-4 shrink-0" /> {state.message}
          </p>
        ) : null}
        {state.status === "error" && state.message ? (
          <p className="mb-6 flex items-start gap-3 rounded-lg bg-danger-soft px-4 py-3 text-sm text-danger">
            <Alert className="mt-0.5 size-4 shrink-0" /> {state.message}
          </p>
        ) : null}
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Name" name="name" error={err("name")}>
          <input
            id="name"
            name="name"
            type="text"
            autoComplete="name"
            required
            maxLength={100}
            defaultValue={value("name")}
            aria-invalid={Boolean(err("name"))}
            aria-describedby={err("name") ? "name-error" : undefined}
            className={cn(fieldBase, err("name") ? "border-danger" : "border-line-strong")}
          />
        </Field>
        <Field label="Email" name="email" error={err("email")}>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            inputMode="email"
            required
            maxLength={200}
            defaultValue={value("email")}
            aria-invalid={Boolean(err("email"))}
            aria-describedby={err("email") ? "email-error" : undefined}
            className={cn(fieldBase, err("email") ? "border-danger" : "border-line-strong")}
          />
        </Field>
      </div>
      <div className="mt-5">
        <Field label="Message" name="message" error={err("message")}>
          <textarea
            id="message"
            name="message"
            rows={5}
            required
            maxLength={5000}
            defaultValue={value("message")}
            placeholder="A role, a project, a dataset you'd like analysed…"
            aria-invalid={Boolean(err("message"))}
            aria-describedby={err("message") ? "message-error" : undefined}
            className={cn(fieldBase, "resize-y", err("message") ? "border-danger" : "border-line-strong")}
          />
        </Field>
      </div>

      {/* Spam traps: hidden from people and assistive technology. */}
      <div className="absolute -left-[9999px] h-px w-px overflow-hidden" aria-hidden="true">
        <label htmlFor="company">Company</label>
        <input id="company" name="company" type="text" tabIndex={-1} autoComplete="off" />
      </div>
      <input ref={startedRef} type="hidden" name="startedAt" defaultValue="0" />

      <button
        type="submit"
        disabled={pending}
        className="group mt-7 inline-flex h-12 w-full items-center justify-center gap-2 rounded-full bg-ink px-6 text-sm font-medium text-white transition-colors hover:bg-brand-strong disabled:opacity-60 sm:w-auto"
      >
        {pending ? "Sending…" : "Send message"}
        {!pending ? <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" /> : null}
      </button>
    </form>
  );
}

function Field({ label, name, error, children }: { label: string; name: string; error?: string; children: React.ReactNode }) {
  return (
    <div>
      <label htmlFor={name} className="text-sm font-medium text-ink">
        {label}
      </label>
      {children}
      {error ? (
        <p id={`${name}-error`} className="mt-2 flex items-center gap-1.5 text-sm text-danger">
          <Alert className="size-3.5 shrink-0" /> {error}
        </p>
      ) : null}
    </div>
  );
}
