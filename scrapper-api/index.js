const express = require('express');
const path = require('path');
const cors = require('cors');
const bodyParser = require('body-parser');

const { scrape, sanitize, decode } = require('./components/scrapper');
const { createTags } = require('./components/tag');
const asyncForEach = require('./helpers/asyncForEach');

const PORT = process.env.PORT || '9000';
const app = express().use(cors());

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, 'build')));

app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.post('/api', async (req, res) => {
  const scLinks = req.body.data.soundcloudLinks;

  const scrapedUsers = [];

  await asyncForEach(scLinks, async (link) => {
    scrapedUsers.push(await scrape(link));
  });

  const formattedUsers = [];
  scrapedUsers.forEach((user) => {
    const links = [];
    const { userName } = user;

    user.links.forEach((element) => {
      links.push(decode(sanitize(element)));
    });

    formattedUsers.push({ userName, links, scLink: user.scLink });
  });
  const tags = createTags(req.body.data.track);
  res.json({ users: formattedUsers, tags });
});

app.listen(PORT);
