import { createContext, Dispatch } from "react";

import { Filters } from "../types/Filters";
import { Job } from "../types/Job";
import { GroupBy } from "../utils/constants";
import { Action } from "./reducer";

export type State = {
  loading: boolean;
  error?: string;
  jobs: Job[];
  contractTypes: string[];
  groupBy: string[];
  filteredJobs: {
    [key: string]: Job[];
  };
  filters: Filters;
};

export type Context = [State, Dispatch<Action>];

export const initialState: State = {
  loading: true,
  error: undefined,
  jobs: [],
  contractTypes: [],
  groupBy: [GroupBy.NONE, GroupBy.OFFICE, GroupBy.DEPARTMENT],
  filteredJobs: {},
  filters: {
    searchTerms: "",
    publishedAfter: null,
    groupBy: GroupBy.DEPARTMENT,
    contractType: undefined,
  },
};

// @ts-ignore
const context = createContext<Context>([]);
const { Provider, Consumer } = context;

export { Provider, Consumer };
export default context;
