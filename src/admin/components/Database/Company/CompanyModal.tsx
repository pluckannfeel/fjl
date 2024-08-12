import {
  Button,
  Grid,
  Group,
  TextInput,
  Text,
  Modal,
  Autocomplete,
  Avatar,
  rem,
  Switch,
  useMantineTheme,
  Textarea,
} from "@mantine/core";
import classes from "@/admin/classes/Common.module.scss";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { DateInput } from "@mantine/dates";
import dayjs from "dayjs";
import timezone from "dayjs/plugin/timezone";
import { Company } from "@/admin/types/Database";
import * as yup from "yup";
import { useFormik } from "formik";
import { usePrefectures } from "@/admin/hooks/useAddressPrefectures";
import {
  IconAt,
  IconCheck,
  IconMailbox,
  IconPhone,
  IconWorldWww,
  IconX,
} from "@tabler/icons-react";
import { useLocalStorage } from "@mantine/hooks";

dayjs.extend(timezone);
dayjs.tz.setDefault("Asia/Tokyo");

interface CompanyModalProps {
  onAdd: (company: Company) => void;
  onClose: () => void;
  onEdit: (company: Company) => void;
  open: boolean;
  processing: boolean;
  company?: Company;
}

const CompanyModal: React.FC<CompanyModalProps> = ({
  onAdd,
  onClose,
  onEdit,
  open,
  processing,
  //   company: initialCompany,
  company,
}) => {
  const { t, i18n } = useTranslation();
  const theme = useMantineTheme();

  // to know if dialog is in create or update state
  const editMode = Boolean(company && company.id);

  // default state
  const [IsSecRepNeeded, setIsSecRepNeeded] = useState(false);

  useEffect(() => {
    setIsSecRepNeeded(!!company?.secondary_rep_name_en);
  }, [company]);
  // hooks
  const { data: prefectures } = usePrefectures();

  // Format prefectures data
  const formattedPrefectures_ja = prefectures!.map((pref) => ({
    value: pref.jp_prefecture,
    label: pref.jp_prefecture,
  }));

  const formattedPrefectures_en = prefectures!.map((pref) => ({
    value: pref.en_prefecture,
    label: pref.en_prefecture,
  }));

  // Use local storage to save form state if not in edit mode
  const [savedValues, setSavedValues] = useLocalStorage<Partial<Company>>({
    key: "company-modal-data",
    defaultValue: {
      name_en: "",
      name_ja: "",
      rep_name_en: "",
      rep_name_ja: "",
      rep_name_ja_kana: "",
      rep_position_en: "",
      rep_position_ja: "",
      prefecture_en: "",
      prefecture_ja: "",
      municipality_town_en: "",
      municipality_town_ja: "",
      building_en: "",
      building_ja: "",
      postal_code: "",
      phone: "",
      email: "",
      rep_phone: "",
      rep_email: "",
      secondary_rep_name_en: "",
      secondary_rep_name_ja: "",
      secondary_rep_name_ja_kana: "",
      secondary_rep_position_en: "",
      secondary_rep_position_ja: "",
      secondary_rep_phone: "",
      secondary_rep_email: "",
      address_ja_reading: "",
    },
  });

  useEffect(() => {
    if (editMode) {
      setIsSecRepNeeded(!!company?.secondary_rep_name_en);
    }
  }, [company, editMode]);

  // let initialValues: Partial<Company> = {
  //   name_en: company?.name_en || "",
  //   name_ja: company?.name_ja || "",
  //   rep_name_en: company?.rep_name_en || "",
  //   rep_name_ja: company?.rep_name_ja || "",
  //   rep_name_ja_kana: company?.rep_name_ja_kana || "",
  //   rep_position_en: company?.rep_position_en || "",
  //   rep_position_ja: company?.rep_position_ja || "",
  //   prefecture_en: company?.prefecture_en || "",
  //   prefecture_ja: company?.prefecture_ja || "",
  //   municipality_town_en: company?.municipality_town_en || "",
  //   municipality_town_ja: company?.municipality_town_ja || "",
  //   building_en: company?.building_en || "",
  //   building_ja: company?.building_ja || "",
  //   postal_code: company?.postal_code || "",
  //   phone: company?.phone || "",
  //   email: company?.email || "",
  //   // website: company?.website || "",
  //   rep_phone: company?.rep_phone || "",
  //   rep_email: company?.rep_email || "",
  //   secondary_rep_name_en: company?.secondary_rep_name_en || "",
  //   secondary_rep_name_ja: company?.secondary_rep_name_ja || "",
  //   secondary_rep_name_ja_kana: company?.secondary_rep_name_ja_kana || "",
  //   secondary_rep_position_en: company?.secondary_rep_position_en || "",
  //   secondary_rep_position_ja: company?.secondary_rep_position_ja || "",
  //   secondary_rep_phone: company?.secondary_rep_phone || "",
  //   secondary_rep_email: company?.secondary_rep_email || "",
  //   address_ja_reading: company?.address_ja_reading || "",
  // };

  // Initialize form values based on mode
  const initialValues = editMode
    ? {
        name_en: company?.name_en || "",
        name_ja: company?.name_ja || "",
        rep_name_en: company?.rep_name_en || "",
        rep_name_ja: company?.rep_name_ja || "",
        rep_name_ja_kana: company?.rep_name_ja_kana || "",
        rep_position_en: company?.rep_position_en || "",
        rep_position_ja: company?.rep_position_ja || "",
        prefecture_en: company?.prefecture_en || "",
        prefecture_ja: company?.prefecture_ja || "",
        municipality_town_en: company?.municipality_town_en || "",
        municipality_town_ja: company?.municipality_town_ja || "",
        building_en: company?.building_en || "",
        building_ja: company?.building_ja || "",
        postal_code: company?.postal_code || "",
        phone: company?.phone || "",
        email: company?.email || "",
        rep_phone: company?.rep_phone || "",
        rep_email: company?.rep_email || "",
        secondary_rep_name_en: company?.secondary_rep_name_en || "",
        secondary_rep_name_ja: company?.secondary_rep_name_ja || "",
        secondary_rep_name_ja_kana: company?.secondary_rep_name_ja_kana || "",
        secondary_rep_position_en: company?.secondary_rep_position_en || "",
        secondary_rep_position_ja: company?.secondary_rep_position_ja || "",
        secondary_rep_phone: company?.secondary_rep_phone || "",
        secondary_rep_email: company?.secondary_rep_email || "",
        address_ja_reading: company?.address_ja_reading || "",
      }
    : savedValues;

  const validationSchema = yup.object().shape({
    name_en: yup.string().required(t("common.validations.required")),
    name_ja: yup.string().required(t("common.validations.required")),
    rep_name_en: yup.string().required(t("common.validations.required")),
    rep_name_ja: yup.string().required(t("common.validations.required")),
    rep_name_ja_kana: yup.string().required(t("common.validations.required")),
    rep_position_en: yup.string().required(t("common.validations.required")),
    rep_position_ja: yup.string().required(t("common.validations.required")),
    prefecture_en: yup.string().required(t("common.validations.required")),
    prefecture_ja: yup.string().required(t("common.validations.required")),
    municipality_town_en: yup
      .string()
      .required(t("common.validations.required")),
    municipality_town_ja: yup
      .string()
      .required(t("common.validations.required")),
    building_en: yup.string().required(t("common.validations.required")),
    building_ja: yup.string().required(t("common.validations.required")),
    postal_code: yup.string().required(t("common.validations.required")),
    // phone: yup.string().required(t("common.validations.required")),
    // email: yup
    //   .string()
    //   .required(t("common.validations.required"))
    //   .email(t("common.validations.email")),
    // website: yup
    //   .string()
    //   .url(t("common.validations.url"))
    //   .required(t("common.validations.required")),
    // rep_phone: yup.string().required(t("common.validations.required")),
    // rep_email: yup
    //   .string()
    //   .email(t("common.validations.email"))
    // .required(t("common.validations.required")),
    // secondary_rep_name_en: yup.string().required(t("common.validations.required")),
    // secondary_rep_name_ja: yup.string().required(t("common.validations.required")),
    // secondary_rep_name_ja_kana: yup.string().required(t("common.validations
    // secondary_rep_position_en: yup.string().required(t("common.validations.required")),
    // secondary_rep_position_ja: yup.string().required(t("common.validations.required")),
    // secondary_rep_phone_en: yup.string().required(t("common.validations.required")),
    // secondary_rep_email_ja: yup.string().email(t("common.validations.invalid_email")).required(t("common.validations.required")),
    // address_ja_reading: yup.string().required(t("common.validations.required")),
  });

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: (values: Partial<Company>) => {
      //   console.log(values);

      if (editMode) {
        onEdit({ ...values, id: company?.id } as Company);
      } else {
        onAdd(values as Company);
      }
      setSavedValues(values);
    },
    enableReinitialize: true,
  });

  return (
    <Modal
      opened={open}
      onClose={onClose}
      className={classes.modal}
      size={"lg"}
      classNames={{
        header: classes.customModalHeader,
      }}
      title={
        <Text fw="bold" size="lg" c={"white"}>
          {company ? company.name_en : t("database.company.action.add")}
        </Text>
      }
    >
      <form onSubmit={formik.handleSubmit}>
        <Grid pt={"md"}>
          <Grid.Col span={12}>
            <Text size="md" fw={"bold"}>
              {t("database.company.form.name.label")}{" "}
              <span className={classes.required}>
                {t("common.validations.required")}
              </span>
            </Text>
          </Grid.Col>

          <Grid.Col span={"auto"}>
            <TextInput
              //   label={t("database.company.form.name_en.label")}
              label="会社名"
              name="name_ja"
              value={formik.values.name_ja}
              onChange={formik.handleChange}
              error={formik.touched.name_ja && formik.errors.name_ja}
            />
          </Grid.Col>

          <Grid.Col span={"auto"}>
            <TextInput
              //   label={t("database.company.form.name_en.label")}
              label="Company Name"
              name="name_en"
              value={formik.values.name_en}
              onChange={formik.handleChange}
              error={formik.touched.name_en && formik.errors.name_en}
            />
          </Grid.Col>

          {/* ~~~~~~~~~~~~~~~ Address ~~~~~~~~~~~~~~~ */}

          <Grid.Col span={12}>
            <Text size="md" fw={"bold"}>
              {t("database.company.form.address.label")}
              <span className={classes.required}>
                {t("common.validations.required")}
              </span>
            </Text>
          </Grid.Col>

          <Grid.Col span={{ base: 12, sm: 3 }}>
            <TextInput
              //   label={t("database.company.form.postal_code.label")}
              label="郵便番号"
              name="postal_code"
              value={formik.values.postal_code}
              onChange={formik.handleChange}
              error={formik.touched.postal_code && formik.errors.postal_code}
              leftSection={
                <Text fw={"normal"} fs={"sm"} fz={"h5"}>
                  〒
                </Text>
              }
            />
          </Grid.Col>

          <Grid.Col span={{ base: 12, sm: 3 }}>
            <Autocomplete
              //   label={t("database.company.form.prefecture.label")}
              label="都道府県"
              data={prefectures ? formattedPrefectures_ja : []}
              name="prefecture_ja"
              maxDropdownHeight={250}
              value={formik.values.prefecture_ja}
              onChange={formik.handleChange("prefecture_ja")}
              error={
                formik.touched.prefecture_ja && formik.errors.prefecture_ja
              }
            />
          </Grid.Col>

          <Grid.Col span={{ base: 12, sm: 6 }}>
            <TextInput
              //   label={t("database.company.form.municipality_town.label")}
              label="市区町村・番地"
              name="municipality_town_ja"
              value={formik.values.municipality_town_ja}
              onChange={formik.handleChange}
              error={
                formik.touched.municipality_town_ja &&
                formik.errors.municipality_town_ja
              }
            />
          </Grid.Col>

          <Grid.Col span={{ base: 12, sm: 8 }}>
            <TextInput
              //   label={t("database.company.form.building_room.label")}
              label="建物名・部屋番号"
              name="building_ja"
              value={formik.values.building_ja}
              onChange={formik.handleChange}
              error={formik.touched.building_ja && formik.errors.building_ja}
            />
          </Grid.Col>

          {/* <Grid.Col span={3}></Grid.Col> */}

          <Grid.Col span={12}>
            <Textarea
              //   label={t("database.company.form.building_room.label")}
              label="住所（カナ）"
              name="address_ja_reading"
              minRows={3}
              value={formik.values.address_ja_reading}
              onChange={formik.handleChange}
              error={
                formik.touched.address_ja_reading &&
                formik.errors.address_ja_reading
              }
            />
          </Grid.Col>

          <Grid.Col span={{ base: 12, sm: 3 }}>
            <Autocomplete
              //   label={t("database.company.form.prefecture.label")}
              label="Prefecture"
              placeholder="e.g Kanagawa Pref."
              // data={prefectures ? formattedPrefectures_en : []}
              name="prefecture_en"
              maxDropdownHeight={250}
              value={formik.values.prefecture_en}
              onChange={formik.handleChange("prefecture_en")}
              error={
                formik.touched.prefecture_en && formik.errors.prefecture_en
              }
            />
          </Grid.Col>

          <Grid.Col span={{ base: 12, sm: 6 }}>
            <TextInput
              //   label={t("database.company.form.municipality_town.label")}
              label="City"
              placeholder="e.g Yokohama City, Naka Ku"
              name="municipality_town_en"
              value={formik.values.municipality_town_en}
              onChange={formik.handleChange}
              error={
                formik.touched.municipality_town_en &&
                formik.errors.municipality_town_en
              }
            />
          </Grid.Col>

          <Grid.Col span={{ base: 12, sm: 8 }}>
            <TextInput
              //   label={t("database.company.form.building_room.label")}
              label="Room No. Building Name, Town"
              name="building_en"
              value={formik.values.building_en}
              onChange={formik.handleChange}
              error={formik.touched.building_en && formik.errors.building_en}
            />
          </Grid.Col>

          {/* ~~~~~~~~~~~~~~~ Address ~~~~~~~~~~~~~~~ */}

          {/* ~~~~~~~~~~~~~~~ contact ~~~~~~~~~~~~~~~ */}

          <Grid.Col span={12}>
            <Text size="md" fw={"bold"}>
              {t("database.company.form.contact.label")}
              {/* <span className={classes.required}>
                {t("common.validations.required")}
              </span> */}
            </Text>
          </Grid.Col>

          <Grid.Col span={6}>
            <TextInput
              label={t("database.company.form.phone.label")}
              name="phone"
              value={formik.values.phone}
              onChange={formik.handleChange}
              error={formik.touched.phone && formik.errors.phone}
              leftSection={
                <IconPhone style={{ width: rem(18), height: rem(18) }} />
              }
            />
          </Grid.Col>

          <Grid.Col span={6}>
            <TextInput
              label={t("database.company.form.email.label")}
              name="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              leftSection={
                <IconAt style={{ width: rem(18), height: rem(18) }} />
              }
              error={formik.touched.email && formik.errors.email}
            />
          </Grid.Col>

          {/* <Grid.Col span={8}>
            <TextInput
              label={t("database.company.form.website.label")}
              name="website"
              value={formik.values.website}
              onChange={formik.handleChange}
              error={formik.touched.website && formik.errors.website}
              leftSection={
                <IconWorldWww style={{ width: rem(18), height: rem(18) }} />
              }
            />
          </Grid.Col> */}

          {/* ~~~~~~~~~~~~~~~ contact ~~~~~~~~~~~~~~~ */}

          {/* ~~~~~~~~~~~~~~~ representative ~~~~~~~~~~~~~~~ */}

          <Grid.Col span={12}>
            <Text size="md" fw={"bold"}>
              {t("database.company.form.representative.label")}
              <span className={classes.required}>
                {t("common.validations.required")}
              </span>
            </Text>
          </Grid.Col>

          <Grid.Col span={4}>
            <TextInput
              //   label={t("database.company.form.rep_name.label")}
              label="名前"
              name="rep_name_ja"
              value={formik.values.rep_name_ja}
              onChange={formik.handleChange}
              error={formik.touched.rep_name_ja && formik.errors.rep_name_ja}
              placeholder="山田　太郎"
            />
          </Grid.Col>

          <Grid.Col span={4}>
            <TextInput
              //   label={t("database.company.form.rep_name.label")}
              label="名前(カナ)"
              name="rep_name_ja_kana"
              value={formik.values.rep_name_ja_kana}
              onChange={formik.handleChange}
              error={
                formik.touched.rep_name_ja_kana &&
                formik.errors.rep_name_ja_kana
              }
              placeholder="ヤマダ　タロウ"
            />
          </Grid.Col>

          <Grid.Col span={4}>
            <TextInput
              //   label={t("database.company.form.rep_name.label")}
              label="Name"
              name="rep_name_en"
              value={formik.values.rep_name_en}
              onChange={formik.handleChange}
              error={formik.touched.rep_name_en && formik.errors.rep_name_en}
              placeholder="TARO YAMADA"
            />
          </Grid.Col>

          <Grid.Col span={6}>
            <TextInput
              //   label={t("database.company.form.rep_position.label")}
              label="役職"
              name="rep_position_ja"
              value={formik.values.rep_position_ja}
              onChange={formik.handleChange}
              error={
                formik.touched.rep_position_ja && formik.errors.rep_position_ja
              }
            />
          </Grid.Col>

          <Grid.Col span={6}>
            <TextInput
              //   label={t("database.company.form.rep_position.label")}
              label="Position"
              name="rep_position_en"
              value={formik.values.rep_position_en}
              onChange={formik.handleChange}
              error={
                formik.touched.rep_position_en && formik.errors.rep_position_en
              }
            />
          </Grid.Col>

          <Grid.Col span={6}>
            <TextInput
              label={t("database.company.form.rep_phone.label")}
              name="rep_phone"
              value={formik.values.rep_phone}
              onChange={formik.handleChange}
              error={formik.touched.rep_phone && formik.errors.rep_phone}
              leftSection={
                <IconPhone style={{ width: rem(18), height: rem(18) }} />
              }
            />
          </Grid.Col>

          <Grid.Col span={6}>
            <TextInput
              label={t("database.company.form.rep_email.label")}
              name="rep_email"
              value={formik.values.rep_email}
              onChange={formik.handleChange}
              error={formik.touched.rep_email && formik.errors.rep_email}
              leftSection={
                <IconAt style={{ width: rem(18), height: rem(18) }} />
              }
            />
          </Grid.Col>

          {/* ~~~~~~~~~~~~~~~ representative ~~~~~~~~~~~~~~~ */}

          <Grid.Col span={12} mt={"sm"}>
            <Switch
              size="md"
              thumbIcon={
                IsSecRepNeeded ? (
                  <IconCheck
                    style={{ width: rem(12), height: rem(12) }}
                    color={theme.colors.teal[6]}
                    stroke={3}
                  />
                ) : (
                  <IconX
                    style={{ width: rem(12), height: rem(12) }}
                    color={theme.colors.red[6]}
                    stroke={3}
                  />
                )
              }
              label={t("database.company.form.is_secondary_rep_required.label")}
              checked={IsSecRepNeeded}
              onChange={(event) =>
                setIsSecRepNeeded(event.currentTarget.checked)
              }
            />
          </Grid.Col>

          {/*  secondary authorize representative */}

          {IsSecRepNeeded && (
            <>
              <Grid.Col span={12}>
                <Text size="md" fw={"bold"}>
                  {t("database.company.form.secondary_representative.label")}
                  {/* <span className={classes.required}>
                    {t("common.validations.required")}
                  </span> */}
                </Text>
              </Grid.Col>

              <Grid.Col span={4}>
                <TextInput
                  //   label={t("database.company.form.rep_name.label")}
                  label="名前"
                  name="secondary_rep_name_ja"
                  value={formik.values.secondary_rep_name_ja}
                  onChange={formik.handleChange}
                  error={
                    formik.touched.secondary_rep_name_ja &&
                    formik.errors.secondary_rep_name_ja
                  }
                  placeholder="山田　太郎"
                />
              </Grid.Col>

              <Grid.Col span={4}>
                <TextInput
                  //   label={t("database.company.form.rep_name.label")}
                  label="名前(カナ)"
                  name="secondary_rep_name_ja_kana"
                  value={formik.values.secondary_rep_name_ja_kana}
                  onChange={formik.handleChange}
                  error={
                    formik.touched.secondary_rep_name_ja_kana &&
                    formik.errors.secondary_rep_name_ja_kana
                  }
                  placeholder="ヤマダ　タロウ"
                />
              </Grid.Col>

              <Grid.Col span={4}>
                <TextInput
                  //   label={t("database.company.form.rep_name.label")}
                  label="Name"
                  name="secondary_rep_name_en"
                  value={formik.values.secondary_rep_name_en}
                  onChange={formik.handleChange}
                  error={
                    formik.touched.secondary_rep_name_en &&
                    formik.errors.secondary_rep_name_en
                  }
                  placeholder="YAMADA TARO"
                />
              </Grid.Col>

              <Grid.Col span={6}>
                <TextInput
                  //   label={t("database.company.form.rep_position.label")}
                  label="役職"
                  name="secondary_rep_position_ja"
                  value={formik.values.secondary_rep_position_ja}
                  onChange={formik.handleChange}
                  error={
                    formik.touched.secondary_rep_position_ja &&
                    formik.errors.secondary_rep_position_ja
                  }
                />
              </Grid.Col>

              <Grid.Col span={6}>
                <TextInput
                  //   label={t("database.company.form.rep_position.label")}
                  label="Position"
                  name="secondary_rep_position_en"
                  value={formik.values.secondary_rep_position_en}
                  onChange={formik.handleChange}
                  error={
                    formik.touched.secondary_rep_position_en &&
                    formik.errors.secondary_rep_position_en
                  }
                />
              </Grid.Col>

              <Grid.Col span={6}>
                <TextInput
                  label={t("database.company.form.rep_phone.label")}
                  name="secondary_rep_phone"
                  value={formik.values.secondary_rep_phone}
                  onChange={formik.handleChange}
                  error={
                    formik.touched.secondary_rep_phone &&
                    formik.errors.secondary_rep_phone
                  }
                  leftSection={
                    <IconPhone style={{ width: rem(18), height: rem(18) }} />
                  }
                />
              </Grid.Col>

              <Grid.Col span={6}>
                <TextInput
                  label={t("database.company.form.rep_email.label")}
                  name="secondary_rep_email"
                  value={formik.values.secondary_rep_email}
                  onChange={formik.handleChange}
                  error={
                    formik.touched.secondary_rep_email &&
                    formik.errors.secondary_rep_email
                  }
                  leftSection={
                    <IconAt style={{ width: rem(18), height: rem(18) }} />
                  }
                />
              </Grid.Col>
            </>
          )}

          {/*  secondary authorize representative */}

          <Grid.Col span={12}>
            {/* <DateInput
                valueFormat="YYYY/MM/DD"
                label={t("admin.form.interview_date.label")}
                name="created_at"
                value={formik.values.created_at}
                onChange={(date) => formik.setFieldValue("created_at", date)}
                error={formik.touched.created_at && formik.errors.created_at}
              /> */}
          </Grid.Col>
        </Grid>
        <Group mt={"lg"}>
          <Button
            variant="gradient"
            size="md"
            type="submit"
            disabled={
              !formik.dirty &&
              // !bankCardImage &&
              !formik.isSubmitting
            }
            gradient={{ from: "pink", to: "red" }}
          >
            {t("common.save")}
          </Button>
        </Group>
      </form>
    </Modal>
  );
};

export default CompanyModal;
