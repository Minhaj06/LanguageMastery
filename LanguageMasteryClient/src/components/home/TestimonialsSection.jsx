import React, { useState, useEffect } from "react";
import { FaQuoteLeft, FaQuoteRight } from "react-icons/fa";
import SectionTitle from "../sectionTitle/SectionTitle";

const TestimonialsSection = () => {
  const testimonials = [
    {
      id: 1,
      name: "John Smith",
      message:
        "Learning a new language has never been so enjoyable. The instructors are highly skilled and the interactive lessons make learning fun!",
    },
    {
      id: 2,
      name: "Sarah Johnson",
      message:
        "I am amazed by my progress in just a few weeks. The personalized attention and support from the language instructors have been invaluable.",
    },
    {
      id: 3,
      name: "David Lee",
      message:
        "The language learning platform is user-friendly and the course material is well-structured. I highly recommend it to anyone looking to learn a new language.",
    },
    {
      id: 4,
      name: "John Smith",
      message:
        "Learning a new language has never been so enjoyable. The instructors are highly skilled and the interactive lessons make learning fun!",
    },
  ];

  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <SectionTitle
          heading="What Our Students Say"
          subheading="Inspiring Words from Our Language Learning Community"
        />
        <div className="grid xl:grid-cols-2 gap-6">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              className={`bg-base-200 dark:bg-gray-800 border-2 dark:border-gray-700 rounded-lg shadow-md p-6 mb-8 transition-opacity duration-1000 ${
                isVisible ? "opacity-100" : "opacity-0"
              }`}
            >
              <div className="flex items-center mb-4">
                <FaQuoteLeft className="text-2xl text-gray-400 dark:text-gray-200 mr-2" />
                <p className="text-lg font-semibold text-gray-800 dark:text-white">
                  {testimonial.message}
                </p>
                <FaQuoteRight className="text-2xl text-gray-400 dark:text-gray-200 ml-2" />
              </div>
              <p className="text-gray-600 dark:text-gray-100">{testimonial.name}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
