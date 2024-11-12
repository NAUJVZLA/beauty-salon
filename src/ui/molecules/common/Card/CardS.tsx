import React, { useState } from "react";
import { Edit, Trash2, ChevronDown, ChevronUp } from "lucide-react";
import FactCheckIcon from "@mui/icons-material/FactCheck";
import Button from "@mui/joy/Button";
import { useStore } from "@/store/store";
import { IResponseClient } from "@/app/core/application/dto/clients/clients-response.dto";
import { IResponseService } from "@/app/core/application/dto/services/services-response.dto";
import SupportAgentIcon from "@mui/icons-material/SupportAgent";

interface CardProps {
  data: IResponseClient | IResponseService;
  onEdit: (data: IResponseClient | IResponseService, id: number) => void;
  onDelete: (id: number) => void;
}

const Card: React.FC<CardProps> = ({ data, onEdit, onDelete }) => {  
  const itemType = useStore((state) => state.itemType);
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpand = () => setIsExpanded(!isExpanded);

  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl border border-gray-100 hover:border-blue-200 group hover:scale-105 hover:z-10">
      <div className="p-8">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <div className="bg-blue-100 p-3 rounded-full transition-colors duration-300 group-hover:bg-blue-200">
              {itemType === "client" ? (
                <FactCheckIcon className="text-blue-600 w-6 h-6 transition-colors duration-300 group-hover:text-[#111827]" />
              ) : (
                <SupportAgentIcon className="text-blue-600 w-6 h-6 transition-colors duration-300 group-hover:text-[#111827]" />
              )}
            </div>
            <h1 className="font-bold text-2xl text-gray-800 transition-colors duration-300 group-hover:text-[#111827]">
              {itemType === "client"
                ? (data as IResponseClient).firstName
                : (data as IResponseService).name}
            </h1>
          </div>
          <button
            onClick={toggleExpand}
            className="text-gray-500 hover:text-[#111827] transition-colors duration-300"
            aria-expanded={isExpanded}
            aria-label={isExpanded ? "Collapse details" : "Expand details"}
          >
            {isExpanded ? <ChevronUp size={24} /> : <ChevronDown size={24} />}
          </button>
        </div>
        <div
          className={`transition-all duration-300 overflow-hidden ${
            isExpanded ? "max-h-96" : "max-h-20"
          }`}
        >
          {itemType === "client" ? (
            <>
              <p className="text-gray-600 mb-2 text-lg transition-colors duration-300 group-hover:text-gray-700">
                {(data as IResponseClient).lastName}
              </p>
              <p className="text-2xl font-semibold text-blue-600 mb-2 transition-colors duration-300 group-hover:text-[#111827]">
                {(data as IResponseClient).phone}
              </p>
              <p className="text-gray-600 mb-4 transition-colors duration-300 group-hover:text-gray-700">
                {(data as IResponseClient).email}
              </p>
            </>
          ) : (
            <>
              <p className="text-gray-600 mb-4 text-lg transition-colors duration-300 group-hover:text-gray-700">
                {(data as IResponseService).description}
              </p>
              <p className="text-2xl font-semibold text-blue-600 transition-colors duration-300 group-hover:text-[#111827]">
                ${(data as IResponseService).price}
              </p>
            </>
          )}
        </div>
      </div>
      <div className="bg-gray-50 px-8 py-6 flex justify-end items-center gap-4 border-t border-gray-100 transition-colors duration-300 group-hover:bg-gray-100">
        <Button
          color="neutral"
          disabled={false}
          loading={false}
          onClick={() => onEdit(data, data.id)}
          size="md"
          variant="outlined"
          className="transition-all duration-300 hover:bg-[#111827] hover:text-white text-[#111827] border-[#111827] focus:ring-2 focus:ring-offset-2 focus:ring-[#111827] focus:outline-none"
        >
          <Edit className="w-5 h-5 mr-2" />
          Edit
        </Button>
        <Button
          color="neutral"
          disabled={false}
          loading={false}
          onClick={() => onDelete(data.id)}
          size="md"
          variant="outlined"
          className="transition-all duration-300 hover:bg-[#111827] hover:text-white text-[#111827] border-[#111827] focus:ring-2 focus:ring-offset-2 focus:ring-[#111827] focus:outline-none"
        >
          <Trash2 className="w-5 h-5 mr-2" />
          Delete
        </Button>
      </div>
    </div>
  );
};

export default Card;
