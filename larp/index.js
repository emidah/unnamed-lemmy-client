const express = require('express');
const path = require('path');
const app = express();
const { createProxyMiddleware } = require('http-proxy-middleware');

const LEMMY_TARGET = process.env.LEMMY_TARGET ?? 'https://lemmy.world';
const CLIENT_SITE = process.env.CLIENT_SITE ?? 'http://localhost:3000';

app.use("/", express.static('./gleam/dist'));
app.use('/api', createProxyMiddleware({
    target: LEMMY_TARGET, changeOrigin: true, xfwd: true,
    onProxyReq: (proxyReq, req, res) => {
        // Circumvent server-side policy
        proxyReq.setHeader("Origin", LEMMY_TARGET);
    },
    onProxyRes: (proxyRes) => {
        // Circumvent client-side CORS policy
        proxyRes.headers["Access-Control-Allow-Origin"] = CLIENT_SITE;
    }
}));
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '/gleam/dist/index.html'));
});

app.listen(process.env.PORT ?? 3000);