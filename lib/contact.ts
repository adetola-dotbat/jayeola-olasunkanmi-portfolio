export type ContactField = "name" | "email" | "message";

export interface ContactState {
  status: "idle" | "success" | "error";
  message?: string;
  errors?: Partial<Record<ContactField, string>>;
  values?: Partial<Record<ContactField, string>>;
}

export const initialContactState: ContactState = { status: "idle" };

/** The form is only rendered when an email provider is configured. */
export function isContactFormEnabled() {
  return Boolean(process.env.RESEND_API_KEY);
}

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export function validateContact(values: Record<ContactField, string>) {
  const errors: Partial<Record<ContactField, string>> = {};
  if (values.name.length < 2) errors.name = "Please enter your name.";
  else if (values.name.length > 100) errors.name = "Please keep your name under 100 characters.";

  if (!values.email) errors.email = "Please enter your email address.";
  else if (!EMAIL_PATTERN.test(values.email) || values.email.length > 200)
    errors.email = "Please enter a valid email address, like name@example.com.";

  if (values.message.length < 10) errors.message = "Please write a message of at least 10 characters.";
  else if (values.message.length > 5000) errors.message = "Please keep your message under 5,000 characters.";

  return errors;
}
