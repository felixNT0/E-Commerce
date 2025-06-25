"use client";

import Input from "@/component/input";
import Select from "@/component/select";
import { useAppData } from "@/context";
import { debounce } from "lodash";
import { useCallback, useMemo, useState } from "react";

import Loader from "@/component/loader";
import Header from "@/layout/header";
import ProductCard from "../product-card";

const MainPage = () => {
  const [filter, setFilter] = useState({
    category: "",
    minPrice: "",
    maxPrice: "",
    searchQuery: "",
  });
  const [debouncedFilter, setDebouncedFilter] = useState({
    category: "",
    minPrice: "",
    maxPrice: "",
    searchQuery: "",
  });

  const [noResults, setNoResults] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const { products = [], categories, isLoadingProduct } = useAppData();

  const itemsPerPage = 12;

  const updateDebouncedFilter = useCallback(
    debounce((newFilter) => {
      setDebouncedFilter(newFilter);
      setCurrentPage(1);
    }, 300),
    []
  );

  const handleFilterChange = (name: string, value: string) => {
    const updatedFilter = { ...filter, [name]: value };
    setFilter(updatedFilter);
    updateDebouncedFilter(updatedFilter);
  };

  const filteredItems = useMemo(() => {
    const minPrice = parseFloat(debouncedFilter.minPrice) || 0;
    const maxPrice = parseFloat(debouncedFilter.maxPrice) || Infinity;

    const results = products?.filter((item) => {
      const matchesCategory =
        !debouncedFilter.category || item.category === debouncedFilter.category;
      const matchesPrice = item.price >= minPrice && item.price <= maxPrice;
      const matchesSearch =
        !debouncedFilter.searchQuery ||
        item.name
          .toLowerCase()
          .includes(debouncedFilter.searchQuery.toLowerCase());

      return matchesCategory && matchesPrice && matchesSearch;
    });

    setNoResults(results.length === 0);

    return results;
  }, [debouncedFilter, products]);

  // Pagination calculations
  const totalItems = filteredItems.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const paginatedItems = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredItems.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredItems, currentPage]);

  const handlePageChange = (newPage: number) => {
    if (newPage > 0 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  const getPageNumbers = () => {
    const maxPageNumbersToShow = 7;
    const startPage = Math.max(
      1,
      Math.min(
        currentPage - Math.floor(maxPageNumbersToShow / 2),
        totalPages - maxPageNumbersToShow + 1
      )
    );
    const endPage = Math.min(totalPages, startPage + maxPageNumbersToShow - 1);

    const pages = [];
    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }
    return pages;
  };

  if (isLoadingProduct) return <Loader />;

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <Header />

      {/* Main Content */}
      <div className="relative max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-6 flex max-sm:flex-col">
        <div className="sm:sticky mb-5 top-24 w-full lg:w-1/4 bg-white p-4 rounded-lg shadow-md max-lg:h-fit lg:h-[calc(100vh-7rem)] overflow-y-auto z-10">
          <div className="flex flex-col gap-4">
            <div>
              <label className="block text-gray-700">Category</label>
              <Select
                textColor
                name="category"
                value={filter.category}
                onChange={(value) => {
                  handleFilterChange("category", value);
                }}
                options={categories}
              />
            </div>

            <div>
              <label className="block text-gray-700">Price Range</label>
              <div className="flex gap-4">
                <Input
                  type="number"
                  name="minPrice"
                  textColor
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                  placeholder="Min Price"
                  value={filter.minPrice}
                  onChange={(e) =>
                    handleFilterChange(e.target.name, e.target.value)
                  }
                  label={""}
                />
                <Input
                  textColor
                  type="number"
                  name="maxPrice"
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                  placeholder="Max Price"
                  value={filter.maxPrice}
                  onChange={(e) =>
                    handleFilterChange(e.target.name, e.target.value)
                  }
                  label={""}
                />
              </div>
            </div>

            <div>
              <label className="block text-gray-700 pb-1">Search</label>
              <Input
                textColor
                type="text"
                name="searchQuery"
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                placeholder="Search by name"
                value={filter.searchQuery}
                onChange={(e) =>
                  handleFilterChange(e.target.name, e.target.value)
                }
                label={""}
              />
            </div>
          </div>
        </div>

        <div className="lg:pl-4 w-full">
          {products?.length === 0 && (
            <div className="text-center py-10 text-lg font-semibold text-gray-600">
              No Product to display
            </div>
          )}
          {products?.length > 0 && noResults ? (
            <div className="text-center py-10 text-lg font-semibold text-gray-600">
              No results found. Please try adjusting your filters.
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {paginatedItems?.map((items) => (
                <ProductCard
                  key={items.id}
                  item={{
                    id: items.id,
                    name: items.name,
                    category: items.category,
                    price: items.price,
                    imageUrl: items.imageUrl,
                  }}
                />
              ))}
            </div>
          )}

          {/* Pagination Controls */}
          {filteredItems.length > itemsPerPage && (
            <div className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6 mt-6">
              <div className="flex sm:flex-1 max-sm:flex-col max-sm:gap-4 sm:items-center sm:justify-between">
                <div>
                  <p className="text-sm text-gray-700">
                    Showing
                    <span className="font-medium">
                      {" "}
                      {currentPage * itemsPerPage - itemsPerPage + 1}{" "}
                    </span>
                    to
                    <span className="font-medium">
                      {" "}
                      {Math.min(currentPage * itemsPerPage, totalItems)}{" "}
                    </span>
                    of
                    <span className="font-medium"> {totalItems} </span>
                    results
                  </p>
                </div>
                <div>
                  <nav
                    className="isolate inline-flex -space-x-px rounded-md shadow-sm"
                    aria-label="Pagination"
                  >
                    <button
                      onClick={() => handlePageChange(currentPage - 1)}
                      className={`relative inline-flex items-center ${
                        currentPage === 1 &&
                        "bg-gray-300 text-gray-500 cursor-not-allowed"
                      }  rounded-l-md px-4  py-2 text-sm font-semibold text-[#216869] ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0`}
                      disabled={currentPage === 1}
                    >
                      <span className="sr-only">Previous</span>
                      &lt;
                    </button>

                    {getPageNumbers().map((page) => (
                      <button
                        key={page}
                        onClick={() => handlePageChange(page)}
                        className={`relative z-10 inline-flex items-center px-4 py-2 text-sm font-semibold text-[#216869] ${
                          currentPage === page
                            ? "bg-[#216869] text-white"
                            : "bg-white text-[#216869] ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                        }

                          `}
                      >
                        {page}
                      </button>
                    ))}

                    <button
                      onClick={() => handlePageChange(currentPage + 1)}
                      className={`elative inline-flex items-center rounded-r-md px-4 ${
                        currentPage === totalPages &&
                        "bg-gray-400 text-gray-500 cursor-not-allowed"
                      } py-2 text-sm font-semibold text-[#216869] ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0`}
                      disabled={currentPage === totalPages}
                    >
                      <span className="sr-only">Next</span>
                      &gt;
                    </button>
                  </nav>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MainPage;
