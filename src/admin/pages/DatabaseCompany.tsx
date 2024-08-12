import React, { useState } from "react";
import classes from "@/admin/classes/Common.module.scss";
import { Box, Button, rem, Text } from "@mantine/core";
import { useTranslation } from "react-i18next";
import { useGetCompanies } from "../hooks/useCompanies";
import { Company } from "../types/Database";
import { useDisclosure, useLocalStorage } from "@mantine/hooks";
import CompanyModal from "../components/Database/Company/CompanyModal";
import { IconPlus } from "@tabler/icons-react";
import { useAddCompany } from "../hooks/useAddCompany";
import { showNotification } from "@mantine/notifications";
import CompanyTable from "../components/Database/Company/CompanyTable";
import ConfirmDialog from "@/core/components/ConfirmDialog";
import { useEditCompany } from "../hooks/useEditCompany";
import { useDeleteCompany } from "../hooks/useDeleteCompany";
import { set } from "lodash";

const DatabaseCompany: React.FC = () => {
  const { t } = useTranslation();

  // fetch hook
  const { isLoading: isDataLoading, data: companies } = useGetCompanies();
  const { isAdding, addCompany } = useAddCompany();
  const { isEditing, editCompany } = useEditCompany();
  const { isDeleting, deleteCompany } = useDeleteCompany();

   // Manage local storage in the parent component
   const [savedValues, setSavedValues, removeSavedValues] = useLocalStorage({
    key: 'company-modal-data',
    defaultValue: {
      // default values (same structure as in CompanyModal)
    },
  });

  const [selectedCompanies, setSelectedCompanies] = useState<Company[]>([]);

  const [companyUpdated, setCompanyUpdated] = useState<Company | undefined>(
    undefined
  );
  const [companiesToDelete, setCompaniesToDelete] = useState<string[]>([]);

  //modal
  const [
    companyModalOpened,
    { open: companyModalOpen, close: companyModalClose },
  ] = useDisclosure();

  // confirm dialog
  const [
    confirmDialogOpened,
    { open: confirmDialogOpen, close: confirmDialogClose },
  ] = useDisclosure();

  const processing = isDataLoading || isAdding || isEditing || isDeleting;

  // modal event handlers

  const handleOpenAddCompanyModal = () => {
    setCompanyUpdated(undefined);
    companyModalOpen();
  };

  const handleOpenUpdateCompanyModal = (company: Company) => {
    // setSelectedCompanies([company]);
    setCompanyUpdated(company);
    companyModalOpen();
  };

  const handleOpenConfirmDeleteDialog = (company_id: string) => {
    setCompaniesToDelete([...companiesToDelete, company_id]);
    confirmDialogOpen();
  };

  const handleCloseConfirmDeleteDialog = () => {
    setCompaniesToDelete([]);
    confirmDialogClose();
  };

  // event handlers
  const handleAddCompany = (company: Company) => {
    addCompany(company)
      .then(() => {
        showNotification({
          message: t("database.company.notifications.saved"),
          color: "green",
        });
        companyModalClose();
        removeSavedValues(); // clear saved values
      })
      .catch((error) => {
        console.log(error);
        showNotification({
          title: t("common.errors.unexpected.title"),
          message: t("common.errors.unexpected.subTitle" + error),
          color: "red",
        });
      });
  };

  const handleUpdateCompany = (company: Company) => {
    editCompany(company)
      .then(() => {
        showNotification({
          message: t("database.company.notifications.edited"),
          color: "cyan",
        });
        // applicantModalClose();
      })
      .catch((error) => {
        console.log(error);
        showNotification({
          title: t("common.errors.unexpected.title"),
          message: t("common.errors.unexpected.subTitle" + error),
          color: "red",
        });
      });
  };

  const handleDeleteMedicalInstitutions = async () => {
    deleteCompany(companiesToDelete)
      .then(() => {
        showNotification({
          message: t("database.company.notifications.deleted"),
          color: "orange",
        });

        setCompaniesToDelete([]);
        confirmDialogClose();
        // applicantModalClose();
      })
      .catch((error) => {
        console.log(error);
        showNotification({
          title: t("common.errors.unexpected.title"),
          message: t("common.errors.unexpected.subTitle" + error),
          color: "red",
        });
      });
  };

  return (
    <React.Fragment>
      <Box component="main" style={{ flexGrow: 1, marginLeft: rem(250) }}>
        <Text
          ta="center"
          // size="xl"
          fz={28}
          fw={500}
          c={"orange.7"}
          style={{ marginTop: "2rem" }}
        >
          {t("database.company.title")}
        </Text>

        <Button
          onClick={handleOpenAddCompanyModal}
          style={{ marginTop: "1rem" }}
          size="lg"
          color="blue.6"
        >
          <IconPlus
            style={{ width: rem(20), height: rem(20), marginRight: rem(10) }}
            stroke={3}
          />
          {t("database.company.action.add")}
        </Button>

        <CompanyTable
          loading={isDataLoading}
          data={companies || []}
          onEdit={handleOpenUpdateCompanyModal}
          onDelete={handleOpenConfirmDeleteDialog}
          onSelectedChange={setSelectedCompanies}
          selected={selectedCompanies}
        />

        <ConfirmDialog
          open={confirmDialogOpened}
          onClose={handleCloseConfirmDeleteDialog}
          onConfirm={handleDeleteMedicalInstitutions}
          title={t("database.company.action.delete")}
          description={t("database.company.action.deleteDescription")}
          pending={processing}
        />

        <CompanyModal
          open={companyModalOpened}
          onClose={companyModalClose}
          onEdit={handleUpdateCompany}
          onAdd={handleAddCompany}
          processing={false}
          company={companyUpdated}
        />
      </Box>
    </React.Fragment>
  );
};

export default DatabaseCompany;
