const express = require('express');
var cors = require('cors');
var bodyParser = require('body-parser');

const { scrape, sanitize, decode } = require('./components/scrapper');
const { createTags } = require('./components/tag');
const asyncForEach = require('./helpers/asyncForEach');

const PORT = process.env.PORT || '9000';
const app = express().use('*', cors());;

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

app.post('/api', async (req, res,) => {
    let scLinks = req.body.data.soundcloudLinks

    let scrapedUsers = [];

    await asyncForEach(scLinks, async (link) => {
        scrapedUsers.push(await scrape(link));
    });
    
    let formattedUsers = []
    scrapedUsers.forEach((user) => {
        let links = [];
        let userName = user.userName;

        user.links.forEach(element => {
            links.push(decode(sanitize(element)));
        })

        formattedUsers.push({userName , links, scLink: user.scLink});
    })
    const tags = createTags(req.body.data.track);
    res.json({users: formattedUsers, tags });
});

app.listen(PORT);