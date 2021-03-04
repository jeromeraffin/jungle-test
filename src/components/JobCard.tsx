import React, { useState } from "react";
import styled from "styled-components";
import { Box } from "@welcome-ui/box";
import { Stack } from "@welcome-ui/stack";
import { Button } from "@welcome-ui/button";
import { Text } from "@welcome-ui/text";
import { Job } from "../core/types/Job";
import { WriteIcon, LocationIcon } from "@welcome-ui/icons";

import JobModal from "./JobModal";
interface Props {
  job: Job;
}

const Info = styled.span`
  display: flex;
  align-items: center;
  > svg {
    margin-right: ${({ theme }) => theme.space.xs};
  }
`;

export default function JobCard({ job }: Props) {
  const [showModal, setShowModal] = useState(false);

  const modalAction = () => {
    setShowModal(!showModal);
  };

  return (
    <Box
      as="article"
      display="flex"
      justifyContent="space-between"
      backgroundColor="white"
      padding="xl"
      w="100%"
    >
      <Box>
        <Text variant="h4" m="0">
          {job.name}
        </Text>
        <Stack as="ul" direction="row" mt="xs" color="light.100">
          <Info>
            <WriteIcon />
            {job.contract_type.en}
          </Info>
          <Info>
            <LocationIcon /> {job.office.name}
          </Info>
        </Stack>
      </Box>
      <Button onClick={modalAction}>See more</Button>
      <JobModal visible={showModal} close={modalAction} job={job} />
    </Box>
  );
}
