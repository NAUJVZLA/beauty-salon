"use client";
import React, { useState } from "react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { useStore } from "@/store/store";
import ContainerS from "../organisms/ContainerServices";
import {
  IPostService,
  IServices,
} from "@/app/core/application/dto/services/services-response.dto";
import { ClientsService } from "@/app/infrastucture/services/client.service";
import {
  IClients,
  IPostClient,
} from "@/app/core/application/dto/clients/clients-response.dto";
import { ServicesService } from "@/app/infrastucture/services/service.service";

export interface Data {
  data: IServices | IClients;
  title: string;
}

// Type guard para verificar si es un IPostService
function isPostService(data: IPostService | IPostClient): data is IPostService {
  return "name" in data && "description" in data && "price" in data;
}

const TemplateService: React.FC<Data> = ({ data, title }) => {
  const { itemType } = useStore();
  const serviceInstance =
    itemType === "service" ? new ServicesService() : new ClientsService();

  const [, setIsLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const router = useRouter();

  const handlePostService = async (formData: IPostService | IPostClient) => {
    setIsLoading(true);
    try {
      if (itemType === "service") {
        if (!isPostService(formData)) {
          throw new Error("Invalid service data");
        }
        await (serviceInstance as ServicesService).create(formData);
      } else {
        if (isPostService(formData)) {
          throw new Error("Invalid client data");
        }
        await (serviceInstance as ClientsService).create(formData);
      }

      toast.success(
        `${
          itemType === "service"
            ? "The service was created successfully"
            : "The Client was created successfully"
        }`
      );
      setIsModalOpen(false);
      router.refresh();
    } catch (error) {
      console.error(error);
      toast.error("An error occurred while adding the item");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    setIsLoading(true);
    try {
      await serviceInstance.destroy(id);
      toast.success(
        `${
          itemType === "service"
            ? "The service was deleted successfully"
            : "The Client was deleted successfully"
        }`
      );
      router.refresh();
    } catch (error) {
      console.error(error);
      toast.error("An error occurred while deleting the item");
    } finally {
      setIsLoading(false);
    }
  };

  const handleEdit = async (
    formData: IPostService | IPostClient,
    id: number
  ) => {
    setIsLoading(true);
    try {
      if (itemType === "service") {
        if (!isPostService(formData)) {
          throw new Error("Invalid service data");
        }
        await (serviceInstance as ServicesService).save(formData, id);
      } else {
        if (isPostService(formData)) {
          throw new Error("Invalid client data");
        }
        await (serviceInstance as ClientsService).save(formData, id);
      }

      toast.success(
        `${
          itemType === "service"
            ? "The service was updated successfully"
            : "The Client was updated successfully"
        }`
      );
      setIsModalOpen(false);
      router.refresh();
    } catch (error) {
      console.error(error);
      toast.error("An error occurred while updating the item");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full">
      <h1 className="font-bold text-[3em] text-center">{title}</h1>
      <ContainerS
        data={data}
        onSubmit={handlePostService}
        onDelete={handleDelete}
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        onEdit={handleEdit}
      />
    </div>
  );
};

export default TemplateService;
