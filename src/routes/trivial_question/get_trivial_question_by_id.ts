import express from "express";
import { dataSource } from "../../index";
import { TrivialQuestion } from "../../entities/trivial_question";

const router = express.Router();

router.get("/api/:uid/trivial/:q_id", async (req, res) => {
  //destructure route params
  const { uid, q_id } = req.params;

  try {
    const trivialQuestion = await dataSource
      .getRepository(TrivialQuestion)
      .createQueryBuilder("trivial_question")
      .where({ id: q_id })
      .andWhere({ uid })
      .getOne();

    //return / send back response
    if (trivialQuestion) {
      return res.json({
        status: res.statusCode,
        message: "Trivial Question has been fetched successfully!",
        instance: trivialQuestion,
      });
    } else {
      return res.json({
        status: 404,
        message: `No Trivial Question found with this specified ID`,
      });
    }
  } catch (error) {
    return res.json({
      status: 403,
      message: `MakeTime Server Error: ${error}`,
    });
  }
});

export { router as getTrivialQuestionByIDRouter };
