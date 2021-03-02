import { Filters } from "../types/Filters";
import { Job } from "../types/Job";

type Predicate = (job: Job) => void;

export default function getFilterFunctions(filters: Filters) {
  const { searchTerms, contractType, publishedAfter } = filters;

  let predicateFunctions: Predicate[] = [
    (job) =>
      job.name.toLowerCase().includes(searchTerms.toLowerCase()) ||
      job.description.toLowerCase().includes(searchTerms.toLowerCase()) ||
      job.profile.toLowerCase().includes(searchTerms.toLowerCase()),
  ];

  if (contractType) {
    predicateFunctions.push((job) => job.contract_type.en === contractType);
  }

  if (publishedAfter) {
    predicateFunctions.push(
      (job) =>
        new Date(job.published_at).getTime() >
        new Date(publishedAfter).getTime()
    );
  }

  return predicateFunctions;
}
