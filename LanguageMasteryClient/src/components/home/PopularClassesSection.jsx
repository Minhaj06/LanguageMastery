import React, { useContext, useEffect, useState } from "react";
import ClassCard from "../cards/classCard/ClassCard";
import SectionTitle from "../sectionTitle/SectionTitle";
import axios from "axios";
import { AuthContext } from "../../context/auth";

const PopularClassesSection = () => {
  const [classes, setClasses] = useState([]);

  // Context
  const { loading } = useContext(AuthContext);

  useEffect(() => {
    loadClasses();
  }, []);

  const loadClasses = async () => {
    loading(true);
    try {
      const { data } = await axios.get("/classes");
      const sortedClasses = data.sort((a, b) => b.students - a.students);
      setClasses(sortedClasses);
    } catch (error) {
      console.log(error);
    } finally {
      loading(false);
    }
  };

  return (
    <section className="py-20">
      <div className="container mx-auto px-3">
        <SectionTitle
          heading="Popular Classes"
          subheading="Unleash Your Potential with our Trending Classes"
        />
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {classes.slice(0, 6).map((classItem) => (
            <ClassCard key={classItem?._id} classItem={classItem} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default PopularClassesSection;
