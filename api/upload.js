export default function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  // Aquí puedes meter lógica real: guardar productos, etc.
  res.status(200).json({ message: 'Upload recibido correctamente.' });
}
