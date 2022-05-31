
import express from "express";
import { dataSource } from "../../index";
import { BurnerList } from "../../entities/burner_list";

const router = express.Router();

router.delete("/api/:uid/burner-list/:list_id", async (req, res) => {
  const { uid, list_id } = req.params;

  try {
    await dataSource
      .createQueryBuilder()
      .delete()
      .from(BurnerList)
      .where({ id: list_id })
      .andWhere({uid})
      .execute();

    return res.json({
      status: res.statusCode,
      message: "Burner List has been deleted!",
    });
  } catch (error) {
    return res.json({
      status: 403,
      message: `MakeTime Server Error: ${error}`,
    });
  }
});

export { router as deleteBurnerListRouter };
