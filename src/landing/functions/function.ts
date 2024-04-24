// utils/scroll.ts
export const smoothScrollTo = (id: string) => {
  const element = document.getElementById(id);

  if (element) {
    element.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }
};

export default smoothScrollTo;
