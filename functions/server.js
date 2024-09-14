const express = require('express')
const serverless = require('serverless-http');
const fs = require("fs");
const path = require('path');
const app = express()
function readDirectoryRecursive(dir) {
    let results = [];
    const files = fs.readdirSync(dir);

    files.forEach((file) => {
        const fullPath = path.join(dir, file);
        const stat = fs.statSync(fullPath);

        if (stat && stat.isDirectory()) {
            results = results.concat(readDirectoryRecursive(fullPath));
        } else {
            results.push(fullPath);
        }
    });

    return results;
}
app.get('/api', (req, res) => {
    const directoryPath = ('public/assets/songs');
        const files = readDirectoryRecursive(directoryPath);
        res.json(files);
  
})
module.exports.handler = serverless(app);
