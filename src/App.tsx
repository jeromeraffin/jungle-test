import React, { useContext, useEffect } from "react";
import styled from "styled-components";
import JobSearchForm from "./components/JobSearchForm";
import { getJobs } from "./core/services/api";
import context from "./core/store/context";
import { Actions } from "./core/store/reducer";
import { Text } from "@welcome-ui/text";
import { Box } from "@welcome-ui/box";

import JobCard from "./components/JobCard";
import { GroupBy } from "./core/utils/constants";

const StyledBox = styled(Box)`
  > div > article:not(:last-child) {
    margin-bottom: ${({ theme }) => theme.space.md};
  }
`;

function App() {
  const [{ filteredJobs }, dispatch] = useContext(context);

  useEffect(() => {
    getJobs().then((data) =>
      dispatch({ type: Actions.SET_JOBS, payload: data })
    );
  }, []);

  return (
    <Box display="flex" justifyContent="center">
      <Box
        as="section"
        display="flex"
        flexDirection="column"
        alignItems="center"
        backgroundColor="light.800"
        pl="xl"
        pr="xl"
        width="100%"
      >
        <Text variant="h2" mt="3xl" mb="3xl">
          Our offers
        </Text>
        <JobSearchForm />
        <StyledBox w="100%" mb="md">
          {Object.keys(filteredJobs).map((key) => (
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
      </Box>
    </Box>
  );
}

export default App;
