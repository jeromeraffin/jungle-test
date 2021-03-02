export type GroupBy = "office" | "department" | "none";

export type Filters = {
  searchTerms: string;
  publishedAfter: Date | string | null;
  groupBy: GroupBy;
  contractType?: string;
};
