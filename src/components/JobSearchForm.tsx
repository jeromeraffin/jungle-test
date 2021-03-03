import React, { ChangeEvent, useContext, useMemo, useRef } from "react";
import styled from "styled-components";
import { Box } from "@welcome-ui/box";
import { InputText } from "@welcome-ui/input-text";
import { Select } from "@welcome-ui/select";
import { DatePicker } from "@welcome-ui/date-picker";

import { Actions } from "../core/store/reducer";
import context from "../core/store/context";
import { GroupBy } from "../core/types/Filters";

const StyledBox = styled(Box)`
  > div {
    flex-grow: 1;
    margin-left: 0;
    margin-bottom: ${({ theme }) => theme.space.xl};
  }

  > .react-datepicker-wrapper {
    width: 100% !important;
  }

  @media (min-width: ${({ theme }) => theme.breakpoints.md}px) {
    > div:not(:first-child) {
      margin-left: ${({ theme }) => theme.space.md};
    }

    > .react-datepicker-wrapper {
      width: 10rem !important;
    }
  }
`;

export default function JobSearchForm() {
  const [{ filters, contractTypes, groupBy }, dispatch] = useContext(context);
  const datePickerRef = useRef(null);

  const contractTypesOptions = useMemo(
    () =>
      contractTypes.map((contractType) => ({
        label: contractType,
        value: contractType,
      })),
    [contractTypes]
  );

  const groupByOptions = useMemo(
    () =>
      groupBy.map((group) => ({
        label: group,
        value: group,
      })),
    [groupBy]
  );

  const handleGroupSelectChange = (value: GroupBy) => {
    dispatch({
      type: Actions.FILTER_JOBS,
      payload: { ...filters, groupBy: value },
    });
  };

  const handleContractSelectChange = (value: string) => {
    dispatch({
      type: Actions.FILTER_JOBS,
      payload: { ...filters, contractType: value },
    });
  };

  const handleDateChange = (date: Date) => {
    dispatch({
      type: Actions.FILTER_JOBS,
      payload: { ...filters, publishedAfter: date ?? null },
    });
  };

  const handleChange = ({
    target: { name, value },
  }: ChangeEvent<HTMLInputElement>) => {
    dispatch({
      type: Actions.FILTER_JOBS,
      payload: { ...filters, [name]: value },
    });
  };

  return (
    <StyledBox
      as="form"
      display="flex"
      justifyContent="space-between"
      flexWrap="wrap"
    >
      <InputText
        id="searchTerms"
        name="searchTerms"
        isClearable
        placeholder="Your dream job?"
        value={filters.searchTerms}
        onChange={handleChange}
      />
      <Select
        id="contractType"
        name="contractType"
        w={{ xs: "100%", md: "10rem" }}
        isClearable
        placeholder="Contract Types"
        value={filters.contractType}
        options={contractTypesOptions}
        onChange={handleContractSelectChange}
      />
      <Select
        id="groupBy"
        name="groupBy"
        w={{ xs: "100%", md: "10rem" }}
        placeholder="Group by"
        value={filters.groupBy}
        options={groupByOptions}
        onChange={handleGroupSelectChange}
      />
      <DatePicker
        w={{ xs: "50%", md: "10rem" }}
        inputRef={datePickerRef}
        value={filters.publishedAfter}
        placeholder="Date"
        maxDate={new Date()}
        popperProps={{
          placement: "bottom-start",
        }}
        onChange={handleDateChange}
      />
    </StyledBox>
  );
}
