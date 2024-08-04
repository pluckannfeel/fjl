export const recruiters = [
  { label: "admin.form.recruiter.options.mys", value: "MYSの紹介" },
  { label: "admin.form.recruiter.options.aqium", value: "AQIUM" },
  { label: "admin.form.recruiter.options.mardel", value: "MARDEL" },
];

export const visas = [
  { label: "実習生 (TITP) ", value: "TITP" },
  { label: "特定技能	SSW", value: "SSW" },
  { label: "技術・人文・国際業務	PSW", value: "PSW" },
  { label: "留学生	IS", value: "IS" },
];

export const resultOptions = [
  { label: "◯", value: "◯" },
  { label: "×", value: "×" },
  { label: "△", value: "△" },
];

export const maritalStatusLocalize = (value: string, lang: string) => {
  if (lang === "ja") {
    switch (value) {
      case "single":
        return "独身";
      case "married":
        return "既婚";
      default:
        return value;
    }
  }

  return value;
};

export const yesNoLocalize = (value: string, lang: string) => {
  if (lang === "ja") {
    switch (value) {
      case "yes":
        return "はい";
      case "none":
        return "いいえ";
      default:
        return value;
    }
  }

  if (value === "none") {
    return "No";
  }

  return value;
};

// Database