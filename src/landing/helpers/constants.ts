import { IconAt, IconMapPin, IconPhone, IconSun } from "@tabler/icons-react";

export const links = [
  {
    id: "home",
    name: "landing.home",
    hash: "#home",
  },
  {
    id: "about",
    name: "landing.about",
    hash: "#about",
  },
  {
    id: "services",
    name: "landing.services",
    hash: "#services",
  },
  {
    id: "contact",
    name: "landing.contact",
    hash: "#contact",
  },
  // {
  //   name: "Experience",
  //   hash: "#experience",
  // },
  // {
  //   name: "Contact",
  //   hash: "#contact",
  // },
] as const;

export const contacts = [
  { title: "Email", description: "contact.email", icon: IconAt },
  { title: "Phone", description: "contact.number", icon: IconPhone },
  { title: "Address", description: "contact.address", icon: IconMapPin },
  {
    title: "Working hours",
    description: "contact.workingHours",
    icon: IconSun,
  },
] as const;
