export const profile = {
  name: "Jayeola Olasunkanmi Idyat",
  shortName: "Jayeola",
  monogram: "JO",
  role: "Data Analyst",
  location: "Lagos, Nigeria",
  email: "jayeolasunkanmi17@gmail.com",
  phone: "+234 901 310 1081",
  phoneHref: "tel:+2349013101081",
  cv: "/documents/Jayeola-Olasunkanmi-Idyat-CV.pdf",
  portrait: {
    src: "/images/jayeola-profile.jpg",
    width: 788,
    height: 985,
    alt: "Portrait of Jayeola Olasunkanmi Idyat smiling, wearing a black top against a white background",
  },
  headline: "I turn raw data into answers people can act on.",
  intro:
    "Data analyst with a Higher National Diploma in Statistics. I clean messy datasets, model them in Excel, query them with SQL and present them as dashboards in Excel and Power BI, across FinTech payments, retail sales, marketing and public-health data.",
  description:
    "Jayeola Olasunkanmi Idyat is a Lagos-based data analyst with an HND in Statistics, working with Excel, Power BI, SQL, R and Python on FinTech, retail, marketing and public-health data.",
} as const;

export function siteUrl(): string {
  const explicit = process.env.NEXT_PUBLIC_SITE_URL;
  if (explicit) return explicit.replace(/\/$/, "");
  const vercel = process.env.VERCEL_PROJECT_PRODUCTION_URL;
  if (vercel) return `https://${vercel}`;
  return "http://localhost:3000";
}
