import { useRef, useState } from "react";
import { Button, Spin, message } from "antd";
import JoditEditor from "jodit-react";
import { usePrivacyPolicyQuery, useUpdatePrivacyPolicyMutation } from "../../../redux/apiSlices/privacypolicy";

export default function PrivacyPolicy() {
  const { data, isLoading, refetch } = usePrivacyPolicyQuery();
  const [updatePrivacyPolicy] = useUpdatePrivacyPolicyMutation();
  const [isEditing, setIsEditing] = useState(false);
  const [content, setContent] = useState("");
  

  // console.log(content)
  // console.log(data)

  if (isLoading) {
    return <Spin size="large" className="flex justify-center mt-10" />;
  }

  const stripHtml = (html) => {
    const doc = new DOMParser().parseFromString(html, "text/html");
    return doc.body.textContent || "";
  };

  const handleEdit = () => {
    setIsEditing(true);
    setContent(data?.content || "");
  };

  const handleSave = async () => {
    // console.log("saaalgdflhksdfgas", content)
    try {
      const res = await updatePrivacyPolicy({ content }).unwrap();
      // console.log(res)
      refetch();
      if (res.success) {
        message.success("Updated successfully!");
        setIsEditing(false);
      }
    } catch (error) {
      message.error("Update failed!");
    }
  };

  return (
    <div className=" mx-auto p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-bold mb-4">Privacy policy</h2>
      {isEditing ? (
        <JoditEditor
          value={content}
          onChange={(newContent) => setContent(newContent)}
        />
      ) : (
        <div className="prose">
          {stripHtml(data?.content || "No Terms Available")}
        </div>
      )}
      <div className="mt-4 flex gap-2">
        {isEditing ? (
          <Button type="primary" onClick={handleSave}>
            Save
          </Button>
        ) : (
          <Button type="default" onClick={handleEdit}>
            Edit
          </Button>
        )}
      </div>
    </div>
  );
}
