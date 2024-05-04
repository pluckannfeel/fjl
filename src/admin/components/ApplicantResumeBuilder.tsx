import React from "react";
import { Page, Text, View, Document, Image } from "@react-pdf/renderer";
import { Applicant } from "../types/Applicant";
import tinycolor from "tinycolor2";
import { useTranslation } from "react-i18next";
import { languageLevel } from "@/mirairo/helpers/constants";
import { ResumeStylesheet as styles } from "@/mirairo/classes/ResumeBuilderStyles";
import dayjs from "dayjs";
import {
  WorkExperienceList,
  EducationList,
  QualificationsLicensesList,
  UniqueQuestionsList,
  RequiredQuestionsList,
  Gallery,
  LinksList,
} from "@/mirairo/components/Resume/ResumeBuilder";

type ApplicantResumeBuilderProps = {
  // displayPhoto: string;
  data: Applicant;
};

const darkenColor = (color: string, amount: number) =>
  tinycolor(color).darken(amount).toString();

const getReadableTextColor = (backgroundColor: string) => {
  // If the background color is dark, return a light text color, otherwise return a dark text color
  return tinycolor(backgroundColor).isDark() ? "#FFFFFF" : "#000000";
};

export const DisplayPhoto = ({ photo }: { photo: string }) => {
  return (
    <View style={styles.photos}>
      <View style={styles.imageContainer}>
        <View style={styles.imageWrapper}>
          <Image style={styles.photosImage} source={photo} />
        </View>
      </View>
    </View>
  );
};

const ApplicantResumeBuilder: React.FC<ApplicantResumeBuilderProps> = ({
  // displayPhoto,
  data,
}) => {
  const darkerColor = darkenColor("#1864AB", 20);
  const { t } = useTranslation();
  const textColor = getReadableTextColor(darkerColor);

  // Sample skill levels
  const skills = [
    {
      name: "日本語",
      level: languageLevel(data?.japanese as string) as number,
    },
    {
      name: "英語",
      level: languageLevel(data?.english as string) as number,
    },
    // Add more skills as needed
  ];

  // on data.photos extract all videos
  // Define image file extensions that we want to keep
  const imageExtensions = [".jpg", ".jpeg", ".png"];
  // const videoExtensions = [".mp4", ".mov", ".avi"];

  // Filter to only include images based on the specified extensions
  const filteredPhotos = data?.photos?.filter((photo) => {
    return imageExtensions.some((extension) =>
      photo.toString().endsWith(extension)
    );
  });

  // convert all from and to from string to dayjs.utc(data?.work_experience).toDate() in data?.work_experience
  if (data?.work_experience) {
    if (Array.isArray(data?.work_experience)) {
      data.work_experience.forEach((item) => {
        // Changed to forEach for direct mutation
        item.from = dayjs.utc(item.from).toDate();
        item.to = dayjs.utc(item.to).toDate();
      });
    }
  }

  if (data?.education) {
    if (Array.isArray(data?.education)) {
      data.education.forEach((item) => {
        item.from = dayjs.utc(item.from).toDate();
        item.to = dayjs.utc(item.to).toDate();
      });
    }
  }

  if (data?.qualifications_licenses) {
    if (Array.isArray(data?.qualifications_licenses)) {
      data.qualifications_licenses.forEach((item) => {
        item.acquired_date = dayjs.utc(item.acquired_date).toDate();
      });
    }
  }

  // Function to render skill bars
  const renderSkillBars = (skills: { name: string; level: number }[]) => {
    return skills.map((skill) => (
      <View key={skill.name} style={styles.skillItem}>
        <Text style={styles.skillName}>{skill.name}</Text>
        <View style={styles.skillBarContainer}>
          <View
            style={[
              styles.skillBarFilled,
              {
                width: `${skill.level * 20}%`,
                backgroundColor: "#1864AB",
              },
            ]}
          />
          {/* Multiply skill level by 20 to convert to percentage (since 5*20=100%) */}
        </View>
      </View>
    ));
  };

  // const resolveImageUrl = (url: string) => {
  //   const corsProxy = "https://cors-anywhere.herokuapp.com/";
  //   // Use proxy only if absolutely needed, you can also implement logic to detect CORS errors
  //   return `${corsProxy}${url}`;
  // };
  // const displayPhoto = resolveImageUrl(data?.img_url as string);

  return (
    <Document>
      <Page
        size="A4"
        style={[
          styles.page,
          {
            fontFamily: "Roboto",
          },
        ]}
      >
        <View
          style={[
            styles.header,
            {
              backgroundColor: "#1864AB",
              color: textColor,
              opacity: 0.95,
            },
          ]}
        >
          <View style={styles.headerTextContainer}>
            <Text style={[styles.headerMain, { color: textColor }]}>
              {`${data?.last_name}, ${data?.first_name}`}
            </Text>
            <Text style={[styles.headerContact, { color: textColor }]}>
              {data?.occupation} {"\n"}
              {data?.email} {"\n"}
              {data?.phone_number} {"\n"}
              {data?.current_address}
            </Text>
          </View>

          <Image
            style={styles.image}
            // src={data?.img_url as unknown as string}
            src={data?.img_url as unknown as string}
          />
          {/* <DisplayPhoto photo={data?.img_url as string} /> */}
        </View>
        <View style={styles.profileSection}>
          <View
            style={[
              styles.titleContainer,
              {
                borderBottomColor: darkerColor,
                marginBottom: 10,
              },
            ]}
          >
            <Text
              style={[
                styles.title,
                {
                  color: darkerColor,
                },
              ]}
            >
              {t("mirairo.form.self_career_plans.self_introduction.label")}
            </Text>
          </View>
          <Text style={styles.profileText}>{data?.self_introduction}</Text>
        </View>

        <View style={styles.gridContainer}>
          <View style={styles.leftColumn}>
            {/* ... Personal Information and other content ... */}
            <View style={styles.section}>
              <View
                style={[
                  styles.titleContainer,
                  {
                    borderBottomColor: darkerColor,
                    marginBottom: 10,
                  },
                ]}
              >
                <Text
                  style={[
                    styles.title,
                    {
                      color: darkerColor,
                    },
                  ]}
                >
                  {t("mirairo.sections.personalInformation")}
                </Text>
              </View>
              {/* <Text style={styles.content}>... content here ...</Text> */}
              <View style={styles.table}>
                <View style={styles.row}>
                  {/* <Text style={[styles.contentLeft, styles.column]}>
                      {t("mirairo.form.nationality.label")}
                    </Text>
                    <Text style={[styles.contentRight, styles.column]}>
                      {data?.nationality}
                    </Text> */}
                </View>
                <View style={styles.row}>
                  <Text style={[styles.contentLeft, styles.column]}>
                    {t("mirairo.form.age.label")}
                  </Text>
                  <Text style={[styles.contentRight, styles.column]}>
                    {data?.age}
                  </Text>
                </View>
                <View style={styles.row}>
                  <Text style={[styles.contentLeft, styles.column]}>
                    {t("mirairo.form.birth_date.label")}
                  </Text>
                  <Text style={[styles.contentRight, styles.column]}>
                    {/* April 21, 1995 */}
                    {data?.birth_date
                      ? dayjs.utc(data.birth_date).format("MMMM DD, YYYY")
                      : ""}
                  </Text>
                </View>
                <View style={styles.row}>
                  <Text style={[styles.contentLeft, styles.column]}>
                    {t("mirairo.form.birth_place.label")}
                  </Text>
                  <Text style={[styles.contentRight, styles.column]}>
                    {/* Yokohama, Kanagawa */}
                    {data?.birth_place}
                  </Text>
                </View>
                <View style={styles.row}>
                  <Text style={[styles.contentLeft, styles.column]}>
                    {t("mirairo.form.marital_status.label")}
                  </Text>
                  <Text style={[styles.contentRight, styles.column]}>
                    {/* Single */}
                    {data?.marital_status}
                  </Text>
                </View>
              </View>
            </View>
            <View style={styles.section}>
              <View
                style={[
                  styles.titleContainer,
                  {
                    borderBottomColor: darkerColor,
                  },
                ]}
              >
                <Text
                  style={[
                    styles.title,
                    {
                      color: darkerColor,
                    },
                  ]}
                >
                  {t("mirairo.sections.workExperience")}
                </Text>
              </View>
              {/* <Text style={styles.content}>... content here ...</Text> */}
              <WorkExperienceList
                experiences={data?.work_experience ? data.work_experience : []}
              />
            </View>
            <View style={styles.section}>
              <View
                style={[
                  styles.titleContainer,
                  {
                    borderBottomColor: darkerColor,
                  },
                ]}
              >
                <Text
                  style={[
                    styles.title,
                    {
                      color: darkerColor,
                    },
                  ]}
                >
                  {t("mirairo.sections.educationalBackground")}
                </Text>
              </View>
              {/* <Text style={styles.content}>... content here ...</Text> */}
              <EducationList
                educationBackground={data?.education ? data.education : []}
              />
            </View>
            <View style={styles.section}>
              <View
                style={[
                  styles.titleContainer,
                  {
                    borderBottomColor: darkerColor,
                  },
                ]}
              >
                <Text
                  style={[
                    styles.title,
                    {
                      color: darkerColor,
                    },
                  ]}
                >
                  {t("mirairo.sections.qualificationsLicenses")}
                </Text>
              </View>
              <QualificationsLicensesList
                licenses={
                  data?.qualifications_licenses
                    ? data.qualifications_licenses
                    : []
                }
              />
            </View>
          </View>

          <View style={styles.rightColumn}>
            {/* Skills Section */}
            <Text
              style={[
                styles.skillTitle,
                {
                  color: darkerColor,
                },
              ]}
            >
              {t("mirairo.sections.skillsLanguages")}
            </Text>
            <View style={styles.skillList}>{renderSkillBars(skills)}</View>

            {/* Licenses Section */}
            <Text
              style={[
                styles.licenseTitle,
                {
                  color: darkerColor,
                },
              ]}
            >
              {t("mirairo.sections.certifications")}
            </Text>
            <View style={styles.licenseList}>
              <View style={styles.table}>
                {data?.jlpt !== "none" ? (
                  <View style={styles.row}>
                    <Text style={[styles.contentLeft, styles.column]}>
                      JLPT
                    </Text>
                    <Text style={[styles.contentRight, styles.column]}>
                      {data?.jlpt}
                    </Text>
                  </View>
                ) : (
                  <></>
                )}
                {data?.jft !== "none" ? (
                  <View style={styles.row}>
                    <Text style={[styles.contentLeft, styles.column]}>JFT</Text>
                    <Text style={[styles.contentRight, styles.column]}>
                      {data?.jft}
                    </Text>
                  </View>
                ) : (
                  <></>
                )}
                {data?.nat !== "none" ? (
                  <View style={styles.row}>
                    <Text style={[styles.contentLeft, styles.column]}>NAT</Text>
                    <Text style={[styles.contentRight, styles.column]}>
                      {data?.nat}
                    </Text>
                  </View>
                ) : (
                  <></>
                )}
              </View>
            </View>

            {/* Computer Skills Section */}
            {data?.computer_skills ? (
              <>
                <Text style={[styles.otherSkills, { color: darkerColor }]}>
                  {t("mirairo.form.skills_languages.computer_skills.label")}
                </Text>
                <Text style={styles.content}>{data?.computer_skills}</Text>
              </>
            ) : (
              <></>
            )}

            {/* Computer Skills Section */}
            {data?.other_skills ? (
              <>
                <Text style={[styles.otherSkills, { color: darkerColor }]}>
                  {t("mirairo.form.skills_languages.other_skills.label")}
                </Text>
                <Text style={styles.content}>{data.other_skills}</Text>
              </>
            ) : (
              <></>
            )}
          </View>
        </View>

        <View style={styles.careerPlansSection}>
          <View
            style={[
              styles.titleContainer,
              {
                borderBottomColor: darkerColor,
                marginBottom: 10,
              },
            ]}
          >
            <Text
              style={[
                styles.title,
                {
                  color: darkerColor,
                },
              ]}
            >
              {t("mirairo.sections.SelfCareerPlans")}
            </Text>
          </View>
          {/* SECTIONS GO HERE */}
          <Text
            style={[
              styles.subtitle,
              {
                color: darkerColor,
              },
            ]}
          >
            {t("mirairo.form.self_career_plans.future_career_plan.label")}
          </Text>

          <Text style={styles.careerPlansText}>{data?.future_career_plan}</Text>

          <Text
            style={[
              styles.subtitle,
              {
                color: darkerColor,
              },
            ]}
          >
            {t("mirairo.form.self_career_plans.reason_for_application.label")}
          </Text>

          <Text style={styles.careerPlansText}>
            {data?.reason_for_application}
          </Text>

          <Text
            style={[
              styles.subtitle,
              {
                color: darkerColor,
              },
            ]}
          >
            {t("mirairo.form.self_career_plans.past_experience.label")}
          </Text>

          <Text style={styles.careerPlansText}>{data?.past_experience}</Text>
        </View>

        <View style={styles.uniqueQuestionsSection}>
          <View
            style={[
              styles.titleContainer,
              {
                borderBottomColor: darkerColor,
                marginBottom: 10,
              },
            ]}
          >
            <Text
              style={[
                styles.title,
                {
                  color: darkerColor,
                },
              ]}
            >
              {t("mirairo.sections.uniqueQuestions")}
            </Text>
          </View>

          <UniqueQuestionsList
            uniqueQuestions={data?.unique_questions}
            darkerColor={darkerColor}
          />
        </View>

        <View style={styles.uniqueQuestionsSection}>
          <View
            style={[
              styles.titleContainer,
              {
                borderBottomColor: darkerColor,
                marginBottom: 10,
              },
            ]}
          >
            <Text
              style={[
                styles.title,
                {
                  color: darkerColor,
                },
              ]}
            >
              {t("mirairo.sections.requiredQuestions")}
            </Text>
          </View>

          <RequiredQuestionsList
            hasFamily={(data?.family && data.family.length > 0) as boolean}
            requiredQuestions={data?.required_questions}
            darkerColor={darkerColor}
          />
        </View>

        {data?.photos ? (
          data?.photos?.length > 0 && (
            <View style={styles.photosSection}>
              <View
                style={[
                  styles.titleContainer,
                  {
                    borderBottomColor: darkerColor,
                    marginBottom: 10,
                  },
                ]}
              >
                <Text
                  style={[
                    styles.title,
                    {
                      color: darkerColor,
                    },
                  ]}
                >
                  {t("mirairo.sections.photos")}
                </Text>
              </View>
            </View>
          )
        ) : (
          <></>
        )}
        <Gallery
          //   photos={data?.photos ? (data.photos as unknown as string[]) : []}
          photos={data?.photos ? (filteredPhotos as unknown as string[]) : []}
        />
        {/* <Gallery
            photo={data?.img_url ? (data.img_url as unknown as string) : ""}
          /> */}

        {data?.links ? (
          data?.links?.length > 0 && (
            <View style={styles.linksSection}>
              <View
                style={[
                  styles.titleContainer,
                  {
                    borderBottomColor: darkerColor,
                    marginBottom: 10,
                  },
                ]}
              >
                <Text
                  style={[
                    styles.title,
                    {
                      color: darkerColor,
                    },
                  ]}
                >
                  Shared Links
                </Text>
              </View>
            </View>
          )
        ) : (
          <></>
        )}

        <LinksList links={data?.links} darkerColor={darkerColor} />

        {/* <Text
            style={styles.trademark}
            render={({ pageNumber, totalPages }) =>
              `${pageNumber} / ${totalPages}`
            }
            fixed
          /> */}
        <Text
          style={styles.trademark}
          // fixed
        >
          Created by Mirairo
        </Text>
      </Page>
    </Document>
  );
};

export default ApplicantResumeBuilder;
