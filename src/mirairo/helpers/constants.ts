/* eslint-disable no-useless-escape */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { FormikErrors, FormikTouched } from "formik";

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

export const JFTs = [
  { label: "mirairo.form.skills_languages.jft.none", value: "none" },
  { label: "mirairo.form.skills_languages.jft.a1", value: "A1" },
  { label: "mirairo.form.skills_languages.jft.a2", value: "A2" },
  { label: "mirairo.form.skills_languages.jft.b1", value: "B1" },
  { label: "mirairo.form.skills_languages.jft.b2", value: "B2" },
  { label: "mirairo.form.skills_languages.jft.c1", value: "C1" },
  { label: "mirairo.form.skills_languages.jft.c2", value: "C2" },
];

export const NATs = [
  { label: "mirairo.form.skills_languages.nat.none", value: "none" },
  { label: "mirairo.form.skills_languages.nat.5q", value: "5Q" },
  { label: "mirairo.form.skills_languages.nat.4q", value: "4Q" },
  { label: "mirairo.form.skills_languages.nat.3q", value: "3Q" },
  { label: "mirairo.form.skills_languages.nat.2q", value: "2Q" },
];

export const uniqueQuestionsList = [
  { label: "mirairo.form.uniqueQuestions.1", value: "1" },
  { label: "mirairo.form.uniqueQuestions.2", value: "2" },
  { label: "mirairo.form.uniqueQuestions.3", value: "3" },
  { label: "mirairo.form.uniqueQuestions.4", value: "4" },
  { label: "mirairo.form.uniqueQuestions.5", value: "5" },
  { label: "mirairo.form.uniqueQuestions.6", value: "6" },
  { label: "mirairo.form.uniqueQuestions.7", value: "7" },
  { label: "mirairo.form.uniqueQuestions.8", value: "8" },
  { label: "mirairo.form.uniqueQuestions.9", value: "9" },
  { label: "mirairo.form.uniqueQuestions.10", value: "10" },
  { label: "mirairo.form.uniqueQuestions.11", value: "11" },
  { label: "mirairo.form.uniqueQuestions.12", value: "12" },
  { label: "mirairo.form.uniqueQuestions.13", value: "13" },
  { label: "mirairo.form.uniqueQuestions.14", value: "14" },
  { label: "mirairo.form.uniqueQuestions.15", value: "15" },
  { label: "mirairo.form.uniqueQuestions.16", value: "16" },
  { label: "mirairo.form.uniqueQuestions.17", value: "17" },
  { label: "mirairo.form.uniqueQuestions.18", value: "18" },
  { label: "mirairo.form.uniqueQuestions.19", value: "19" },
  { label: "mirairo.form.uniqueQuestions.20", value: "20" },
  { label: "mirairo.form.uniqueQuestions.21", value: "21" },
  { label: "mirairo.form.uniqueQuestions.22", value: "22" },
  { label: "mirairo.form.uniqueQuestions.23", value: "23" },
  { label: "mirairo.form.uniqueQuestions.24", value: "24" },
  { label: "mirairo.form.uniqueQuestions.25", value: "25" },
  { label: "mirairo.form.uniqueQuestions.26", value: "26" },
  { label: "mirairo.form.uniqueQuestions.27", value: "27" },
  { label: "mirairo.form.uniqueQuestions.28", value: "28" },
  { label: "mirairo.form.uniqueQuestions.29", value: "29" },
  { label: "mirairo.form.uniqueQuestions.30", value: "30" },
];

export const expectedSalaries = [
  {
    label: "mirairo.form.requiredQuestions.answers.expected_salary.1",
    value: "50,000 PHP~",
  },
  {
    label: "mirairo.form.requiredQuestions.answers.expected_salary.2",
    value: "70,000 PHP~",
  },
  {
    label: "mirairo.form.requiredQuestions.answers.expected_salary.3",
    value: "100,000 PHP~",
  },
  {
    label: "mirairo.form.requiredQuestions.answers.expected_salary.4",
    value: "150,000 PHP~",
  },
  {
    label: "mirairo.form.requiredQuestions.answers.expected_salary.5",
    value: "200,000 PHP~",
  },
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

export function getNestedTouched<T>(
  path: string,
  touched: FormikTouched<T>
): boolean {
  const parts = path.split(".");
  let current: any = touched;

  for (const part of parts) {
    if (current === null || current === undefined) {
      return false;
    } else if (typeof current === "object" && part in current) {
      current = current[part];
    } else {
      return false;
    }
  }

  return !!current; // Cast to boolean in case the value is not explicitly true or false
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
  "pornhd.com",
  // Add more as needed
];

export const convertBase64ToFile = (
  base64String: string,
  filename: string
): File => {
  const arr = base64String.split(",");
  const mime = arr[0].match(/:(.*?);/)?.[1];
  if (!mime) {
    throw new Error("Invalid MIME type in base64 string");
  }
  const bstr = atob(arr[1]);
  let n = bstr.length;
  const u8arr = new Uint8Array(n);

  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }

  return new File([u8arr], filename, { type: mime });
};

export function languageLevel(language: string) {
  switch (language) {
    case "none":
      return 1;
    case "basic":
      return 2;
    case "conversational":
      return 3;
    case "business":
      return 4;
    case "Native":
      return 5;
    default:
      return 0;
  }
}

export const isJapanese = (text: string) => {
  return /[\u3000-\u303f\u3040-\u309f\u30a0-\u30ff\uff00-\uff9f\u4e00-\u9faf\u3400-\u4dbf]/.test(
    text
  );
};

// export async function convertImageToBase64(imgUrl: string): Promise<string> {
//   try {
//     const response = await fetch(imgUrl);
//     const blob = await response.blob();
//     return new Promise((resolve, reject) => {
//       const reader = new FileReader();
//       reader.onerror = reject;
//       reader.onload = () => {
//         // Convert blob to base64
//         resolve(reader.result as string);
//       };
//       reader.readAsDataURL(blob);
//     });
//   } catch (error) {
//     console.error("Error converting image to Base64:", error);
//     throw new Error("Failed to convert image");
//   }
// }

/**
 * Converts an image URL to a base64 string.
 * @param url The URL of the image to convert.
 * @returns A promise that resolves with the base64 string of the image.
 */
export const convertImageUrlToBase64 = (url: string): Promise<string> => {
  return new Promise((resolve, reject) => {
    // Fetch the image
    fetch(url)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.blob(); // Convert the response to a Blob
      })
      .then((blob) => {
        // Create a FileReader to convert the Blob into a base64 string
        const reader = new FileReader();
        reader.onloadend = () => {
          // The result attribute contains the data as a base64 encoded string
          resolve(reader.result as string);
        };
        reader.onerror = reject;
        reader.readAsDataURL(blob); // Start reading the blob as base64
      })
      .catch((error) => {
        reject(error);
      });
  });
};
