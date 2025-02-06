// import React, { useState } from "react";
// import { IoArrowBackCircleOutline } from "react-icons/io5";
// import { LuPlus } from "react-icons/lu";
// import { MdQuestionAnswer } from "react-icons/md";
// import FaqModal from "./FaqModal";
// import { RiDeleteBin6Line, RiEdit2Fill } from "react-icons/ri";

// export default function Faq() {
//   const [isModalOpen, setIsModalOpen] = useState(false);

//   const questions = [
//     { q: 1, title: "Lorem ipsum dolor sit amet consectetur adipisicing elit." },
//     { q: 2, title: "Lorem ipsum dolor sit amet consectetur adipisicing elit." },
//     { q: 3, title: "Lorem ipsum dolor sit amet consectetur adipisicing elit." },
//     { q: 4, title: "Lorem ipsum dolor sit amet consectetur adipisicing elit." },
//     { q: 5, title: "Lorem ipsum dolor sit amet consectetur adipisicing elit." },
//   ];

//   const List = () => (
//     <div className="w-full flex flex-col gap-6 mt-10">
//       {questions.map((question) => (
//         <div
//           key={question.q}
//           className="h-14 bg-gray-200 flex items-center justify-start gap-3 rounded-md px-10 cursor-pointer hover:bg-slate-300"
//         >
//           <h2 className="text-lg font-medium text-gray-700">
//             Question {question.q}:
//           </h2>
//           <p className="text-sm text-gray-500">{question.title}</p>
//           <div className="flex gap-6 fixed right-32">
//             <RiEdit2Fill color="#5b52a3" size={24} className="cursor-pointer" />
//             <RiDeleteBin6Line
//               color="red"
//               size={24}
//               className="cursor-pointer"
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

import React, { useState } from "react";
import { IoArrowBackCircleOutline } from "react-icons/io5";
import { LuPlus } from "react-icons/lu";
import { MdQuestionAnswer } from "react-icons/md";
import { RiDeleteBin6Line, RiEdit2Fill } from "react-icons/ri";
import FaqModal from "./FaqModal";

export default function Faq() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [questions, setQuestions] = useState([
    { q: 1, title: "Lorem ipsum dolor sit amet consectetur adipisicing elit." },
    { q: 2, title: "Lorem ipsum dolor sit amet consectetur adipisicing elit." },
    { q: 3, title: "Lorem ipsum dolor sit amet consectetur adipisicing elit." },
    { q: 4, title: "Lorem ipsum dolor sit amet consectetur adipisicing elit." },
    { q: 5, title: "Lorem ipsum dolor sit amet consectetur adipisicing elit." },
  ]);

  // Delete function
  const handleDelete = (id) => {
    setQuestions((prevQuestions) => prevQuestions.filter((q) => q.q !== id));
  };

  const List = () => (
    <div className="w-full flex flex-col gap-6 mt-10">
      {questions.map((question) => (
        <div
          key={question.q}
          className="h-14 bg-gray-200 flex items-center justify-start gap-3 rounded-md px-10 cursor-pointer hover:bg-slate-300"
        >
          <h2 className="text-lg font-medium text-gray-700">
            Question {question.q}:
          </h2>
          <p className="text-sm text-gray-500">{question.title}</p>
          <div className="flex gap-6 fixed right-32">
            <RiEdit2Fill color="#5b52a3" size={24} className="cursor-pointer" />
            <RiDeleteBin6Line
              color="red"
              size={24}
              className="cursor-pointer"
              onClick={() => handleDelete(question.q)}
            />
          </div>
        </div>
      ))}
    </div>
  );

  const AddFAQ = () => (
    <div
      className="w-40 h-[45px] bg-dashboard flex items-center justify-center rounded gap-2 text-white cursor-pointer"
      onClick={() => setIsModalOpen(true)}
    >
      <LuPlus color="white" size={20} />
      <p>Add FAQ</p>
    </div>
  );

  return (
    <div className="flex flex-col mx-14 mt-24">
      <div className="flex items-center justify-between">
        <h2 className="text-[20px] font-medium flex items-center gap-2">
          <IoArrowBackCircleOutline size={26} className="cursor-pointer" />
          Frequently Asked Questions
          <MdQuestionAnswer size={25} />
        </h2>
        <AddFAQ />
      </div>
      <List />

      {/* Render modal */}
      <FaqModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
}
