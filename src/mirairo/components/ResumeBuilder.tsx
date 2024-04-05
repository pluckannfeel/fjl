import React from "react";
import {
  Page,
  Text,
  View,
  Document,
  Image,
  Font,
  StyleSheet,
} from "@react-pdf/renderer";
import { ResumeBuilderProps, ResumeTheme } from "../types/Resume";
import tinycolor from "tinycolor2";
// Roboto
import RobotoRegular from "../../core/fonts/Roboto/Roboto-Regular.ttf";
import RobotoItalic from "../../core/fonts/Roboto/Roboto-Italic.ttf";
import RobotoBold from "../../core/fonts/Roboto/Roboto-Bold.ttf";
import RobotoBoldItalic from "../../core/fonts/Roboto/Roboto-BoldItalic.ttf";
// EB_Garamond
import EB_GaramondRegular from "../../core/fonts/EB_Garamond/static/EBGaramond-Regular.ttf";
import EB_GaramondItalic from "../../core/fonts/EB_Garamond/static/EBGaramond-Italic.ttf";
import EB_GaramondBold from "../../core/fonts/EB_Garamond/static/EBGaramond-Bold.ttf";
import EB_GaramondBoldItalic from "../../core/fonts/EB_Garamond/static/EBGaramond-BoldItalic.ttf";
// Mulish
import MulishRegular from "../../core/fonts/Mulish/static/Mulish-Regular.ttf";
import MulishItalic from "../../core/fonts/Mulish/static/Mulish-Italic.ttf";
import MulishBold from "../../core/fonts/Mulish/static/Mulish-Bold.ttf";
import MulishBoldItalic from "../../core/fonts/Mulish/static/Mulish-BoldItalic.ttf";
import { color } from "framer-motion";
import {
  EducationBackground,
  QualificationsLicenses,
  Questions,
  WorkExperience,
} from "../types/Information";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";

import { ResumeStylesheet as styles } from "../classes/ResumeBuilderStyles";
import { useTranslation } from "react-i18next";
import { languageLevel } from "../helpers/constants";

Font.register({
  family: "Roboto",
  fonts: [
    { src: RobotoRegular, fontWeight: "normal", fontStyle: "normal" },
    { src: RobotoItalic, fontWeight: "normal", fontStyle: "italic" },
    { src: RobotoBold, fontWeight: "bold", fontStyle: "normal" },
    { src: RobotoBoldItalic, fontWeight: "bold", fontStyle: "italic" },
    // ...add other styles as needed
  ],
});

Font.register({
  family: "EB_Garamond",
  fonts: [
    { src: EB_GaramondRegular, fontWeight: "normal", fontStyle: "normal" },
    { src: EB_GaramondItalic, fontWeight: "normal", fontStyle: "italic" },
    { src: EB_GaramondBold, fontWeight: "bold", fontStyle: "normal" },
    { src: EB_GaramondBoldItalic, fontWeight: "bold", fontStyle: "italic" },
    // ...add other styles as needed
  ],
});

Font.register({
  family: "Mulish",
  fonts: [
    { src: MulishRegular, fontWeight: "normal", fontStyle: "normal" },
    { src: MulishItalic, fontWeight: "normal", fontStyle: "italic" },
    { src: MulishBold, fontWeight: "bold", fontStyle: "normal" },
    { src: MulishBoldItalic, fontWeight: "bold", fontStyle: "italic" },
    // ...add other styles as needed
  ],
});

const WorkExperienceList: React.FC<{ experiences: WorkExperience[] }> = ({
  experiences,
}) => {
  if (!Array.isArray(experiences)) {
    // console.error("Experiences is not an array", experiences);
    return ""; // or return an appropriate fallback UI
  }

  return (
    <View>
      {experiences.map((experience, index) => (
        <View key={index} style={styles.experienceContainer}>
          <View style={styles.dateAndTitleContainer}>
            <View style={styles.dateContainer}>
              <Text style={styles.dateRange}>
                {dayjs.utc(experience.from).format("MMM YYYY")} -
                {experience.to
                  ? dayjs.utc(experience.to).format("MMM YYYY")
                  : "Present"}
              </Text>
            </View>
            <View style={styles.experiencetitleContainer}>
              <Text style={styles.jobTitle}>
                {experience.position} at {experience.employer_name}
              </Text>

              {/* Render responsibilities and achievements */}
              <View style={styles.detailsContainer}>
                {experience.responsibilities && (
                  <Text style={styles.responsibilities}>
                    • {experience.responsibilities}
                  </Text>
                )}
                {experience.achievements && (
                  <Text style={styles.achievements}>
                    • {experience.achievements}
                  </Text>
                )}
              </View>
            </View>
          </View>
        </View>
      ))}
    </View>
  );
};

const EducationList: React.FC<{
  educationBackground: EducationBackground[];
}> = ({ educationBackground }) => {
  console.log(educationBackground);

  if (!Array.isArray(educationBackground)) {
    // console.error("educationBackground is not an array", educationBackground);
    return ""; // or return an appropriate fallback UI
  }

  return (
    <View style={styles.educationListContainer}>
      {educationBackground.map((education, index) => (
        <View key={education.id || index} style={styles.educationContainer}>
          <View style={styles.dateAndTitleContainer}>
            <View style={styles.dateContainer}>
              <Text style={styles.dateRange}>
                {education.from && dayjs.utc(education.from).format("MMM YYYY")}{" "}
                -
                {education.to
                  ? dayjs.utc(education.to).format("MMM YYYY")
                  : "Present"}
              </Text>
            </View>
            <View style={styles.educationTitleContainer}>
              <Text style={styles.schoolName}>{education.school_name}</Text>
              {/* major and faculy */}
              <View style={styles.detailsContainer}>
                {education.major ? `${education.major}, ` : ""}
                {education.faculty ? `${education.faculty}, ` : ""}
              </View>
            </View>
          </View>
        </View>
      ))}
    </View>
  );
};

const QualificationsLicensesList: React.FC<{
  licenses: QualificationsLicenses[];
}> = ({ licenses }) => {
  if (!Array.isArray(licenses)) {
    // console.error("licenses is not an array", licenses);
    return ""; // or return an appropriate fallback UI
  }

  return (
    <View>
      {licenses.map((license, index) => (
        <View key={index} style={styles.qualificationContainer}>
          <View style={styles.dateAndTitleContainer}>
            {/* <View style={styles.dateContainer}> */}
            <View
              style={[
                {
                  width: "20%",
                },
              ]}
            >
              <Text style={styles.dateRange}>
                {dayjs.utc(license.acquired_date).format("MMM YYYY")}
              </Text>
            </View>
            <View style={styles.qualificationstitleContainer}>
              <Text style={styles.jobTitle}>{license.name}</Text>

              {/* Render responsibilities and achievements */}
              {/* <View style={styles.detailsContainer}></View> */}
            </View>
          </View>
        </View>
      ))}
    </View>
  );
};

const UniqueQuestionsList: React.FC<{
  uniqueQuestions: Questions[] | undefined;
  darkerColor: string;
}> = ({ uniqueQuestions, darkerColor }) => {
  const { t } = useTranslation();

  return (
    <View style={styles.uniqueQuestionsSection}>
      {uniqueQuestions?.map((item, index) => {
        let translatedString = t(
          `mirairo.form.uniqueQuestions.${item.question}`
        );

        // Remove the leading number and period from the translated string
        translatedString = translatedString.replace(/^\d+\.\s*/, ""); // Regex to match the number and period at the start

        return (
          <View key={index}>
            <Text
              style={[
                styles.subtitle,
                {
                  color: darkerColor,
                },
              ]}
            >
              {translatedString}
            </Text>

            <Text style={styles.UQanswer}>{`= ${item.answer}`}</Text>
          </View>
        );
      })}
    </View>
  );
};

const darkenColor = (color: string, amount: number) =>
  tinycolor(color).darken(amount).toString();

const getReadableTextColor = (backgroundColor: string) => {
  // If the background color is dark, return a light text color, otherwise return a dark text color
  return tinycolor(backgroundColor).isDark() ? "#FFFFFF" : "#000000";
};

// Create Document Component
const ResumeBuilder: React.FC<ResumeBuilderProps> = ({ theme, font, data }) => {
  const darkerColor = darkenColor(theme.backgroundColor, 20);

  const textColor = getReadableTextColor(darkerColor);

  // Sample skill levels
  const skills = [
    {
      name: "Japanese",
      level: languageLevel(data?.japanese as string) as number,
    },
    {
      name: "English",
      level: languageLevel(data?.english as string) as number,
    },
    // Add more skills as needed
  ];

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

  //   const workExperienceList: WorkExperience[] = [
  //     {
  //       id: "0",
  //       employer_name: "Rhean Marketing Incorporation",
  //       from: dayjs.utc("2017-06-17T00:00:00.000Z").toDate(),
  //       to: dayjs.utc("2024-04-30T16:00:00.000Z").toDate(),
  //       position: "Branch Cashier",
  //       responsibilities: "Cashiering and making daily and monthly reports.",
  //       achievements: "Promoted two times.",
  //     },
  //     {
  //       id: "1",
  //       employer_name: "Hello Kitty Coffeeshop",
  //       from: dayjs.utc("2016-05-16T00:00:00.000Z").toDate(),
  //       to: dayjs.utc("2016-07-10T00:00:00.000Z").toDate(),
  //       position: "Barista/Cashier",
  //       responsibilities: "Cashiering and making coffee",
  //       achievements: "",
  //     },
  //   ];

  //   const educationList: EducationBackground[] = [
  //     {
  //       id: "0",
  //       school_name: "AMA COMPUTER LEARNING CENTER",
  //       from: dayjs.utc("2014-06-16T00:00:00.000Z").toDate(),
  //       to: dayjs.utc("2016-04-15T00:00:00.000Z").toDate(),
  //       major: "Hotel and Restaurand Services",
  //     },
  //     {
  //       id: "1",
  //       school_name: "AGUSAN SUR NATIONAL HIGH SCHOOL",
  //       faculty: "",
  //       major: "",
  //       from: dayjs.utc("2010-06-07T00:00:00.000Z").toDate(),
  //       to: dayjs.utc("2014-04-04T00:00:00.000Z").toDate(),
  //     },
  //   ];

  //   const qualificationList: QualificationsLicenses[] = [
  //     {
  //       id: "0",
  //       name: "Caregiving NC 2",
  //       acquired_date: dayjs.utc("2021-12-23T00:00:00.000Z").toDate(),
  //       file: null,
  //     },
  //     {
  //       id: 1,
  //       name: "Nursing Care Japanese Language Evaluation test (English)",
  //       acquired_date: dayjs.utc("2022-02-07T00:00:00.000Z").toDate(),
  //       file: null,
  //     },
  //     {
  //       id: 2,
  //       name: "Nursing Care Skills Evaluation test (English)",
  //       acquired_date: dayjs.utc("2021-11-04T00:00:00.000Z").toDate(),
  //       file: null,
  //     },
  //     {
  //       id: 3,
  //       name: "JLPT N3",
  //       acquired_date: dayjs.utc("2022-07-03T00:00:00.000Z").toDate(),
  //       file: null,
  //     },
  //   ];

  //   const uniqueQuestionsList: Questions[] = [
  //     { id: "1", question: "1", answer: "THE JOURNEY" },
  //     {
  //       id: "2",
  //       question: "7",
  //       answer:
  //         "The achievement that I am most proud of, is that in my age right now, I am still single which means, I still have a huge freedom to do the the things that I really wanted to do, I still have a chance to travel my dream country (JAPAN)  and experience their culture",
  //     },
  //     {
  //       id: "3",
  //       question: "8",
  //       answer:
  //         "I am responsible and independent.I am also perserver of my dreams and goals in life.",
  //     },
  //   ];

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
                backgroundColor: theme.backgroundColor,
              },
            ]}
          />
          {/* Multiply skill level by 20 to convert to percentage (since 5*20=100%) */}
        </View>
      </View>
    ));
  };

  return (
    <Document>
      <Page
        size="A4"
        style={[
          styles.page,
          {
            fontFamily: font,
          },
        ]}
      >
        <View
          style={[
            styles.header,
            {
              backgroundColor: theme.backgroundColor,
              color: textColor,
              opacity: 0.95,
            },
          ]}
        >
          <View>
            <Text style={[styles.headerMain, { color: textColor }]}>
              {`${data?.last_name} ${data?.first_name}`}
            </Text>
            <Text style={[styles.headerContact, { color: textColor }]}>
              {data?.occupation} {"\n"}
              {data?.email} {"\n"}
              {data?.phone_number} {"\n"}
              {data?.current_address}
            </Text>
          </View>
          <Image style={styles.image} src={`${data?.img_url}`} />
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
              Profile
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
                  Personal Information
                </Text>
              </View>
              {/* <Text style={styles.content}>... content here ...</Text> */}
              <View style={styles.table}>
                <View style={styles.row}>
                  <Text style={[styles.contentLeft, styles.column]}>
                    Nationality
                  </Text>
                  <Text style={[styles.contentRight, styles.column]}>
                    {data?.nationality}
                  </Text>
                </View>
                <View style={styles.row}>
                  <Text style={[styles.contentLeft, styles.column]}>Age</Text>
                  <Text style={[styles.contentRight, styles.column]}>
                    {data?.age}
                  </Text>
                </View>
                <View style={styles.row}>
                  <Text style={[styles.contentLeft, styles.column]}>
                    Date of Birth
                  </Text>
                  <Text style={[styles.contentRight, styles.column]}>
                    {/* April 21, 1995 */}
                    {data?.birth_date
                      ? dayjs
                          .utc(data.birth_date as any)
                          .format("MMMM DD, YYYY")
                      : ""}
                  </Text>
                </View>
                <View style={styles.row}>
                  <Text style={[styles.contentLeft, styles.column]}>
                    Birth Place
                  </Text>
                  <Text style={[styles.contentRight, styles.column]}>
                    {/* Yokohama, Kanagawa */}
                    {data?.birth_place}
                  </Text>
                </View>
                <View style={styles.row}>
                  <Text style={[styles.contentLeft, styles.column]}>
                    Marital Status
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
                  Work Experience
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
                  Education
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
                  Qualifications & Licenses
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
              Skills
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
              Certifications
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
                  ""
                )}
                {data?.jft !== "none" ? (
                  <View style={styles.row}>
                    <Text style={[styles.contentLeft, styles.column]}>JFT</Text>
                    <Text style={[styles.contentRight, styles.column]}>
                      {data?.jft}
                    </Text>
                  </View>
                ) : (
                  ""
                )}
                {data?.nat !== "none" ? (
                  <View style={styles.row}>
                    <Text style={[styles.contentLeft, styles.column]}>NAT</Text>
                    <Text style={[styles.contentRight, styles.column]}>
                      {data?.nat}
                    </Text>
                  </View>
                ) : (
                  ""
                )}
              </View>
            </View>

            {/* Computer Skills Section */}
            {data?.computer_skills ? (
              <>
                <Text style={[styles.otherSkills, { color: darkerColor }]}>
                  Computer Skills
                </Text>
                <Text style={styles.content}>{data?.computer_skills}</Text>
              </>
            ) : (
              ""
            )}

            {/* Computer Skills Section */}
            {data?.other_skills ? (
              <>
                <Text style={[styles.otherSkills, { color: darkerColor }]}>
                  Talents, Hobbies
                </Text>
                <Text style={styles.content}>
                  Cooking, singing, cleaning and baking.
                </Text>
              </>
            ) : (
              ""
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
              Career Plans / Goals
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
            Future Career Plan
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
            Reason for Applying
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
            Past Experiences
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
              Unique Questions
            </Text>
          </View>

          <UniqueQuestionsList
            uniqueQuestions={data?.unique_questions}
            darkerColor={darkerColor}
          />
        </View>

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

export default ResumeBuilder;
