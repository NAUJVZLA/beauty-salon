
import { ClientsService } from "@/app/infrastucture/services/client.service";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/ui/molecules/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/ui/tabs";
import TemplateService from "@/ui/template/templateService";

const useServicesService = new ClientsService();

interface IProps {
  searchParams: {
    page: string;
    size: string;
    name: string;
  };
}

export const generateMetadata = async ({ searchParams }: IProps) => {
  const page = searchParams.page ?? "1";
  return {
    title: `Services - Página ${page}`,
    description: "Service of beauty-salon",
  };
};

export default async function ServicesPage({ searchParams }: IProps) {
  const page = searchParams.page ? parseInt(searchParams.page) : 1;
  const size = searchParams.size ? parseInt(searchParams.size) : 9;
  const data = await useServicesService.findAll(page, size);

  const cortesDeModa = [
    {
      nombre: "Fade Moderno",
      descripcion: "Degradado suave con longitud en la parte superior.",
    },
    {
      nombre: "Texturizado Messy",
      descripcion: "Corte desordenado con mucha textura para un look casual.",
    },
    {
      nombre: "Pompadour Clásico",
      descripcion: "Estilo retro con volumen en la parte frontal.",
    },
    {
      nombre: "Undercut Desconectado",
      descripcion: "Contraste dramático entre los lados y la parte superior.",
    },
  ];

  const tipsOcasion = [
    {
      ocasion: "Boda",
      tip: "Opte por un corte clásico y elegante como un side part bien definido.",
    },
    {
      ocasion: "Entrevista de trabajo",
      tip: "Un corte corto y prolijo transmite profesionalismo.",
    },
    {
      ocasion: "Festival de música",
      tip: "Prueba un estilo más atrevido como un mohawk texturizado.",
    },
    {
      ocasion: "Día a día",
      tip: "Un corte versátil como el quiff moderno se adapta a cualquier situación.",
    },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <TemplateService data={data} title="Services" />
      <h1 className="text-4xl font-bold text-center mb-12">
        Nuestros Servicios
      </h1>
      <Tabs defaultValue="moda" className="mb-16">
        <TabsList className="grid w-full grid-cols-2">
          searchParams
          <TabsTrigger value="moda">Cortes de Moda</TabsTrigger>
          <TabsTrigger value="tips">Tips según Ocasión</TabsTrigger>
        </TabsList>
        <TabsContent value="moda">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {cortesDeModa.map((corte, index) => (
              <Card
                key={index}
                className="transition-all duration-300 hover:scale-105"
              >
                <CardHeader>
                  <CardTitle>{corte.nombre}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>{corte.descripcion}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
        <TabsContent value="tips">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {tipsOcasion.map((tip, index) => (
              <Card
                key={index}
                className="transition-all duration-300 hover:scale-105"
              >
                <CardHeader>
                  <CardTitle>{tip.ocasion}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>{tip.tip}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>

      <div className="text-center">
        <h2 className="text-2xl font-semibold mb-4">
          ¿Listo para un cambio de look?
        </h2>
        <p className="mb-6">
          Nuestros expertos estilistas están aquí para ayudarte a encontrar el
          estilo perfecto para ti.
        </p>
        <button className="w-full py-2 px-4 bg-[#111827] text-white rounded-lg font-medium hover:bg-[#1f2937]">
          Reserva tu cita ahora
        </button>
      </div>
    </div>
  );
}
