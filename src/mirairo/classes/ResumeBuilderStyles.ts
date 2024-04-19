import { StyleSheet } from "@react-pdf/renderer";

// Create styles
export const ResumeStylesheet = StyleSheet.create({
  page: {
    backgroundColor: "#F4F4F4",
    height: "100%",
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#E4E4E4",
    borderRadius: 6,
    padding: 20,
    height: 140,
    margin: 10,
  },
  headerTextContainer: {
    width: "60%", // Adjust the width as needed to prevent overflow
    marginRight: 10, // Add some margin to the right of the text container
  },
  image: {
    width: "auto",
    height: 125,
    borderRadius: 65,
  },
  headerMain: {
    fontSize: 26,
    textAlign: "left",
    fontWeight: "bold",
  },
  headerContact: {
    fontSize: 12,
    lineHeight: 1.3,
    textAlign: "left",
    fontStyle: "italic",
  },
  title: {
    fontSize: 18,
    marginBottom: 5,
    textAlign: "left",
    fontWeight: "bold",
  },
  subtitle: {
    fontSize: 15,
    margin: 5,
    textAlign: "left",
  },
  titleContainer: {
    borderBottomWidth: 1,
    borderBottomColor: "#000000",
    borderBottomStyle: "solid",
    // paddingBottom: 5,
  },
  // grid container
  gridContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 10,
  },
  leftColumn: {
    width: "65%", // Adjust width as needed
    // marginRight: "1%", // Provide some spacing between columns
  },
  rightColumn: {
    width: "30%", // Adjust width as needed
    marginRight: "5%", // Provide some spacing between columns
  },
  skillTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 4,
    textAlign: "center",
  },
  skillList: {},
  skillItem: {
    marginBottom: 10, // Add space between each skill
  },
  skillName: {
    fontSize: 14,
    marginBottom: 4, // Space between skill name and bar
  },
  skillBarContainer: {
    height: 10, // Height of the bar
    width: "100%", // Full width to represent the scale from 1 to 5
    backgroundColor: "#E4E4E4", // Background color of the bar (unfilled part)
    borderRadius: 5, // Optional: if you want rounded corners for the bar
  },
  skillBarFilled: {
    height: "100%", // Fill the height of the container
    // backgroundColor: "#4CAF50", // Color of the filled part of the bar
    borderRadius: 5, // Match container's border radius for consistency
    // Width will be dynamically set based on skill level
  },

  licenseTitle: {
    textAlign: "center",
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 6, // Add spacing between skills and licenses sections
    marginBottom: 6,
  },
  licenseList: {
    // Styles for your licenses list
    // fontSize: 12,
  },

  otherSkills: {
    textAlign: "center",
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 10, // Add spacing between skills and licenses sections
  },

  profileSection: {
    padding: 15,
    paddingBottom: 5,
    // marginBottom: 10,
  },
  profileText: {
    fontSize: 12,
    lineHeight: 1.6,
  },
  content: {
    marginTop: 6,
    fontSize: 12,
    // paddingLeft: 15,
    // paddingRight: 15,
  },
  // table
  table: {
    fontSize: 14,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    // margin: 10,
  },
  row: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 4,
  },
  column: {
    width: "50%", // Ensure both columns have equal width
  },
  contentLeft: {
    textAlign: "right", // Align text to the right
    paddingRight: 5, // Space before the center
    fontWeight: "bold",
  },
  contentRight: {
    textAlign: "left", // Align text to the left
    fontWeight: "normal",
    paddingLeft: 5, // Space after the center
  },
  // Work Experience
  experienceContainer: {
    marginTop: 10,
    marginBottom: 10,
    fontSize: 13,
  },
  dateAndTitleContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    // justifyContent: "space-around",
  },
  dateContainer: {
    width: "35%",
    // textAlign: "left", // Align date to the left side
  },
  experiencetitleContainer: {
    width: "63%",
  },
  dateRange: {
    fontWeight: "bold",
    fontStyle: "italic",
    textAlign: "left",
  },
  jobTitle: {
    fontWeight: "bold",
    textAlign: "left", // Align job title to the left side
  },
  detailsContainer: {
    marginTop: 5,
    // Add any necessary styles for the details container
  },
  responsibilities: {
    // Add any necessary styles for the responsibilities
  },
  achievements: {
    // Add any necessary styles for the achievements
  },
  // Education
  educationListContainer: {
    marginTop: 10,
    marginBottom: 10,
    fontSize: 13,
  },
  educationContainer: {
    marginBottom: 5,
  },
  educationTitleContainer: {
    width: "63%",
  },
  schoolName: {
    fontWeight: "bold",
    textAlign: "left",
  },
  // Qualifications Licenses
  qualificationContainer: {
    marginTop: 10,
    marginBottom: 10,
    fontSize: 13,
  },
  qualificationstitleContainer: {
    width: "80%",
  },
  // Self/ Career plans
  careerPlansSection: {
    padding: 15,
    marginBottom: 10,
  },
  careerPlansText: {
    paddingLeft: 15,
    paddingRight: 15,
    fontSize: 12,
    lineHeight: 1.6,
  },
  // Unique Questions
  uniqueQuestionsSection: {
    padding: 15,
    paddingTop: 0,
    marginBottom: 15,
  },
  UQanswer: {
    paddingLeft: 25,
    paddingRight: 15,
    fontSize: 12,
    lineHeight: 1.6,
  },

  trademark: {
    position: "absolute",
    fontSize: 12,
    bottom: 30,
    left: 0,
    right: 0,
    textAlign: "center",
    color: "grey",
  },
  photos: {
    flexDirection: "column",
  },
  photosSection: {
    padding: 15,
    marginBottom: 10,
  },
  imageContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center", // Center the items on the main axis
    alignItems: "center", // Center the items on the cross axis
  },
  imageWrapper: {
    width: 150, // Fixed width for the wrapper
    height: 150, // Fixed height to create square boxes
    margin: 10, // Add some margin to create space around images
    display: "flex", // Enable flex layout
    justifyContent: "center", // Center the image horizontally
    alignItems: "center", // Center the image vertically
    overflow: "hidden", // Hide parts of the image that exceed the container
  },
  photosImage: {
    maxWidth: "100%", // Limit the image width to the container's width
    maxHeight: "100%", // Limit the image height to the container's height
    objectFit: "contain", // Contain the image within the wrapper without stretching
  },

  linksSection: {
    padding: 15,
    paddingTop: 0,
    marginBottom: 10,
  },
  linkText: {
    paddingLeft: 25,
    paddingRight: 15,
    fontSize: 12,
    lineHeight: 1.6,
  },
});
