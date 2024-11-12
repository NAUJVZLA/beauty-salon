import { Button } from "@/ui/atoms/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/ui/molecules/card";
import Image from "next/image";

export default function CortesDeCabello() {
  const cortes = [
    {
      nombre: "Clásico",
      precio: "$20",
      descripcion: "Corte tradicional para un look elegante y atemporal.",
    },
    {
      nombre: "Moderno",
      precio: "$25",
      descripcion: "Estilos contemporáneos para un look fresco y actual.",
    },
    {
      nombre: "Fade",
      precio: "$30",
      descripcion: "Degradado perfecto para un estilo urbano y sofisticado.",
    },
    {
      nombre: "Texturizado",
      precio: "$28",
      descripcion: "Añade volumen y movimiento a tu cabello.",
    },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8">Cortes de Cabello</h1>
      <p className="text-center mb-8 text-lg text-muted-foreground">
        Nuestros expertos estilistas te ayudarán a encontrar el corte perfecto
        para ti.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {cortes.map((corte, index) => (
          <Card key={index} className="flex flex-col justify-between">
            <CardHeader>
              <CardTitle>{corte.nombre}</CardTitle>
              <CardDescription>{corte.precio}</CardDescription>
            </CardHeader>
            <CardContent>
              <Image
                src={`/placeholder.svg?height=200&width=300`}
                alt={`Imagen de corte ${corte.nombre}`}
                width={300}
                height={200}
                className="rounded-md mb-4"
              />
              <p>{corte.descripcion}</p>
            </CardContent>
            <CardFooter>
              <Button className="w-full">Reservar</Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
