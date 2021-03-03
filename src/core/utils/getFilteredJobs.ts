import _groupBy from "lodash.groupby";

import { Filters } from "../types/Filters";
import { Job } from "../types/Job";
import { GroupBy } from "./constants";

export function getJobFromSearchTerms(job: Job, searchTerms: string) {
  return job.searchable?.toLowerCase().includes(searchTerms.toLowerCase());
}

export function getJobFromContractType(job: Job, contractType?: string) {
  return contractType === undefined || job.contract_type.en === contractType;
}

export function getJobFromDate(job: Job, date: string | Date | null) {
  return date === null || new Date(job.published_at) > new Date(date);
}

export function getJobsFromFilters(job: Job, filters: Filters) {
  const { searchTerms, contractType, publishedAfter } = filters;

  return (
    getJobFromSearchTerms(job, searchTerms) &&
    getJobFromContractType(job, contractType) &&
    getJobFromDate(job, publishedAfter)
  );
}

export default function getFilteredJobs(
  jobs: Job[],
  filters: Filters
): { [key: string]: Job[] } {
  const { groupBy } = filters;

  const filteredJobs = jobs.filter((job) => getJobsFromFilters(job, filters));

  return groupBy !== GroupBy.NONE
    ? _groupBy(filteredJobs, `${groupBy}.name`)
    : { [groupBy]: filteredJobs };
}
