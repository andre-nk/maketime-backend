import express from "express";
import { dataSource } from "../../index";
import { Highlight } from "../../entities/highlight";

const router = express.Router();

router.delete("/api/:uid/highlight/:h_id", async (req, res) => {
  //destructure route params
  const { uid, h_id } = req.params;

  try {
    
    const response = await dataSource
      .createQueryBuilder()
      .delete()
      .from(Highlight)
      .where({id: h_id})
      .andWhere({uid})
      .execute();

    console.log(response)

    //return / send back response
    return res.json({
      status: res.statusCode,
      message: "Highlight has been deleted!",
    });
  } catch (error) {
    return res.json({
      status: 403,
      message: `MakeTime Server Error: ${error}`,
    });
  }
});

export { router as deleteHighlightRouter };
