import React, { useEffect, useState } from "react";
import { Upload, X, ChevronRight, PlusCircle, Trash } from "lucide-react";
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
import { Badge } from "../ui/badge";
import { toast } from "sonner";
import { tutorialCategories, tutorialSubCategoriesList } from "@/lib/data";
import { Label } from "../ui/label";
import Image from "next/image";
import { set } from "date-fns";

const TutorialMetadata = ({
  initialData,
  onComplete,
  onUpdateMetadata,
  editing = false,
  setEditBlogCoverImageId,
  setClearPendingAlert,
  errors,
  setErrors,
}) => {
  // Initialize metadata from initialData
  useEffect(() => {
    setData(initialData);
    setUploadData(initialData?.coverImage || null);
    setFileId(initialData?.imageId || null);
    setEditBlogCoverImageId(editing ? initialData?.imageId : null);
  }, [initialData]);

  const [data, setData] = useState(initialData);
  const [uploadData, setUploadData] = useState(null);
  const [fileId, setFileId] = useState(null);
  const [editCoverImage, setEditCoverImage] = useState(editing ? true : false);
  const [tag, setTag] = useState("");

  useEffect(() => {
    // if (editing) return;
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
    } else {
      toast.error("Please Avoid Using Duplicate Value!");
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
    if (data.subcategory.length === 0)
      newErrors.subcategory = "Subcategory is required";

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

  return (
    <div className="form-layout">
      <FormBackgroundEffect />
      <div className="flex justify-end mb-4">
        <span className="inline-block px-4 py-1 text-xs font-medium rounded-full bg-blue-200 text-blue-900 dark:bg-blue-800 dark:text-blue-100">
          Page 1 of 2
        </span>
      </div>
      <div className="flex flex-col md:flex-row justify-center md:justify-between items-center mb-4">
        <h1 className="text-3xl font-extrabold text-blue-900 dark:text-blue-200">
          {editing ? "Edit" : "Create New"} Tutorial
        </h1>
        {editing && (
          <div>
            <Button
              className="del1 [&_svg]:size-5 ml-4"
              onClick={() => {
                setClearPendingAlert(true);
              }}
            >
              <Trash className="size-5" />
              Delete Tutorial
            </Button>
          </div>
        )}
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
                    className={`mt-1 w-full px-4 py-2 ${
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
                    className={`mt-1 w-full px-4 py-2 ${
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
                      setData({ ...data, category: val, subcategory: [] });
                      setErrors((prev) => ({ ...prev, category: null })); // clear error}}
                    }}
                  >
                    <SelectTrigger
                      id="category"
                      className={`
                        mt-1 w-full rounded-lg px-3 py-2 border transition-colors
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
                      {tutorialCategories.map((category) => (
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
                      options={[
                        ...(tutorialSubCategoriesList[data.category]?.filter(
                          (option) => !data.subcategory.includes(option.value)
                        ) || []),
                        // Include custom subcategories (not present in predefined list)
                        ...data.subcategory
                          .filter(
                            (val) =>
                              !tutorialSubCategoriesList[data.category]?.some(
                                (option) => option.value === val
                              )
                          )
                          .map((val) => ({ value: val, label: val })),
                      ]}
                      error={errors.subcategory}
                      required
                      placeholder="Add the Sub-Categories"
                      allowCustom
                    />
                  </div>
                )}

                <div>
                  <div className="flex items-center justify-between">
                    <label className="text">Tags</label>
                    <Button
                      onClick={(e) => {
                        e.preventDefault();
                        addTag();
                      }}
                      className="flex md:hidden btn4 [&_svg]:size-6"
                    >
                      <PlusCircle />
                      Add
                    </Button>
                  </div>
                  <div className="flex items-center gap-2">
                    <div
                      className={`
      mt-1 w-full flex flex-wrap items-center gap-2 px-3 py-2
      border rounded-lg input-field focus-within:ring-[4px]
      focus-within:ring-blue-500 dark:focus-within:ring-blue-400
    `}
                    >
                      {/* Render existing tags */}
                      {data.tags.map((t) => (
                        <Badge
                          key={t}
                          className="inline-flex items-center gap-1 bg-indigo-100 hover:bg-indigo-200 text-indigo-800 px-2 py-1 rounded-3xl text-sm dark:bg-indigo-900 hover:dark:bg-indigo-700 dark:text-indigo-100"
                        >
                          {t}
                          <button
                            type="button"
                            onClick={() => removeTag(t)}
                            className="text-indigo-500 hover:text-red-600 focus:outline-none dark:text-indigo-300 dark:hover:text-red-600"
                          >
                            <X className="h-3 w-3" />
                          </button>
                        </Badge>
                      ))}

                      {/* Tag input field */}
                      <input
                        type="text"
                        value={tag}
                        onChange={(e) => setTag(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            e.preventDefault();
                            addTag();
                          }
                        }}
                        placeholder="Add a tag"
                        className="flex-1 min-w-[100px] bg-transparent border-none focus:outline-none text-sm placeholder-gray-400 dark:placeholder-gray-500"
                      />
                    </div>
                    {/* Add tag button */}
                    <Button
                      onClick={(e) => {
                        e.preventDefault();
                        addTag();
                      }}
                      className="hidden md:flex btn4 [&_svg]:size-6"
                    >
                      <PlusCircle />
                      Add
                    </Button>
                  </div>
                </div>
              </div>

              <div>
                {editCoverImage && editing && uploadData && fileId ? (
                  <div className="mb-6">
                    <Label
                      htmlFor="blog-cover-image"
                      className="text-lg font-semibold text-blue-100 bg-gradient-to-r from-blue-500 via-indigo-400 to-purple-500 px-3 py-1 rounded-full shadow-md transform -translate-y-12 -translate-x-1/5 transition-all duration-300 ease-in-out z-20 cursor-pointer hover:scale-105"
                    >
                      Blog Cover Image
                    </Label>
                    <div className="relative flex flex-col items-center gap-6 mt-4 p-6 border-2 border-dashed border-blue-300 rounded-2xl bg-gradient-to-br from-cyan-50 to-indigo-100 shadow-lg hover:shadow-xl transition-all duration-300">
                      {/* Image Block */}
                      <div className="flex-1 max-w-md overflow-hidden rounded-xl shadow-md transition-transform duration-300 hover:scale-105">
                        <Image
                          src={uploadData || initialData?.coverImage}
                          alt="Blog Cover"
                          width={500}
                          height={500}
                          className="w-full h-[300px] object-cover rounded-xl"
                          draggable={false}
                        />
                      </div>

                      {/* Info and Actions - stacked below image for better alignment */}
                      <div className="flex flex-col gap-3 justify-center items-center w-full md:w-auto md:items-start text-center md:text-left">
                        <h3 className="text-lg font-bold text-gray-800 dark:text-white">
                          Cover Image Uploaded
                        </h3>
                        <Button
                          onClick={() => {
                            setEditCoverImage(false);
                            setEditBlogCoverImageId(
                              fileId || initialData?.imageId
                            );
                            setData((prev) => ({
                              ...prev,
                              coverImage: null,
                              imageId: null,
                            }));
                            setUploadData(null);
                            setFileId(null);
                          }}
                          className="bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 text-white font-medium px-5 py-2 rounded-xl shadow-lg hover:scale-105 hover:shadow-xl transition-transform duration-300"
                        >
                          Reupload Image
                        </Button>
                      </div>
                    </div>
                  </div>
                ) : (
                  <ImageUpload
                    uploadData={uploadData}
                    setUploadData={setUploadData}
                    fileId={fileId}
                    setFileId={setFileId}
                    tutorial={true}
                  />
                )}
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
