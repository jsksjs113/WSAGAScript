const express = require('express');
const os = require('os');
const disk = require('diskusage');
const path = require('path');

const app = express();
const port = 3000;

app.get('/', async (req, res) => {
    const cpuInfo = os.cpus();
    const totalMem = (os.totalmem() / 1024 / 1024 / 1024).toFixed(2);
    const freeMem = (os.freemem() / 1024 / 1024 / 1024).toFixed(2);
    const diskInfo = await disk.check('/');

    res.send(`
        <h1>Server Info</h1>
        <p><strong>CPU Cores:</strong> ${cpuInfo.length}</p>
        <p><strong>Total Memory:</strong> ${totalMem} GB</p>
        <p><strong>Free Memory:</strong> ${freeMem} GB</p>
        <p><strong>Disk Total:</strong> ${(diskInfo.total / 1024 / 1024 / 1024).toFixed(2)} GB</p>
        <p><strong>Disk Free:</strong> ${(diskInfo.free / 1024 / 1024 / 1024).toFixed(2)} GB</p>
    `);
});

app.listen(port, () => {
    console.log(`App running at http://localhost:${port}`);
});
