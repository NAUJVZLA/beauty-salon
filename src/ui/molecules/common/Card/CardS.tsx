import { Edit, Scissors, Trash2 } from "lucide-react";
import FactCheckIcon from "@mui/icons-material/FactCheck";
import Button from "@mui/joy/Button";
import { useStore } from "@/store/store";
import { IResponseClient } from "@/app/(main)/core/application/dto/clients/clients-response.dto";
import { IResponseService } from "@/app/(main)/core/application/dto/services/services-response.dto";

interface CardProps {
  data: IResponseClient | IResponseService;
  onEdit: (data: IResponseClient | IResponseService, id: number) => void;
  onDelete: (id: number) => void;
}

const Card: React.FC<CardProps> = ({ data, onEdit, onDelete }) => {
  const itemType = useStore((state) => state.itemType);

  return (
    <div className="bg-white border border-blue-200 rounded-xl shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg">
      <div className="p-6">
        <h1 className="font-bold text-2xl flex items-center gap-2 mb-3 ">
          {itemType === "client" ? (
            <FactCheckIcon className="text-blue-500" />
          ) : (
            <Scissors className="text-blue-500" />
          )}
          {itemType === "client"
            ? (data as IResponseClient).firstName
            : (data as IResponseService).name}
        </h1>
        {itemType === "client" ? (
          <>
            <p className="text-gray-600 mb-4">
              {(data as IResponseClient).lastName}
            </p>
            <p className="text-xl font-semibold">
              {(data as IResponseClient).phone}
            </p>
            <p className="text-gray-600 mb-4">
              {(data as IResponseClient).email}
            </p>
          </>
        ) : (
          <>
            <p className="text-gray-600 mb-4">
              {(data as IResponseService).description}
            </p>
            <p className="text-xl font-semibold">
              ${(data as IResponseService).price}
            </p>
          </>
        )}
      </div>
      <div className="bg-gray-50 px-6 py-4 flex justify-end items-center gap-3 border-t border-blue-100">
        <Button
          color="primary"
          disabled={false}
          loading={false}
          onClick={() => onEdit(data, data.id)}
          size="md"
          variant="outlined"
        >
          <Edit className="w-4 h-4 mr-2" />
          Edit
        </Button>
        <Button
          color="danger"
          disabled={false}
          loading={false}
          onClick={() => onDelete(data.id)}
          size="md"
          variant="outlined"
        >
          <Trash2 className="w-4 h-4 mr-2" />
          Delete
        </Button>
      </div>
    </div>
  );
};

export default Card;
