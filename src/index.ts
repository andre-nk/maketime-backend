import express from "express";
import { DataSource } from "typeorm";
import { BurnerList } from "./entities/burner_list";
import { Highlight } from "./entities/highlight";
import { MightDoList } from "./entities/might_do_list";
import { StackRank } from "./entities/stack_rank";
import { TrivialQuestion } from "./entities/trivial_question";
import { createHighlightRouter } from "./routes/highlight/create_highlight";
import { createMightDoListRouter } from "./routes/might_do_list/create_might_do_list";
import { deleteMightDoListRouter } from "./routes/might_do_list/delete_might_do_list";
import { updateMightDoListRouter } from "./routes/might_do_list/update_might_do_list";

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
    app.use(createHighlightRouter);

        // Might-Do List Routes
    app.use(createMightDoListRouter);
    app.use(updateMightDoListRouter);
    app.use(deleteMightDoListRouter);
    
    //Initialize in port
    app
      .listen(8080, () => {
        console.log("Express running on 8080");
      });
  } catch (error) {
    console.log("Failed to connect");
    console.log(error);
  }
};

main();
