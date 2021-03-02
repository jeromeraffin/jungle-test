import { Filters } from "../types/Filters";
import { Job } from "../types/Job";
import getFilterFunctions from "./getFilterFunctions";

export default function getFilteredJobs(
  jobs: Job[],
  filters: Filters
): { [key: string]: Job[] } {
  const { groupBy } = filters;

  const predicateFunctions = getFilterFunctions(filters);

  return jobs
    .filter((job) =>
      predicateFunctions.every((predicateFunction) => predicateFunction(job))
    )
    .reduce((acc: { [key: string]: Job[] }, job) => {
      if (groupBy === "none") {
        acc[groupBy] = acc[groupBy] || [];
        acc[groupBy].push(job);
      } else {
        acc[job[groupBy].name] = acc[job[groupBy].name] || [];
        acc[job[groupBy].name].push(job);
      }
      return acc;
    }, {});
}
