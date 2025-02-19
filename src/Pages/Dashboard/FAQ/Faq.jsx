import React, { useState } from "react";
import { Button, Modal, Form, Input, message } from "antd";
import {
  EditOutlined,
  DeleteOutlined,
  PlusOutlined,
  QuestionCircleOutlined,
} from "@ant-design/icons";
import {
  useAddNewFaqMutation,
  useDeleteFaqMutation,
  useEditFaqMutation,
  useGetAllFaqQuery,
} from "../../../redux/apiSlices/faqSlice";
import Swal from "sweetalert2";

export default function Faq() {
  const { data: questions, isLoading } = useGetAllFaqQuery();
  const [addNewFaq] = useAddNewFaqMutation();
   const [editFaq] = useEditFaqMutation();
   const [deleteFaq] = useDeleteFaqMutation();

  const [form] = Form.useForm();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingFaq, setEditingFaq] = useState(null);

  // Modal Open Function (Edit or Add)
  const showModal = (faq = null) => {
    setEditingFaq(faq);
    setIsModalOpen(true);
    if (faq) {
      form.setFieldsValue({
        question: faq.question,
        answer: faq.answer,
      });
    } else {
      form.resetFields();
    }
  };

  // Modal Close Function
  const handleCancel = () => {
    setIsModalOpen(false);
    setEditingFaq(null);
  };

  // Submit Function for Add/Edit FAQ
  const handleSubmit = async (values) => {
    try {
      if (editingFaq) {
        await editFaq({ id: editingFaq._id, ...values }).unwrap();
        message.success("FAQ updated successfully!");
      } else {
        await addNewFaq(values).unwrap();
        message.success("FAQ added successfully!");
      }
      setIsModalOpen(false);
    } catch (error) {
      message.error("Failed to save FAQ.");
    }
  };

  // Delete Function
const handleDelete = async (id) => {
  Swal.fire({
    title: "Are you sure?",
    text: "Once deleted, you will not be able to recover this FAQ!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#d33",
    cancelButtonColor: "#023F86",
    confirmButtonText: "Yes, delete it!",
  }).then(async (result) => {
    if (result.isConfirmed) {
      try {
        await deleteFaq(id).unwrap();
        Swal.fire({
          title: "Deleted!",
          text: "FAQ has been deleted.",
          icon: "success",
          timer: 1000,
          showConfirmButton: false,
        });
      } catch (error) {
        Swal.fire({
          title: "Error!",
          text: "Failed to delete FAQ.",
          icon: "error",
          timer: 1000,
          showConfirmButton: false,
        });
      }
    }
  });
};


  return (
    <div className="  rounded-lg">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold">Frequently Asked Questions</h2>
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={() => showModal()}
          className="bg-[#023F86]"
        >
          Add FAQ
        </Button>
      </div>

      {/* FAQ List as Card View */}
      <div className="flex flex-col gap-5">
        {isLoading ? (
          <p>Loading FAQs...</p>
        ) : (
          questions?.data?.map((faq) => (
            <div
              key={faq._id}
              className="bg-gray-100 p-4 rounded-lg shadow-md flex justify-between items-start"
            >
              <div className="flex gap-6 items-start ">
                <QuestionCircleOutlined className="text-2xl mt-1" />
                <div>
                  <p className="text-lg font-semibold mb-2">{faq.question} ?</p>
                  <p className="text-gray-600">{faq.answer}</p>
                </div>
              </div>
              <div className="flex gap-2">
                <Button
                  icon={<EditOutlined />}
                  onClick={() => showModal(faq)}
                  className="text-blue-600"
                />
                <Button
                  icon={<DeleteOutlined />}
                  onClick={() => handleDelete(faq._id)}
                  className="text-red-600"
                />
              </div>
            </div>
          ))
        )}
      </div>

      {/* Modal for Add/Edit FAQ */}
      <Modal
        title={editingFaq ? "Edit FAQ" : "Add FAQ"}
        open={isModalOpen}
        onCancel={handleCancel}
        footer={null}
      >
        <Form form={form} layout="vertical" onFinish={handleSubmit}>
          <Form.Item
            name="question"
            label="Question"
            rules={[{ required: true, message: "Please enter a question!" }]}
          >
            <Input placeholder="Enter question" />
          </Form.Item>
          <Form.Item
            name="answer"
            label="Answer"
            rules={[{ required: true, message: "Please enter an answer!" }]}
          >
            <Input.TextArea rows={4} placeholder="Enter answer" />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" block>
              {editingFaq ? "Update FAQ" : "Create FAQ"}
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}

// import React, { useState } from "react";
// import { IoArrowBackCircleOutline } from "react-icons/io5";
// import { LuPlus } from "react-icons/lu";
// import { MdQuestionAnswer } from "react-icons/md";
// import { RiDeleteBin6Line, RiEdit2Fill } from "react-icons/ri";
// import FaqModal from "./FaqModal";
// import { useGetAllFaqQuery } from "../../../redux/apiSlices/faqSlice";

// export default function Faq() {
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   // const [questions, setQuestions] = useState([
//   //   { q: 1, title: "Lorem ipsum dolor sit amet consectetur adipisicing elit." },
//   //   { q: 2, title: "Lorem ipsum dolor sit amet consectetur adipisicing elit." },
//   //   { q: 3, title: "Lorem ipsum dolor sit amet consectetur adipisicing elit." },
//   //   { q: 4, title: "Lorem ipsum dolor sit amet consectetur adipisicing elit." },
//   //   { q: 5, title: "Lorem ipsum dolor sit amet consectetur adipisicing elit." },
//   // ]);
// const { data: questions } = useGetAllFaqQuery();
// console.log(questions)
// // console.log(faq)
//   // Delete function
//   // const handleDelete = (id) => {
//   //   setQuestions((prevQuestions) => prevQuestions.filter((q) => q.q !== id));
//   // };

//   const List = () => (
//     <div className="w-full flex flex-col gap-6 mt-10">
//       {questions?.data?.map((question) => (
//         <div
//           key={question._id}
//           className="h-14 bg-gray-200 flex items-center justify-start gap-3 rounded-md px-10 cursor-pointer hover:bg-slate-300"
//         >
//           <h2 className="text-lg font-medium text-gray-700">
//             Question {question.question}:
//           </h2>
//           <p className="text-sm text-gray-500">{question.answer}</p>
//           <div className="flex gap-6 fixed right-32">
//             <RiEdit2Fill color="#5b52a3" size={24} className="cursor-pointer" />
//             <RiDeleteBin6Line
//               color="red"
//               size={24}
//               className="cursor-pointer"
//               onClick={() => handleDelete(question.q)}
//             />
//           </div>
//         </div>
//       ))}
//     </div>
//   );

//   const AddFAQ = () => (
//     <div
//       className="w-40 h-[45px] bg-dashboard flex items-center justify-center rounded gap-2 text-white cursor-pointer"
//       onClick={() => setIsModalOpen(true)}
//     >
//       <LuPlus color="white" size={20} />
//       <p>Add FAQ</p>
//     </div>
//   );

//   return (
//     <div className="flex flex-col mx-14 mt-24">
//       <div className="flex items-center justify-between">
//         <h2 className="text-[20px] font-medium flex items-center gap-2">
//           <IoArrowBackCircleOutline size={26} className="cursor-pointer" />
//           Frequently Asked Questions
//           <MdQuestionAnswer size={25} />
//         </h2>
//         <AddFAQ />
//       </div>
//       <List />

//       {/* Render modal */}
//       <FaqModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
//     </div>
//   );
// }
