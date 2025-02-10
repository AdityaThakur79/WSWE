import React, { useState } from "react";
import faqImage from "../assets/faq.png";

const Faq = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const faqData = [
    {
      question: "Who will receive my SOS alert?",
      answer:
        "Your designated SOS contacts will receive your alert. You can add and manage your SOS contacts within the SOS settings.",
    },
    {
      question: "How do I activate the SOS features?",
      answer:
        "Depending on the app's design, you can usually activate SOS by rapidly pressing the power button multiple times or by holding down a dedicated SOS button within the app.",
    },
    {
      question: "How can I add SOS contacts?",
      answer:
        "Go to the app's settings section. There should be an option to manage or add SOS contacts. You'll usually need their phone numbers or email addresses.",
    },
    {
      question: "Where can I find the helpline numbers?",
      answer:
        "Go to the Incident Reporting section. There you can find many helpline numbers near your locality from where you can direclty place a call.",
    },
    {
      question: "Where can I find the helpline numbers?",
      answer:
        "Go to the Incident Reporting section. There you can find many helpline numbers near your locality from where you can direclty place a call.",
    },
    {
      question: "Where can I find the helpline numbers?",
      answer:
        "Go to the Incident Reporting section. There you can find many helpline numbers near your locality from where you can direclty place a call.",
    },
  ];

  const toggleAccordion = (index) => {
    setActiveIndex((prevIndex) => (prevIndex === index ? null : index));
  };

  return (
    <>
      <h2 className="text-center text-base/7 font-semibold text-indigo-600 pt-20">
        Questions On your mind?
      </h2>
      <p className="mx-auto mt-2 max-w-lg text-pretty text-center text-4xl font-medium tracking-tight text-[#FAA845] sm:text-5xl">
      We got you
      </p>
      <div className="mt-20 flex flex-col lg:flex-row font-sans justify-center items-center lg:items-start h-auto lg:h-[60vh] bg-gradient-to-r from-[#FAA845] via-[#FBEABF] to-[#FBEABF] px-4 lg:px-0 py-8">
        <div className="lg:mr-12 mb-8 lg:mb-0">
          <img
            src={faqImage}
            alt="FAQ"
            className="w-full max-w-xs lg:max-w-full"
          />
        </div>
        <div className="w-full max-w-md">
          <h2 className="text-2xl lg:text-2xl font-semibold mb-6 text-center lg:text-left">
            FREQUENTLY ASKED QUESTIONS
          </h2>
          <ul>
            {faqData.map((item, index) => (
              <li key={index}>
                <div
                  className={`flex justify-between items-center p-4 mb-2 cursor-pointer rounded-lg ${
                    activeIndex === index
                      ? "bg-gray-200"
                      : "bg-gray-100 hover:bg-gray-200"
                  }`}
                  onClick={() => toggleAccordion(index)}
                >
                  <span className="text-lg font-medium">{item.question}</span>
                  <span
                    className={`transition-transform ${
                      activeIndex === index ? "rotate-45" : ""
                    }`}
                  >
                    +
                  </span>
                </div>
                {activeIndex === index && (
                  <div className="p-4 text-gray-700 border-t border-gray-300">
                    {item.answer}
                  </div>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
};

export default Faq;
