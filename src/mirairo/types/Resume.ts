import { PersonalInformation } from "./Information";

export interface ResumeBuilderProps {
  theme: ResumeTheme;
  font: string;
  data?: PersonalInformation;
}

export interface ResumeTheme {
  textColor: string; //hex-code
  backgroundColor: string;
}
