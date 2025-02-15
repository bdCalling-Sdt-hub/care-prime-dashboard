import { useState, useEffect } from "react";
import { Modal, Button, Select, Input, Form, message } from "antd";
import {
  PlusOutlined,
  MinusCircleOutlined,
  DeleteOutlined,
  EditOutlined,
} from "@ant-design/icons";
import {
  useAddQuestionMutation,
  useDeleteQuestionMutation,
  useGetIdQuestionQuery,
  useUpdateQuestionMutation,
} from "../../redux/apiSlices/MedicalQuestionSlice";
import Swal from "sweetalert2";

export default function MedicationQuestion({
  visible,
  onCancel,
  onSubmit,
  id,
}) {
  const [questions, setQuestions] = useState();
  const [editingId, setEditingId] = useState(null);
  const { data: question } = useGetIdQuestionQuery(id);
  const [addQuestion] = useAddQuestionMutation();
  const [deleteQuestion] = useDeleteQuestionMutation();
  const [updateQuestion] = useUpdateQuestionMutation();


  const [subId, SetSubId] = useState(null);
  const [form] = Form.useForm();
  // console.log(editingId)

  const allQuestion = question?.data;
  console.log(question);
  // console.log(allQuestion[0].question)

  useEffect(() => {
    if (id) {
      setEditingId(id);
    }
  }, [id]);

  useEffect(() => {
    if (allQuestion) {
      form.setFieldsValue({
        type: allQuestion?.type,
        question: allQuestion?.question,
      });

      setQuestions(allQuestion);
    }
  }, [allQuestion, form]);

const handleSubmit = async () => {
  const data = {
    medication: editingId,
    questions: questions,
  };

  console.log("Sending Payload:", data);

  try {
    if (editingId) {
      if (questions) {
       const response = await updateQuestion(data).unwrap();
       message.success("All questions updated successfully");
      } else {
        const response = await addQuestion(data).unwrap();
        message.success("Operation successfully done");
        onCancel();
      }
    }
  } catch (error) {
    message.error("Operation failed");
    console.error("Error:", error);
  }
};

  const handleAddQuestion = () => {
    setQuestions([...questions, { type: "INPUT", question: "" }]);
  };

  const handleRemoveQuestion = (index) => {
    const updatedQuestions = questions.filter((_, i) => i !== index);
    setQuestions(updatedQuestions);
  };

  const handleQuestionChange = (index, value) => {
    const updatedQuestions = [...questions];
    updatedQuestions[index] = { ...updatedQuestions[index], question: value };
    setQuestions(updatedQuestions);
  };

  const handleTypeChange = (index, value) => {
    const updatedQuestions = [...questions];
    updatedQuestions[index] = { ...updatedQuestions[index], type: value };
    setQuestions(updatedQuestions);
  };

  const handleDeleteQuestion = async (id) => {
    if (!id) {
      message.error("Invalid ID");
      return;
    }

    Swal.fire({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this question!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#023F86",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await deleteQuestion(id);
          Swal.fire({
            title: "Deleted!",
            text: "The insight tip has been deleted.",
            icon: "success",
            showConfirmButton: false,
            timer: 1500,
          });

          setTimeout(() => {}, 1000);
        } catch (error) {
          Swal.fire("Error!", "Failed to delete the insight tip.", "error");
        }
      }
    });
  };

  return (
    <Modal
      title={editingId ? "Edit Medication Question" : "Add Medication Question"}
      open={visible}
      onCancel={onCancel}
      onOk={handleSubmit}
      okText="Submit"
    >
      <Form layout="vertical">
        {questions?.map((item, index) => (
          <div
            key={index}
            className="mb-4 p-3 border border-gray-300 rounded-lg"
          >
            <Select
              value={item.type}
              onChange={(value) => handleTypeChange(index, value)}
              className="w-full mb-2"
            >
              <Select.Option value="INPUT">INPUT</Select.Option>
              <Select.Option value="TEXTAREA">TEXTAREA</Select.Option>
            </Select>

            {item.type === "TEXTAREA" ? (
              <Input.TextArea
                value={item.question}
                onChange={(e) => handleQuestionChange(index, e.target.value)}
                placeholder={`Enter question ${index + 1}`}
                rows={3}
              />
            ) : (
              <Input
                value={item.question}
                onChange={(e) => handleQuestionChange(index, e.target.value)}
                placeholder={`Enter question ${index + 1}`}
              />
            )}

            <div className="mt-2 flex justify-end">
              {item._id ? (
                <div>
                  {/* <Button
                    type="text"
                    icon={<EditOutlined />}
                    danger
                    onClick={() => handleDeleteQuestion(item._id)}
                    disabled={!item._id}
                  /> */}
                  <Button
                    type="text"
                    icon={<DeleteOutlined />}
                    danger
                    onClick={() => handleDeleteQuestion(item._id)}
                    disabled={!item._id}
                  />
                </div>
              ) : (
                <Button
                  type="text"
                  icon={<MinusCircleOutlined />}
                  danger
                  onClick={() => handleRemoveQuestion(item.index)}
                  disabled={questions.length === 1}
                />
              )}
            </div>
          </div>
        ))}

        <Button
          type="dashed"
          onClick={handleAddQuestion}
          icon={<PlusOutlined />}
          block
        >
          Add More
        </Button>
      </Form>
    </Modal>
  );
}
