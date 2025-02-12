import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Input, Button, Form, Space } from "antd";
import JoditEditor from "jodit-react"; // Jodit React ইনপোর্ট
import { useUpdateSymptomCategoryQuery } from "../../redux/apiSlices/symptomSlice";
// import { useUpdateSymptomCategoryQuery } from "./hooks"; // কাস্টম API কুয়েরি হুক

const SymptomModal = () => {
  const { id } = useParams();
  const [form] = Form.useForm();
  const [data, setData] = useState(null);

  
  const { data: symptomData, isLoading } = useUpdateSymptomCategoryQuery(id);
  console.log(data)

  useEffect(() => {
    if (symptomData) {
      setData(symptomData); 
    }
  }, [symptomData]);

  const onFinish = (values) => {
    console.log(values)
  };

  return (
    <div>
      <h2>Symptom Details</h2>
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <Form form={form} onFinish={onFinish} initialValues={data}>
          {/* Optional Tips Input */}
          <Form.Item label="Tips (Optional)" name="tips">
            <Input.TextArea
              defaultValue={data ? data.tips : ""}
              placeholder="Enter tips"
            />
          </Form.Item>
          <div className="grid grid-cols-2 gap-5">
            <Form.Item label="Content" name="content" className="">
              <JoditEditor
                value={data ? data.content : ""}
                onChange={(newContent) =>
                  form.setFieldsValue({ content: newContent })
                }
              />
            </Form.Item>
            <Form.Item label="Content" name="content">
              <JoditEditor
                value={data ? data.content : ""}
                onChange={(newContent) =>
                  form.setFieldsValue({ content: newContent })
                }
              />
            </Form.Item>
          </div>

          {/* Content Array Input */}
          {/* <Form.List
            name="contentArray"
            initialValue={
              data ? data.contentArray : [{ name: "", content: "" }]
            }
            rules={[
              {
                validator: async (_, names) => {
                  if (!names || names.length < 1) {
                    return Promise.reject(new Error("At least one content"));
                  }
                },
              },
            ]}
          >
            {(fields, { add, remove }) => (
              <>
                {fields.map(({ key, fieldKey, name, field }, index) => (
                  <Space
                    key={key}
                    style={{ display: "flex", marginBottom: 8 }}
                    align="baseline"
                  >
                    <Form.Item
                      {...field}
                      label="Name"
                      name={[name, "name"]}
                      fieldKey={[fieldKey, "name"]}
                      rules={[{ required: true, message: "Name is required" }]}
                    >
                      <Input />
                    </Form.Item>
                    <Form.Item
                      {...field}
                      label="Content"
                      name={[name, "content"]}
                      fieldKey={[fieldKey, "content"]}
                      rules={[
                        { required: true, message: "Content is required" },
                      ]}
                    > 
                      <JoditEditor
                        value={field?.content || ""}
                        onChange={(newContent) => {
                          form.setFieldsValue({
                            contentArray: [{ content: newContent }],
                          });
                        }}
                      />
                    </Form.Item>
                    <Button type="link" onClick={() => remove(name)}>
                      Remove
                    </Button>
                  </Space>
                ))}
                <Form.Item>
                  <Button type="dashed" onClick={() => add()}>
                    Add Content
                  </Button>
                </Form.Item>
              </>
            )}
          </Form.List> */}

          <Form.Item>
            <Button type="primary" htmlType="submit">
              Save
            </Button>
          </Form.Item>
        </Form>
      )}
    </div>
  );
};

export default SymptomModal;
