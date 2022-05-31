import express from "express";
import { DataSource } from "typeorm";
import { BurnerList } from "./entities/burner_list";
import { Highlight } from "./entities/highlight";
import { MightDoList } from "./entities/might_do_list";
import { StackRank } from "./entities/stack_rank";
import { TrivialQuestion } from "./entities/trivial_question";
import { createHighlightRouter } from "./routes/highlight/create_highlight";
import { deleteHighlightRouter } from "./routes/highlight/delete_highlight";
import { getHighlightByIDRouter } from "./routes/highlight/get_highlight_by_id";
import { getHighlightByMonthRouter } from "./routes/highlight/get_highlight_by_month";
import { updateHighlightRouter } from "./routes/highlight/update_highlight";
import { createMightDoListRouter } from "./routes/might_do_list/create_might_do_list";
import { deleteMightDoListRouter } from "./routes/might_do_list/delete_might_do_list";
import { getMightDoListByMonthRouter } from "./routes/might_do_list/get_might_do_list_by_month";
import { updateMightDoListRouter } from "./routes/might_do_list/update_might_do_list";
import { getMightDoListByIDRouter } from "./routes/might_do_list/get_might_do_list_by_id";
import { createStackRankRouter } from "./routes/stack_rank/create_stack_rank";
import { getStackRankByIDRouter } from "./routes/stack_rank/get_stack_rank_by_id";
import { getStackRankByMonthRouter } from "./routes/stack_rank/get_stack_rank_by_month";
import { updateStackRankRouter } from "./routes/stack_rank/update_stack_rank";
import { deleteStackRankRouter } from "./routes/stack_rank/delete_stack_rank";
import { getBurnerListByIDRouter } from "./routes/burner_list/get_burner_list_by_id";
import { getBurnerListByMonthRouter } from "./routes/burner_list/get_burner_list_by_month";

//Declare express app
const app = express();
export const dataSource = new DataSource({
  type: "postgres",
  host: "127.0.0.1",
  port: 5432,
  username: "postgres",
  password: undefined,
  database: "maketime-dev",
  //Add entities on DB init
  entities: [Highlight, BurnerList, MightDoList, TrivialQuestion, StackRank],
  //Synchronize entities with table (auto-migrate)
  synchronize: true,
});

const main = async () => {
  try {
    //Connect to Postgres
    await dataSource.initialize();
    console.log("Connected to DB");

    //Middlewares
    //Basic config
    app.use(express.json());

    //Routes
    // Highlight Routes
    app.use(getHighlightByIDRouter);
    app.use(getHighlightByMonthRouter);
    app.use(createHighlightRouter);
    app.use(updateHighlightRouter);
    app.use(deleteHighlightRouter);

    // Might-Do List Routes
    app.use(getMightDoListByIDRouter);
    app.use(getMightDoListByMonthRouter);
    app.use(createMightDoListRouter);
    app.use(updateMightDoListRouter);
    app.use(deleteMightDoListRouter);

    //Burner List Routes
    app.use(getBurnerListByIDRouter);
    app.use(getBurnerListByMonthRouter);
    app.use(createMightDoListRouter);
    app.use(updateMightDoListRouter);
    app.use(deleteMightDoListRouter);

    // Stack Rank List Routes
    app.use(getStackRankByIDRouter);
    app.use(getStackRankByMonthRouter);
    app.use(createStackRankRouter);
    app.use(updateStackRankRouter);
    app.use(deleteStackRankRouter);

    //Initialize in port
    app.listen(8080, () => {
      console.log("Express running on 8080");
    });
  } catch (error) {
    console.log("Failed to connect");
    console.log(error);
  }
};

main();
