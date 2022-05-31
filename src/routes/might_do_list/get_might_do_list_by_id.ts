import express from "express";
import { dataSource } from "../../index";
import { MightDoList } from "../../entities/might_do_list";

const router = express.Router();

router.get("/api/:uid/might-do-list/:list_id", async (req, res) => {
  //destructure route params
  const { uid, list_id } = req.params;

  try {
    
    const mightDoList = await dataSource
      .getRepository(MightDoList)
      .createQueryBuilder("might_do_list")
      .where({ id: list_id })
      .andWhere({ uid })
      .getOne();

    //return / send back response
    if (mightDoList) {
      return res.json({
        status: res.statusCode,
        message: "Might-Do List has been fetched successfully!",
        instance: mightDoList,
      });
    } else {
      return res.json({
        status: 404,
        message: `No Might-Do List found with this specified ID`,
      });
    }
  } catch (error) {
    return res.json({
      status: 403,
      message: `MakeTime Server Error: ${error}`,
    });
  }
});

export { router as getMightDoListByIDRouter };
