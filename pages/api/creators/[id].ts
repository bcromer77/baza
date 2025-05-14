import connectToDatabase from "@/lib/db";
import Creator from "@/models/Creator";

export default async function handler(req, res) {
  const { id } = req.query;

  if (!id) {
    return res.status(400).json({ message: "Missing creator ID" });
  }

  try {
    await connectToDatabase();

    const creator = await Creator.findById(id);

    if (!creator) {
      return res.status(404).json({ message: "Creator not found" });
    }

    res.status(200).json(creator);
  } catch (error) {
    console.error("Mongo error:", error);
    res.status(500).json({ message: "Server error" });
  }
}

