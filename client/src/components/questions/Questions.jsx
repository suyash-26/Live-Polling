import React, { useState } from "react";
import Modal from "../modal/Modal";
import { useParams } from "react-router-dom";
import api from "../../network/interceptors";

export default function Questions() {
  const { pollId } = useParams();
  const [questionModal, setQuestionModal] = useState(false);
  const [options, setOptions] = useState([
    { val: "", color: "" },
    { val: "", color: "" },
  ]);
  const [questionFormData, setQuestionFormData] = useState({
    questionTitle: "",
    pollType: "bar",
    activeTime: undefined,
  });

  const handleQuestionSubmit = async (e) => {
    e.preventDefault();
    console.log("questionFormData", questionFormData);
    console.log("options", options);
    if (!questionFormData.questionTitle) {
      console.log("Question title is required");
      return;
    }
    const filteredOptions = options.filter(
      (option) => option && option.val.trim() !== "",
    );
    if (filteredOptions.length < 2) {
      console.log("Atleast two options are required");
      return;
    }
    if (filteredOptions.length > 4) {
      console.log("Maximum four options are allowed");
      return;
    }
    if (questionFormData.activeTime <= 0) {
      console.log("Active time must be greater than zero");
      return;
    }
    if (questionFormData.activeTime > 86400) {
      console.log("Active time cannot exceed 24 hours");
      return;
    }
    if (!["bar", "pie", "doughnut"].includes(questionFormData.pollType)) {
      console.log("Invalid poll type");
      return;
    }
    if (filteredOptions.some((option) => !option || option.val.length < 1)) {
      console.log("Option value cannot be empty");
      return;
    }
    if (filteredOptions.some((option) => !option || option.val?.length > 100)) {
      console.log("Option value cannot exceed 100 characters");
      return;
    }
    if (questionFormData.questionTitle.length < 5) {
      console.log("Question title must be at least 5 characters");
      return;
    }
    if (questionFormData.questionTitle.length > 500) {
      console.log("Question title cannot exceed 500 characters");
      return;
    }
    if (pollId) {
      // make api call to add question
      const payload = {
        pollId,
        question: {
          title: questionFormData.questionTitle,
          options: filteredOptions,
          type: questionFormData.pollType,
          activeTime: parseInt(questionFormData.activeTime),
        },
      };
      console.log("Payload to be sent:", payload);

      console.log("Adding question to pollId:", pollId);
      try{
        const res = await api.post("/polls/addQuesion", payload);
        console.log("Question added successfully", res);
        setQuestionModal(false);
      }catch(err){
        console.log("Error adding question", err);
      }
    } else {
      console.log("Poll ID not found in window object");
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mt-4">
        <p className="font-semibold text-lg">Add a Question</p>
        <button
          onClick={() => {
            setQuestionModal(true);
          }}
          className="px-8 py-2 border-2 rounded"
        >
          + Add Question
        </button>
      </div>
      <Modal
        isOpen={questionModal}
        onClose={() => {
          setQuestionModal(false);
        }}
        title={"Add Question"}
      >
        <form onSubmit={handleQuestionSubmit} className="flex flex-col gap-4">
          <div className="p-1 flex flex-col gap-2 ">
            <label for="poll_question">Enter Queston</label>
            <input
              className="text-white border-2 p-3 rounded"
              name="poll_question"
              value={questionFormData.questionTitle}
              onChange={(e) => {
                // setPollTitle(e.target?.value || "");
                setQuestionFormData((prev) => ({
                  ...prev,
                  questionTitle: e.target?.value || "",
                }));
              }}
              placeholder="e.g. What's your next move?"
            />
          </div>
          <div className="p-1 flex flex-col gap-2 ">
            <label>Options (Max 4)</label>
            {options.map((option, index) => {
              return (
                <div key={index}>
                  <input
                    className="text-white border-2 p-3 rounded"
                    value={option?.val || ""}
                    onChange={(e) => {
                      setOptions((prev) => {
                        let newOptions = [...prev];
                        newOptions[index] = {
                          ...newOptions[index],
                          val: e.target?.value,
                        };
                        return newOptions;
                      });
                    }}
                    placeholder={`Option ${index + 1}`}
                  />
                </div>
              );
            })}
            <button
              className="text-white border-2 p-3 rounded"
              onClick={() => {
                if (options.length === 4) {
                  return;
                }
                setOptions((prev) => {
                  return [...prev, undefined];
                });
              }}
            >
              Add Option
            </button>
          </div>
          <div className="flex gap-4 mt-4">
            <div>
              <label for="poll_type">Select Chart Type</label>
              <select
                className="text-white border-2 p-3 rounded"
                name="poll_type"
                value={questionFormData.pollType}
                onChange={(e) => {
                  // setPollType(e.target?.value || "bar");
                  setQuestionFormData((prev) => ({
                    ...prev,
                    pollType: e.target?.value || "bar",
                  }));
                }}
              >
                <option value="bar">Bar Chart</option>
                <option value="pie">Pie Chart</option>
                <option value="doughnut">Doughnut Chart</option>
              </select>
            </div>
            <div>
              <label for="active_time">Active Time (in seconds)</label>
              <input
                className="text-white border-2 p-3 rounded"
                name="active_time"
                type="number"
                value={questionFormData.activeTime}
                onChange={(e) => {
                  // setActiveTime(e.target?.value || 30);
                  setQuestionFormData((prev) => ({
                    ...prev,
                    activeTime: e.target?.value || undefined,
                  }));
                }}
                placeholder="30"
              />
            </div>
          </div>
          <button
            type="submit"
            className="mt-4 bg-blue-600 px-6 py-2 rounded text-white"
          >
            Add Question
          </button>
        </form>
      </Modal>
    </div>
  );
}
