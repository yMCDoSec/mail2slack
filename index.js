const multer = require("multer");
const axios = require("axios");
const htmlToText = require("html-to-text");
const app = require("express")();

app.set("port", process.env.PORT || 3000);

const webhookUrl =
    "https://hooks.slack.com/services/*********/*********/**********************"; // 各自webhookUrlを設定ください

app.post("/", multer().any(), (req, res) => {
    (async () => {
        try {
            await axios.post(webhookUrl, {
                text: `
From : ${req.body.from}
Subject : ${req.body.subject}
Body :
${req.body.text || htmlToText.fromString(req.body.html)}
`
            });
            res.status(200).send({ success: true });
        } catch (e) {
            console.error(e);
            res.status(500).send({
                success: false,
                error: e
            });
        }
    })();
});

app.listen(app.get("port"), () => {
    console.log(`Express server listening on port ${app.get("port")}`);
});