import express from "express";
import { dataSource } from "../../index";
import { LessThanOrEqual, MoreThanOrEqual } from "typeorm";
import { StackRank } from "../../entities/stack_rank";

const router = express.Router();

router.get("/api/:uid/stack-rank/:year/:month", async (req, res) => {
  //destructure route params
  const { uid, year, month } = req.params;

  try {
    const stackRank: StackRank[] = await dataSource
      .getRepository(StackRank)
      .createQueryBuilder()
      //multiple wheres for this month range
      //createdAt (more than or equal to the last day of last month)
      .andWhere({
        createdAt: MoreThanOrEqual(
          new Date(parseInt(year), parseInt(month) - 1)
        ),
      })
      //createdAt (less than or equal to the last day of this month)
      .andWhere({
        createdAt: LessThanOrEqual(new Date(parseInt(year), parseInt(month))),
      })
      //same specified uid
      .andWhere({
        uid,
      })
      .getMany();

    //check if mightDoList is not null and not empty!
    if (stackRank !== null && stackRank.length > 0) {
      return res.json({
        status: res.statusCode,
        message: "Stack Ranks has been fetched successfully!",
        instance: stackRank,
      });
    } else {
      return res.json({
        status: 404,
        message: `No Stack Ranks found within this UID and the specified date (${year} / ${month})`,
      });
    }
  } catch (error) {
    return res.json({
      status: 403,
      message: `MakeTime Server Error: ${error}`,
    });
  }
});

export { router as getStackRankByMonthRouter };
