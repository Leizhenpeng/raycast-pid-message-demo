const express = require('express');
const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');

const app = express();
const port = 3000;
const pidFilePath = path.resolve(__dirname, 'dev.pid');

app.use(express.json());

const startDevSession = (args = []) => {
    if (fs.existsSync(pidFilePath)) {
        const pid = fs.readFileSync(pidFilePath, 'utf8');
        try {
            process.kill(pid, 0); // 检查进程是否存在
            return 'Development session already running.';
        } catch (err) {
            fs.unlinkSync(pidFilePath); // 清除旧的 PID 文件
        }
    }

    const command = `node dev.js ${args.join(' ')}`;
    exec(command, (err, stdout, stderr) => {
        if (err) {
            console.error(`Failed to start process: ${stderr}`);
        } else {
            console.log(`Process started with output: ${stdout}`);
        }
    });

    return `Starting development session with args: ${args.join(' ')}`;
};

const stopDevSession = () => {
    if (fs.existsSync(pidFilePath)) {
        const pid = fs.readFileSync(pidFilePath, 'utf8');
        try {
            process.kill(pid, 'SIGTERM');
            return 'Development session stopped.';
        } catch (err) {
            return `Failed to stop process: ${err.message}`;
        }
    } else {
        return 'PID file not found.';
    }
};

const restartDevSession = (args = []) => {
    const stopMessage = stopDevSession();
    console.log(stopMessage);
    return startDevSession(args);
};

// 启动开发会话
app.post('/start-dev', (req, res) => {
    const args = req.body.args || [];
    const message = startDevSession(args);
    res.send(message);
});

// 停止开发会话
app.get('/stop-dev', (req, res) => {
    const message = stopDevSession();
    res.send(message);
});

// 重启开发会话
app.post('/restart-dev', (req, res) => {
    const args = req.body.args || [];
    const message = restartDevSession(args);
    res.send(message);
});

// 启动服务器
app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
});
