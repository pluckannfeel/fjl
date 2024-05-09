import React from "react";
import { Page, Text, View, Document, Image, Font } from "@react-pdf/renderer";
import { ResumeBuilderProps } from "../../types/Resume";
import tinycolor from "tinycolor2";
// Roboto
import RobotoRegular from "../../../core/fonts/Roboto/Roboto-Regular.ttf";
import RobotoItalic from "../../../core/fonts/Roboto/Roboto-Italic.ttf";
import RobotoBold from "../../../core/fonts/Roboto/Roboto-Bold.ttf";
import RobotoBoldItalic from "../../../core/fonts/Roboto/Roboto-BoldItalic.ttf";
// EB_Garamond
import EB_GaramondRegular from "../../../core/fonts/EB_Garamond/static/EBGaramond-Regular.ttf";
import EB_GaramondItalic from "../../../core/fonts/EB_Garamond/static/EBGaramond-Italic.ttf";
import EB_GaramondBold from "../../../core/fonts/EB_Garamond/static/EBGaramond-Bold.ttf";
import EB_GaramondBoldItalic from "../../../core/fonts/EB_Garamond/static/EBGaramond-BoldItalic.ttf";
// Mulish
import MulishRegular from "../../../core/fonts/Mulish/static/Mulish-Regular.ttf";
import MulishItalic from "../../../core/fonts/Mulish/static/Mulish-Italic.ttf";
import MulishBold from "../../../core/fonts/Mulish/static/Mulish-Bold.ttf";
import MulishBoldItalic from "../../../core/fonts/Mulish/static/Mulish-BoldItalic.ttf";
// Yumin
// import YuminRegular from "../../../core/fonts/Yu_Mincho/yumin.ttf";
// import YuminBold from "../../../core/fonts/Yu_Mincho/yumindb.ttf";

import NotoSansRegular from "../../../core/fonts/Noto_Sans_JP/static/NotoSansJP-Regular.ttf";
import NotoSansBold from "../../../core/fonts/Noto_Sans_JP/static/NotoSansJP-Bold.ttf";

import {
  EducationBackground,
  Link,
  QualificationsLicenses,
  Questions,
  WorkExperience,
} from "../../types/Information";
import dayjs from "dayjs";
// import utc from "dayjs/plugin/utc";

import { ResumeStylesheet as styles } from "../../classes/ResumeBuilderStyles";
import { useTranslation } from "react-i18next";
import { languageLevel } from "../../helpers/constants";
import { yesNoLocalize } from "@/admin/helpers/constants";
import i18n from "@/core/config/i18n";
// import { useApplicantAuth } from "../../contexts/ApplicantAuthProvider";

Font.register({
  family: "Noto_Sans",
  fonts: [
    { src: NotoSansRegular, fontStyle: "normal" },
    { src: NotoSansBold, fontWeight: "bold" },
  ],
});

Font.register({
  family: "Roboto",
  fonts: [
    { src: NotoSansBold, fontWeight: "bold" },
    { src: NotoSansRegular, fontStyle: "normal" },
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
    { src: NotoSansBold, fontWeight: "bold" },
    { src: NotoSansRegular, fontStyle: "normal" },
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
    { src: NotoSansBold, fontWeight: "bold" },
    { src: NotoSansRegular, fontStyle: "normal" },
    { src: MulishRegular, fontWeight: "normal", fontStyle: "normal" },
    { src: MulishItalic, fontWeight: "normal", fontStyle: "italic" },
    { src: MulishBold, fontWeight: "bold", fontStyle: "normal" },
    { src: MulishBoldItalic, fontWeight: "bold", fontStyle: "italic" },
    // ...add other styles as needed
  ],
});

// interface TextWithDynamicFontProps {
//   content: string;
//   style?: Style;
// }

// const TextWithDynamicFont: React.FC<TextWithDynamicFontProps> = ({
//   content,
//   style = {},
// }) => {
//   const fontFamily = isJapanese(content) ? "Noto Sans JP" : "Roboto";
//   const combinedStyles: Style = { fontFamily, ...style };
//   return <Text style={combinedStyles}>{content}</Text>;
// };

// Font.register({
//   family: "Yumin",
//   fonts: [
//     { src: YuminRegular, fontWeight: "normal" },
//     { src: YuminBold, fontWeight: "bold" },
//   ],
// });

export const WorkExperienceList: React.FC<{
  experiences: WorkExperience[];
}> = ({ experiences }) => {
  if (!Array.isArray(experiences)) {
    // console.error("Experiences is not an array", experiences);
    return null; // or return an appropriate fallback UI
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

export const EducationList: React.FC<{
  educationBackground: EducationBackground[];
}> = ({ educationBackground }) => {
  if (!Array.isArray(educationBackground)) {
    // console.error("educationBackground is not an array", educationBackground);
    return null; // or return an appropriate fallback UI
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
                <Text>{education.major ? `${education.major}, ` : ""}</Text>
                <Text>{education.faculty ? `${education.faculty}, ` : ""}</Text>
              </View>
            </View>
          </View>
        </View>
      ))}
    </View>
  );
};

export const QualificationsLicensesList: React.FC<{
  licenses: QualificationsLicenses[];
}> = ({ licenses }) => {
  if (!Array.isArray(licenses)) {
    // console.error("licenses is not an array", licenses);
    return null; // or return an appropriate fallback UI
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

export const UniqueQuestionsList: React.FC<{
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

interface RequiredQuestionsListProps {
  hasFamily: boolean;
  requiredQuestions: Questions[] | undefined;
  darkerColor: string;
}

export const RequiredQuestionsList: React.FC<RequiredQuestionsListProps> = ({
  // hasFamily,
  requiredQuestions,
}) => {
  return (
    <View>
      {requiredQuestions?.map((item) => {
        const questionText = item.question.replace(/^\d+\.\s*/, ""); // Clean the question string
        return (
          <View style={styles.rqRow} key={item.id}>
            <View style={styles.questionContainer}>
              <Text
                style={styles.question}
              >{`${item.id}.)  ${questionText}`}</Text>
            </View>
            <View style={styles.answerContainer}>
              <Text style={styles.answer}>
                {yesNoLocalize(item.answer, i18n.language)}
              </Text>
            </View>
          </View>
        );
      })}
    </View>
  );
};

export const LinksList: React.FC<{
  links: Link[] | undefined;
  darkerColor: string;
}> = ({ links, darkerColor }) => {
  // const { t } = useTranslation();

  return (
    <View style={styles.uniqueQuestionsSection}>
      {links?.map((item, index) => {
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
              {`Link ${index + 1}`}
            </Text>

            <Text style={styles.linkText}>{` ${item.link}`}</Text>
          </View>
        );
      })}
    </View>
  );
};

// Gallery component
// const Gallery = ({ photo }: { photo: string }) => {
//   return (
//     <View style={styles.photos}>
//       <View style={styles.imageContainer}>
//         <View style={styles.imageWrapper}>
//           <Image style={styles.photosImage} src={photo} />
//         </View>
//       </View>
//     </View>
//   );
// };

export const Gallery = ({ photos }: { photos: string[] }) => {
  const photoElements = photos.map((photo, index) => (
    <View key={index} style={styles.imageWrapper}>
      <Image style={styles.photosImage} src={photo} />
    </View>
  ));

  return (
    <View style={styles.photos}>
      <View style={styles.imageContainer}>{photoElements}</View>
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
const ResumeBuilder: React.FC<ResumeBuilderProps> = ({
  theme,
  font,
  data,
  // display_photo,
}) => {
  const darkerColor = darkenColor(theme.backgroundColor, 20);
  const { t } = useTranslation();
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

  // on data.photos extract all videos
  // Define image file extensions that we want to keep
  const imageExtensions = [".jpg", ".jpeg", ".png", ".JPG", ".JPEG", ".PNG"];
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
                backgroundColor: theme.backgroundColor,
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
            src={data?.img_url as unknown as string}
          />
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

export default ResumeBuilder;
