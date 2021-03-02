import { Filters } from "../types/Filters";
import { Job } from "../types/Job";
import getFilteredJobs from "../utils/getFilteredJobs";
import { State } from "./context";

export enum Actions {
  SET_JOBS = "SET_JOBS",
  FILTER_JOBS = "FILTER_JOBS",
}

export type Action =
  | { type: Actions.SET_JOBS; payload: Job[] }
  | { type: Actions.FILTER_JOBS; payload: Filters };

export default function reducer(state: State, action: Action): State {
  switch (action.type) {
    case Actions.SET_JOBS:
      return {
        ...state,
        jobs: action.payload,
        filteredJobs: getFilteredJobs(action.payload, state.filters),
        contractTypes: Array.from(
          new Set(action.payload.map((job) => job.contract_type.en))
        ),
      };
    case Actions.FILTER_JOBS:
      const newFilteredJobs = getFilteredJobs(state.jobs, action.payload);

      return {
        ...state,
        filters: action.payload,
        filteredJobs: newFilteredJobs,
      };
    default:
      return state;
  }
}
