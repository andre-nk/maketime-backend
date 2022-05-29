import express from "express";
import { Highlight } from "../../entities/highlight";

const router = express.Router();

router.post("/api/highlight", async (req, res) => {
  //destructure json body
  const { highlight, uid } = req.body;

  //create Highlight instance (where dates and uid is auto-created)
  const highlightInstance = Highlight.create({
    uid,
    highlight,
  });

  //async save instance to Postgres
  await highlightInstance.save();

  //return / send back response
  return res.json({
    status: res.statusCode,
    message: "Highlight has been created!",
    instance: highlightInstance,
  });
});

export { router as createHighlightRouter };
