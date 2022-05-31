import express from "express";
import { dataSource } from "../../index";
import { LessThanOrEqual, MoreThanOrEqual } from "typeorm";
import { BurnerList } from "../../entities/burner_list";

const router = express.Router();

router.get("/api/:uid/burner-list/:year/:month", async (req, res) => {
  //destructure route params
  const { uid, year, month } = req.params;

  try {
    const burnerList: BurnerList[] = await dataSource
      .getRepository(BurnerList)
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
    if (burnerList !== null && burnerList.length > 0) {
      return res.json({
        status: res.statusCode,
        message: "Burner Lists has been fetched successfully!",
        instance: burnerList,
      });
    } else {
      return res.json({
        status: 404,
        message: `No Burner Lists found within this UID and the specified date (${year} / ${month})`,
      });
    }
  } catch (error) {
    return res.json({
      status: 403,
      message: `MakeTime Server Error: ${error}`,
    });
  }
});

export { router as getBurnerListByMonthRouter };
