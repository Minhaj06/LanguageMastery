import React, { useContext, useEffect, useState } from "react";
import SectionTitle from "../../components/sectionTitle/SectionTitle";
import ClassCard from "../../components/cards/classCard/ClassCard";
import axios from "axios";
import { AuthContext } from "../../context/auth";
import { useParams } from "react-router-dom";

const ClassByInstructorPage = () => {
  // const location = useLocation();
  // const searchParams = new URLSearchParams(location.search);
  // const email = searchParams.get("email");

  const { email } = useParams();

  const [classes, setClasses] = useState([]);

  // Context
  const { loading } = useContext(AuthContext);

  useEffect(() => {
    loadClasses();
  }, [email]);

  const loadClasses = async () => {
    loading(true);
    try {
      const { data } = await axios.get(`/instructors/classes/${email}`);
      setClasses(data);
      console.log(data);
      loading(false);
    } catch (error) {
      console.log(error);
      loading(false);
    }
  };

  return (
    <>
      <div className="bg-base-200 py-20  mt-16 dark:bg-gray-700 min-h-screen">
        <div className="container mx-auto px-4 ">
          <SectionTitle
            heading="Our Expert Instructors"
            subheading="Learn from Experienced Teachers and Language Enthusiasts"
          />
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {classes.slice(0, 6).map((classItem) => (
              <ClassCard key={classItem?._id} classItem={classItem} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default ClassByInstructorPage;
