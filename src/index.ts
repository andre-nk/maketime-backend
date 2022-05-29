import express from "express";
import { DataSource } from "typeorm";
import { BurnerList } from "./entities/burner_list";
import { Highlight } from "./entities/highlight";
import { MightDoList } from "./entities/might_do_list";
import { StackRank } from "./entities/stack_rank";
import { TrivialQuestion } from "./entities/trivial_question";
import { createHighlightRouter } from "./routes/highlight/create_highlight";

//Declare express app
const app = express();

const main = async () => {
  const dataSource = new DataSource({
    type: "postgres",
    host: "127.0.0.1",
    port: 5432,
    username: "postgres",
    password: undefined,
    database: "maketime-dev",
    entities: [Highlight, BurnerList, MightDoList, TrivialQuestion, StackRank],
    synchronize: true,
  });

  try {
    //Connect to Postgres
    await dataSource.initialize();
    console.log("Connected to DB");

    //Middlewares
      //Basic config
    app.use(express.json());
      //Routes
    app.use(createHighlightRouter);

    //Initialize in port
    app.listen(8080, () => {
      console.log("Express running on 8080")
    });
  } catch (error) {
    console.log("Failed to connect");
    console.log(error);
  }
};

main();
