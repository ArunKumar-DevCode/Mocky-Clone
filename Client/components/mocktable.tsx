"use client";

import { MockTableProps, MockFormData } from "@/types/mock";
import { Button } from "@/components/ui/button";
import { Eye, ChevronLeft, ChevronRight } from "lucide-react";
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
    <section className="block">
      <div className="relative overflow-x-auto shadow-md rounded-lg">
        <table className="w-full text-left">
          <thead className="bg-black text-white">
            <tr>
              <th className="px-6 py-3 font-semibold text-sm tracking-wider border-b border-black">
                Name
              </th>
              <th className="px-6 py-3 font-semibold text-sm tracking-wider border-b border-black">
                Content Type
              </th>
              <th className="text-center px-6 py-3 font-semibold text-sm tracking-wider border-b border-black">
                Date
              </th>
              <th className="px-6 py-3 font-semibold text-sm tracking-wider border-b border-black text-center">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white">
            {currentData?.map((item: MockFormData, index: number) => (
              <tr
                key={index}
                className="hover:bg-gray-100 transition-colors duration-200 border-b border-gray-100"
              >
                <td className="px-6 py-4 whitespace-nowrap">
                  {item?.identifier}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {item.contentType || "-"}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {item?.createdAt
                    ? new Date(item?.createdAt).toLocaleString()
                    : "-"}
                </td>
                <td className="px-6 py-4 text-center">
                  <div className="flex justify-center space-x-3">
                    <Button
                      variant="ghost"
                      onClick={() =>
                        handleViewMock(item?.endpointUrl, item?._id)
                      }
                      className="hover:text-emerald-600 cursor-pointer flex items-center gap-1.5"
                    >
                      <Eye className="w-4 h-4 mr-2 hover:text-emerald-600 cursor-pointer" />
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

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div>
          <div className="flex flex-col sm:flex-row items-center justify-between px-4 py-3 gap-4">
            <div className="flex items-center text-sm text-gray-700 order-2 sm:order-1">
              <span>
                Showing {startIndex + 1} to {Math.min(endIndex, totalItems)} of{" "}
                {totalItems} results
              </span>
            </div>
            <div className="flex items-center space-x-2 order-1 sm:order-2">
              <Button
                variant="outline"
                size="sm"
                onClick={goToPrevPage}
                disabled={currentPage === 1}
                className="flex items-center px-3 py-2"
              >
                <ChevronLeft className="w-4 h-4 mr-1" />
                Previous
              </Button>

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

                  return (
                    <Button
                      key={pageNumber}
                      variant={
                        currentPage === pageNumber ? "default" : "outline"
                      }
                      size="sm"
                      onClick={() => goToPage(pageNumber)}
                      className="w-9 h-9 p-0 text-sm"
                    >
                      {pageNumber}
                    </Button>
                  );
                })}
                {totalPages > 5 && currentPage < totalPages - 2 && (
                  <>
                    {currentPage < totalPages - 3 && (
                      <span className="px-2 text-gray-400">...</span>
                    )}
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => goToPage(totalPages)}
                      className="w-9 h-9 p-0 text-sm"
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
                className="flex items-center px-3 py-2"
              >
                Next
                <ChevronRight className="w-4 h-4 ml-1" />
              </Button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
