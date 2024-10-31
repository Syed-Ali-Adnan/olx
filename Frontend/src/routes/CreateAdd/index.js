import { Button, Form, Input, Select, Upload } from "antd";
import "./index.css";
import { useEffect, useState } from "react";
import axios from "axios";
import { baseUrl } from "../../shared/constant";
import { useSelector } from "react-redux";
import LoginHeader from "../../components/LoginHeader"
import { useNavigate, useParams, useSearchParams } from "react-router-dom";

const categories = [
  { value: "BUSINESS", name: "Business" },
  { value: "FURNITURE", name: "Furniture" },
  { value: "FASHION", name: "Fashion" },
  { value: "ELECTONICS", name: "Electronics" },
  { value: "BOOKS", name: "Books" },
  { value: "ANIMALS", name: "Animals" },
  { value: "BIKES", name: "Bikes" },
];

const CreateAdd = () => {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const { user } = useSelector((s) => s.userReducer);
  const [loading, setLoading] = useState(false);
  const [searchParams] = useSearchParams();
  const addId = searchParams.get("addId");
  const [image, setImage] = useState("");

  useEffect(() => {
    if (addId) {
      axios
        .get(`${baseUrl}/adds/get-add/${addId}`)
        .then((res) => {
          if (res.data) {
            console.log("🚀 ~ .then ~ res.data:", res.data);
            form.setFieldsValue({
              productName: res.data.add.productName,
              productPrice: res.data.add.productPrice,
              image: res.data.add.image,
              category: res.data.add.category,
              description: res.data.add.description,
            });
            setImage(res.data.add.image);
          } else {
          }
        })
        .catch((err) => {
          alert(err.response.data.message);
        });
    }
  }, []);

  const onFinish = (value) => {
    console.log("🚀 ~ value:", value);
    setLoading(true);
    const formData = new FormData();
    formData.append("productName", value.productName);
    formData.append("productPrice", value.productPrice);
    formData.append("description", value.description);
    formData.append("category", value.category);
    formData.append("authorId", user?._id);

    const file = value?.image?.file || value?.image;
    console.log("🚀 ~ file:", file);

    if (file?.uid) {
      formData.append("image", file);
    }

    if (addId) {
      formData.append("id", addId);

      axios
        .put(`${baseUrl}/adds/update-adds`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((res) => {
          console.log("🚀 ~ .then ~ res:", res);
          setLoading(false);
           navigate("/");
        })
        .catch((err) => {
          setLoading(false);
        });
    } else {
      const addDetail = { ...value, authorId: user?._id };

      axios
        .post(`${baseUrl}/adds/create-adds`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((res) => {
          console.log("🚀 ~ .then ~ res:", res);
          setLoading(false);
          navigate("/");
        })
        .catch((err) => {
          setLoading(false);
        });
    }
  };

  const handleCancel = () => {
    navigate("/");
  };
  const onSelectImage = (e) => {
    console.log("🚀 ~ onSelectImage ~ e:", e);
    const url = URL.createObjectURL(e);
    console.log("🚀 ~ url:", url);
    form.setFieldValue("image", e);
    setImage(url);
    return false;
  };
  return (
    <>
    <LoginHeader/>
    <div className="create-blog-form">
      <h1>Create Adds</h1>
      <Form
        form={form}
        name="basic"
        initialValues={{ productName: "", image: "", category: "", description: "" , productPrice: "" }}
        onFinish={onFinish}
        autoComplete="off"
      >
        <div className="field-container">
          <p>Product Name</p>
          <Form.Item
            name="productName"
            rules={[
              {
                required: true,
                message: "This field is required!",
              },
            ]}
          >
            <Input />
          </Form.Item>
        </div>
        <div className="field-container">
          <p>Product Price</p>
          <Form.Item
            name="productPrice"
            rules={[
              {
                required: true,
                message: "This field is required!",
              },
            ]}
          >
            <Input />
          </Form.Item>
        </div>
        <div className="field-container">
          <p>Category</p>
          <Form.Item
            name="category"
            rules={[
              {
                required: true,
                message: "This field is required",
              },
            ]}
          >
            <Select>
              {categories.map((cat) => (
                <Select.Option value={cat.value}>{cat.name}</Select.Option>
              ))}
            </Select>
          </Form.Item>
        </div>
        <div className="field-container">
          <p>Description</p>
          <Form.Item
            name="description"
            rules={[
              {
                required: true,
                message: "This field is required",
              },
            ]}
          >
            <Input.TextArea />
          </Form.Item>
        </div>
        <div className="field-container">
          <p>Select Image</p>
          <Form.Item
            name="image"
            rules={[
              {
                required: true,
                message: "This field is required",
              },
            ]}
          >
            <Upload
              showUploadList={false}
              beforeUpload={onSelectImage}
              previewFile={false}
              maxCount={1}
              multiple={false}
            >
              <Button>Upload</Button>
            </Upload>
            {image ? (
              <div>
                <img src={image} className="selected-image" />
              </div>
            ) : null}
          </Form.Item>
        </div>
        <div className="footer-sec">
          <Button
            type="default"
            className="footer-sec-button"
            onClick={handleCancel}
          >
            Cancel
          </Button>
          <Form.Item className="footer-sec-button">
            <Button type="primary" htmlType="submit" loading={loading}>
              {addId ? "Update" : "Create"}
            </Button>
          </Form.Item>
        </div>
      </Form>
    </div>
    </>
    
  );
  
};

export default CreateAdd;
