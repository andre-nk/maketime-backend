import express from "express";
import { dataSource } from "../../index";
import { Highlight } from "../../entities/highlight";
import { MightDoList } from "../../entities/might_do_list";

const router = express.Router();

router.post("/api/:uid/might-do-list", async (req, res) => {
  const { uid } = req.params;
  const { mightDoTasks, selectedTasks, title, highlightID } = req.body;

  try {
    const highlight = await Highlight.findOneBy({
      id: highlightID,
    });
    if (!highlight) {
      return res.json({
        status: 404,
        message: "No Might-Do List found with this specified Highlight ID",
      });
    }

    await dataSource
      .createQueryBuilder()
      .insert()
      .into(MightDoList)
      .values([
        {
          title,
          uid,
          mightDoTasks,
          selectedTasks,
          highlight,
        },
      ])
      .execute();

    return res.json({
      status: res.statusCode,
      message: "Might-Do List has been created!",
    });
  } catch (error) {
    return res.json({
      status: 403,
      message: `MakeTime Server Error: ${error}`,
    });
  }
});

export { router as createMightDoListRouter };
