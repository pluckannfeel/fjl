export type Company = {
  id: string;
  name_en?: string;
  name_ja?: string;
  prefecture_en?: string;
  prefecture_ja?: string;
  municipality_town_en?: string;
  municipality_town_ja?: string;
  street_address_ja?: string;
  building_en?: string;
  building_ja?: string;
  postal_code?: string;
  phone?: string;
  email?: string;
  website?: string;
  rep_name_en?: string;
  rep_name_ja?: string;
  rep_name_ja_kana?: string;
  rep_position_en?: string;
  rep_position_ja?: string;
  rep_phone?: string;
  rep_email?: string;
  secondary_rep_name_en?: string;
  secondary_rep_name_ja?: string;
  secondary_rep_name_ja_kana?: string;
  secondary_rep_position_en?: string;
  secondary_rep_position_ja?: string;
  secondary_rep_phone?: string;
  secondary_rep_email?: string;
  address_ja_reading?: string;
  // new 
  year_established?: string;
  registered_industry_ja?: string;
  registered_industry_en?: string;
  regular_worker_count?: number;
  parttime_worker_count?: number;
  foreigner_worker_count?: number;
  created_at: Date;
};

export type CompanySelect = {
  id: string;
  name_en: string;
  name_ja: string;
  created_at: Date;
}

export type Agency = {
  id: string; // UUID
  name?: string | null; // Optional string, can be null
  address?: string | null; // Optional text field, can be null
  phone?: string | null; // Optional string, can be null
  email?: string | null; // Optional string, can be null
  website?: string | null; // Optional string, can be null
  rep_name?: string | null; // Optional string, can be null
  rep_position?: string | null; // Optional string, can be null
  rep_phone?: string | null; // Optional string, can be null
  rep_email?: string | null; // Optional string, can be null
  created_at: Date; // Date object
};

export type AgencySelect = {
  id: string;
  name: string;
  created_at: Date;
}

export type GenerateDocumentBase = {
  created_date: Date | null;
  selected_company: string; // uuid4
  selected_agency: string; // uuid4
};

export type JobDetails = {
  id?: string | number;
  title: string;
  no_of_workers: number;
  basic_salary: string; // yen currency
};

export type GenerateDocument = GenerateDocumentBase & {
  document_type: string
  visa_type: string;
  application_type: string;
  // Manpower request specific
  job_details?: JobDetails[];
  total_workers?: number;

  // Employment contract specific
  worker_name: string;
  philippine_address: string;
  civil_status: string;
  passport_no: string;
  passport_date_issued: Date | null;
  passport_place_issued: string;

  employment_address?: string;
  employment_term?: string;
  job_position_title?: string;
  job_position_description?: string;
  
  //ssw list of tasks
  ssw_job_title?: string;

  // titp
  titp_worker_name: "",
  titp_worker_email: "",
  titp_work_type?: string;

  //salary scheme breakdown (SSW)
  basic_salary?: number;
  income_tax?: number;
  social_insurance?: number;
  housing_cost?: number;
  utility_cost?: number;
  allowance?: number;
  net_salary?: number;
  total_deductions?: number;
  total_allowances?: number;

  // letter pack
  recipient_id?: string;
};
