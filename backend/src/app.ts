import express from 'express';
import itemRoutes from './routes/itemRoutes';
import { erroHandler } from './middlewares/errorHandler';
import cors from 'cors';
import path from "path";

const app = express();

app.use(express.json());
app.use(cors({origin: "http://localhost:3000"}))

app.use('/items', itemRoutes);

app.use(erroHandler);

const publicDir = path.join(process.cwd(), "public");
app.use(express.static(publicDir));

app.get(/.*/, (req, res) => {
  res.sendFile(path.join(publicDir, "index.html"));
});

export default app;