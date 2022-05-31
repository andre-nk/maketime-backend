import express from "express";
import { StackRank } from "../../entities/stack_rank";
import { dataSource } from "../../index";

const router = express.Router();

router.post("/api/:uid/stack-rank", async (req, res) => {
  const { uid } = req.params;
  const {priorityList, title } = req.body;

  try {
    await dataSource
      .createQueryBuilder()
      .insert()
      .into(StackRank)
      .values([
        {
          title,
          uid,
          priorityList,
        },
      ])
      .execute();

    return res.json({
      status: res.statusCode,
      message: "Stack Rank has been created!",
    });
  } catch (error) {
    return res.json({
      status: 403,
      message: `MakeTime Server Error: ${error}`,
    });
  }
});

export { router as createStackRankRouter };
