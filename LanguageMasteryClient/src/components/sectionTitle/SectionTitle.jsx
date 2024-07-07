import React from "react";
import { Bounce, Fade } from "react-awesome-reveal";

const SectionTitle = ({ heading, subheading }) => {
  return (
    <Fade duration={4000}>
      <Bounce>
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold dark:text-gray-300">{heading}</h2>
          <p className="mt-2 text-xl text-gray-700 dark:text-gray-300">{subheading}</p>
        </div>
      </Bounce>
    </Fade>
  );
};

export default SectionTitle;
