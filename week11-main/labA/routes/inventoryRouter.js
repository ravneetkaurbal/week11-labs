// router.js
const express = require("express");
const router = express.Router();
// controller functions
const inventoryController = require("../controllers/inventoryController");


router.get("/", inventoryController.getInventories);
router.post("/", inventoryController.addInventory);
router.get("/:id", inventoryController.getInventory);
router.delete("/:id", inventoryController.deleteInventory);
router.put("/:id", inventoryController.updateInventory);

module.exports = router;