# Flujo Automatizado Semanal

Este documento describe un flujo operativo de ejemplo para gestionar productos, pedidos y contenido con los agentes de TRYONME. Cada día de la semana activa módulos distintos para automatizar el ciclo completo de dropshipping e impresión bajo demanda.

| Día | Acción | Agente/s |
|-----|----------------------------------------------------------|-------------------------------|
| Lunes | Buscar productos dropshipping o prendas base | SupplierHunter, ProductScout |
| Martes | Negociar precio por pocas unidades (2–5) | MOQNegotiator |
| Miércoles | Crear diseño o publicar directamente si no se interviene | LookCurator / ReposterBot |
| Jueves | Subir a plataformas (web, redes, marketplaces) | DropUploader, WebPublisher |
| Viernes | Detectar ventas, lanzar pedidos, elegir impresor | OrderRedirector, PrintSelector |
| Sábado | Ajustar fechas, sumar +3 días si hay retraso | LogisticsWatcher, ClientUpdater |
| Domingo | Generar contenido post-venta y registrar en Notion | Validator, ReadmeWriter |

Utiliza esta tabla como referencia para coordinar los agentes desde Make, Automa u otras herramientas de orquestación.
