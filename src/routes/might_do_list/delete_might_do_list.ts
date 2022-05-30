import express from "express";
import { dataSource } from "../../index";
import { Highlight } from "../../entities/highlight";
import { MightDoList } from "../../entities/might_do_list";

const router = express.Router();

router.delete("/api/:uid/might-do-list/:list_id", async (req, res) => {
  const { uid, list_id } = req.params;

  try {
    await dataSource
      .createQueryBuilder()
      .delete()
      .from(MightDoList)
      .where("id = :id", { id: list_id })
      .andWhere("uid = :uid", {uid})
      .execute();

    return res.json({
      status: res.statusCode,
      message: "Might-Do List has been deleted!",
    });
  } catch (error) {
    return res.json({
      status: 403,
      message: `MakeTime Server Error: ${error}`,
    });
  }
});

export { router as deleteMightDoListRouter };
