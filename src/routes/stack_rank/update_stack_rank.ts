import express from "express";
import { dataSource } from "../../index";
import { Highlight } from "../../entities/highlight";
import { StackRank } from "../../entities/stack_rank";

const router = express.Router();

router.put("/api/:uid/stack-rank/:rank_id", async (req, res) => {
  const { uid, rank_id } = req.params;
  const { priorityList, title, highlightID } = req.body;

  try {
    const highlight = await Highlight.findOneBy({
      id: highlightID,
    });
    if (!highlight) {
      return res.json({
        status: 404,
        message: "No Stack Rank found with this specified ID",
      });
    }

    await dataSource
      .createQueryBuilder()
      .update(StackRank)
      .set({
        title,
        uid,
        priorityList
      })
      .where({ id: rank_id })
      .execute();

    return res.json({
      status: res.statusCode,
      message: "Stack Rank has been updated!",
    });
  } catch (error) {
    return res.json({
      status: 403,
      message: `MakeTime Server Error: ${error}`,
    });
  }
});

export { router as updateStackRankRouter };
