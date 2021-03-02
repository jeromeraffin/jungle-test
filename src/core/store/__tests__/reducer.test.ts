import { GroupBy } from "../../utils/constants";
import {
  filtersContract,
  filtersGroupByOffice,
  filtersGroupByNone,
  filtersSearchTerms,
  jobs,
  stateWithJobs,
} from "../../utils/mocks";
import { initialState } from "../context";
import reducer, { Actions } from "../reducer";

describe("reducer", () => {
  it("should return the state with jobs setted", () => {
    expect(
      reducer(initialState, { type: Actions.SET_JOBS, payload: jobs })
    ).toEqual({
      jobs,
      filteredJobs: {
        Media: [jobs[0]],
        Tech: [jobs[1]],
      },
      contractTypes: ["Full-Time", "Internship"],
      groupBy: [GroupBy.NONE, GroupBy.OFFICE, GroupBy.DEPARTMENT],
      filters: {
        contractType: undefined,
        groupBy: GroupBy.DEPARTMENT,
        publishedAfter: null,
        searchTerms: "",
      },
    });
  });

  it("should return the state with jobs filtered by search terms", () => {
    expect(
      reducer(stateWithJobs, {
        type: Actions.FILTER_JOBS,
        payload: filtersSearchTerms,
      })
    ).toEqual({
      jobs: jobs,
      filteredJobs: {
        Tech: [jobs[1]],
      },
      contractTypes: ["Full-Time", "Internship"],
      groupBy: [GroupBy.NONE, GroupBy.OFFICE, GroupBy.DEPARTMENT],
      filters: {
        contractType: undefined,
        groupBy: GroupBy.DEPARTMENT,
        publishedAfter: null,
        searchTerms: "developer",
      },
    });
  });

  it("should return the state with jobs filtered by contracts", () => {
    expect(
      reducer(stateWithJobs, {
        type: Actions.FILTER_JOBS,
        payload: filtersContract,
      })
    ).toEqual({
      jobs: jobs,
      filteredJobs: {
        Media: [jobs[0]],
      },
      contractTypes: ["Full-Time", "Internship"],
      groupBy: [GroupBy.NONE, GroupBy.OFFICE, GroupBy.DEPARTMENT],
      filters: {
        contractType: "Full-Time",
        groupBy: GroupBy.DEPARTMENT,
        publishedAfter: null,
        searchTerms: "",
      },
    });
  });

  it("should return the state with jobs filtered and group by office", () => {
    expect(
      reducer(stateWithJobs, {
        type: Actions.FILTER_JOBS,
        payload: filtersGroupByOffice,
      })
    ).toEqual({
      jobs,
      filteredJobs: {
        Paris: [jobs[0]],
        Bordeaux: [jobs[1]],
      },
      contractTypes: ["Full-Time", "Internship"],
      groupBy: [GroupBy.NONE, GroupBy.OFFICE, GroupBy.DEPARTMENT],
      filters: {
        contractType: undefined,
        groupBy: GroupBy.OFFICE,
        publishedAfter: null,
        searchTerms: "",
      },
    });
  });

  it("should return the state with jobs filtered and group by nothing", () => {
    expect(
      reducer(stateWithJobs, {
        type: Actions.FILTER_JOBS,
        payload: filtersGroupByNone,
      })
    ).toEqual({
      jobs,
      filteredJobs: { none: jobs },
      contractTypes: ["Full-Time", "Internship"],
      groupBy: [GroupBy.NONE, GroupBy.OFFICE, GroupBy.DEPARTMENT],
      filters: {
        contractType: undefined,
        groupBy: GroupBy.NONE,
        publishedAfter: null,
        searchTerms: "",
      },
    });
  });
});
