import express from "express";
import { dataSource } from "../../index";
import { TrivialQuestion } from "../../entities/trivial_question";

const router = express.Router();

router.get("/api/:uid/trivial", async (req, res) => {
  //destructure route params
  const { uid } = req.params;
  const { page, limit } = req.query;

  try {
    //define trivialQuestions for specified or non specified query
    var trivialQuestions: [TrivialQuestion[], number];
    if (page && limit) {

      //getRepository -> findAndCount for Pagination Purposes
      trivialQuestions = await dataSource
        .getRepository(TrivialQuestion)
        .findAndCount({
          //filter where the uid is equal to user's
          where: { uid },
          //order the results
          order: { updatedAt: "DESC" },
          //take => perPage items
          take: +limit,
          //skip => formulas!
          skip: (+page - 1) * +limit,
        });
    } else {
      trivialQuestions = await dataSource
        .getRepository(TrivialQuestion)
        .findAndCount({
          where: { uid },
          order: { updatedAt: "DESC" },
          take: 10,
          skip: 10,
        });
    }

    //return / send back response
    if (trivialQuestions) {
      return res.json({
        status: res.statusCode,
        message: "Trivial Questions has been fetched successfully!",
        perPage: limit != null ? +limit : limit,
        currentPage: page != null ? +page : page,
        instance: trivialQuestions,
      });
    } else {
      return res.json({
        status: 404,
        message: `No Trivial Questions found`,
      });
    }
  } catch (error) {
    return res.json({
      status: 403,
      message: `MakeTime Server Error: ${error}`,
    });
  }
});

export { router as getTrivialQuestions };
