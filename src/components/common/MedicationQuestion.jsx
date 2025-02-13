import { useState, useEffect } from "react";
import { Modal, Button, Select, Input, Form } from "antd";
import { PlusOutlined, MinusCircleOutlined } from "@ant-design/icons";
import { useGetIdQuestionQuery } from "../../redux/apiSlices/MedicalQuestionSlice";

export default function MedicationQuestion({
  visible,
  onCancel,
  onSubmit,
  editData = null,
  id
}) {
  const [type, setType] = useState("INPUT");
  const [questions, setQuestions] = useState([""]);
  const [editingId, setEditingId] = useState(null);
  const { data } = useGetIdQuestionQuery()
  console.log(data)
  console.log("id", id)

  // When the modal opens in edit mode, set initial values
  useEffect(() => {
    if (visible && editData) {
      setEditingId(editData.id); // Set the id for editing
      setType(editData.type || "INPUT"); // Set the type
      setQuestions(editData.questions || [""]); // Set the questions
    } else {
      setEditingId(null); // Reset the id when it's in add mode
      setType("INPUT");
      setQuestions([""]);
    }
  }, [visible, editData]);

  const handleAddQuestion = () => {
    setQuestions([...questions, ""]);
  };

  const handleRemoveQuestion = (index) => {
    const updatedQuestions = questions.filter((_, i) => i !== index);
    setQuestions(updatedQuestions);
  };

  const handleQuestionChange = (index, value) => {
    const updatedQuestions = [...questions];
    updatedQuestions[index] = value;
    setQuestions(updatedQuestions);
  };

  const handleSubmit = () => {
    const data = { id: editingId, type, questions }; // Include the id if it's an edit
    onSubmit(data);
    onCancel();
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
        <Form.Item label="Type">
          <Select value={type} onChange={setType}>
            <Select.Option value="INPUT">INPUT</Select.Option>
            <Select.Option value="TEXTAREA">TEXTAREA</Select.Option>
          </Select>
        </Form.Item>

        <Form.Item label="Questions">
          {questions.map((question, index) => (
            <div key={index} className="flex gap-2 mb-2">
              <Input
                value={question}
                onChange={(e) => handleQuestionChange(index, e.target.value)}
                placeholder={`Question ${index + 1}`}
              />
              <Button
                type="text"
                icon={<MinusCircleOutlined />}
                danger
                onClick={() => handleRemoveQuestion(index)}
                disabled={questions.length === 1}
              />
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
        </Form.Item>
      </Form>
    </Modal>
  );
}
