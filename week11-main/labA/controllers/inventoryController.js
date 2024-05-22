const {
  find,
  findById,
  addOne,
  findOneAndUpdate,
  findByIdAndDelete,
} = require("../models/inventoryModel");

const getInventories = async (req, res) => {
  try {
    const inventories = await find();

    if (!inventories || inventories.length === 0) {
      // No inventories found
      return res.status(404).json({ message: "No inventories found" });
    }

    res.json(inventories);
  } catch (error) {
    console.error("Error fetching inventories:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const getInventory = async (req, res) => {
  try {
    const inventory = await findById(req.params.id);

    if (inventory) {
      // Inventory found, send the inventory as JSON response
      res.json(inventory);
    } else {
      // No inventory found with the specified id, send a 404 status code
      res.status(404).json({ message: "Inventory not found" });
    }
  } catch (error) {
    // Handle any errors that occurred during the fetch operation
    console.error("Error fetching inventory:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const addInventory = async (req, res) => {
  try {
    // Validate request body
    if ( 
      !req.body.name ||
      !req.body.description ||
      !req.body.quantity || 
       req.body.price === undefined
    ) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const result = await addOne(req.body);

    if (result && result.inventory_id) {
      // Inventory added successfully
      res.status(201).json({ message: "New inventory added", result });
    } else {
      // Failed to add inventory
      res.status(500).json({ message: "Failed to add inventory" });
    }
  } catch (error) {
    // Handle any errors that occurred during the add operation
    console.error("Error adding inventory:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const updateInventory = async (req, res) => {
  try {
    // Validate request body
    if (
      !req.body.name ||
      !req.body.description ||
      !req.body.quantity || 
      req.body.price === undefined
    ) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const result = await findOneAndUpdate(req.body, req.params.id);

    if (!result) {
      // No inventory found with the specified id, send a 404 status code
      return res.status(404).json({ message: "Inventory not found" });
    }

    // Inventory updated successfully, send the updated inventory as JSON response
    res.json({ message: "Inventory updated", result });
  } catch (error) {
    // Handle any errors that occurred during the update operation
    console.error("Error updating inventory:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const deleteInventory = async (req, res) => {
  try {
    const result = await findByIdAndDelete(req.params.id);

    if (!result) {
      // No inventory found with the specified id, send a 404 status code
      return res.status(404).json({ message: "Inventory not found" });
    }

    // Inventory deleted successfully, send a 204 No Content status
    res.status(204).json({ message: "Inventory deleted" });
  } catch (error) {
    // Handle any errors that occurred during the delete operation
    console.error("Error deleting inventory:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = { getInventories, getInventory, addInventory, updateInventory, deleteInventory };