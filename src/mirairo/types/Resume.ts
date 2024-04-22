import { ApplicantResume, PersonalInformation } from "./Information";

export interface ResumeBuilderProps {
  theme: ResumeTheme;
  font: string;
  data?: ApplicantResume;
  display_photo: string;
}

export interface ResumeTheme {
  textColor: string; //hex-code
  backgroundColor: string;
}
