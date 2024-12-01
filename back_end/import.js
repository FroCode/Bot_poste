const importData = async (data, model) => {
  try {
    await model.create(data);
    console.log("data has been imported successfuly");
  } catch (err) {
    console.error(err);
  }
};

module.exports = importData;
