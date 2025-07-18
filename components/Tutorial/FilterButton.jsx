import React from "react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from "@/components/ui/dialog";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CalendarIcon, Filter } from "lucide-react";
import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar"; // Assuming you're using shadcn
import { cn } from "@/lib/utils";

const FilterButton = ({
  tempFilters,
  setTempFilters,
  blogCategories,
  blogSubCategoriesList,
  blogAuthors,
  filterCount,
  selectedCategoryCount,
  selectedSubCategoryCount,
  selectedAuthorCount,
  hasActiveFilters,
  applyFilters,
  clearFilters,
  resetFilters,
  handleDialogClose,
}) => {
  return (
    <div className="flex gap-3">
      <Dialog
        onOpenChange={handleDialogClose}
        onClose={() => setIsFilterOpen(false)}
      >
        <DialogTrigger asChild>
          <Button
            className={`flex items-center gap-2 px-4 py-2 rounded-3xl transition-colors ${
              filterCount > 0
                ? "bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 text-white hover:from-purple-600 hover:via-purple-700 hover:to-purple-800 dark:from-violet-700 dark:via-violet-800 dark:to-violet-900 dark:text-white dark:hover:from-violet-800 dark:hover:via-violet-900 dark:hover:to-violet-950"
                : "bg-gradient-to-r from-purple-100 via-purple-200 to-purple-300 text-purple-700 hover:from-purple-200 hover:via-purple-300 hover:to-purple-400 dark:from-violet-900 dark:via-violet-950 dark:to-purple-900 dark:text-violet-300 dark:hover:from-violet-800 dark:hover:via-violet-900 dark:hover:to-purple-950"
            }`}
          >
            <Filter size={20} />
            {filterCount > 0 ? `Filters (${filterCount})` : "Filter"}
          </Button>
        </DialogTrigger>
        <DialogContent className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-gradient-to-br from-white via-blue-50 to-indigo-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 p-8 rounded-3xl shadow-[0_0_40px_rgba(0,200,255,0.3)] w-[95%] max-w-2xl max-h-[80vh] md:max-h-[90vh] overflow-y-auto">
          {/* Background Effects */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute -top-10 -left-10 w-60 h-60 bg-gradient-radial from-purple-400 via-blue-400 to-transparent dark:from-indigo-800 dark:via-blue-800 dark:to-gray-800 opacity-25 blur-3xl animate-spin-slow"></div>
            <div className="absolute bottom-20 right-10 w-80 h-80 bg-gradient-radial from-teal-300 via-blue-300 to-transparent dark:from-blue-900 dark:via-teal-800 dark:to-gray-800 opacity-30 blur-[120px]"></div>
          </div>
          {/* Filter Heading */}
          <DialogHeader>
            <DialogTitle className="flex gap-2 items-center text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-teal-500 via-purple-500 to-pink-500 dark:from-blue-400 dark:via-indigo-400 dark:to-teal-400">
              Tutorial Filter
            </DialogTitle>
            <DialogDescription asChild>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Select filters to apply to your transactions.
              </p>
            </DialogDescription>
          </DialogHeader>
          {/* Filter Options */}
          <div className="space-y-6">
            {/* Sort Blogs By */}
            <div
              className="relative max-h-[300px] p-3 shadow-sm rounded-xl border-2 
             bg-gradient-to-r from-blue-50 to-blue-100 dark:from-gray-800 dark:to-gray-900
             border-purple-400 dark:border-blue-800 transition-all"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <label className="budg-text1">Sort Blogs By</label>
                  <Badge className="border-0 bg-gradient-to-r from-amber-400 to-yellow-500 text-white px-2 py-1 rounded-full text-xs dark:from-yellow-500 dark:to-yellow-600">
                    {tempFilters.oldestBlog ? "Oldest First" : "Newest First"}
                  </Badge>
                </div>

                {tempFilters.oldestBlog && (
                  <Button
                    variant="outline"
                    onClick={() =>
                      setTempFilters((prev) => ({
                        ...prev,
                        oldestBlog: false,
                      }))
                    }
                    className="del2"
                    size="sm"
                  >
                    Reset Sort
                  </Button>
                )}
              </div>

              <div className="mt-2 flex flex-wrap gap-3">
                <Badge
                  onClick={() =>
                    setTempFilters((prev) => ({
                      ...prev,
                      oldestBlog: true,
                    }))
                  }
                  className={`px-3 py-1 rounded-full text-sm font-bold cursor-pointer transition-all ${
                    tempFilters.oldestBlog
                      ? "bg-gradient-to-r from-blue-500 to-indigo-600 text-white dark:from-blue-600 dark:to-purple-700"
                      : "bg-gray-200 text-gray-700 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600"
                  }`}
                >
                  Oldest
                </Badge>
                <Badge
                  onClick={() =>
                    setTempFilters((prev) => ({
                      ...prev,
                      oldestBlog: false,
                    }))
                  }
                  className={`px-3 py-1 rounded-full text-sm font-bold cursor-pointer transition-all ${
                    !tempFilters.oldestBlog
                      ? "bg-gradient-to-r from-blue-500 to-indigo-600 text-white dark:from-blue-600 dark:to-purple-700"
                      : "bg-gray-200 text-gray-700 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600"
                  }`}
                >
                  Newest
                </Badge>
              </div>
            </div>
            {/* Date Range */}
            <div>
              <label className="blog-text1">Blog Creation Date Range</label>
              <div className="mt-2">
                <Popover modal>
                  <PopoverTrigger asChild>
                    <Button
                      id="date"
                      variant="outline"
                      className={cn(
                        "blog-select-field justify-start",
                        !tempFilters.dateRange.from && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon />
                      {tempFilters.dateRange.from ? (
                        tempFilters.dateRange.to ? (
                          <>
                            {format(
                              new Date(tempFilters.dateRange.from),
                              "LLL dd, y"
                            )}{" "}
                            -{" "}
                            {format(
                              new Date(tempFilters.dateRange.to),
                              "LLL dd, y"
                            )}
                          </>
                        ) : (
                          format(
                            new Date(tempFilters.dateRange.from),
                            "LLL dd, y"
                          )
                        )
                      ) : (
                        <span>Pick a Date Range</span>
                      )}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      initialFocus
                      mode="range"
                      defaultMonth={
                        tempFilters.dateRange.from
                          ? new Date(tempFilters.dateRange.from)
                          : new Date()
                      }
                      selected={{
                        from: tempFilters.dateRange.from
                          ? new Date(tempFilters.dateRange.from)
                          : undefined,
                        to: tempFilters.dateRange.to
                          ? new Date(tempFilters.dateRange.to)
                          : undefined,
                      }}
                      onSelect={(e) =>
                        setTempFilters((prev) => ({
                          ...prev,
                          dateRange: {
                            from: e?.from ? format(e.from, "yyyy-MM-dd") : "",
                            to: e?.to ? format(e.to, "yyyy-MM-dd") : "",
                          },
                        }))
                      }
                      numberOfMonths={2}
                    />
                  </PopoverContent>
                </Popover>
              </div>
            </div>
            {/* Categories */}
            <div
              className="relative max-h-[300px] overflow-y-auto 
                    p-3 shadow-sm rounded-xl border-2 
                    bg-gradient-to-r from-blue-50 to-blue-100 dark:from-gray-800 dark:to-gray-900
                    border-cyan-400 dark:border-blue-800 transition-all"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <label className="budg-text1">
                    Categories ({blogCategories.length})
                  </label>
                  {/* Show Selected Count Badge */}
                  {selectedCategoryCount > 0 && (
                    <Badge className="border-0 bg-gradient-to-r from-green-400 to-green-600 text-white px-2 py-1 rounded-full text-xs dark:from-green-500 dark:to-green-700 ">
                      Selected: {selectedCategoryCount}
                    </Badge>
                  )}
                </div>
                <div>
                  {/* Clear Button */}
                  {selectedCategoryCount > 0 && (
                    <Button
                      variant="outline"
                      onClick={() =>
                        setTempFilters({
                          ...tempFilters,
                          category: [],
                        })
                      }
                      className="del2"
                      size="sm"
                    >
                      Clear Selection
                    </Button>
                  )}
                </div>
              </div>
              <div className="mt-2 flex flex-wrap gap-3">
                {blogCategories.map((category) => (
                  <Badge
                    key={category}
                    onClick={() => {
                      setTempFilters((prev) => ({
                        ...prev,
                        category: prev.category.includes(category.toLowerCase())
                          ? prev.category.filter(
                              (c) => c !== category.toLowerCase()
                            )
                          : [...prev.category, category.toLowerCase()],
                      }));
                    }}
                    className={`border-0 rounded-full text-sm cursor-pointer px-3 py-1 transition-all font-bold ${
                      tempFilters.category.includes(category.toLowerCase())
                        ? "bg-gradient-to-r from-blue-500 to-blue-700 text-white hover:from-blue-600 hover:to-blue-800"
                        : "bg-gray-200 text-gray-700 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600"
                    }`}
                  >
                    {category}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Sub-Categories (Only Show When Categories Are Selected) */}
            {tempFilters.category.length > 0 && (
              <div
                className="relative max-h-[200px] overflow-y-auto 
                    p-3 shadow-sm rounded-xl border-2 
                    bg-gradient-to-r from-blue-50 to-blue-100 dark:from-gray-800 dark:to-gray-900
                    border-cyan-400 dark:border-blue-800 transition-all"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <label className="blog-text1">
                      Sub-Categories (
                      {
                        new Set(
                          tempFilters.category.flatMap(
                            (category) => blogSubCategoriesList[category] || []
                          )
                        ).size
                      }
                      )
                    </label>
                    {/* Show Selected Count Badge */}
                    {selectedSubCategoryCount > 0 && (
                      <Badge className="border-0 bg-gradient-to-r from-green-400 to-green-600 text-white px-2 py-1 rounded-full text-xs dark:from-green-500 dark:to-green-700 ">
                        Selected: {selectedSubCategoryCount}
                      </Badge>
                    )}
                  </div>
                  <div>
                    {/* Clear Button */}
                    {selectedSubCategoryCount > 0 && (
                      <Button
                        variant="outline"
                        onClick={() =>
                          setTempFilters({
                            ...tempFilters,
                            subCategories: [],
                          })
                        }
                        className="text-sm rounded-full text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-500 dark:border-gray-300"
                        size="sm"
                      >
                        Clear Selection
                      </Button>
                    )}
                  </div>
                </div>

                {/* Subcategories List */}
                <div className="mt-3 flex flex-wrap gap-3">
                  {[
                    ...new Set(
                      tempFilters.category.flatMap(
                        (category) => blogSubCategoriesList[category] || []
                      )
                    ),
                  ] // Convert Set back to an array to prevent duplicates
                    .map((subCategory) => (
                      <Badge
                        key={subCategory}
                        onClick={() => {
                          setTempFilters((prev) => ({
                            ...prev,
                            subCategories: prev.subCategories.includes(
                              subCategory.toLowerCase()
                            )
                              ? prev.subCategories.filter(
                                  (c) => c !== subCategory.toLowerCase()
                                )
                              : [
                                  ...prev.subCategories,
                                  subCategory.toLowerCase(),
                                ],
                          }));
                        }}
                        className={`border-0 rounded-full text-sm font-bold cursor-pointer px-3 py-1 transition-all ${
                          tempFilters.subCategories.includes(
                            subCategory.toLowerCase()
                          )
                            ? "bg-gradient-to-r from-blue-500 to-blue-700 text-white hover:from-blue-600 hover:to-blue-800"
                            : "bg-gray-200 text-gray-700 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600"
                        }`}
                      >
                        {subCategory}
                      </Badge>
                    ))}
                </div>
              </div>
            )}

            {/* Authors */}
            <div
              className="relative max-h-[300px] overflow-y-auto 
                    p-3 shadow-sm rounded-xl border-2 
                    bg-gradient-to-r from-blue-50 to-blue-100 dark:from-gray-800 dark:to-gray-900
                    border-cyan-400 dark:border-blue-800 transition-all"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <label className="budg-text1">
                    Authors ({blogAuthors.length})
                  </label>
                  {/* Show Selected Count Badge */}
                  {selectedAuthorCount > 0 && (
                    <Badge className="border-0 bg-gradient-to-r from-green-400 to-green-600 text-white px-2 py-1 rounded-full text-xs dark:from-green-500 dark:to-green-700 ">
                      Selected: {selectedAuthorCount}
                    </Badge>
                  )}
                </div>
                <div>
                  {/* Clear Button */}
                  {selectedAuthorCount > 0 && (
                    <Button
                      variant="outline"
                      onClick={() =>
                        setTempFilters({
                          ...tempFilters,
                          authors: [],
                        })
                      }
                      className="del2"
                      size="sm"
                    >
                      Clear Selection
                    </Button>
                  )}
                </div>
              </div>
              <div className="mt-2 flex flex-wrap gap-3">
                {blogAuthors.map((author) => (
                  <Badge
                    key={author}
                    onClick={() => {
                      setTempFilters((prev) => ({
                        ...prev,
                        authors: prev.authors.includes(author.toLowerCase())
                          ? prev.authors.filter(
                              (c) => c !== author.toLowerCase()
                            )
                          : [...prev.category, author.toLowerCase()],
                      }));
                    }}
                    className={`border-0 rounded-full text-sm cursor-pointer px-3 py-1 transition-all font-bold ${
                      tempFilters.authors.includes(author.toLowerCase())
                        ? "bg-gradient-to-r from-blue-500 to-blue-700 text-white hover:from-blue-600 hover:to-blue-800"
                        : "bg-gray-200 text-gray-700 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600"
                    }`}
                  >
                    {author}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Buttons */}
            <div className="flex justify-end space-x-4">
              <Button variant="outline" onClick={clearFilters} className="del2">
                Clear Filters
              </Button>
              {hasActiveFilters && (
                <Button onClick={resetFilters} className="del3">
                  Reset Filters
                </Button>
              )}
              <DialogClose asChild>
                <Button onClick={applyFilters} className="budg-btn4">
                  Apply Filters
                </Button>
              </DialogClose>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {hasActiveFilters && (
        <button onClick={resetFilters} className="del3">
          Reset Filters
        </button>
      )}
    </div>
  );
};

export default FilterButton;
