const express = require('express');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

const yts = require('yt-search');
const ytdl = require('ytdl-core');

app.get('/api/search', (req, res) => {
    const query = req.body.query;
    if (!query) return res.status(400).json({ message: 'Missing data.' });
    yts(query, (err, r) => {
        if (err) return res.status(500).json({ message: err.message });
        return res.status(200).json({ videos: r.videos });
    });
});

app.get('/api/download', (req, res) => {
    const url = req.body.url;
    if (!url) return res.status(400).json({ message: 'Missing data.' });
    ytdl(url, {
        filter: format => format.container === 'mp4'
    })
        .pipe(res);
});

const path = require('path');

app.use(express.static(path.join(__dirname, 'client', 'build'), {
    extensions: ['html'],
}));

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Listening on port ${port}`));