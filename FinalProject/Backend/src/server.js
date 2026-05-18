const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./config/swagger");

dotenv.config();

require("./config/firebase");

const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const cardRoutes = require("./routes/cardRoutes");
const chatRoutes = require("./routes/chatRoutes");
const messageRoutes = require("./routes/messageRoutes");
const messageApiRoutes = require("./routes/messageApiRoutes");
const analyticsRoutes = require("./routes/analyticsRoutes");
const reportRoutes = require("./routes/reportRoutes");
const conversationRoutes = require("./routes/conversationRoutes");

const { globalLimiter } = require("./middlewares/rateLimiter");
const { errorHandler } = require("./middlewares/errorHandler");

const app = express();

app.use(cors());
app.use(express.json());
app.use(globalLimiter);

// Cấu hình Swagger UI
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/users", userRoutes);
app.use("/api/v1/cards", cardRoutes);
app.use("/api/v1/cards", messageRoutes);
app.use("/api/v1/messages", messageApiRoutes);
app.use("/api/v1/chat", chatRoutes);
app.use("/api/v1/analytics", analyticsRoutes);
app.use("/api/v1/reports", reportRoutes);
app.use("/api/v1/conversations", conversationRoutes);


app.get("/api/v1/health", (req, res) => {
  res.status(200).json({
    status: "THÀNH CÔNG",
    message: "Backend và Firebase đang hoạt động!",
  });
});

app.use(errorHandler);

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
