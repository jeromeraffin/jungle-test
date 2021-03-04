import React, { useContext } from "react";
import styled from "styled-components";
import { Box } from "@welcome-ui/box";
import { Text } from "@welcome-ui/text";

import JobCard from "./JobCard";
import { GroupBy } from "../core/utils/constants";
import context from "../core/store/context";

const StyledBox = styled(Box)`
  > div > article:not(:last-child) {
    margin-bottom: ${({ theme }) => theme.space.md};
  }
`;

export default function JobsContent() {
  const [{ filteredJobs }] = useContext(context);
  const jobsKeys = Object.keys(filteredJobs);

  if (jobsKeys.length === 0 || filteredJobs[GroupBy.NONE]?.length === 0) {
    return (
      <Text variant="h3" mt="3xl" mb="3xl">
        No offers to show at the moment or no offers are matching your criteria
      </Text>
    );
  }

  return (
    <StyledBox w="100%" mb="md">
      {jobsKeys.map((key) => (
        <Box key={key}>
          {key !== GroupBy.NONE && (
            <Text variant="h4" mt="3xl" mb="3xl">
              {key}
            </Text>
          )}
          {filteredJobs[key].map((job) => (
            <JobCard key={job.id} job={job} />
          ))}
        </Box>
      ))}
    </StyledBox>
  );
}
