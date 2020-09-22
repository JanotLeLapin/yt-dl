const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(bodyParser.json());
app.use(cors());

const yts = require('yt-search');
const ytdl = require('ytdl-core');

app.post('/api/search', (req, res) => {
    let query = req.body.query;
    if (!query) return res.status(400).json({ message: 'Missing data.' });
    yts(query, (err, r) => {
        if (err) return res.status(500).json({ message: err.message });
        return res.status(200).json({ videos: r.videos });
    });
});

app.get('/api/download/:id', (req, res) => {
    const id = req.params.id;
    if (!id) return res.status(400).json({ message: 'Missing data.' });
    yts({ videoId: id }, (err, r) => {
        if (err) return res.status(500).json({ message: err.message });
        res.attachment(r.title + '.flv');
        ytdl('https://youtube.com/watch?v=' + id)
            .pipe(res);
    })
});

const path = require('path');

app.use(express.static(path.join(__dirname, 'client', 'build'), {
    extensions: ['html'],
}));

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Listening on port ${port}`));