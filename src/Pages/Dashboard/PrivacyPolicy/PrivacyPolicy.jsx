import React from "react";
import { useState } from "react";
import { Button, Tabs } from "antd";

import { IoArrowBackCircleOutline } from "react-icons/io5";
import PrivacyPolicyModal from "./PrivacyPolicyModal";

// const CustomerSales = () => {
//   return (
//     <div className="flex gap-2 text-white">
//       <Button className="w-32 h-12 bg-dashboard text-inherit text-base border-none">
//         Customer
//       </Button>
//       <Button className="w-32 h-12 bg-dashboard text-inherit text-base border-none">
//         Sales
//       </Button>
//     </div>
//   );
// };

const PrivacyPolicyArticle = () => {
  return (
    <div className="w-full text-left text-lg leading-6 mt-20">
      <h2 className="font-semibold text-[24px]">Privacy Policy</h2>
      <p className="mt-10 text-[16px] text-[#5C5C5C] break-words leading-7">
        Lorem ipsum dolor sit amet consectetur. Fringilla a cras vitae orci.
        Egestas duis id nisl sed ante congue scelerisque. Eleifend facilisis
        aliquet tempus morbi leo sagittis. Pellentesque odio amet turpis
        habitant. Imperdiet tincidunt nisl consectetur hendrerit accumsan
        vehicula imperdiet mattis. Neque a vitae diam pharetra duis habitasse
        convallis luctus pulvinar. Pharetra nunc morbi elementum nisl magnis
        convallis arcu enim tortor. Cursus a sed tortor enim mi imperdiet massa
        donec mauris. Sem morbi morbi posuere faucibus. Cras risus ultrices duis
        pharetra sit porttitor elementum sagittis elementum. Ut vitae blandit
        pulvinar fermentum in id sed. At pellentesque non semper eget egestas
        vulputate id volutpat quis. Dolor etiam sodales at elementum mattis nibh
        quam placerat ut. Suspendisse est adipiscing proin et. Leo nisi bibendum
        donec ac non eget euismod suscipit. At ultricies nullam ipsum tellus.
        Non dictum orci at tortor convallis tortor suspendisse. Ac duis senectus
        arcu nullam in suspendisse vitae. Tellus interdum enim lorem vel morbi
        lectus.
        <br />
        Lorem ipsum dolor sit amet consectetur. Fringilla a cras vitae orci.
        Egestas duis id nisl sed ante congue scelerisque. Eleifend facilisis
        aliquet tempus morbi leo sagittis. Pellentesque odio amet turpis
        habitant. Imperdiet tincidunt nisl consectetur hendrerit accumsan
        vehicula imperdiet mattis. Neque a vitae diam pharetra duis habitasse
        convallis luctus pulvinar. Pharetra nunc morbi elementum nisl magnis
        convallis arcu enim tortor. Cursus a sed tortor enim mi imperdiet massa
        donec mauris. Sem morbi morbi posuere faucibus. Cras risus ultrices duis
        pharetra sit porttitor elementum sagittis elementum. Ut vitae blandit
        pulvinar fermentum in id sed. At pellentesque non semper eget egestas
        vulputate id volutpat quis. Dolor etiam sodales at elementum mattis nibh
        quam placerat ut. Suspendisse est adipiscing proin et. Leo nisi bibendum
        donec ac non eget euismod suscipit. At ultricies nullam ipsum tellus.
        Non dictum orci at tortor convallis tortor suspendisse. Ac duis senectus
        arcu nullam in suspendisse vitae. Tellus interdum enim lorem vel morbi
        lectus.
      </p>
    </div>
  );
};

const Policies = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="mt-5">
      <div className="flex flex-col ">
        <div className="flex items-center justify-between ">
          <h1 className="text-xl font-semibold flex items-center gap-1">
            <IoArrowBackCircleOutline
              size={26}
              className="font-medium cursor-pointer"
            />
            Privacy Policy
          </h1>
        </div>
      </div>
      <PrivacyPolicyArticle />
      <Button
        className="w-36 h-12 bg-dashboard text-white text-lg border-none mt-10"
        onClick={() => setIsModalOpen(true)}
      >
        Edit
      </Button>

      <PrivacyPolicyModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
};

export default function PrivacyPolicy({ onOpen }) {
  const onChange = (key) => {
    console.log(key);
  };
  const items = [
    {
      key: "1",
      label: "Customers",
      children: <Policies />,
    },
    {
      key: "2",
      label: "Sales",
      children: <Policies />,
    },
  ];

  return (
    <div className="mx-14 mt-24">
      <Tabs
        defaultActiveKey="1"
        items={items}
        size="large"
        onChange={onChange}
        type="card"
      />
    </div>
  );
}
