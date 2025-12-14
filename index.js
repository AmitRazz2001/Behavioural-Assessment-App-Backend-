const express = require("express");
const assessmentRoutes = require("./routes/assessment.routes");

const errorMiddleware = require("./middlewares/error.middleware");
const notFoundMiddleware = require("./middlewares/notFound.middleware");

const app = express();
app.use(express.json());

app.get('/', (req, res) => {
    res.json({
        message: "Welcome to the Behavioural Assessment App"
    });
});
app.use("/assessment", assessmentRoutes);

app.use(notFoundMiddleware);
app.use(errorMiddleware);
app.listen(5000, () => {
    console.log("Server running on port 5000");
});
