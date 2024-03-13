import { Group, ActionIcon, Avatar } from "@mantine/core";
import { useTranslation } from "react-i18next";
import classes from "../classes/ModeToggleAction.module.css";

// Importing flag images
import japanFlag from "../assets/images/japan.png";
import ukFlag from "../assets/images/united-kingdom.png";

export function LanguageToggleAction() {
  // const {  } = useSettings(); // Use settings if needed
  const { i18n } = useTranslation();

  const toggleLanguage = () => {
    const newLang = i18n.language === "en" ? "ja" : "en";
    i18n.changeLanguage(newLang);
  };

  // Determine which flag to show based on the current language
  const flagImage = i18n.language === "en" ? japanFlag : ukFlag;
  const altText =
    i18n.language === "en" ? "Japanese Flag" : "United Kingdom Flag";

  return (
    <Group justify="center">
      <ActionIcon
        onClick={toggleLanguage}
        variant="default"
        size="lg"
        aria-label="Toggle language"
      >
        <Avatar src={flagImage} alt={altText} size="lg" />
      </ActionIcon>
    </Group>
  );
}
