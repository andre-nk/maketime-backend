import express from "express";
import { dataSource } from "../../index";
import { StackRank } from "../../entities/stack_rank";

const router = express.Router();

router.get("/api/:uid/stack-rank/:rank_id", async (req, res) => {
  //destructure route params
  const { uid, rank_id } = req.params;

  try {
    //Use Data Source API Query Builder, (insert -> specify target -> values in JSON array -> execute)
    const mightDoList = await dataSource
      .getRepository(StackRank)
      .createQueryBuilder("stack_rank")
      .where({ id: rank_id })
      .andWhere({ uid })
      .getOne();

    //return / send back response
    if (mightDoList) {
      return res.json({
        status: res.statusCode,
        message: "Stack Rank has been fetched successfully!",
        instance: mightDoList,
      });
    } else {
      return res.json({
        status: 404,
        message: `No Stack Rank found with this specified ID`,
      });
    }
  } catch (error) {
    return res.json({
      status: 403,
      message: `MakeTime Server Error: ${error}`,
    });
  }
});

export { router as getStackRankByIDRouter };
