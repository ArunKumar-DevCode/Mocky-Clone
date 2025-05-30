"use client";

import { MockTableProps, MockFormData } from "@/types/mock";
import { Button } from "@/components/ui/button";
import { Eye } from "lucide-react";
// import axios from "axios";
import { AlertDialogDemo } from "@/components/Alert";

export default function MockTable({ data }: MockTableProps) {
  
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
    <>
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
            {data?.map((item: MockFormData, index: number) => (
              <tr
                key={index}
                className="hover:bg-gray-100 transition-colors duration-200 border-b border-gray-100"
              >
                <td className="px-6 py-4 whitespace-nowrap">{item?.identifier}</td>
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
                      onClick={() => handleViewMock(item?.endpointUrl, item?._id)}
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
    </>
  );
}

