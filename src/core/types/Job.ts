export type Job = {
  id: number;
  name: string;
  description: string;
  published_at: string | Date;
  created_at: {
    en: string;
  };
  office: {
    name: string;
  };
  contract_type: {
    en: string;
  };
  department: {
    name: string;
  };
  profile: string;
  recruitment_process: string;
  websites_urls: {
    url: string;
    website_reference: string;
  }[];
};
