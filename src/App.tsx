import React, { useContext, useEffect } from "react";
import { Actions } from "./core/store/reducer";
import { Text } from "@welcome-ui/text";
import { Box } from "@welcome-ui/box";
import { Loader } from "@welcome-ui/loader";

import context from "./core/store/context";
import { getJobs } from "./core/services/api";
import JobsContent from "./components/JobsContent";
import JobSearchForm from "./components/JobSearchForm";

function App() {
  const [{ loading, error }, dispatch] = useContext(context);

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
        p="3xl"
        w={{ xs: "100%", md: "calc(100% - 10rem)", lg: "calc(100% - 20rem)" }}
      >
        <Text variant="h2" mt="3xl" mb="3xl">
          Our offers
        </Text>
        <JobSearchForm />
        {error ? (
          <Text variant="h2" mt="3xl" mb="3xl">
            {error}
          </Text>
        ) : !loading ? (
          <JobsContent />
        ) : (
          <Loader />
        )}
      </Box>
    </Box>
  );
}

export default App;
