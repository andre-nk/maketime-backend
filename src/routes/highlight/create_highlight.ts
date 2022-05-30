import express from "express";
import { dataSource } from "../../index";
import { Highlight } from "../../entities/highlight";

const router = express.Router();

router.post("/api/:uid/highlight", async (req, res) => {
  //destructure route params
  const { uid } = req.params;

  //destructure json body
  const { highlight } = req.body;

  //Use Data Source API Query Builder, (insert -> specify target -> values in JSON array -> execute)
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
});

export { router as createHighlightRouter };
