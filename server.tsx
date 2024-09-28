const express = require('express');
const cors = require('cors');
const { YoutubeTranscript } = require('youtube-transcript');

const app = express();
const port = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

app.post('/transcript', async (req, res) => {
    const { link } = req.body;
    const videoId = new URL(link).searchParams.get('v');

    if (videoId) {
        try {
            const transcript = await YoutubeTranscript.fetchTranscript(videoId);
            const transcriptText = transcript.map(entry => entry.text).join(' ');
            res.json({ transcript: transcriptText });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    } else {
        res.status(400).json({ error: 'ID do vídeo inválido.' });
    }
});

app.listen(port, () => {
    console.log(`Servidor ouvindo na porta ${port}`);
});
