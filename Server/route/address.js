const express = require("express");

const { Address } = require("../models");
const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const {
      userId,
      category,
      house,
      apartment,
      latitude,
      longitude,
      favorite,
    } = req.body;
    const address = await Address.create({
      userId,
      category,
      house,
      apartment,
      latitude,
      longitude,
      favorite,
    });
    res.status(201).json(address);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get("/:userId", async (req, res) => {
  try {
    const { userId } = req.params;
    const addresses = await Address.findAll({ where: { userId } });
    res.status(200).json(addresses);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const updatedAddress = await Address.update(req.body, { where: { id } });
    res.status(200).json(updatedAddress);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.delete("/:id", async ( req, res) => {
  try {
    const { id } = req.params;
    await Address.destroy({ where: { id } });
    res.status(200).json({ message: "Address deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports= router