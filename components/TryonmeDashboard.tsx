import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export default function TryonmeDashboard() {
  const [status, setStatus] = useState({
    agent70: "✅ Activo",
    web: "✅ Lista",
    domain: "🕓 Pendiente DNS",
    openai: "✅ Conectado",
    api: "✅ Generado",
    pau: "✅ Funcional",
    widget: "✅ Embebido",
    lang: "✅ Multilenguaje"
  });

  return (
    <div className="min-h-screen bg-black text-white p-8">
      <h1 className="text-3xl font-bold mb-6 text-center">TRYONME - Dashboard SHEBTTED</h1>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {Object.entries(status).map(([key, value]) => (
          <Card key={key} className="bg-zinc-900 border border-zinc-700">
            <CardContent className="p-6">
              <h2 className="text-xl font-semibold capitalize">{key}</h2>
              <p className="text-lg mt-2">{value}</p>
            </CardContent>
          </Card>
        ))}
      </div>
      <div className="text-center mt-10">
        <Button className="text-black bg-yellow-400 hover:bg-yellow-300">Ver panel completo en Vercel</Button>
      </div>
    </div>
  );
}
