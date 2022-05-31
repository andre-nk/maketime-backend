import express from "express";
import { dataSource } from "../../index";
import { TrivialQuestion } from "../../entities/trivial_question";

const router = express.Router();

router.post("/api/:uid/trivial", async (req, res) => {
  const { uid } = req.params;

  const { question } = req.body;

  try {
    await dataSource
      .createQueryBuilder()
      .insert()
      .into(TrivialQuestion)
      .values([
        {
          uid,
          question,
        },
      ])
      .execute();

    return res.json({
      status: res.statusCode,
      message: "Trivial question has been added!",
    });
  } catch (error) {
    return res.json({
      status: 403,
      message: `MakeTime Server Error: ${error}`,
    });
  }
});

export {router as createTrivialQuestion}