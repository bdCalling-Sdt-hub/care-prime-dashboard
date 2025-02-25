import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Input, Button, Form, message } from "antd";
import JoditEditor from "jodit-react";
import {
  useAddSymptomCategoryMutation,
  useGetIdSymptomCategoryQuery,
} from "../../redux/apiSlices/symptomSlice";

const SymptomModal = () => {
  const { id } = useParams();
  const [form] = Form.useForm();
  const [data, setData] = useState(null);
  const [addSymptomCategory] = useAddSymptomCategoryMutation();

  const { data: symptomData, isLoading } = useGetIdSymptomCategoryQuery(id);
  const allSymptomData = symptomData?.data;
  const navigate = useNavigate();

  useEffect(() => {
    form.setFieldsValue({
      tips: allSymptomData?.tips,
      contents: allSymptomData?.contents,
    });
  }, [allSymptomData, form]);

  useEffect(() => {
    if (symptomData) {
      setData(symptomData);
    }
  }, [symptomData]);

  const onFinish = async (values) => {
    const data = {
      category: id,
      ...values,
    };
    console.log(data);
    await addSymptomCategory(data).then((res) => {
      if (res) {
        message.success("Operation successfully done");
        navigate("/category");
      } else {
        message.error("Operation field");
      }
    });
  };

  return (
    <div>
      <h2 className="font-semibold text-xl">Symptom Details</h2>
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <Form form={form} onFinish={onFinish} initialValues={data}>
          {/* Optional Tips Input */}
          <Form.Item
            label="Tips (Optional)"
            name="tips"
            labelCol={{ span: 24 }}
            wrapperCol={{ span: 24 }}
          >
            <Input.TextArea
              rows={5}
              defaultValue={data ? data.tips : ""}
              placeholder="Enter tips"
            />
          </Form.Item>

          {/* Content Array Input */}

          <div className="grid grid-cols-2 gap-5">
            <Form.List name="contents">
              {(fields, { add, remove }) => (
                <>
                  {fields.map(({ key, name, ...restField }) => (
                    <div key={key} className="border p-4 pb-10 mb-4 rounded-lg">
                      <Form.Item
                        {...restField}
                        label="Header"
                        name={[name, "name"]}
                        labelCol={{ span: 24 }}
                        wrapperCol={{ span: 24 }}
                        rules={[
                          { required: true, message: "Name is required" },
                        ]}
                      >
                        <Input />
                      </Form.Item>
                      <Form.Item
                        {...restField}
                        label="Content"
                        name={[name, "content"]}
                        labelCol={{ span: 24 }}
                        wrapperCol={{ span: 24 }}
                        rules={[
                          { required: true, message: "Content is required" },
                        ]}
                      >
                        <JoditEditor
                          value={
                            form.getFieldValue(["contents", name, "content"]) ||
                            ""
                          }
                          onBlur={(newContent) => {
                            form.setFieldsValue({
                              contents: form
                                .getFieldValue("contents")
                                .map((item, index) =>
                                  index === name
                                    ? { ...item, content: newContent }
                                    : item
                                ),
                            });
                          }}
                          config={{
                            enablePaste: true,
                            allowPasteFromWord: true,
                            defaultActionOnPaste: "insert_format_html",
                            pastePlainText: false,
                            enter: "P",
                            cleanHTML: {
                              fillEmptyParagraph: true,
                              removeEmptyNodes: false,
                            },
                            disablePlugins: [],
                            toolbarButtonSize: "middle",
                            buttons: [
                              "source",
                              "bold",
                              "italic",
                              "lineHeight",
                              "underline",
                              "strikethrough",
                              "|",
                              "ul",
                              "ol",
                              "indent",
                              "outdent",
                              "|",
                              "align",
                              "undo",
                              "redo",
                              "|",
                              "fontsize",
                              "brush",
                              "paragraph",
                              "|",
                              "hr",
                              "eraser",
                              "|",
                              "image",
                              "file",
                              "video",
                              "table",
                              "link",
                              "unlink",
                              "|",
                              "fullsize",
                              "selectall",
                              "print",
                              "preview",
                              "dots",
                              "|",
                            ],
                            clipboard: {
                              keepHtml: true,
                            },
                            style: {
                              padding: "20px",
                            },
                            lineHeight: 1.5, 
                            lineHeightValues: [
                              "1",
                              "1.5",
                              "2",
                              "2.5",
                              "3",
                              "3.5",
                              "4",
                            ],
                          }}
                        />
                      </Form.Item>
                      <Button type="link" onClick={() => remove(name)}>
                        Remove
                      </Button>
                    </div>
                  ))}
                  <Form.Item>
                    <Button
                      type="dashed"
                      onClick={() => add({ name: "", content: "" })}
                    >
                      Add Content
                    </Button>
                  </Form.Item>
                </>
              )}
            </Form.List>
          </div>

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
