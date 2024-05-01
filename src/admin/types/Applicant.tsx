import {
  EducationBackground,
  FamilyInformation,
  Link,
  QualificationsLicenses,
  Questions,
  WorkExperience,
} from "@/mirairo/types/Information";

export type Applicant = {
  id?: string;
  img_url: File | string | null;
  nationality: string;
  first_name?: string;
  last_name?: string;
  middle_name?: string;
  birth_date: string;
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
  password: string;
  confirm_password?: string;
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
  links?: Link[];
  unique_questions: Questions[];
  required_questions: Questions[];
  recruiter?: string;
  organization?: string;
  visa?: string;
  result?: string;
  interview_date?: Date;
  created_at?: Date;
};

export type ApplicantRecords = {
  id: string | undefined;
  registered_date: Date | string | undefined;
  name: string;
  recruiter: string;
  organization: string;
  result: string;
  visa: string;
};
