import express from "express";
import { dataSource } from "../../index";
import { Highlight } from "../../entities/highlight";
import { MightDoList } from "../../entities/might_do_list";

const router = express.Router();

router.put("/api/:uid/might-do-list/:list_id", async (req, res) => {
  const { uid, list_id } = req.params;
  const { mightDoTasks, selectedTasks, title, highlightID } = req.body;

  try {
    const highlight = await Highlight.findOneBy({
      id: highlightID,
    });
    if (!highlight) {
      return res.json({
        status: 404,
        message: "No Highlight found with this specified ID",
      });
    }

    await dataSource
      .createQueryBuilder()
      .update(MightDoList)
      .set({
        title,
        uid,
        mightDoTasks,
        selectedTasks,
        highlight,
      })
      .where("id = :id", { id: list_id })
      .execute();

    return res.json({
      status: res.statusCode,
      message: "Might-Do List has been updated!",
    });
  } catch (error) {
    return res.json({
      status: 403,
      message: `MakeTime Server Error: ${error}`,
    });
  }
});

export { router as updateMightDoListRouter };
