import knex from "knex";
import { options } from "../MariaDB";
import Producto from "../src/Producto";

const DB = knex(options);
const tableName = "productos";

const sql_create = async () => {
  try {
    if (await DB.schema.hasTable(tableName)) {
      await DB.schema.dropTable(tableName);
    }
    await DB.schema.createTable(tableName, (table) => {
      table.string("title").notNullable();
      table.string("price").notNullable();
      table.string("thumbnail").notNullable();
      table.increments("id");
    });
  } catch (error) {
    console.log(error);
  } finally {
    // await DB.destroy();
  }
};

const sql_select = async () => {
  try {
    return await DB.from(tableName).select("*");
  } catch (error) {
    console.log(error);
  } finally {
    // await DB.destroy();
  }
};

const sql_select_id = async (params: { id: number }) => {
  try {
    return await DB.from(tableName).select("*").where(params);
  } catch (error) {
    console.log(error);
  } finally {
    // await DB.destroy();
  }
};

const sql_insert = async (data: any[]) => {
  try {
    await DB.from(tableName).insert(data);
  } catch (error) {
    console.log(error);
  } finally {
    // await DB.destroy();
  }
};

const sql_update = async (data: any, params: { id: number }) => {
  try {
    await DB.from(tableName).where(params).update(data);
  } catch (error) {
    console.log(error);
  } finally {
    // await DB.destroy();
  }
};

const sql_delete_id = async (params: { id: number }) => {
  try {
    await DB.from(tableName).where(params).del();
  } catch (error) {
    console.log(error);
  } finally {
    // await DB.destroy();
  }
};

const sql_delete = async () => {
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
    title: "Globo Terráqueo",
    price: "345.67",
    thumbnail:
      "https://cdn3.iconfinder.com/data/icons/fantasy-and-role-play-game-adventure-quest/512/Item_Bag-256.png",
  },
  {
    title: "Teclado",
    price: "12000",
    thumbnail:
      "https://cdn3.iconfinder.com/data/icons/fantasy-and-role-play-game-adventure-quest/512/Item_Bag-256.png",
  },
  {
    title: "Mouse",
    price: "9000.99",
    thumbnail:
      "https://cdn3.iconfinder.com/data/icons/fantasy-and-role-play-game-adventure-quest/512/Item_Bag-256.png",
  },
];

const test2 = {
  title: "Prueba de Producto 2",
  price: "121.12",
  thumbnail: "una foto 2",
};

// (async () => {
//   //   await sql_create();

//     // await sql_insert(test);

//   //   await sql_update(test2, { id: 1 });

//   const rows = await sql_select();

//   console.log(rows);

//   if (rows) {
//     for (const row of rows) {
//       console.log(
//         `${row["id"]} ${row["title"]} ${row["price"]} ${row["thumbnail"]}`
//       );
//     }
//   }
// })();

export {
  sql_create,
  sql_select,
  sql_select_id,
  sql_insert,
  sql_update,
  sql_delete,
  sql_delete_id,
};
