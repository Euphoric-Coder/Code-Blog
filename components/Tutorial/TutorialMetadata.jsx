import React, { useEffect, useState } from "react";
import { Upload, X, ChevronRight, PlusCircle } from "lucide-react";
import ImageUpload from "@/components/ImageUpload";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import FormBackgroundEffect from "@/components/Effect/FormBackgroundEffect";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import MultiSelect from "../Form/UI/MultiSelect";

const TutorialMetadata = ({ initialData, onComplete, onUpdateMetadata }) => {
  // Initialize metadata from initialData
  useEffect(() => {
    setData(initialData);
    setUploadData(initialData?.coverImage || null);
    setFileId(initialData?.imageId || null);
  }, [initialData]);
  const [data, setData] = useState(initialData);
  const [uploadData, setUploadData] = useState(null);
  const [fileId, setFileId] = useState(null);
  const [errors, setErrors] = useState({});
  const [tag, setTag] = useState("");

  useEffect(() => {
    if (onUpdateMetadata) {
      console.log("Updating metadata:", data);
      onUpdateMetadata(data);
    }
  }, [data]);

  useEffect(() => {
    if (uploadData && fileId) {
      console.log("Upload data:", uploadData);
      // Check if data is already updated to avoid infinite loop
      if (data.coverImage !== uploadData.url || data.imageId !== fileId) {
        setData((prev) => ({
          ...prev,
          coverImage: uploadData,
          imageId: fileId,
        }));
      }
    }
  }, [uploadData, fileId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
    setErrors((prev) => ({ ...prev, [name]: "" })); // Clear error for this field
  };

  const handleMultiSelectChange = (field, values) => {
    setData((prev) => ({
      ...prev,
      [field]: values,
    }));

    if (errors[field]) {
      setErrors((prev) => ({
        ...prev,
        [field]: undefined,
      }));
    }
  };

  const addTag = () => {
    if (tag && !data.tags.includes(tag)) {
      setData({ ...data, tags: [...data.tags, tag] });
      setTag("");
    }
  };

  const removeTag = (tagToRemove) => {
    setData({ ...data, tags: data.tags.filter((t) => t !== tagToRemove) });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};

    console.log("working ");

    if (!data.title) newErrors.title = "Title is required";
    if (!data.description) newErrors.description = "Description is required";
    if (!data.category) newErrors.category = "Category is required";
    if (!data.subcategory) newErrors.subcategory = "Subcategory is required";

    console.log(newErrors.category);
    console.log(newErrors.subcategory);

    // You can also check if an image was uploaded
    // if (!uploadData) newErrors.coverImage = "Cover image is required";

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) return; // Stop submission
    onComplete(data);
  };

  const clearMetadata = () => {
    const emptyData = {
      title: "",
      description: "",
      coverImage: "",
      category: "",
      subcategory: "",
      tags: [],
    };
    setData(emptyData);
    onUpdateMetadata && onUpdateMetadata(emptyData); // Sync reset with parent
  };

  const categories = [
    "Programming",
    "Design",
    "Marketing",
    "Business",
    "Personal Development",
  ];
  const subcategories = {
    Programming: [
      { value: "javascript", label: "JavaScript" },
      { value: "python", label: "Python" },
      { value: "java", label: "Java" },
      { value: "c-cpp", label: "C/C++" },
      { value: "ruby", label: "Ruby" },
      { value: "php", label: "PHP" },
      { value: "go", label: "Go" },
      { value: "rust", label: "Rust" },
    ],
    Design: [
      { value: "ui-ux", label: "UI/UX" },
      { value: "graphic-design", label: "Graphic Design" },
      { value: "web-design", label: "Web Design" },
      { value: "logo-design", label: "Logo Design" },
      { value: "illustration", label: "Illustration" },
    ],
    Marketing: [
      { value: "digital-marketing", label: "Digital Marketing" },
      { value: "content-marketing", label: "Content Marketing" },
      { value: "seo", label: "SEO" },
      { value: "social-media", label: "Social Media" },
      { value: "email-marketing", label: "Email Marketing" },
    ],
    Business: [
      { value: "entrepreneurship", label: "Entrepreneurship" },
      { value: "management", label: "Management" },
      { value: "finance", label: "Finance" },
      { value: "sales", label: "Sales" },
      { value: "strategy", label: "Strategy" },
    ],
    "Personal Development": [
      { value: "productivity", label: "Productivity" },
      { value: "leadership", label: "Leadership" },
      { value: "communication", label: "Communication" },
      { value: "mindfulness", label: "Mindfulness" },
      { value: "creativity", label: "Creativity" },
    ],
  };

  return (
    <div className="form-layout">
      <FormBackgroundEffect />
      <div className="flex justify-between items-start mb-4">
        <h1 className="text-3xl font-extrabold text-blue-900 dark:text-blue-200">
          Create New Tutorial
        </h1>
      </div>
      <div className="flex items-center gap-2">
        <form onSubmit={handleSubmit} className="w-full">
          <div className="space-y-6">
            <div className="w-full flex flex-col gap-6">
              <div className="space-y-4">
                <div>
                  <label htmlFor="title" className="text">
                    Title
                  </label>
                  <span className="text-red-500">&nbsp;*</span>
                  <Input
                    type="text"
                    id="title"
                    name="title"
                    value={data.title}
                    onChange={handleChange}
                    className={`w-full px-4 py-2 ${
                      errors.title
                        ? "input-error-field focus-visible:ring-red-500 dark:focus-visible:ring-offset-gray-800 dark:focus-visible:ring-red-400 focus-visible:ring-[4px]"
                        : "input-field focus-visible:ring-blue-500 dark:focus-visible:ring-offset-gray-800 dark:focus-visible:ring-blue-400 focus-visible:ring-[4px]"
                    }`}
                    placeholder="Enter tutorial title"
                  />
                </div>

                <div>
                  <label htmlFor="description" className="text">
                    Description
                  </label>
                  <span className="text-red-500">&nbsp;*</span>
                  <Textarea
                    id="description"
                    name="description"
                    value={data.description}
                    onChange={handleChange}
                    rows={4}
                    className={`w-full px-4 py-2 ${
                      errors.description
                        ? "input-error-field focus-visible:ring-red-500 dark:focus-visible:ring-offset-gray-800 dark:focus-visible:ring-red-400 focus-visible:ring-[4px]"
                        : "input-field focus-visible:ring-blue-500 dark:focus-visible:ring-offset-gray-800 dark:focus-visible:ring-blue-400 focus-visible:ring-[4px]"
                    }`}
                    placeholder="Provide a brief description of your tutorial"
                  ></Textarea>
                </div>

                <div>
                  <label htmlFor="category" className="text">
                    Category
                  </label>
                  <span className="text-red-500">&nbsp;*</span>

                  <Select
                    value={data.category}
                    onValueChange={(val) => {
                      setData({ ...data, category: val });
                      setErrors((prev) => ({ ...prev, category: null })); // clear error}}
                    }}
                  >
                    <SelectTrigger
                      id="category"
                      className={`
                        w-full rounded-lg px-3 py-2 border transition-colors
                        ${
                          errors.category
                            ? "input-error-field focus-visible:ring-red-500 dark:focus-visible:ring-offset-gray-800 dark:focus-visible:ring-red-400 focus-visible:ring-[4px]"
                            : "input-field focus:ring-blue-500 dark:focus:ring-blue-400 focus:ring-[3px]"
                        }
                      `}
                    >
                      <SelectValue placeholder="Select a category" />
                    </SelectTrigger>

                    <SelectContent className="select-content mt-2">
                      {categories.map((category) => (
                        <SelectItem
                          key={category}
                          value={category}
                          className="select-item"
                        >
                          {category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {data.category && (
                  <div>
                    <MultiSelect
                      id="subcategory"
                      label="Sub-Categories"
                      selectedOptions={data.subcategory}
                      onChange={(values) =>
                        handleMultiSelectChange("subcategory", values)
                      }
                      options={subcategories["Programming"]}
                      error={errors.subcategory}
                      required
                      placeholder="Add the Sub-Categories"
                      allowCustom
                    />
                    {/* <Select
                      value={data.subcategory}
                      onValueChange={(val) => {
                        setData({ ...data, subcategory: val });
                        setErrors((prev) => ({
                          ...prev,
                          subcategory: null, // clear error
                        }));
                      }}
                      required
                    >
                      <SelectTrigger
                        id="subcategory"
                        className={`
                          w-full rounded-lg px-3 py-2 border transition-colors
                          ${
                            errors.subcategory
                              ? "input-error-field focus-visible:ring-red-500 dark:focus-visible:ring-offset-gray-800 dark:focus-visible:ring-red-400 focus-visible:ring-[4px]"
                              : "input-field focus:ring-blue-500 dark:focus:ring-blue-400 focus:ring-[3px]"
                          }
                        `}
                      >
                        <SelectValue placeholder="Select a subcategory" />
                      </SelectTrigger>

                      <SelectContent className="select-content mt-2">
                        {subcategories[data.category]?.map((subcategory) => (
                          <SelectItem
                            key={subcategory}
                            value={subcategory}
                            className="select-item"
                          >
                            {subcategory}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select> */}
                  </div>
                )}

                <div>
                  <label className="text">Tags</label>
                  <div className="flex space-x-2">
                    <Input
                      type="text"
                      value={tag}
                      onChange={(e) => setTag(e.target.value)}
                      className="flex-1 px-4 py-2 input-field focus-visible:ring-blue-500 dark:focus-visible:ring-offset-gray-800 dark:focus-visible:ring-blue-400 focus-visible:ring-[4px]"
                      placeholder="Add a tag"
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          e.preventDefault();
                          addTag();
                        }
                      }}
                    />
                    <Button onClick={addTag} className="btn4 [&_svg]:size-6">
                      <PlusCircle />
                      Add
                    </Button>
                  </div>

                  <div className="flex flex-wrap gap-2 mt-2">
                    {data.tags.map((t) => (
                      <span
                        key={t}
                        className="inline-flex items-center bg-blue-100 text-blue-800 px-2 py-1 rounded-md text-sm"
                      >
                        {t}
                        <button
                          type="button"
                          onClick={() => removeTag(t)}
                          className="ml-1 text-blue-600 hover:text-blue-800 transition-colors"
                        >
                          <X className="h-3 w-3" />
                        </button>
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div>
                <ImageUpload
                  uploadData={uploadData}
                  setUploadData={setUploadData}
                  fileId={fileId}
                  setFileId={setFileId}
                  tutorial={true}
                />
              </div>
            </div>

            <div className="flex justify-end">
              <Button type="submit" className="btn3 [&_svg]:size-6">
                Continue
                <ChevronRight className="" />
              </Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TutorialMetadata;
