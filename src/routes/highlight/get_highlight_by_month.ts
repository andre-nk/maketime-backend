import express from "express";
import { dataSource } from "../../index";
import { Highlight } from "../../entities/highlight";
import { LessThanOrEqual, Like, MoreThan, MoreThanOrEqual } from "typeorm";

const router = express.Router();

router.get("/api/:uid/highlight/:year/:month", async (req, res) => {
  //destructure route params
  const { uid, year, month } = req.params;

  try {
    const highlights: Highlight[] = await dataSource
      .getRepository(Highlight)
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

    //check if highlights is not null and not empty!
    if (highlights !== null && highlights.length > 0) {
      return res.json({
        status: res.statusCode,
        message: "Highlight has been fetched successfully!",
        instance: highlights,
      });
    } else {
      return res.json({
        status: 404,
        message: `No highlights found within this UID and the specified date (${year} / ${month})`,
      });
    }
  } catch (error) {
    return res.json({
      status: 403,
      message: `MakeTime Server Error: ${error}`,
    });
  }
});

export { router as getHighlightByMonthRouter };
