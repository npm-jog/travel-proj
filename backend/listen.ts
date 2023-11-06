import app from "./app";

const { PORT = 8000 } = process.env;

app
  .listen(PORT, () => {
    console.log(`⚡️[server]: Server is running at http://localhost:${PORT}`);
  })
  .on("error", (err) => {
    console.log(err);
  });
