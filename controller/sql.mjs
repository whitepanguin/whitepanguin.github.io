import { db } from "../db.mjs";

export async function getData(req, res, next) {
  try {
    const [rows] = await db.query("SELECT * FROM member");
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
