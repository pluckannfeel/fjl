import { IconFilePlus, IconRefresh, IconFilePencil, IconX } from "@tabler/icons-react";

export const recruiters = [
  { label: "admin.form.recruiter.options.mys", value: "MYSの紹介" },
  { label: "admin.form.recruiter.options.aqium", value: "AQIUM" },
  { label: "admin.form.recruiter.options.mardel", value: "MARDEL" },
];

export const visas = [
  { label: "実習生 (TITP) ", value: "TITP" },
  { label: "特定技能	(SSW)", value: "SSW" },
  { label: "技術・人文・国際業務	(PSW)", value: "PSW" },
  { label: "留学生	(IS)", value: "IS" },
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


// generate document

export const applicationTypes = [
  // {
  //   label: "common.clearSelection",
  //   value: null,
  //   icon: IconX,
  //   disabled: false,
  // },
  {
    label: "database.generateDocument.menu.applicationType.initial",
    value: "initial",
    icon: IconFilePlus,
    disabled: false,
  },
  {
    label: "database.generateDocument.menu.applicationType.renewal",
    value: "renewal",
    icon: IconRefresh,
    disabled: true,
  },
  {
    label:
      "database.generateDocument.menu.applicationType.additionalJobOrder.options.newPosition",
    value: "add_job_order_new",
    header:
      "database.generateDocument.menu.applicationType.additionalJobOrder.title",
    icon: IconFilePencil,
    disabled: true,
  },
  {
    label:
      "database.generateDocument.menu.applicationType.additionalJobOrder.options.samePosition",
    value: "add_job_order_same",
    header:
      "database.generateDocument.menu.applicationType.additionalJobOrder.title",
    icon: IconFilePencil,
    disabled: false,
  },
];

export const visaTypes = [
  // {
  //   label: "common.clearSelection",
  //   value: null,
  //   icon: IconX,
  //   disabled: false,
  // },
  {
    label: "database.generateDocument.menu.visa.options.psw",
    value: "psw",
    icon: null,
    disabled: false,
  },
  {
    label:
      "database.generateDocument.menu.visa.options.ssw",
    value: "ssw",
    icon: null,
    disabled: false,
  },
  {
    label: "database.generateDocument.menu.visa.options.titp",
    value: "titp",
    icon: null,
    disabled: false,
  },
  {
    label:
      "database.generateDocument.menu.visa.options.student",
    value: "student",
    icon: null,
    disabled: true,
  },
];

// Professional Working Visa
export const documentTypes = [
  // {
  //   label: "common.clearSelection",
  //   value: null,
  //   icon: IconX,
  //   disabled: false,
  // },
  {
    label: "database.generateDocument.menu.document.options.pswInitialChecklist",
    value: "psw_initial_checklist",
    icon: null,
    disabled: false,
  },
  {
    label: "database.generateDocument.menu.document.options.applicationForm",
    value: "application_form",
    icon: null,
    disabled: false,
  },
  {
    label: "database.generateDocument.menu.document.options.manpowerRequest",
    value: "manpower_request",
    icon: null,
    disabled: false,
  },
  {
    label:
      "database.generateDocument.menu.document.options.employmentContract",
    value: "employment_contract",
    icon: null,
    disabled: false,
  },
  {
    label:
      "database.generateDocument.menu.document.options.recruitmentAgreement",
    value: "recruitment_agreement",
    icon: null,
    disabled: false,
  },
  {
    label:
      "database.generateDocument.menu.document.options.defaultAgencyLicenseCopy",
    value: "aqium_license_copy",
    icon: null,
    disabled: false,
  },
  {
    label:
      "database.generateDocument.menu.document.options.defaultAgencyRepresentativePassportCopy",
    value: "aqium_representative_passport_copy",
    icon: null,
    disabled: false,
  },
  {
    label:
      "database.generateDocument.menu.document.options.letterPack",
    value: "letter_pack",
    icon: null,
    disabled: false,
  },
];


export const sswDocumentTypes = [
  {
    label: "database.generateDocument.menu.document.options.ssw.sswInitialChecklist",
    value: "ssw_initial_checklist",
    icon: null,
    disabled: false,
  },
  {
    label: "database.generateDocument.menu.document.options.ssw.applicationForm",
    value: "application_form",
    icon: null,
    disabled: false,
  },
  {
    label: "database.generateDocument.menu.document.options.ssw.companyProfile",
    value: "company_profile",
    icon: null,
    disabled: false,
  },
  {
    label: "database.generateDocument.menu.document.options.ssw.taskDutiesList",
    value: "task_qualification_list",
    icon: null,
    disabled: false,
  },
  {
    label: "database.generateDocument.menu.document.options.ssw.recruitmentAgreement",
    value: "recruitment_agreement",
    icon: null,
    disabled: false,
  },
  {
    label: "database.generateDocument.menu.document.options.ssw.manpowerRequest",
    value: "manpower_request",
    icon: null,
    disabled: false,
  },
  {
    label: "database.generateDocument.menu.document.options.ssw.employmentContract",
    value: "employment_contract",
    icon: null,
    disabled: false,
  },
  {
    label: "database.generateDocument.menu.document.options.ssw.salaryScheme",
    value: "ssw_salary_breakdown",
    icon: null,
    disabled: false,
  },
  {
    label:
      "database.generateDocument.menu.document.options.defaultAgencyLicenseCopy",
    value: "aqium_license_copy",
    icon: null,
    disabled: false,
  },
  {
    label:
      "database.generateDocument.menu.document.options.defaultAgencyRepresentativePassportCopy",
    value: "aqium_representative_passport_copy",
    icon: null,
    disabled: false,
  },
  {
    label:
      "database.generateDocument.menu.document.options.letterPack",
    value: "letter_pack",
    icon: null,
    disabled: false,
  },
]

// TITP

export const titpDocumentTypes = [
  {
    label: "database.generateDocument.menu.document.options.titp.employmentContract",
    value: "titp_employment_contract",
    icon: null,
    disabled: false,
  },
]

export const JobPositions = [
  { label: "Care Worker (介護ヘルパー）", value: "care_worker" },
  { label: "Restaurant Staff (レストランスタッフ）", value: "restaurant_staff" },
  { label: "Interior Building Cleaner (ビル清掃員）", value: "building_cleaner" },
]

export const letterPackTOAddresses = [
  { label: "MWO TOKYO", value: "63" },
  { label: "MWO OSAKA", value: "70" },
]

export const titpWorkTypes = [
  { label: "Waterproofing Sealing 「防水施工」", value: "waterproofing_sealing" },
  { label: "Construction Machinery (Ground Push and Level) 「建設機械施工 押土・整地」", value: "construction_machinery_groundpushlevel" },
  { label: "Construction Machinery (Excavation) 「建設機械施工 掘削作業」", value: "construction_machinery_excavation" },
  { label: "Painting 「塗装」", value: "painting" },
]