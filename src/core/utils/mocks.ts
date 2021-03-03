import { initialState } from "../store/context";
import { GroupBy } from "./constants";

export const jobs = [
  {
    id: 305400,
    name: "Manager",
    description: "<p>description</p>",
    published_at: "2021-01-26T17:20:35.496+01:00",
    created_at: {
      en: "The 26 January 2021 at 16h56",
    },
    office: {
      name: "Paris",
    },
    department: {
      name: "Media",
    },
    contract_type: {
      en: "Full-Time",
    },
    profile: "<p>profile</p>",
    recruitment_process: "<ul>process</ul>\n",
    websites_urls: [
      {
        website_reference: "wttj_fr",
        url:
          "https://www.welcometothejungle.com/companies/wttj/jobs/sales-developement-manager_paris",
      },
    ],
    searchable: "Manager <p>description</p> <p>profile</p>",
    applyUrl:
      "https://www.welcometothejungle.com/companies/wttj/jobs/sales-developement-manager_paris",
  },
  {
    id: 305401,
    name: "Developer",
    description: "<p>description</p>",
    published_at: "2021-01-25T17:20:35.496+01:00",
    created_at: {
      en: "The 25 January 2021 at 16h56",
    },
    office: {
      name: "Bordeaux",
    },
    department: {
      name: "Tech",
    },
    contract_type: {
      en: "Internship",
    },
    profile: "<p>profile</p>",
    recruitment_process: "<ul>process</ul>\n",
    websites_urls: [
      {
        website_reference: "wttj_fr",
        url:
          "https://www.welcometothejungle.com/companies/wttj/jobs/developer_bordeaux",
      },
    ],
    searchable: "Developer <p>description</p> <p>profile</p>",
    applyUrl:
      "https://www.welcometothejungle.com/companies/wttj/jobs/developer_bordeaux",
  },
];

export const stateWithJobs = {
  ...initialState,
  loading: false,
  error: undefined,
  jobs,
  contractTypes: ["Full-Time", "Internship"],
  filteredJobs: {
    Tech: [jobs[0]],
    Media: [jobs[1]],
  },
};

export const defaultFilters = {
  contractType: undefined,
  groupBy: GroupBy.DEPARTMENT,
  publishedAfter: null,
  searchTerms: "",
};

export const filtersSearchTerms = {
  ...defaultFilters,
  searchTerms: "developer",
};

export const filtersContract = {
  ...defaultFilters,
  contractType: "Full-Time",
};

export const filtersGroupByOffice = {
  ...defaultFilters,
  groupBy: GroupBy.OFFICE,
};

export const filtersGroupByNone = {
  ...defaultFilters,
  groupBy: GroupBy.NONE,
};

export const filtersPublishedAfter = {
  ...defaultFilters,
  publishedAfter: "2021-01-25T17:20:35.496+01:00",
};
