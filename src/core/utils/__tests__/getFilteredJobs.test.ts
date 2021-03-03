import getFilteredJobs, {
  getJobFromSearchTerms,
  getJobFromContractType,
  getJobFromDate,
} from "../getFilteredJobs";
import {
  defaultFilters,
  filtersContract,
  filtersGroupByNone,
  filtersSearchTerms,
  jobs,
  filtersGroupByOffice,
  filtersPublishedAfter,
} from "../mocks";

describe("getJobFromSearchTerms", () => {
  it("should return false when search terms is not included in the job offer", () => {
    expect(getJobFromSearchTerms(jobs[0], "developer")).toEqual(false);
  });

  it("should return true when search terms is included in the job offer", () => {
    expect(getJobFromSearchTerms(jobs[1], "developer")).toEqual(true);
  });
});

describe("getJobFromContractType", () => {
  it("should return true when contract type is not defined", () => {
    expect(getJobFromContractType(jobs[0], undefined)).toEqual(true);
  });

  it("should return false when contract type is not matching the job offer contract type", () => {
    expect(getJobFromContractType(jobs[0], "Internship")).toEqual(false);
  });

  it("should return true when contract type is matching the job offer contract type", () => {
    expect(getJobFromContractType(jobs[0], "Full-Time")).toEqual(true);
  });
});

describe("getJobFromDate", () => {
  it("should return true when date is null", () => {
    expect(getJobFromDate(jobs[1], null)).toEqual(true);
  });

  it("should return false when job offer date is before the date choosed by the user", () => {
    expect(getJobFromDate(jobs[1], "2021-01-26T17:20:35.496+01:00")).toEqual(
      false
    );
  });

  it("should return true when job offer date is after the date choosed by the user", () => {
    expect(getJobFromDate(jobs[0], "2021-01-25T17:20:35.496+01:00")).toEqual(
      true
    );
  });
});

describe("getFilteredJobs", () => {
  it("should return jobs grouped by department name", () => {
    expect(getFilteredJobs(jobs, defaultFilters)).toEqual({
      Media: [jobs[0]],
      Tech: [jobs[1]],
    });
  });

  it("should return jobs with the search term developer grouped by department name", () => {
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
