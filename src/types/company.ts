export type Industry =
  | "Technology"
  | "Healthcare"
  | "Finance"
  | "Education"
  | "Manufacturing"
  | "Retail"
  | "Services"
  | "Other";

export type CompanySize =
  | "1-10"
  | "11-50"
  | "51-200"
  | "201-500"
  | "501-1000"
  | "1001-5000"
  | "5000+";

export interface CompanyData {
  name: string;
  industry: Industry;
  size: CompanySize;
  website: string;
  description: string;
  location: string;
}
