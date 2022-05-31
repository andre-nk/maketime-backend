import express from "express";
import { dataSource } from "../../index";
import { BurnerList } from "../../entities/burner_list";

const router = express.Router();

router.put("/api/:uid/burner-list/:list_id", async (req, res) => {
  const { uid, list_id } = req.params;
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
      .update(BurnerList)
      .set({
        title,
        uid,
        frontBurnerTitle,
        frontBurnerTasks,
        backBurnerTitle,
        backBurnerTasks,
        kitchenSinkTasks,
      })
      .where({ id: list_id })
      .execute();

    return res.json({
      status: res.statusCode,
      message: "Burner List has been updated!",
    });
  } catch (error) {
    return res.json({
      status: 403,
      message: `MakeTime Server Error: ${error}`,
    });
  }
});

export { router as updateBurnerListRouter };
