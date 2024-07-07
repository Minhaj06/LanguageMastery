import React, { useContext, useEffect, useState } from "react";
import InstructorCard from "../cards/instructorCard/InstructorCard";
import SectionTitle from "../sectionTitle/SectionTitle";
import axios from "axios";
import { AuthContext } from "../../context/auth";
AuthContext;

const PopularInstructorsSection = () => {
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
    } catch (error) {
      console.log(error);
    } finally {
      loading(false);
    }
  };

  return (
    <section className="py-20 bg-slate-100 dark:bg-gray-700">
      <div className="container mx-auto px-3">
        <SectionTitle
          heading="Popular Instructors"
          subheading="Expert Instructors to Guide You. Embark on an Educational Journey with the Best in the Field!"
        />
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {instructors.slice(0, 6).map((instructor) => (
            <InstructorCard key={instructor?._id} instructor={instructor} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default PopularInstructorsSection;
