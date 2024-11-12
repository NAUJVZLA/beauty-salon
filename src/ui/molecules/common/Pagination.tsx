"use client";
import { useRouter, useSearchParams } from "next/navigation";
import React from "react";
import { StepBack, StepForward } from "lucide-react";
import { useStore } from "@/store/store"; // Ajusta la ruta según tu estructura
import { IServices } from "@/app/core/application/dto/services/services-response.dto";
import { IClients } from "@/app/core/application/dto/clients/clients-response.dto";
import LastPageIcon from "@mui/icons-material/LastPage";
import FirstPageIcon from "@mui/icons-material/FirstPage";

interface IProps {
  data: IServices | IClients;
}

function Pagination({ data }: IProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Obtener el tipo de item (client o service) desde Zustand
  const itemType = useStore((state) => state.itemType);

  const onPageChange = (newPage: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", newPage.toString());
    router.push(`?${params.toString()}`);
  };

  // Calcular la página actual dependiendo del tipo de item
  const currentPage = data.pageable.pageNumber + 1;
  const totalPages =
    itemType === "service"
      ? (data as IServices).totalPages
      : (data as IClients).totalPages;

  const buttonStyles =
    "text-blue-500 hover:text-blue-600 focus:outline-none transition-colors";
  const disabledButtonStyles =
    "text-gray-400 hover:text-gray-400 cursor-not-allowed";

  return (
    <div className="flex justify-center items-center mt-5 gap-3">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={`${buttonStyles} ${
          currentPage === 1 && disabledButtonStyles
        }hover:scale-105 hover:z-10`}
      >
        <FirstPageIcon />
      </button>
      <span>Page</span>
      <span> {currentPage}</span>
      <span> of </span>
      <span> {totalPages}</span>
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={`${buttonStyles} ${
          currentPage === totalPages && disabledButtonStyles
        }hover:scale-605 hover:z-10 `}
      >
        <LastPageIcon />
      </button>
    </div>
  );
}

export default Pagination;
