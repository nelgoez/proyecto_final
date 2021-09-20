import knex from "knex";
import { options } from "../SQLite3";

const DB = knex(options);
const tableName = "mensajes";

const msg_create = async () => {
  try {
    if (await DB.schema.hasTable(tableName)) {
      await DB.schema.dropTable(tableName);
    }
    await DB.schema.createTable(tableName, (table) => {
      table.string("author").notNullable();
      table.string("text").notNullable();
      table.string("fecha").notNullable();
      table.increments("id");
    });
  } catch (error) {
    console.log(error);
  } finally {
    // await DB.destroy();
  }
};

const msg_select = async () => {
  try {
    return await DB.from(tableName).select("*");
  } catch (error) {
    console.log(error);
  } finally {
    // await DB.destroy();
  }
};

const msg_select_id = async (params: { id: number }) => {
  try {
    return await DB.from(tableName).select("*").where(params);
  } catch (error) {
    console.log(error);
  } finally {
    // await DB.destroy();
  }
};

const msg_insert = async (data: any[]) => {
  try {
    await DB.from(tableName).insert(data);
  } catch (error) {
    console.log(error);
  } finally {
    // await DB.destroy();
  }
};

const msg_update = async (data: any, params: { id: number }) => {
  try {
    await DB.from(tableName).where(params).update(data);
  } catch (error) {
    console.log(error);
  } finally {
    // await DB.destroy();
  }
};

const msg_delete_id = async (params: { id: number }) => {
  try {
    await DB.from(tableName).where(params).del();
  } catch (error) {
    console.log(error);
  } finally {
    // await DB.destroy();
  }
};

const msg_delete = async () => {
  try {
    await DB.from(tableName).del();
  } catch (error) {
    console.log(error);
  } finally {
    // await DB.destroy();
  }
};

const test = [
  {
    author: "Juan",
    text: "¡Hola mundo!",
    fecha: "12/9/2021 19:52:35",
  },
  {
    author: "Pedro",
    text: "Hola gente!",
    fecha: "12/9/2021 19:52:43",
  },
  {
    author: "Ana",
    text: "Todo bien?",
    fecha: "19/9/2021 14:49:19",
  },
];

const test2 = {
  author: "Juan",
  text: "¡Hola mundo!",
  fecha: "12/9/2021 19:52:35",
};

// (async () => {
//   await msg_create();

//   await msg_insert(test);

//   const rows = await msg_select();

//   console.log(rows);

//   if (rows) {
//     for (const row of rows) {
//       console.log(
//         `${row["id"]} ${row["author"]} ${row["text"]} ${row["fecha"]}`
//       );
//     }
//   }
// })();

export { msg_create, msg_select, msg_insert };
