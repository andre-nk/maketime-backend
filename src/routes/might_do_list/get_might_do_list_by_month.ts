import express from "express";
import { dataSource } from "../../index";
import { LessThanOrEqual, MoreThanOrEqual } from "typeorm";
import { MightDoList } from "../../entities/might_do_list";

const router = express.Router();

router.get("/api/:uid/might-do-list/:year/:month", async (req, res) => {
  //destructure route params
  const { uid, year, month } = req.params;

  try {
    const mightDoList: MightDoList[] = await dataSource
      .getRepository(MightDoList)
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
    if (mightDoList !== null && mightDoList.length > 0) {
      return res.json({
        status: res.statusCode,
        message: "Might-Do Lists has been fetched successfully!",
        instance: mightDoList,
      });
    } else {
      return res.json({
        status: 404,
        message: `No Might-Do Lists found within this UID and the specified date (${year} / ${month})`,
      });
    }
  } catch (error) {
    return res.json({
      status: 403,
      message: `MakeTime Server Error: ${error}`,
    });
  }
});

export { router as getMightDoListByMonthRouter };
