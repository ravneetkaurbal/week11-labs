const connection = require("../config/db");
const { MY_DB } = require("../config/env");

const inventoryTable = async () => {
  try {
    // Switch to the created database
    await connection.query(`USE ${MY_DB};`);
    console.log(`Switched to ${MY_DB}`);

    // delete table
    // await connection.query(`drop table cats_table`);

    // Create inventories_table table if it doesn't exist
    const createTableSql = `
   CREATE TABLE IF NOT EXISTS inventories_table (
      id INT AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      description TEXT NOT NULL,
      quantity INT NOT NULL,
      price FLOAT NOT NULL
    );
    `;

    await connection.query(createTableSql);
    console.log("inventories_table table created or successfully checked");
  } catch (error) {
    console.error("Error occurred:", error.message);
    throw error;
  }
};

// Create table
inventoryTable();

const find = async () => {
  const sql = connection.format("SELECT * FROM inventories_table");

  try {
    const [rows] = await connection.query(sql);
    // Process the rows retrieved from the database
    if (rows.length === 0) {
      // No rows found
      console.log("No inventories found");
      return {}; // Return empty JSON object
    }
    return rows;
  } catch (error) {
    console.error("Error fetching inventories:", error);
    throw error;
  }
};

const findById = async (id) => {
  const sql = connection.format("SELECT * FROM inventories_table WHERE id = ?", [id]);

  try {
    const [rows] = await connection.query(sql);

    if (rows.length === 0) {
      // No rows found
      console.log(`No inventory found with id: ${id}`);
      return false;
    }

    return rows[0];
  } catch (error) {
    console.error("Error fetching inventory by id:", error);
    throw error;
  }
};

const addOne = async (inventory) => {
  try {
    const { name, description, quantity, price } = inventory;

    const sql = connection.format(
      "INSERT INTO inventories_table (name, description, quantity, price) VALUES (?, ?, ?, ?)",
      [name, description, quantity, price]
    );
    const [rows] = await connection.query(sql);

    if (rows.affectedRows === 0) {
      return false;
    }

    // Construct the added inventory object
    const addedInventory = {
      inventory_id: rows.insertId,
      ...inventory
    };

    return addedInventory;
  } catch (error) {
    console.error("Error adding inventory:", error);
    throw error;
  }
};

const findOneAndUpdate = async (inventory, id) => {
  try {
    let sql = connection.format(`UPDATE inventories_table SET ? WHERE id = ?`, [
      inventory,
      id,
    ]);

    const [rows] = await connection.execute(sql);

    if (rows.affectedRows === 0) {
      // No rows affected by the update operation
      console.log(`No inventory found with id: ${id}`);
      return false;
    }

    // Construct the updated inventory object
    const updatedInventory = {
      id,
      ...inventory,
    };

    return updatedInventory;
  } catch (error) {
    console.error("Error updating inventory:", error);
    throw error;
  }
};

const findByIdAndDelete = async (id) => {
  try {
    const sql = connection.format("DELETE FROM inventories_table WHERE id = ?", [id]);
    const [rows] = await connection.execute(sql);

    if (rows.affectedRows === 0) {
      // No rows affected by the delete operation
      console.log(`No inventory found with id: ${id}`);
      return false;
    }

    return { message: "Delete succeeded" };
  } catch (error) {
    console.error("Error deleting inventory:", error);
    throw error;
  }
};

module.exports = {
  find,
  findById,
  addOne,
  findOneAndUpdate,
  findByIdAndDelete,
};