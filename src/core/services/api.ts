import { Job } from "../types/Job";

export async function getJobs() {
  const response: Job[] = await fetch(
    "https://www.welcomekit.co/api/v1/embed?organization_reference=Pg4eV6k"
  )
    .then((res) => res.json())
    .then(({ jobs }) => jobs);

  return response;
}
