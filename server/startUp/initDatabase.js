// 1. У любого пользователя будет как минимум в БД qualities & professions
// 2. Они равны mock данным
const Item = require("../models/Item");
const itemMock = require("../mock/items.json");

// const Quality = require('../models/Quality')
// const qualitiesMock = require('../mock/qualities.json')

module.exports = async () => {
  const items = await Item.find();
  if (items.length !== itemMock.length) {
    await createInitialEntity(Item, itemMock);
  }
};

async function createInitialEntity(Model, data) {
  await Model.collection.drop();
  return Promise.all(
    data.map(async (item) => {
      try {
        delete item._id;
        const newItem = new Model(item);
        await newItem.save();
        return newItem;
      } catch (e) {
        return e;
      }
    })
  );
}
