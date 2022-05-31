import express from "express";
import { dataSource } from "../../index";
import { BurnerList } from "../../entities/burner_list";

const router = express.Router();

router.get("/api/:uid/burner-list/:list_id", async (req, res) => {
  //destructure route params
  const { uid, list_id } = req.params;

  try {
    //Use Data Source API Query Builder, (insert -> specify target -> values in JSON array -> execute)
    const mightDoList = await dataSource
      .getRepository(BurnerList)
      .createQueryBuilder("burner_list")
      .where({ id: list_id })
      .andWhere({ uid })
      .getOne();

    //return / send back response
    if (mightDoList) {
      return res.json({
        status: res.statusCode,
        message: "Burner List has been fetched successfully!",
        instance: mightDoList,
      });
    } else {
      return res.json({
        status: 404,
        message: `No Burner List found with this specified ID`,
      });
    }
  } catch (error) {
    return res.json({
      status: 403,
      message: `MakeTime Server Error: ${error}`,
    });
  }
});

export { router as getBurnerListByIDRouter };
