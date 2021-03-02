import React from "react";
import ReactDOM from "react-dom";
import styled from "styled-components";
import { Box } from "@welcome-ui/box";
import { Button } from "@welcome-ui/button";

import { Text } from "@welcome-ui/text";
import { CrossIcon } from "@welcome-ui/icons";

import { Job } from "../core/types/Job";

interface Props {
  job: Job;
  visible: boolean;
  close: () => void;
}

const Wrapper = styled.div`
  position: fixed;
  inset: 0px;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Content = styled.article`
  position: relative;
  overflow: auto;
  max-width: 736px;
  max-height: calc(100% - 10rem);
  padding: ${({ theme }) => theme.space["3xl"]};
  background: ${({ theme }) => theme.colors.light["900"]};
  z-index: 1;
`;

export default function JobModal({ job, visible, close }: Props) {
  const url = job.websites_urls?.find(
    (url) => url.website_reference === "wttj_fr"
  )?.url;

  if (!visible) {
    return null;
  }

  return ReactDOM.createPortal(
    <Wrapper onClick={close}>
      <Content onClick={(e) => e.stopPropagation()}>
        <Text variant="h2" textAlign="center" mb="3xl">
          {job.name}
        </Text>
        <CrossIcon
          onClick={close}
          position="absolute"
          top="10px"
          right="10px"
        />
        <Box as="section">
          <Text
            variant="h3"
            borderBottomWidth="1px"
            borderBottomColor="light.800"
            borderStyle="solid"
            pb="xs"
            my="md"
          >
            Description
          </Text>
          <Text dangerouslySetInnerHTML={{ __html: job.description }} />
        </Box>

        <Box as="section">
          <Text
            variant="h3"
            borderBottomWidth="1px"
            borderBottomColor="light.800"
            borderStyle="solid"
            pb="xs"
            my="md"
          >
            Profile
          </Text>
          <Text dangerouslySetInnerHTML={{ __html: job.profile }} />
        </Box>
        <Box as="section">
          <Text
            variant="h3"
            borderBottomWidth="1px"
            borderBottomColor="light.800"
            borderStyle="solid"
            pb="xs"
            my="md"
          >
            Recruitment process
          </Text>
          <Text dangerouslySetInnerHTML={{ __html: job.recruitment_process }} />
        </Box>
        <Box display="flex" justifyContent="center" my="3xl">
          <Button as="a" href={url} w={1 / 2}>
            Apply
          </Button>
        </Box>
      </Content>
    </Wrapper>,
    document.getElementById("root")!
  );
}
