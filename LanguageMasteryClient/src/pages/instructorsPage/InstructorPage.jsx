import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/auth";
import axios from "axios";
import SectionTitle from "../../components/sectionTitle/SectionTitle";
import InstructorCardAlt from "../../components/cards/instructorCard/InstructorCardAlt";

const InstructorsPage = () => {
  const [instructors, setInstructors] = useState([]);

  // Context
  const { loading } = useContext(AuthContext);

  useEffect(() => {
    loadInstructors();
  }, []);

  const loadInstructors = async () => {
    loading(true);
    try {
      const { data } = await axios.get("/instructors");
      const sortedInstructors = data.sort((a, b) => b.students - a.students);
      setInstructors(sortedInstructors);
      console.log(data);
    } catch (error) {
      console.log(error);
    } finally {
      loading(false);
    }
  };

  return (
    <div className="bg-base-200 py-20  mt-16 dark:bg-gray-700 min-h-screen">
      <div className="container mx-auto px-4 ">
        <SectionTitle
          heading="Our Expert Instructors"
          subheading="Learn from Experienced Teachers and Language Enthusiasts"
        />
        <div className="grid grid-cols-1 gap-8">
          {instructors.map((instructor) => (
            <InstructorCardAlt instructor={instructor} key={instructor?._id} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default InstructorsPage;
