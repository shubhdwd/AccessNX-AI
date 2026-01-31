const errorHandler = (err, req, res, next) => {
  console.error("🔥 Error:", err.stack);
  res.status(500).json({
    score: 0,
    badges: ["System Error", "Scan Failed"],
    issues: [],
    error: err.message || "Internal Server Error"
  });
};

module.exports = errorHandler;