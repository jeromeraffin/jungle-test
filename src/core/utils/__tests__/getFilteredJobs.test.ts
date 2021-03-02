import getFilteredJobs from "../getFilteredJobs";
import {
  defaultFilters,
  filtersContract,
  filtersGroupByNone,
  filtersSearchTerms,
  jobs,
  filtersGroupByOffice,
  filtersPublishedAfter,
} from "../mocks";

describe("reducer", () => {
  it("should return jobs grouped by department name", () => {
    expect(getFilteredJobs(jobs, defaultFilters)).toEqual({
      Media: [jobs[0]],
      Tech: [jobs[1]],
    });
  });

  it("should return jobs with the seach term developer grouped by department name", () => {
    expect(getFilteredJobs(jobs, filtersSearchTerms)).toEqual({
      Tech: [jobs[1]],
    });
  });

  it("should return full-time jobs grouped by department name", () => {
    expect(getFilteredJobs(jobs, filtersContract)).toEqual({
      Media: [jobs[0]],
    });
  });

  it("should return jobs grouped by office name", () => {
    expect(getFilteredJobs(jobs, filtersGroupByOffice)).toEqual({
      Paris: [jobs[0]],
      Bordeaux: [jobs[1]],
    });
  });

  it("should return jobs grouped by nothing", () => {
    expect(getFilteredJobs(jobs, filtersGroupByNone)).toEqual({
      none: jobs,
    });
  });

  it("should return jobs published after January 25th and grouped by department name", () => {
    expect(getFilteredJobs(jobs, filtersPublishedAfter)).toEqual({
      Media: [jobs[0]],
    });
  });
});
