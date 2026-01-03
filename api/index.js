export default async function handler(req, res) {
  if (req.method === "GET") {
    return res.status(200).send("DSR API WORKING");
  }

  if (req.method === "POST") {
    return res.status(200).json({ ok: true });
  }

  return res.status(200).send("OK");
}
