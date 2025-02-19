import React, { useState } from "react";
import { Input, Button, message } from "antd";
import TextEditor from "./TextEditor";
import { useAddNewFaqMutation } from "../../../redux/apiSlices/faqSlice";

const { TextArea } = Input;

const FaqForm = () => {
  const [addNewFaq, { isLoading }] = useAddNewFaqMutation();
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");

  const handleSubmit = async () => {
    if (!question || !answer) {
      message.error("Please fill in all required fields!");
      return;
    }

    try {
      const response = await addNewFaq({ question, answer }).unwrap();

      if (response.success) {
        message.success("FAQ created successfully!");
        setQuestion("");
        setAnswer("");
      } else {
        message.error("Failed to create FAQ!");
      }
    } catch (error) {
      console.error("Error creating FAQ:", error);
      message.error("An error occurred while creating FAQ.");
    }
  };

  return (
    <div className="flex flex-col gap-6 mt-8">
      {/* Question Title */}
      <div>
        <label className="text-sm font-medium">
          Add Question Title <span className="text-red-500">*</span>
        </label>
        <Input
          className="w-full h-11 mt-1"
          placeholder="Enter question title"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
        />
      </div>

      {/* Answer Section */}
      <div>
        <label className="text-sm font-medium">
          Add Your Answer <span className="text-red-500">*</span>
        </label>
        <div className="mt-1">
          <TextEditor value={answer} onChange={setAnswer} />
        </div>
      </div>

      {/* Submit Button */}
      <Button
        className="bg-dashboard text-white"
        style={{ width: "180px", height: "50px", borderRadius: "8px" }}
        onClick={handleSubmit}
        loading={isLoading}
      >
        {isLoading ? "Creating..." : "Create FAQ"}
      </Button>
    </div>
  );
};

export default FaqForm;
