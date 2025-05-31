import React, { useEffect, useState } from "react";
import { Upload, X, ChevronRight } from "lucide-react";
import { useUser } from "@clerk/nextjs";
import ImageUpload from "@/components/ImageUpload";
import { Input } from "@/components/ui/input";
import FormBackgroundEffect from "@/components/Effect/FormBackgroundEffect";

const TutorialMetadata = ({ initialData, onComplete, onUpdateMetadata }) => {
  const { user } = useUser();

  // Initialize metadata from initialData
  useEffect(() => {
    setData(initialData);
    setUploadData(initialData?.coverImage || null);
    setFileId(initialData?.imageId || null);
  }, [initialData]);
  const [data, setData] = useState(initialData);
  const [uploadData, setUploadData] = useState(null);
  const [fileId, setFileId] = useState(null);

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
      "JavaScript",
      "Python",
      "Java",
      "C/C++",
      "Ruby",
      "PHP",
      "Go",
      "Rust",
    ],
    Design: [
      "UI/UX",
      "Graphic Design",
      "Web Design",
      "Logo Design",
      "Illustration",
    ],
    Marketing: [
      "Digital Marketing",
      "Content Marketing",
      "SEO",
      "Social Media",
      "Email Marketing",
    ],
    Business: [
      "Entrepreneurship",
      "Management",
      "Finance",
      "Sales",
      "Strategy",
    ],
    "Personal Development": [
      "Productivity",
      "Leadership",
      "Communication",
      "Mindfulness",
      "Creativity",
    ],
  };

  return (
    <div className="form-layout">
      <FormBackgroundEffect />
      <div className="flex justify-between items-start mb-4">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Create New Tutorial
        </h1>
      </div>
      <div className="flex items-center gap-2">
        <form onSubmit={handleSubmit} className="w-full">
          <div className="space-y-6">
            <div className="w-full flex flex-col gap-6">
              <div className="space-y-4">
                <div>
                  <label
                    htmlFor="title"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Title
                  </label>
                  <Input
                    type="text"
                    id="title"
                    name="title"
                    value={data.title}
                    onChange={handleChange}
                    className="w-full px-4 py-2 input-field focus-visible:ring-blue-500 dark:focus-visible:ring-offset-gray-800 dark:focus-visible:ring-blue-400 focus-visible:ring-[4px]"
                    required
                    placeholder="Enter tutorial title"
                  />
                </div>

                <div>
                  <label
                    htmlFor="description"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Description
                  </label>
                  <textarea
                    id="description"
                    name="description"
                    value={data.description}
                    onChange={handleChange}
                    rows={4}
                    className="w-full px-4 py-2 input-field focus-visible:ring-blue-500 dark:focus-visible:ring-offset-gray-800 dark:focus-visible:ring-blue-400 focus-visible:ring-[4px]"
                    required
                    placeholder="Provide a brief description of your tutorial"
                  ></textarea>
                </div>

                <div>
                  <label
                    htmlFor="category"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Category
                  </label>
                  <select
                    id="category"
                    name="category"
                    value={data.category}
                    onChange={handleChange}
                    className="w-full px-4 py-2 input-field"
                    required
                  >
                    <option value="">Select a category</option>
                    {categories.map((category) => (
                      <option
                        key={category}
                        value={category}
                        className="select-content"
                      >
                        {category}
                      </option>
                    ))}
                  </select>
                </div>

                {data.category && (
                  <div>
                    <label
                      htmlFor="subcategory"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Subcategory
                    </label>
                    <select
                      id="subcategory"
                      name="subcategory"
                      value={data.subcategory}
                      onChange={handleChange}
                      className="w-full px-4 py-2 select-content"
                      required
                    >
                      <option value="">Select a subcategory</option>
                      {subcategories[data.category]?.map((subcategory) => (
                        <option key={subcategory} value={subcategory}>
                          {subcategory}
                        </option>
                      ))}
                    </select>
                  </div>
                )}

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Tags
                  </label>
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
                    <button
                      type="button"
                      onClick={addTag}
                      className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded-md transition-colors"
                    >
                      Add
                    </button>
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
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Cover Image
                </label>
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
            </div>

            <div className="flex justify-end">
              <button
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md transition-colors flex items-center"
              >
                Continue to Sections
                <ChevronRight className="h-5 w-5 ml-2" />
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TutorialMetadata;
