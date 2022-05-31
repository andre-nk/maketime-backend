import express from "express";
import { dataSource } from "../../index";
import { Highlight } from "../../entities/highlight";

const router = express.Router();

router.get("/api/:uid/highlight/:h_id", async (req, res) => {
  //destructure route params
  const { uid, h_id } = req.params;

  try {
    
    const highlight = await dataSource
      .getRepository(Highlight)
      .createQueryBuilder("highlight")
      .where({ id: h_id })
      .andWhere({ uid })
      .getOne();

    //return / send back response
    if (highlight) {
      return res.json({
        status: res.statusCode,
        message: "Highlight has been fetched successfully!",
        instance: highlight,
      });
    } else {
      return res.json({
        status: 404,
        message: `No highlight found with this specified ID`,
      });
    }
  } catch (error) {
    return res.json({
      status: 403,
      message: `MakeTime Server Error: ${error}`,
    });
  }
});

export { router as getHighlightByIDRouter };
