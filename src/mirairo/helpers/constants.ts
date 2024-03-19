import { FormikErrors } from "formik";

export const genders = [
  { label: "mirairo.form.gender.options.f", value: "Female" },
  { label: "mirairo.form.gender.options.m", value: "Male" },
  { label: "mirairo.form.gender.options.n", value: "Other" },
];

export const nationalities = [
  {
    label: "mirairo.form.nationality.options.philippines",
    value: "Philippines",
  },
  { label: "mirairo.form.nationality.options.japan", value: "Japan" },
  { label: "mirairo.form.nationality.options.america", value: "America" },
  // give more options from asia
  { label: "mirairo.form.nationality.options.nepal", value: "Nepal" },
  { label: "mirairo.form.nationality.options.myanmar", value: "Myanmar" },
  { label: "mirairo.form.nationality.options.vietnam", value: "Vietnam" },
  { label: "mirairo.form.nationality.options.indonesia", value: "Indonesia" },
];

// skills languages
export const languageLevels = [
  { label: "mirairo.form.skills_languages.level.none", value: "none" },
  { label: "mirairo.form.skills_languages.level.basic", value: "basic" },
  {
    label: "mirairo.form.skills_languages.level.conversational",
    value: "conversational",
  },
  { label: "mirairo.form.skills_languages.level.business", value: "business" },
  { label: "mirairo.form.skills_languages.level.native", value: "Native" },
];

export const JLPTs = [
  { label: "mirairo.form.skills_languages.jlpt.none", value: "none" },
  { label: "mirairo.form.skills_languages.jlpt.n5", value: "N5" },
  { label: "mirairo.form.skills_languages.jlpt.n4", value: "N4" },
  { label: "mirairo.form.skills_languages.jlpt.n3", value: "N3" },
  { label: "mirairo.form.skills_languages.jlpt.n2", value: "N2" },
  { label: "mirairo.form.skills_languages.jlpt.n1", value: "N1" },
];

const currentYear = new Date().getFullYear();
const startYear = 1975;
const endYear = currentYear - 10; // Current year minus 10
export const years = Array.from({ length: endYear - startYear + 1 }, (_, i) => {
  const yearString = (endYear - i).toString(); // Create a descending list from endYear
  return {
    label: yearString,
    value: yearString,
  };
});

export const months = Array.from({ length: 12 }, (_, i) => {
  const monthString = `${i + 1}`.padStart(2, "0"); // Correctly pad single-digit months
  return {
    label: monthString,
    value: monthString,
  };
});

export const days = Array.from({ length: 31 }, (_, i) => {
  const dayString = `${i + 1}`.padStart(2, "0"); // Correctly pad single-digit days
  return {
    label: dayString,
    value: dayString,
  };
});

export function calculateAge(
  birthYear: number,
  birthMonth: number,
  birthDay: number
): number {
  const today = new Date();
  const birthDate = new Date(birthYear, birthMonth - 1, birthDay);
  let age = today.getFullYear() - birthDate.getFullYear();
  const m = today.getMonth() - birthDate.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  return age;
}

export function getNestedError<T>(
  path: string,
  errors: FormikErrors<T>
): string | undefined {
  const parts = path.split(".");
  let current: any = errors;

  for (const part of parts) {
    if (current === null || current === undefined) {
      return undefined;
    } else if (typeof current === "object" && part in current) {
      current = current[part];
    } else {
      return undefined;
    }
  }

  return typeof current === "string" ? current : undefined;
}

export const allowedURLPattern =
  /^(https:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([\/\w .-]*)*\/?$/; // Simple regex for URLs
export const disallowedDomains = [
  "xvideos.com",
  "pornhub.com",
  "xnxx.com",
  "xhamster.com",
  "redtube.com",
  "youporn.com",
  "spankbang.com",
  "xvidzz.com",
  "on.fmoviesto.site",
  "pornhd.com"
  // Add more as needed
];
