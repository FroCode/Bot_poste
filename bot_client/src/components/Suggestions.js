import React, { useState, useEffect } from "react";
import Image from "next/image";
import { getCategories } from "../utils/api/Categories";
import { getWorkflows } from "../utils/api/worfklow";
import { getFaqs } from "../utils/api/Faq";

const Suggestions = ({ setIsSuggestionsVisible, onQuestionSelect }) => {
  const [isPromptVisible, setIsPromptVisible] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [subcategories, setSubcategories] = useState([]);
  const [selectedSubcategory, setSelectedSubcategory] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [step, setStep] = useState(0);
  const [isClosed, setIsClosed] = useState(false);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await getCategories();
        if (Array.isArray(data.data.categories)) {
          setCategories(data.data.categories);
        } else {
          console.error("Invalid categories data:", data);
        }
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    if (step === 1) {
      fetchCategories();
    }
  }, [step]);

  const handleCategorySelect = async (category) => {
    setSelectedCategory(category);
    try {
      const data = await getWorkflows(category);
      if (Array.isArray(data.data.workflows)) {
        setSubcategories(data.data.workflows);
        setStep(2);
      } else {
        console.error("Invalid workflows data:", data);
      }
    } catch (error) {
      console.error("Error fetching workflows:", error);
    }
  };

  const handleSubcategorySelect = async (subcategory) => {
    setSelectedSubcategory(subcategory);
    try {
      const data = await getFaqs(subcategory.id);
      if (data?.data?.faqWithSequentialIds) {
        setQuestions(data.data.faqWithSequentialIds);
        setStep(3);
      } else {
        console.error("Invalid questions data:", data);
      }
    } catch (error) {
      console.error("Error fetching questions:", error);
    }
  };

  const handleQuestionSelect = async (question) => {
    onQuestionSelect(question.question, question.answer);
    setIsClosed(true);  // إغلاق الأسئلة عند اختيار سؤال
  };

  const handlePromptAnswer = (answer) => {
    setIsPromptVisible(false);
    if (answer === "yes") {
      setStep(1); 
    } else {
      setIsClosed(true);
    }
  };

  const handleReopenSuggestions = () => {
    setIsPromptVisible(true);
    setIsClosed(false);
    setStep(3);  // العودة مباشرة إلى الأسئلة
  };

  return (
    <div
      className={`p-3 ${isClosed ? "" : "rounded-2xl shadow-2xl border mx-2 my-2"}`}
    >
      {isClosed ? (
        <div className="flex justify-end">
          <button
            onClick={handleReopenSuggestions}
            className="px-2 py-2 text-white rounded-lg"
          >
            <Image
              src="/drop2.svg"
              alt="drop"
              width={15}
              height={15}
              className="w-4 h-4"
            />
          </button>
        </div>
      ) : (
        <>
          {step === 0 && isPromptVisible ? (
            <>
              <div className="flex justify-between gap-4 mt-2">
                <div></div>
                <div className="flex gap-4">
                  <button
                    className="px-4 py-2 bg-blue bg-opacity-10 border text-sm font-semibold border-blue rounded-lg"
                    onClick={() => handlePromptAnswer("yes")}
                  >
                    Use Q&A
                  </button>
                  <button
                    className="px-4 py-2 bg-yellow bg-opacity-10 border text-sm font-semibold border-yellow rounded-lg"
                    onClick={() => handlePromptAnswer("no")}
                  >
                    Ask Bot
                  </button>
                </div>
                <div className="flex justify-end">
                  <button
                    onClick={() => handlePromptAnswer("no")}
                    className="px-2 py-2 text-white rounded-lg"
                  >
                    <Image
                      src="/drop1.svg"
                      alt="drop"
                      width={15}
                      height={15}
                      className=""
                    />
                  </button>
                </div>
              </div>
            </>
          ) : step === 1 ? (
            <div>
              <h4 className="text-md font-bold">Select a category:</h4>
              <div className="overflow-x-auto">
                <div className="grid grid-cols-3 gap-4 mt-2">
                  {categories.length > 0 ? (
                    categories.map((category, index) => (
                      <button
                        key={index}
                        onClick={() => handleCategorySelect(category)}
                        className={`w-full px-2 py-1 font-semibold rounded-md text-sm shadow-xl text-center transition ${
                          index % 2 === 0
                            ? "bg-yellow bg-opacity-10 border-2 border-yellow"
                            : "bg-blue bg-opacity-10 border-blue border-2"
                        }`}
                      >
                        {category.name}
                      </button>
                    ))
                  ) : (
                    <p>No categories available</p>
                  )}
                </div>
              </div>
            </div>
          )
           : step === 2 && selectedCategory ? (
            <div>
              <h4 className="text-md font-bold">Select a workflow:</h4>
              <div className="m">
                <div className=" grid grid-cols-2 gap-2">
                  {subcategories.length > 0 ? (
                    subcategories.map((subcategory, index) => (
                      <button
                        key={index}
                        onClick={() => handleSubcategorySelect(subcategory)}
                        className={`w-[10%] min-w-[150px] px-2 py-1 font-semibold rounded-md text-sm shadow-xl text-center transition ${
                          index % 2 === 0
                            ? "bg-yellow bg-opacity-10 border-2 border-yellow"
                            : "bg-blue bg-opacity-10 border-blue border-2"
                        }`}
                      >
                        {subcategory.name}
                      </button>
                    ))
                  ) : (
                    <p>No workflows available</p>
                  )}
                </div>
              </div>
            </div>
          ) : step === 3 && selectedSubcategory ? (
            <div className="mt-4">
              <h4 className="text-md font-bold">Select a question:</h4>
              <div className="mt-2">
                <div className="grid grid-cols-3 gap-4">
                  {questions.length > 0 ? (
                    questions.map((question, index) => (
                      <button
                        key={index}
                        onClick={() => handleQuestionSelect(question)}
                        className={`w-full px-2 py-1 font-semibold rounded-md text-sm shadow-xl text-center transition ${
                          index % 2 === 0
                            ? "bg-yellow bg-opacity-10 border-2 border-yellow"
                            : "bg-blue bg-opacity-10 border-blue border-2"
                        }`}
                      >
                        {question.question}
                      </button>
                    ))
                  ) : (
                    <p>No questions available</p>
                  )}
                </div>
              </div>
            </div>
          ) : null}
        </>
      )}
    </div>
  );
};

export default Suggestions;

