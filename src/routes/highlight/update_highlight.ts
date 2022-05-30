import express from "express";
import { dataSource } from "../../index";
import { Highlight } from "../../entities/highlight";

const router = express.Router();

router.put("/api/:uid/highlight/:h_id", async (req, res) => {
  //destructure route params
  const { uid, h_id } = req.params;

  //destructure json body
  const { highlight } = req.body;

  try {
    //Use Data Source API Query Builder, (insert -> specify target -> values in JSON array -> execute)
    await dataSource
      .createQueryBuilder()
      .update(Highlight)
      .set({
        uid,
        highlight,
      })
      .where({id: h_id})
      .execute();

    //return / send back response
    return res.json({
      status: res.statusCode,
      message: "Highlight has been updated!",
    });
  } catch (error) {
    return res.json({
      status: 403,
      message: `MakeTime Server Error: ${error}`,
    });
  }
});

export { router as updateHighlightRouter };
