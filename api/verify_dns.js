export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  const { domain } = req.body || {};
  if (!domain) {
    return res.status(400).json({ error: "Missing domain" });
  }

  console.log("verify_dns for", domain);
  // TODO: check DNS propagation
  res.status(200).json({ message: "DNS verification in progress", domain });
}
