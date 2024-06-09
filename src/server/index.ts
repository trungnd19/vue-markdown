import express from 'express';
import cors from 'cors';
import { Post, thisMonth, thisWeek, today } from '../posts';
import bodyParser from 'body-parser';
import { NewUser, User } from '../users';

const app = express();
app.use(cors());
app.use(bodyParser.json())

const allPosts = [today, thisWeek, thisMonth]
const allUsers: User[] = []

app.get("/posts", (req, res) => {
    res.status(200).json([today, thisMonth, thisWeek])
})

app.post<{}, {}, Post>("/posts", (req, res) => {
    const post = {...req.body, id: (Math.random() * 10000).toFixed()}
    allPosts.push(post)
    res.json(post)
})

app.listen(8000, () => {
    console.log('Listening on port 8000')
})

app.post<{}, {}, NewUser>("/users", (req, res) => {
    const user = {...req.body, id: (Math.random() * 10000).toFixed()}
    allUsers.push(user)

    const {password, ...rest} = user
    res.json(rest) // không trả về password
})
