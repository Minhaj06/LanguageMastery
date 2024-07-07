import React, { useEffect } from "react";

const Title = ({ title }) => {
  const siteName = "LanguageMastery";
  useEffect(() => {
    if (!title) {
      document.title = siteName;
    } else {
      document.title = `${siteName} || ${title}`;
    }
  }, [title]);

  return null;
};

export default Title;
