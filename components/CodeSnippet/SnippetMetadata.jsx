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
import { Badge } from "../ui/badge";
import { toast } from "sonner";
import {
  snippetCategories,
  tutorialCategories,
  tutorialSubCategoriesList,
} from "@/lib/data";

const SnippetMetadata = ({
  initialData,
  onComplete,
  onUpdateMetadata,
  editing = false,
  errors,
  setErrors,
}) => {
  // Initialize metadata from initialData
  useEffect(() => {
    setData(initialData);
  }, [initialData]);

  const [data, setData] = useState(initialData);
  const [tag, setTag] = useState("");

  const languages = snippetCategories.map((category) => category.name);

  useEffect(() => {
    if (editing) return;
    if (onUpdateMetadata) {
      console.log("Updating metadata:", data);
      onUpdateMetadata(data);
    }
  }, [data]);

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

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) return; // Stop submission
    onComplete(data);
  };

  const clearMetadata = () => {
    const emptyData = {
      title: "",
      description: "",
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
      <div className="flex justify-between items-start mb-4">
        <h1 className="text-3xl font-extrabold text-blue-900 dark:text-blue-200">
          Snippet Metadata
        </h1>
      </div>
      <div className="flex items-center gap-2">
        <form onSubmit={handleSubmit} className="w-full">
          <div className="space-y-6">
            <div className="w-full flex flex-col gap-6">
              <div className="space-y-4">
                <div>
                  <label htmlFor="language" className="text">
                    Language
                  </label>
                  <span className="text-red-500">&nbsp;*</span>

                  <Select
                    value={data.language}
                    onValueChange={(val) => {
                      console.log(val);
                      setData({ ...data, language: val });
                      setErrors((prev) => ({ ...prev, language: null })); // clear error}}
                    }}
                  >
                    <SelectTrigger
                      id="language"
                      className={`
                        mt-1 w-full rounded-lg px-3 py-2 border transition-colors
                        ${
                          errors.language
                            ? "input-error-field focus-visible:ring-red-500 dark:focus-visible:ring-offset-gray-800 dark:focus-visible:ring-red-400 focus-visible:ring-[4px]"
                            : "input-field focus:ring-blue-500 dark:focus:ring-blue-400 focus:ring-[3px]"
                        }
                      `}
                    >
                      <SelectValue placeholder="Select a Language" />
                    </SelectTrigger>

                    <SelectContent className="select-content mt-2">
                      {languages.map((language) => (
                        <SelectItem
                          key={language}
                          value={language}
                          className="select-item"
                        >
                          {language}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
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

export default SnippetMetadata;
