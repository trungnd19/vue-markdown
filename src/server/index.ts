import express from 'express';
import cors from 'cors';
import { thisMonth, thisWeek, today } from '../posts';

const app = express();
app.use(cors());

app.get("/posts", (req, res) => {
    res.status(200).json([today, thisMonth, thisWeek])
})

app.listen(8000, () => {
    console.log('Listening on port 8000')
})

