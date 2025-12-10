# Automa Flows

This folder contains automation flows for the [Automa](https://automa.site/) browser extension. Import the JSON files from `automa_flows/` into the extension to replicate each automation. See the [AI Workflow block](https://docs.extension.automa.site/blocks/ai-workflow.html) for advanced usage.

## Available flows

- **instagram_pau_publisher.automa.json** – Publica desde Drive con texto/hashtag.
- **shopify_uploader.automa.json** – Sube chaquetas desde hoja de producto.
- **sheets_triggered_post.automa.json** – Postea desde Google Sheets 1× semana.
- **drive_sync_flow.automa.json** – Detecta nuevo archivo y avisa/notifica.
- **automa_tryonyou_flow.json** – Sincroniza con TryOnYou cada 60 segundos.
- **paw_armario_inteligente_solidario.automa.json** – Gestiona prendas donadas y combina recomendaciones.

Each flow is provided as a template and can be customized inside Automa to suit your workflow.

### Using Automa Variables

You can reference flow variables inside HTTP request parameters by using Mustache syntax. For example:

```json
{
  "url": "https://api.example.com?id={{recordId}}"
}
```

When the flow runs, `{{recordId}}` will be replaced with the current variable value before the request is sent.
