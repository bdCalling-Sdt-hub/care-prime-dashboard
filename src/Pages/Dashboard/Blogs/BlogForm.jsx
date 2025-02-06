import { React, useState } from "react";
import { Input } from "antd";
import TextEditor from "./TextEditor";
import { LuPlus } from "react-icons/lu";
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import { Flex, message, Upload } from "antd";

const getBase64 = (img, callback) => {
  const reader = new FileReader();
  reader.addEventListener("load", () => callback(reader.result));
  reader.readAsDataURL(img);
};
const beforeUpload = (file) => {
  const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
  if (!isJpgOrPng) {
    message.error("You can only upload JPG/PNG file!");
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error("Image must smaller than 2MB!");
  }
  return isJpgOrPng && isLt2M;
};

const ImgUpload = () => {
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState();
  const handleChange = (info) => {
    if (info.file.status === "uploading") {
      setLoading(true);
      return;
    }
    if (info.file.status === "done") {
      // Get this url from response in real world.
      getBase64(info.file.originFileObj, (url) => {
        setLoading(false);
        setImageUrl(url);
      });
    }
  };
  const uploadButton = (
    <button
      style={{
        border: 0,
        background: "none",
      }}
      type="button"
    >
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div
        style={{
          marginTop: 8,
        }}
      >
        Upload
      </div>
    </button>
  );
  return (
    <Flex gap="middle" wrap>
      <Upload
        name="avatar"
        listType="picture-card"
        className="avatar-uploader w-full min-w-32 h-full"
        showUploadList={false}
        action="https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload"
        beforeUpload={beforeUpload}
        onChange={handleChange}
      >
        {imageUrl ? (
          <img
            src={imageUrl}
            alt="avatar"
            style={{
              width: "100%",
            }}
          />
        ) : (
          uploadButton
        )}
      </Upload>
    </Flex>
  );
};

export default function ModalForm() {
  return (
    <div className="h-80% flex flex-col gap-10 ">
      <div className="flex justify-between mt-3 relative">
        <div className="w-[425px] h-[148px] flex flex-col justify-between">
          <div>
            <p className="text-[12px]">Title</p>
            <Input className=" w-full min-w-32 h-11" />
          </div>
          <div>
            <p className="text-[12px]">Source(If Available)</p>
            <Input className=" w-full min-w-32 h-11" />
          </div>
        </div>
        <div className="w-[425px] h-[148px] flex flex-col justify-between">
          <p className="text-[12px]">Upload Image</p>
          {/* <Input className=" w-full min-w-32 h-full border-dashed " /> */}
          <ImgUpload style={{ width: 100 }} />
        </div>
      </div>
      <TextEditor />
      <div className="w-40 h-[45px] bg-dashboard flex items-center justify-center rounded gap-2 text-white cursor-pointer absolute right-10 bottom-10">
        <LuPlus color="white" size={20} />
        <p>Add Blog</p>
      </div>
    </div>
  );
}
