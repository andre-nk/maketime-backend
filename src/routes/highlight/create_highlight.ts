import express from "express";
import { Highlight } from "../../entities/highlight";

const router = express.Router();

router.post("/api/highlight", async (req, res) => {
  const { highlight, uid } = req.body;

  const highlightInstance = Highlight.create({
    uid,
    highlight,
  });

  await highlightInstance.save();
  return res.json({
    status: res.statusCode,
    message: "Highlight has been created!",
    instance: highlightInstance,
  });
});

export { router as createHighlightRouter };
