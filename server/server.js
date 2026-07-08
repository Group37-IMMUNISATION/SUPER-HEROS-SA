require("dotenv").config();

const app = require("./app");
const pool = require("./config/db");

const PORT = process.env.PORT || 5000;

async function startServer() {
  try {
    await pool.query("SELECT NOW()");

    console.log("✅ Database Connected");

    app.listen(PORT, () => {
      console.log(`🚀 SHUSA API running on http://localhost:${PORT}`);
    });

  } catch (error) {
    console.error("❌ Failed to start server");
    console.error(error.message);
    process.exit(1);
  }
}

startServer();