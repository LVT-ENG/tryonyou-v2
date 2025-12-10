export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  const { domain, A, CNAME } = req.body || {};
  if (!domain || !A || !CNAME) {
    return res.status(400).json({ error: "Missing DNS parameters" });
  }

  console.log("update_dns for", domain, A, CNAME);
  // TODO: call DNS provider API
  res.status(200).json({ message: "DNS update triggered", domain });
}
