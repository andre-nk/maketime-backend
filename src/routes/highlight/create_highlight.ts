import express from "express";
import { dataSource } from "../../index";
import { Highlight } from "../../entities/highlight";

const router = express.Router();

router.post("/api/:uid/highlight", async (req, res) => {
  //destructure route params
  const { uid } = req.params;

  //destructure json body
  const { highlight } = req.body;

  try {
    
    await dataSource
      .createQueryBuilder()
      .insert()
      .into(Highlight)
      .values([
        {
          uid,
          highlight,
        },
      ])
      .execute();

    //return / send back response
    return res.json({
      status: res.statusCode,
      message: "Highlight has been created!",
    });
  } catch (error) {
    return res.json({
      status: 403,
      message: `MakeTime Server Error: ${error}`,
    });
  }
});

export { router as createHighlightRouter };
