Promise.resolve(21).then(function(v) {
    console.log(v);

    return v * 2;
}).then(function(v) {
    console.log(v);
});

Promise.reject(21).then(null, function(v) {
    console.log(v);

    return v * 2;
}).then((v) => {
    console.log(`resolve: ${v}`);
}, (v) => {
    console.log(`reject: ${v}`);
});

new Promise(function(resolve, reject) {
    resolve(Promise.reject('Oops'));
}).then((v) => {
    console.log('fulfill');
}, (v) => {
    console.log('reject:' + v);
});

new Promise((resolve, reject) => {
    throw 'xxx';
}).then((v) => {
    console.log('resolve fulfill')
}, (v) => {
    console.log('reject:' + v);
});

new Promise((resolve, reject) => {
    resolve('fulfill');
}).then((v) => {
    console.log('resolve fulfill');
    throw('xxx');
}, (v) => {
    console.log('reject' + v);
}).catch((err) => {
    console.log(err);
});

Promise.all([Promise.resolve(21), Promise.reject('Oops'), Promise.reject('Ppis')]).then((msg) => {
    console.log(msg.join()); // msg 每个P的决议值组成的数组
}, (msg) => {
    console.log(`all: ${msg}`); // 第一个reject的决议值
});

Promise.race([Promise.reject('oOo'), Promise.resolve('xXx')]).then((v) => {
    console.log(`race fulfill: ${v}`);
}, (v) => {
    console.log(`race reject: ${v}`);
})