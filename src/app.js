const express = require('express')
const { spawn } = require('child_process');
const path = require('path');

var app = express();

app.use(express.json());
app.use(express.static(path.join(__dirname, '../public/')));

app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, '../public/index.html'));
});

app.post('/predict', function (req, res) {
    function runScript() {
        return spawn('python', [
            path.join(__dirname, 'script.py'),
            req.body
        ]);
    }

    const subprocess = runScript();

    subprocess.stdout.on('data', (data) => {
        console.log(`data:${data}`);
    });
    subprocess.stderr.on('data', (data) => {
        console.log(`error:${data}`);
    });
    subprocess.stderr.on('close', () => {
        console.log("Closed");
    });

    res.set('Content-Type', 'text/plain');
    subprocess.stdout.pipe(res);
    subprocess.stderr.pipe(res);
});

app.listen(9000, function () {
    console.log('Express app - listening on port 9000!');
});