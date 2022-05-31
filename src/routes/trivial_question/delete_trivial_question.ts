import express from "express";
import { dataSource } from "../../index";
import { TrivialQuestion } from "../../entities/trivial_question";

const router = express.Router();

router.delete("/api/:uid/trivial/:q_id", async (req, res) => {
  const { uid, q_id } = req.params;

  const { question } = req.body;

  try {
    await dataSource
      .createQueryBuilder()
      .delete()
      .from(TrivialQuestion)
      .where({
        id: q_id,
      })
      .andWhere({
        uid,
      })
      .execute();

    return res.json({
      status: req.statusCode,
      message: "Trivial question has been deleted!",
    });
  } catch (error) {
    return res.json({
      status: 403,
      message: `MakeTime Server Error: ${error}`,
    });
  }
});

export {router as deleteTrivialQuestion}
