import express from "express";
import path from "path";
// const express = require("express");
// const path = require("path");

const app = express();

app.use(express.static(path.join(__dirname, "data/hls-content")));

// command to generate m3u8:
// ffmpeg -i ../test.mp4  -c:a libmp3lame -ar 48000 -ab 64k  -c:v libx264 -b:v 128k -flags -global_header -map 0 -f segment -segment_list test.m3u8 -segment_time 2 -segment_format mpegts segment_%05d.ts
const m3u8Path = path.join(__dirname, "data/hls-content/test.m3u8");
app.get("/m3u8", (req, res) => {
    res.sendFile(m3u8Path);
});

const videoPath = path.join(__dirname, "data/test.mp4");
app.get("/video", (req, res) => {
    res.sendFile(videoPath);
});

const indexPath = path.join(__dirname, "data/index.html");
app.get("/", (req, res) => {
    res.sendFile(indexPath);
});

// const startServer = () => {
export const startServer = () => {
    const port = 3000;
    console.log(`Starting server on ${port}`);
    app.listen(port);
};

// startServer();
