"use client";

import { MockTableProps, MockFormData } from "@/types/mock";
import { Button } from "@/components/ui/button";
import { Eye, ChevronLeft, ChevronRight, MoreHorizontal } from "lucide-react";
import { useState } from "react";
// import axios from "axios";
import { AlertDialogDemo } from "@/components/Alert";

export default function MockTable({ data }: MockTableProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 7;

  // Calculate pagination
  const totalItems = data?.length || 0;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentData = data?.slice(startIndex, endIndex) || [];

  // Pagination handlers
  const goToNextPage = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };

  const goToPrevPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  const goToPage = (page: number) => {
    setCurrentPage(page);
  };

  // Todo: to view response from server
  const handleViewMock = (
    baseUrl: string | undefined,
    id: string | undefined
  ) => {
    if (!baseUrl || !id) {
      console.error("Invalid baseUrl or id");
      return;
    }

    // Open the API endpoint in a new tab
    const fullUrl = `${baseUrl}/${id}`;
    window.open(fullUrl, "_blank");
  };

  return (
    <section className="w-full md:max-w-[60%] space-y-6">
      {/* Modern Table Container */}
      <div className="relative overflow-hidden rounded-xl border border-gray-200/60 bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full">
            {/* Modern Table Header */}
            <thead className="bg-gradient-to-r from-gray-50 to-gray-100/50 border-b border-gray-200/60">
              <tr>
                <th className="px-6 py-4 text-left font-semibold text-sm text-gray-900 tracking-wide">
                  Name
                </th>
                <th className="px-6 py-4 text-left font-semibold text-sm text-gray-900 tracking-wide">
                  Content Type
                </th>
                <th className="px-6 py-4 text-center font-semibold text-sm text-gray-900 tracking-wide">
                  Date Created
                </th>
                <th className="px-6 py-4 text-center font-semibold text-sm text-gray-900 tracking-wide">
                  Actions
                </th>
              </tr>
            </thead>

            {/* Modern Table Body */}
            <tbody className="divide-y divide-gray-100">
              {currentData?.map((item: MockFormData, index: number) => (
                <tr
                  key={index}
                  className="group hover:bg-gray-50/50 transition-all duration-200 ease-in-out"
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <div className="font-medium text-gray-900 group-hover:text-gray-700 transition-colors">
                        {item?.identifier || "Untitled"}
                      </div>
                    </div>
                  </td>

                  <td className="px-6 py-4">
                    <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-blue-50 text-blue-700 border border-blue-200">
                      {item.contentType || "Unknown"}
                    </span>
                  </td>

                  <td className="px-6 py-4 text-center">
                    <div className="text-sm text-gray-600">
                      {item?.createdAt
                        ? new Date(item?.createdAt).toLocaleDateString(
                            "en-US",
                            {
                              year: "numeric",
                              month: "short",
                              day: "numeric",
                              hour: "2-digit",
                              minute: "2-digit",
                            }
                          )
                        : "No date"}
                    </div>
                  </td>

                  <td className="px-6 py-4">
                    <div className="flex items-center justify-center space-x-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() =>
                          handleViewMock(item?.endpointUrl, item?._id)
                        }
                        className="h-8 px-3 text-gray-600 hover:text-blue-600 hover:bg-blue-50 transition-all duration-200"
                      >
                        <Eye className="w-4 h-4 mr-1.5" />
                        View
                      </Button>
                      <AlertDialogDemo mockId={item?._id} />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Empty State */}
        {currentData.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 text-sm">No data available</div>
          </div>
        )}
      </div>

      {/* Modern Pagination */}
      {totalPages > 1 && (
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 px-1">
          {/* Results Info */}
          <div className="flex items-center text-sm text-gray-600 order-2 sm:order-1">
            <span>
              Showing{" "}
              <span className="font-medium text-gray-900">
                {startIndex + 1}
              </span>{" "}
              to{" "}
              <span className="font-medium text-gray-900">
                {Math.min(endIndex, totalItems)}
              </span>{" "}
              of <span className="font-medium text-gray-900">{totalItems}</span>{" "}
              results
            </span>
          </div>

          {/* Pagination Controls */}
          <div className="flex items-center space-x-2 order-1 sm:order-2">
            <Button
              variant="outline"
              size="sm"
              onClick={goToPrevPage}
              disabled={currentPage === 1}
              className="h-9 px-3 text-gray-600 border-gray-300 hover:bg-gray-50 hover:border-gray-400 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
            >
              <ChevronLeft className="w-4 h-4 mr-1" />
              Previous
            </Button>

            {/* Page Numbers */}
            <div className="flex items-center space-x-1">
              {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
                let pageNumber;
                if (totalPages <= 5) {
                  pageNumber = i + 1;
                } else if (currentPage <= 3) {
                  pageNumber = i + 1;
                } else if (currentPage >= totalPages - 2) {
                  pageNumber = totalPages - 4 + i;
                } else {
                  pageNumber = currentPage - 2 + i;
                }

                const isActive = currentPage === pageNumber;

                return (
                  <Button
                    key={pageNumber}
                    variant={isActive ? "default" : "outline"}
                    size="sm"
                    onClick={() => goToPage(pageNumber)}
                    className={`w-9 h-9 p-0 text-sm font-medium transition-all duration-200 ${
                      isActive
                        ? "bg-gray-900 text-white border-gray-900 hover:bg-gray-800 shadow-sm"
                        : "text-gray-600 border-gray-300 hover:bg-gray-50 hover:border-gray-400"
                    }`}
                  >
                    {pageNumber}
                  </Button>
                );
              })}

              {/* Ellipsis and Last Page */}
              {totalPages > 5 && currentPage < totalPages - 2 && (
                <>
                  {currentPage < totalPages - 3 && (
                    <div className="flex items-center px-1.5">
                      <MoreHorizontal className="w-4 h-4 text-gray-400" />
                    </div>
                  )}
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => goToPage(totalPages)}
                    className="w-9 h-9 p-0 text-sm font-medium text-gray-600 border-gray-300 hover:bg-gray-50 hover:border-gray-400 transition-all duration-200"
                  >
                    {totalPages}
                  </Button>
                </>
              )}
            </div>

            <Button
              variant="outline"
              size="sm"
              onClick={goToNextPage}
              disabled={currentPage === totalPages}
              className="h-9 px-3 text-gray-600 border-gray-300 hover:bg-gray-50 hover:border-gray-400 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
            >
              Next
              <ChevronRight className="w-4 h-4 ml-1" />
            </Button>
          </div>
        </div>
      )}
    </section>
  );
}
