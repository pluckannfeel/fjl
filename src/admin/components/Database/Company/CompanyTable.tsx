"use client";
import React, { useEffect, useState } from "react";
import { Company } from "@/admin/types/Database";
import {
  DataTable,
  DataTableColumn,
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
  rem,
} from "@mantine/core";
import classes from "@/admin/classes/CompanyTable.module.scss";
import {
  IconEdit,
  IconMoodSad,
  IconSearch,
  IconX,
  IconPdf,
  IconTrash,
  IconDatabase,
} from "@tabler/icons-react";
import { sortBy } from "lodash";
// import { showNotification } from "@mantine/notifications";
import dayjs from "dayjs";
import { useDebouncedValue } from "@mantine/hooks";
import { useTranslation } from "react-i18next";
import CustomLoader from "@/core/components/Loader";
import i18n from "@/core/config/i18n";

type CompanyTableProps = {
  loading: boolean;
  data: Company[] | [];
  onSelectedChange: (selected: Company[]) => void;
  selected: Company[];
  onEdit: (record: Company) => void;
  onDelete: (record_id: string) => void;
  // onViewPDF: (record: Company) => void;
  // onViewPDF: (id: string) => void;
  // onViewImage: (img_url: string) => void;
};

const CompanyTable: React.FC<CompanyTableProps> = ({
  loading,
  data: company,
  selected,
  onSelectedChange,
  onEdit,
  onDelete
  // onViewPDF,
  // onViewImage,
}) => {
  const { t } = useTranslation();
  const theme = useMantineTheme();

  const [sortStatus, setSortStatus] = useState<DataTableSortStatus<Company>>({
    columnAccessor: "created_at",
    direction: "desc",
  });

  // Handling change in sort status
  // const handleSortChange = useCallback(
  //   (newSortStatus: DataTableSortStatus<Company>) => {
  //     setSortStatus(newSortStatus);
  //   },
  //   []
  // );

  const [records, setRecords] = useState<Company[]>(company);

  const [query, setQuery] = useState("");
  const [debouncedQuery] = useDebouncedValue(query, 200);

  useEffect(() => {
    let sortedAndFiltered = company;

    if (debouncedQuery) {
      sortedAndFiltered = sortedAndFiltered.filter(({ name_ja }) =>
        `${name_ja}`.toLowerCase().includes(debouncedQuery.toLowerCase())
      );
    }

    sortedAndFiltered = sortBy(sortedAndFiltered, [sortStatus.columnAccessor]);
    if (sortStatus.direction === "desc") {
      sortedAndFiltered.reverse();
    }

    setRecords(sortedAndFiltered);
  }, [company, debouncedQuery, sortStatus]);

  const handleEditCompany = (company: Company) => {
    onEdit(company);
  };

  const handleDeleteCompany = (company_id: string) => {
    onDelete(company_id);
  }

  const columns: DataTableColumn<Company>[] = [
    { accessor: "id", hidden: true },
    {
      accessor: "actions",
      title: t("admin.table.headers.actions"),
      width: 150,
      textAlign: "center",
      render: (company) => (
        <Group gap={12} justify="center" wrap="nowrap">
          <ActionIcon
            size="md"
            variant="subtle"
            color="orange.9"
            // onClick={() => showModal({ company, action: "edit" })}
            onClick={() => handleEditCompany(company)}
          >
            <IconEdit size={24} />
          </ActionIcon>
          <ActionIcon
            size="md"
            variant="subtle"
            color="red"
            // onClick={() => showModal({ company, action: "delete" })}
            onClick={() => handleDeleteCompany(company.id)}
          >
            <IconTrash size={24} />
          </ActionIcon>
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
      title: t("database.company.table.headers.name"),
      render: ({ name_en, name_ja }) => {
        return (
          <Text fw="normal">
            {/* {`${last_name}, ${first_name}`} */}
            {name_ja && name_en
              ? i18n.language === "en"
                ? name_en
                : name_ja
              : "Unknown Name"}
          </Text>
        );
      },
      filter: (
        <TextInput
          label={t("database.company.table.headers.name")}
          description={t("admin.table.filtering.name.description")}
          placeholder={t("admin.table.filtering.name.placeholder")}
          leftSection={<IconSearch size={16} />}
          rightSection={
            <ActionIcon
              size="lg"
              variant="transparent"
              c="dimmed"
              onClick={() => setQuery("")}
            >
              <IconX size={18} />
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
        accessor: "rep_name_ja",
        title: t("database.company.table.headers.representative_name"),
        render: ({ rep_name_ja, rep_name_en }) => { 
            return (
                <Text>{`${rep_name_ja} - ${rep_name_en}`}</Text>
            )
        }
      },
    {
      accessor: "phone",
      title: t("database.company.table.headers.phone"),
    },
    {
        accessor: "email",
        title: t("database.company.table.headers.email"),
      },
    // {
    //   accessor: "gender",
    //   title: t("admin.table.headers.gender"),
    //   render: ({ gender }) => {
    //     let genderText = "";

    //     if (i18n.language === "ja") {
    //       genderText = gender === "Female" ? "女性" : "男性";
    //     } else if (i18n.language === "en") {
    //       genderText = gender;
    //     }

    //     return (
    //       <>
    //         <Text fw={"bolder"}>{genderText}</Text>
    //       </>
    //     );
    //   },
    //   sortable: true,
    // },
    // {
    //   accessor: "result",
    //   // width: 150,
    //   textAlign: "center",
    //   title: t("admin.table.headers.result"),
    //   render: ({ result }) => {
    //     return (
    //       <>
    //         <Text fw={"bolder"}>{result}</Text>
    //       </>
    //     );
    //   },
    // },
    // {
    //   accessor: "interview_date",
    //   // width: 150,
    //   // render: ({ interview_date }) =>
    //   //   dayjs(interview_date).format("YYYY/MM/DD"),
    //   title: t("admin.table.headers.interview_date"),
    // },
    // {
    //   accessor: "organization",
    //   title: t("admin.table.headers.organization"),
    // },

    // { accessor: "visa", title: t("admin.table.headers.visa") },
  ];

  return (
    <>
      {loading && <CustomLoader />}
      <DataTable
        // height={500}
        // height="70dvh"
        verticalAlign="center"
        scrollAreaProps={{ type: "never" }}
        idAccessor={(record) => record.id || ""}
        classNames={{
            root: classes.root,
            table: classes.table,
            header: classes.header,
            footer: classes.footer,
            pagination: classes.pagination,
          }}
        selectedRecords={selected}
        onSelectedRecordsChange={onSelectedChange}
        pinFirstColumn
        textSelectionDisabled
        withTableBorder
        borderRadius="sm"
        // withColumnBorders
        sortStatus={sortStatus}
        onSortStatusChange={setSortStatus}
        highlightOnHover
        horizontalSpacing="lg"
        selectionTrigger="cell"
        fz="md"
        columns={columns}
        records={records}
        noRecordsText="No records to show"
        noRecordsIcon={
          <Box p={4} mb={4} className={classes.noRecordsBox}>
            <IconDatabase size={36} strokeWidth={1.5} />
          </Box>
        }
        styles={{
          // 👇 this is a function that receives the current theme as argument
          //   root: (theme) => ({
          //     border: `none`,
          //   }),
          table: {
            // color: "#666",
            // backgroundColor: `${theme.colors.gray[0]}`,
            // color: `${theme.colors.gray[8]}`,
            // border: `1px solid ${theme.colors.blue[2]}`,
            // borderRadius: theme.radius.md,
          },
          header: {
            // color: `${theme.colors.orange[6]}`,
            // background: `${theme.colors.cyan[5]}`,
            fontSize: rem(18),
            fontWeight: 300,
            zIndex: 2,
          },
        }}
        // ...
      />
    </>
  );
};

export default CompanyTable;
