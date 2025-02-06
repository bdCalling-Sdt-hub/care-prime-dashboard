import React from "react";
import { Input, Button } from "antd";
import TextEditor from "./TextEditor";

const { TextArea } = Input;

const onChange = (e) => {
  console.log("Change:", e.target.value);
};

const FaqForm = () => {
  return (
    <div className="flex flex-col gap-6 mt-8 ">
      {/* Question Title */}
      <div>
        <label className="text-sm font-medium">
          Add Question Title <span className="text-red-500">*</span>
        </label>
        <Input
          className="w-full h-11 mt-1"
          placeholder="Enter question title"
        />
      </div>

      {/* Choose Icon */}
      <div>
        <label className="text-sm font-medium">
          Add Your Answer <span className="text-red-500">*</span>
          <div className="mt-1">
            <TextEditor />
          </div>
        </label>
      </div>

      <Button
        className="bg-dashboard text-white "
        style={{ width: "180px", height: "50px", borderRadius: "8px" }}
      >
        Create FAQ
      </Button>
    </div>
  );
};

export default FaqForm;
