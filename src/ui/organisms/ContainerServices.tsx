"use client";

import CardS from "../molecules/common/Card/CardS";
import { useState } from "react";
import { PostServiceModal } from "../molecules/form/newServiceForm";
import { PostClientModal } from "../molecules/form/newClientForm"; // Importa el modal para los clientes
import AddCircleIcon from "@mui/icons-material/AddCircle";

import Button from "@mui/joy/Button";
import { useStore } from "@/store/store"; // Ajusta la ruta de importación según sea necesario
import {
  IClients,
  IPostClient,
} from "@/app/core/application/dto/clients/clients-response.dto";
import {
  IPostService,
  IServices,
} from "@/app/core/application/dto/services/services-response.dto";
import Pagination from "../molecules/common/Pagination";

interface IResponse<T> {
  data: T;
  onEdit: (data: IPostService | IPostClient, id: number) => void;
  onDelete: (id: number) => void;
  onSubmit: (data: IPostService | IPostClient) => Promise<void>;
  isModalOpen: boolean;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const ContainerS: React.FC<IResponse<IServices | IClients>> = ({
  data,
  onEdit,
  onDelete,
  onSubmit,
  isModalOpen,
  setIsModalOpen,
}) => {
  const [modalMode, setModalMode] = useState<"add" | "edit">("add");
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [selectedService, setSelectedService] = useState<
    IPostService | IPostClient | null
  >(null);

  // Obtener el tipo de item (client o service) desde el estado global de Zustand
  const itemType = useStore((state) => state.itemType);

  const handleOpenModal = (mode: "add" | "edit", id?: number) => {
    setModalMode(mode);
    if (id) {
      const service = data.content.find((item) => item.id === id);
      if (service) {
        setSelectedService(service);
      }
      setSelectedId(id);
    } else {
      setSelectedService(null);
    }
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedId(null);
    setSelectedService(null);
  };

  const handleSubmit = async (data: IPostService | IPostClient) => {
    if (modalMode === "add") {
      // Llama a onSubmit con el tipo correcto
      if (itemType === "service") {
        await onSubmit(data as IPostService);
      } else {
        await onSubmit(data as IPostClient);
      }
    } else if (modalMode === "edit" && selectedId !== null) {
      if (itemType === "service") {
        onEdit(data as IPostService, selectedId);
      } else {
        onEdit(data as IPostClient, selectedId);
      }
    }
  };

  return (
    <div className="flex flex-col m-5">
      <div className="flex justify-end mb-3">
        <Button
          color="primary"
          onClick={() => handleOpenModal("add")}
          size="lg"
          variant="outlined"
        >
          <AddCircleIcon className="text-[1.4em] mr-2" />
          Add {itemType === "service" ? "Service" : "Client"}
        </Button>

        {/* Renderiza el modal correcto según el tipo de elemento */}
        {itemType === "service" ? (
          <PostServiceModal
            isOpen={isModalOpen}
            onClose={handleCloseModal}
            onSubmit={handleSubmit}
            initialData={selectedService as IPostService}
          />
        ) : (
          <PostClientModal
            isOpen={isModalOpen}
            onClose={handleCloseModal}
            onSubmit={handleSubmit}
            initialData={selectedService as IPostClient}
          />
        )}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {data.content.map((item) => (
          <CardS
            key={item.id}
            data={item}
            onEdit={() => handleOpenModal("edit", item.id)}
            onDelete={onDelete}
          />
        ))}
      </div>

      <Pagination data={data} />
    </div>
  );
};

export default ContainerS;
