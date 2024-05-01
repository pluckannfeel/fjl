"use client";
import React, { useCallback, useEffect, useState } from "react";
import { Applicant, ApplicantRecords } from "../types/Applicant";
import {
  DataTable,
  DataTableColumn,
  DataTableProps,
  DataTableSortStatus,
} from "mantine-datatable";
import { Box } from "@mantine/core";
import classes from "../classes/ApplicantTable.module.scss";
import { IconChevronUp, IconMoodSad, IconSelector } from "@tabler/icons-react";
import { sortBy } from "lodash";
import { showNotification } from "@mantine/notifications";
import dayjs from "dayjs";

type ApplicantTableProps = {
  data: ApplicantRecords[];
};

// registered_date 登録日
// name 名前
// age 年齢
// sex 性別
// recruiter  紹介者
// interview_date 面接日
// result 結果
// organization / institution 所属機関
// VISA
// PDF

const columns: DataTableColumn<ApplicantRecords>[] = [
  {
    accessor: "registered_date",
    title: "登録日",
    width: 150,
    sortable: true,
    render: ({ registered_date }) =>
      dayjs(registered_date).format("YYYY/MM/DD"),
    noWrap: true,
  },
  { accessor: "name", title: "名前", sortable: true },
  { accessor: "recruiter", title: "紹介者", sortable: true },
  { accessor: "organization", title: "所属機関", sortable: true },
  { accessor: "result", width: 150, title: "結果", sortable: true },
  { accessor: "visa", title: "VISA", sortable: true },
];

const PAGE_SIZE = 10;

function ApplicantTable({ data: applicant }: ApplicantTableProps) {
  //   const [page, setPage] = useState(1);
  //   const [sortStatus, setSortStatus] = useState<
  //     DataTableSortStatus<ApplicantRecords>
  //   >({
  //     columnAccessor: "name",
  //     direction: "asc",
  //   });

  const [selectedRecords, setSelectedRecords] = useState<ApplicantRecords[]>(
    []
  );

  //   const handleSortStatusChange = (
  //     status: DataTableSortStatus<ApplicantRecords>
  //   ) => {
  //     setPage(1);
  //     setSortStatus(status);
  //   };

  //   const editRecord = useCallback(({ name }: ApplicantRecords) => {
  //     showNotification({
  //       withBorder: true,
  //       title: "Editing record",
  //       message: `In a real application we could show a popup to edit ${name}, but this is just a demo, so we're not going to do that`,
  //     });
  //   }, []);

  return (
    <DataTable
      //   height={500}
      //   scrollAreaProps={{ type: "never" }}
      idAccessor={(record) => record.id || ""}
      className={classes.root}
      selectedRecords={selectedRecords}
      onSelectedRecordsChange={setSelectedRecords}
      //   textSelectionDisabled
      withTableBorder
      borderRadius="sm"
      withColumnBorders
      striped
      highlightOnHover
      horizontalSpacing="sm"
      //   fz="sm"
      verticalAlign="top"
      columns={columns}
      records={applicant}
      //   noRecordsText="No records to show"
      //   noRecordsIcon={
      //     <Box p={4} mb={4} className={classes.noRecordsBox}>
      //       <IconMoodSad size={36} strokeWidth={1.5} />
      //     </Box>
      //   }
      //   totalRecords={applicant.length}
      //   recordsPerPage={PAGE_SIZE}
      //   sortStatus={sortStatus}
      //   onSortStatusChange={setSortStatus}
      //   sortIcons={{
      //     sorted: <IconChevronUp size={14} />,
      //     unsorted: <IconSelector size={14} />,
      //   }}
      //   page={page}
      //   onPageChange={(p) => setPage(p)}
      // 👇 uncomment the next line to use a custom pagination size
      // paginationSize="md"
      // 👇 uncomment the next line to use a custom loading text
      // loadingText="Loading..."
      // 👇 uncomment the next line to display a custom text when no records were found
      // noRecordsText="No records found"
      // 👇 uncomment the next line to use a custom pagination text
      // paginationText={({ from, to, totalRecords }) => `Records ${from} - ${to} of ${totalRecords}`}
      // 👇 uncomment the next lines to use custom pagination colors
      // paginationActiveBackgroundColor="green"
      // paginationActiveTextColor="#e6e348"
    />
  );
}

export default ApplicantTable;
