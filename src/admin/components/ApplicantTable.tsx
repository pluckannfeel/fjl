"use client";
import React, { useCallback, useEffect, useState } from "react";
import { Applicant, ApplicantRecords } from "../types/Applicant";
import {
  DataTable,
  DataTableColumn,
  DataTableProps,
  DataTableSortStatus,
} from "mantine-datatable";
import {
  ActionIcon,
  Box,
  Group,
  TextInput,
  useMantineTheme,
  Text,
  Avatar,
  Loader,
} from "@mantine/core";
import classes from "../classes/ApplicantTable.module.scss";
import {
  IconChevronUp,
  IconEdit,
  IconEye,
  IconMoodSad,
  IconSelector,
  IconTrash,
  IconSearch,
  IconX,
  IconPdf,
} from "@tabler/icons-react";
import { debounce, sortBy } from "lodash";
import { showNotification } from "@mantine/notifications";
import dayjs from "dayjs";
import { useDebouncedValue, useDisclosure } from "@mantine/hooks";
import { useTranslation } from "react-i18next";
import CustomLoader from "@/core/components/Loader";
import ImageViewer from "@/core/components/ImageViewer";
import i18n from "@/core/config/i18n";
import { PDFDownloadLink } from "@react-pdf/renderer";
import ApplicantResumeBuilder from "./ApplicantResumeBuilder";

type ApplicantTableProps = {
  loading: boolean;
  data: Applicant[] | [];
  onSelectedChange: (selected: Applicant[]) => void;
  selected: Applicant[];
  onEdit: (record: ApplicantRecords) => void;
  // onViewPDF: (record: Applicant) => void;
  onViewImage: (img_url: string) => void;
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

const PAGE_SIZE = 10;

const ApplicantTable: React.FC<ApplicantTableProps> = ({
  loading,
  data: applicant,
  selected,
  onSelectedChange,
  onEdit,
  // onViewPDF,
  onViewImage,
}) => {
  const { t } = useTranslation();
  const theme = useMantineTheme();

  const [sortStatus, setSortStatus] = useState<DataTableSortStatus<Applicant>>({
    columnAccessor: "created_at",
    direction: "desc",
  });

  // Handling change in sort status
  const handleSortChange = useCallback(
    (newSortStatus: DataTableSortStatus<Applicant>) => {
      setSortStatus(newSortStatus);
    },
    []
  );

  const [records, setRecords] = useState<Applicant[]>(applicant);

  const [query, setQuery] = useState("");
  const [debouncedQuery] = useDebouncedValue(query, 200);

  useEffect(() => {
    let sortedAndFiltered = applicant;

    if (debouncedQuery) {
      sortedAndFiltered = sortedAndFiltered.filter(
        ({ first_name, last_name }) =>
          `${first_name} ${last_name}`
            .toLowerCase()
            .includes(debouncedQuery.toLowerCase())
      );
    }

    sortedAndFiltered = sortBy(sortedAndFiltered, [sortStatus.columnAccessor]);
    if (sortStatus.direction === "desc") {
      sortedAndFiltered.reverse();
    }

    setRecords(sortedAndFiltered);
  }, [applicant, debouncedQuery, sortStatus]);

  const handleEditApplicant = (applicant: Applicant) => {
    onEdit({
      id: applicant.id,
      img_url: applicant.img_url as string,
      registered_date: applicant.created_at
        ? dayjs(applicant.created_at).toDate()
        : null,
      name: `${applicant.last_name}, ${applicant.first_name}`,
      age: applicant.age,
      gender: applicant.gender,
      interview_date: applicant.interview_date
        ? dayjs(applicant.interview_date).toDate()
        : null,
      recruiter: applicant.recruiter ? applicant.recruiter : "",
      organization: applicant.organization ? applicant.organization : "",
      result: applicant.result ? applicant.result : "",
      visa: applicant.visa ? applicant.visa : "",
    });
  };

  const columns: DataTableColumn<Applicant>[] = [
    { accessor: "id", hidden: true },
    {
      accessor: "actions",
      title: <Box></Box>,
      // width: 150,
      textAlign: "left",
      render: (applicant) => (
        <Group gap={4} justify="left" wrap="nowrap">
          {/* <ActionIcon
            size="md"
            variant="subtle"
            color="orange.6"
            // onClick={() => showModal({ applicant, action: "view" })}
            // onClick={() => onViewPDF(applicant)}
          >
             <IconPdf size={20} />
          </ActionIcon> */}
          {/* <PDFDownloadLink
            document={<ApplicantResumeBuilder data={applicant} />}
            fileName={`CV-${applicant?.first_name}-${applicant?.last_name}.pdf`}
            style={{
              textDecoration: "none",
              padding: "10px",
              color: "#4a4a4a",
              backgroundColor: "#f2f2f2",
              border: "1px solid #4a4a4a",
            }}
          >
            {({ blob, url, loading, error }) =>
              loading ? (
                <Loader color="blue" size={20} />
              ) : (
                <IconPdf size={20} />
              )
            }
          </PDFDownloadLink> */}

          <ActionIcon
            size="md"
            variant="subtle"
            color="blue"
            // onClick={() => showModal({ applicant, action: "edit" })}
            onClick={() => handleEditApplicant(applicant)}
          >
            <IconEdit size={16} />
          </ActionIcon>
          {/* <ActionIcon
              size="sm"
              variant="subtle"
              color="red"
              // onClick={() => showModal({ applicant, action: "delete" })}
              onClick={() => console.log("clicked delete")}
            >
              <IconTrash size={16} />
            </ActionIcon> */}
        </Group>
      ),
    },
    {
      accessor: "created_at",
      title: t("admin.table.headers.registered_date"),
      render: ({ created_at }) => dayjs(created_at).format("YYYY-MM-DD"),
      noWrap: true,
      sortable: true,
    },
    {
      accessor: "name",
      title: t("admin.table.headers.name"),
      render: ({ first_name, last_name, img_url }) => {
        return (
          <div
            style={{ display: "flex", alignItems: "center", cursor: "pointer" }}
            onClick={() => onViewImage(img_url as string)}
          >
            <Avatar
              size="md"
              radius="sm"
              src={img_url as string}
              alt="applicant_image"
            />
            <Text fw="bolder" ml="md">
              {`${last_name}, ${first_name}`}
            </Text>
          </div>
        );
      },
      filter: (
        <TextInput
          label={t("admin.table.filtering.name.label")}
          description={t("admin.table.filtering.name.description")}
          placeholder={t("admin.table.filtering.name.placeholder")}
          leftSection={<IconSearch size={16} />}
          rightSection={
            <ActionIcon
              size="sm"
              variant="transparent"
              c="dimmed"
              onClick={() => setQuery("")}
            >
              <IconX size={14} />
            </ActionIcon>
          }
          value={query}
          onChange={(e) => setQuery(e.currentTarget.value)}
        />
      ),
      filtering: query !== "",
      sortable: true,
    },
    {
      accessor: "age",
      title: t("admin.table.headers.age"),
      render: ({ age }) => <Text size="md">{age}</Text>,
      sortable: true,
    },
    {
      accessor: "gender",
      title: t("admin.table.headers.gender"),
      render: ({ gender }) => {
        let genderText = "";

        if (i18n.language === "ja") {
          genderText = gender === "Female" ? "女性" : "男性";
        } else if (i18n.language === "en") {
          genderText = gender;
        }

        return (
          <>
            <Text fw={"bolder"}>{genderText}</Text>
          </>
        );
      },
      sortable: true,
    },
    {
      accessor: "recruiter",
      title: t("admin.table.headers.recruiter"),
      sortable: true,
    },
    {
      accessor: "result",
      // width: 150,
      textAlign: "center",
      title: t("admin.table.headers.result"),
      render: ({ result }) => {
        return (
          <>
            <Text fw={"bolder"}>{result}</Text>
          </>
        );
      },
    },
    {
      accessor: "interview_date",
      // width: 150,
      // render: ({ interview_date }) =>
      //   dayjs(interview_date).format("YYYY/MM/DD"),
      title: t("admin.table.headers.interview_date"),
    },
    {
      accessor: "organization",
      title: t("admin.table.headers.organization"),
    },

    { accessor: "visa", title: t("admin.table.headers.visa") },
  ];

  return (
    <>
      {loading && <CustomLoader />}
      <DataTable
        // height={500}
        height="70dvh"
        verticalAlign="center"
        scrollAreaProps={{ type: "never" }}
        idAccessor={(record) => record.id || ""}
        className={classes.root}
        selectedRecords={selected}
        onSelectedRecordsChange={onSelectedChange}
        pinFirstColumn
        textSelectionDisabled
        withTableBorder
        borderRadius="sm"
        withColumnBorders
        sortStatus={sortStatus}
        onSortStatusChange={setSortStatus}
        highlightOnHover
        horizontalSpacing="sm"
        selectionTrigger="cell"
        fz="sm"
        columns={columns}
        records={records}
        noRecordsText="No records to show"
        noRecordsIcon={
          <Box p={4} mb={4} className={classes.noRecordsBox}>
            <IconMoodSad size={36} strokeWidth={1.5} />
          </Box>
        }
        styles={{
          // 👇 this is a function that receives the current theme as argument
          root: (theme) => ({
            // border: `1px solid ${theme.colors.orange[6]}`,
          }),
          table: {
            // color: "#666",
            // backgroundColor: `${theme.colors.gray[0]}`,
            // color: `${theme.colors.gray[8]}`,
          },
          header: {
            color: `${theme.colors.orange[6]}`,
            background: `${theme.colors.gray[8]}`,
            fontSize: "125%",
            zIndex: 2,
          },
        }}
        // ...
      />
    </>
  );
};

export default ApplicantTable;
