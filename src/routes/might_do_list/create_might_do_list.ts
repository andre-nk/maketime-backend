import express from "express";
import { Highlight } from "../../entities/highlight";
import { MightDoList } from "../../entities/might_do_list";

const router = express.Router();

router.post("/api/:uid/might-do-list", async (req, res) => {
  const { uid } = req.params;
  const { mightDoTasks, selectedTasks, title, highlightID } = req.body;

  const highlight = await Highlight.findOneBy({
    id: highlightID
  });
  if (!highlight) {
    return res.json({
      status: 404,
      message: "No Might-Do List found with this specified Highlight ID",
    });
  }

  const mightDoList = MightDoList.create({
    title,
    uid,
    mightDoTasks,
    selectedTasks,
    highlight,
  });

  await mightDoList.save();
  return res.json({
    status: res.statusCode,
    message: "Might-Do List has been created!",
    instance: mightDoList,
  });
});

export { router as createMightDoListRouter };
