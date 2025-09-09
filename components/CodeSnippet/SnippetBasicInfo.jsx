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

const SnippetBasicInfo = ({
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
          Basic Information
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
                    className={`mt-1 w-full px-4 py-2 resize-none ${
                      errors.description
                        ? "input-error-field focus-visible:ring-red-500 dark:focus-visible:ring-offset-gray-800 dark:focus-visible:ring-red-400 focus-visible:ring-[4px]"
                        : "input-field focus-visible:ring-blue-500 dark:focus-visible:ring-offset-gray-800 dark:focus-visible:ring-blue-400 focus-visible:ring-[4px]"
                    }`}
                    placeholder="Provide a brief description of your tutorial"
                  ></Textarea>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SnippetBasicInfo;
