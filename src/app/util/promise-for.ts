/**
 * Thuật toán chạy vòng lặp For theo phong cách promise
 */
import * as blueBird from 'bluebird';

export let promiseFor: Function = blueBird.method(function (condition, action, value) {
    if (!condition(value)) {
        return value;
    }
    return action(value).then(promiseFor.bind(null, condition, action));
});

// VD: cách sử dụng
// promiseFor(function (count) {
//     return count < 10;
// }, function (count) {
//     return blueBird.resolve().then(() => {
//         console.log(count);
//         return ++count;
//     });
// }, 0).then(console.log.bind(console, 'all done'));