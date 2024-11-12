import { IClients, IPostClient } from "@/app/(main)/core/application/dto/clients/clients-response.dto";
import { HttpClient } from "../utils/client-http";


export class ClientsService {
    private httpClient: HttpClient;

    constructor() {
        this.httpClient = new HttpClient()
    }

    async findAll(page: number, size: number): Promise<IClients> {
        try {
            const response = await this.httpClient.get<IClients>(`clients?page=${page}&size=${size}`);
            return response;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    async create(service: IPostClient) {
        try {
            const response = await fetch(`/api/services/create/clients`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(service),
            });

            if (!response.ok) {
                const error = await response.json();
                throw new Error(error.error);
            }

            const data = await response.json();
            return data;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    
    async destroy(id: number) {
        try {
            const response = await fetch(`/api/services/destroy/clients/${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                }
            });

            if (!response.ok) {
                const error = await response.json();
                throw new Error(error.error);
            }

        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    async save(service: IPostClient, id: number) {
        try {
            const response = await fetch(`/api/services/save/clients/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(service),
            });

            if (!response.ok) {
                const error = await response.json();
                throw new Error(error.error);
            }

            const data = await response.json();
            return data;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }
}