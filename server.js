const express = require("express");
const { google } = require("googleapis");

const app = express();
const port = process.env.PORT || 8000;

const drive = google.drive({
  version: "v3",
  auth: process.env.gkey, // Set your API key in environment variables
});

app.get("/stream/:fileId", async (req, res) => {
  const fileId = req.params.fileId;

  try {
    const file = await drive.files.get(
      { fileId, alt: "media" },
      { responseType: "stream" }
    );

    res.setHeader("Content-Type", "video/mp4");
    file.data.pipe(res);
  } catch (err) {
    res.status(500).send("Error streaming file");
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
