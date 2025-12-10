export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  const { domain } = req.body || {};
  if (!domain) {
    return res.status(400).json({ error: "Missing domain" });
  }

  console.log("connect_domain called for", domain);
  // TODO: integrate with Shopify Admin API
  res.status(200).json({ message: "Domain connection initiated", domain });
}
