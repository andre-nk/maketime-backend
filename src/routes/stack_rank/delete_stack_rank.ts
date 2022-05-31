import express from "express";
import { dataSource } from "../../index";
import { StackRank } from "../../entities/stack_rank";

const router = express.Router();

router.delete("/api/:uid/stack-rank/:rank_id", async (req, res) => {
  const { uid, rank_id } = req.params;

  try {
    await dataSource
      .createQueryBuilder()
      .delete()
      .from(StackRank)
      .where({ id: rank_id })
      .andWhere({uid})
      .execute();

    return res.json({
      status: res.statusCode,
      message: "Stack Rank has been deleted!",
    });
  } catch (error) {
    return res.json({
      status: 403,
      message: `MakeTime Server Error: ${error}`,
    });
  }
});

export { router as deleteStackRankRouter };
