const fs = require('fs');
const path = require('path');
const { onExit } = require('signal-exit');
const { exec } = require('child_process');

// 获取命令行参数
const args = process.argv.slice(2);

// 创建一个 PID 文件
const pidFilePath = path.resolve(__dirname, 'dev.pid');
fs.writeFileSync(pidFilePath, process.pid.toString());

console.log(`Process started with PID: ${process.pid} and args: ${args.join(' ')}`);

// 模拟工作负载
setInterval(() => {
    console.log(`Process running with args: ${args.join(' ')}`);
}, 5000);

// 使用 signal-exit 处理进程退出和信号捕获
onExit((code, signal) => {
    console.log(`Received ${signal || 'exit'} signal, cleaning up...`);
    if (fs.existsSync(pidFilePath)) {
        fs.unlinkSync(pidFilePath);
    }
    console.log('PID file removed, exiting process.');
});
