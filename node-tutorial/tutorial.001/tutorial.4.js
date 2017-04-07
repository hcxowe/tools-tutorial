// Child Processes 子进程

console.log(__dirname);
console.log(__filename);

const spawn = require('child_process').spawn();
const bat = spawn('cmd.exe', ['/c', 'my.bat']);

bat.stdout.on('data', (data) => {
    console.log(data.toString());
});

bat.stderr.on('data', (data) => {
    console.log(data.toString());
});

bat.on('exit', (code) => {
    console.log(`退出码:${code}`);
});