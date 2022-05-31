import express from "express";
import { dataSource } from "../../index";
import { BurnerList } from "../../entities/burner_list";

const router = express.Router();

router.post("/api/:uid/burner-list", async (req, res) => {
  const { uid } = req.params;
  const {
    title,
    frontBurnerTitle,
    frontBurnerTasks,
    backBurnerTitle,
    backBurnerTasks,
    kitchenSinkTasks,
  } = req.body;

  try {
    await dataSource
      .createQueryBuilder()
      .insert()
      .into(BurnerList)
      .values([
        {
          title,
          uid,
          frontBurnerTitle,
          frontBurnerTasks,
          backBurnerTitle,
          backBurnerTasks,
          kitchenSinkTasks,
        },
      ])
      .execute();

    return res.json({
      status: res.statusCode,
      message: "Burner List has been created!",
    });
  } catch (error) {
    return res.json({
      status: 403,
      message: `MakeTime Server Error: ${error}`,
    });
  }
});

export { router as createBurnerListRouter };
