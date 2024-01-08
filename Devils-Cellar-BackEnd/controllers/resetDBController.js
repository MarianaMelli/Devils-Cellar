const runAllSeeders = require("../seeders/runAllSeeders");

async function resetDB(req, res) {
  await runAllSeeders();
  return res.json({ msge: "reset db" });
}

module.exports = {
  resetDB,
};
