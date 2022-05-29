import { DataSource } from "typeorm";
import { BurnerList } from "./entities/burner_list";
import { Highlight } from "./entities/highlight";
import { MightDoList } from "./entities/might_do_list";
import { StackRank } from "./entities/stack_rank";
import { TrivialQuestion } from "./entities/trivial_question";

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
    await dataSource.initialize();

    console.log("Connected to DB");
  } catch (error) {
    console.log("Failed to connect");
    console.log(error);
  }
};

main();
