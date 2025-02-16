import { useRef, useState, useEffect } from "react";
import { Button, Spin, message } from "antd";
import JoditEditor from "jodit-react";
import {
  useTermsAndConditionQuery,
  useUpdateTermsAndConditionsMutation,
} from "../../../redux/apiSlices/termsAndConditionSlice";

export default function TermsAndConditions() {
  const { data, isLoading, refetch } = useTermsAndConditionQuery();
  const [updateTermsAndConditions] = useUpdateTermsAndConditionsMutation();
  const editor = useRef(null);
  const [content, setContent] = useState("");

  useEffect(() => {
    if (data?.content) {
      setContent(data.content);
    }
  }, [data?.content]);

  // Save handler
  const handleSave = async () => {
    try {
      const res = await updateTermsAndConditions({ content }).unwrap();
      if (res.success) {
        message.success("Updated successfully!");
        refetch(); // Refresh data after update
        setContent(content); // Ensure local state is in sync
      }
    } catch (error) {
      message.error("Update failed!");
    }
  };

  // Show loading state
  if (isLoading) {
    return <Spin size="large" className="flex justify-center mt-10" />;
  }

  return (
    <div className="mx-auto p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-bold mb-4">Terms & Conditions</h2>

      {/* Jodit Editor */}
      <JoditEditor
        ref={editor}
        value={content}
        onChange={(newContent) => setContent(newContent)}
      />

      <div className="mt-4 flex gap-2">
        <Button type="primary" onClick={handleSave}>
          Save
        </Button>
      </div>
    </div>
  );
}
