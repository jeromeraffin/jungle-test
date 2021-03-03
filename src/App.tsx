import React, { useContext, useEffect } from "react";
import styled from "styled-components";
import { Actions } from "./core/store/reducer";
import { Text } from "@welcome-ui/text";
import { Box } from "@welcome-ui/box";
import { Loader } from "@welcome-ui/loader";

import JobSearchForm from "./components/JobSearchForm";
import JobCard from "./components/JobCard";
import context from "./core/store/context";
import { getJobs } from "./core/services/api";
import { GroupBy } from "./core/utils/constants";

const StyledBox = styled(Box)`
  > div > article:not(:last-child) {
    margin-bottom: ${({ theme }) => theme.space.md};
  }
`;

function App() {
  const [{ filteredJobs, loading, error }, dispatch] = useContext(context);

  useEffect(() => {
    getJobs()
      .then((data) =>
        dispatch({ type: Actions.SET_JOBS_SUCCESS, payload: data })
      )
      .catch(() =>
        dispatch({
          type: Actions.SET_JOBS_ERROR,
          payload: "Something went wrong !",
        })
      );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Box display="flex" justifyContent="center">
      <Box
        as="section"
        display="flex"
        flexDirection="column"
        alignItems="center"
        backgroundColor="light.800"
        pl="3xl"
        pr="3xl"
        width="100%"
      >
        {error ? (
          <Text variant="h2" mt="3xl" mb="3xl">
            {error}
          </Text>
        ) : (
          <>
            <Text variant="h2" mt="3xl" mb="3xl">
              Our offers
            </Text>
            {!loading ? (
              <>
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
              </>
            ) : (
              <Loader />
            )}
          </>
        )}
      </Box>
    </Box>
  );
}

export default App;
