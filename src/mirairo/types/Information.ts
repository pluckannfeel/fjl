export type PersonalInformation = {
  id?: string;
  img_url: File | string | null;
  nationality: string;
  name: Name;
  first_name?: string;
  last_name?: string;
  middle_name?: string;
  birth_date: BirthDate;
  age: number;
  gender: string;
  birth_place: string;
  marital_status: string;
  occupation: string;
  current_address: string;
  phone_number: string;
  // legal
  passport_number: string;
  passport_expiry: Date | null;
  email: string;
  family: FamilyInformation[];
  has_family: "yes" | "none";
  education: EducationBackground[];
  work_experience: WorkExperience[];
  qualifications_licenses: QualificationsLicenses[];
  jlpt: string;
  jft: string;
  nat: string;
  japanese: string;
  english: string;
  computer_skills: string;
  other_skills?: string;
  self_introduction?: string;
  reason_for_application?: string;
  past_experience?: string;
  future_career_plan?: string;
  photos?: File[];
  links: Link[];
  unique_questions: Questions[];
};

type Name = {
  first_name: string;
  last_name?: string;
  middle_name: string;
};

type BirthDate = {
  year: string;
  month: string;
  day: string;
};

export type FamilyInformation = {
  id?: string;
  name: string;
  relationship: string;
  birth_date: Date | null;
  age: number;
  nationality: string;
  intended_to_stay: boolean;
  work_school_place: string;
  residence_card_number: string;
};

export type EducationBackground = {
  id?: string | number;
  school_name: string;
  faculty?: string;
  major?: string;
  from: Date | null;
  to: Date | null;
};

export type QualificationsLicenses = {
  id?: string | number;
  name: string;
  acquired_date: Date | null;
  file: File | null;
};

export type WorkExperience = {
  id?: string | number;
  employer_name: string;
  from: Date | null;
  to: Date | null;
  position: string;
  responsibilities?: string;
  achievements?: string;
};

export type Link = {
  id?: string;
  link: string;
};

export type Questions = {
  id: string;
  question: string;
  answer: string;
};
