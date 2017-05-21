class SimplePromise {
    constructor(callback) {
        callback(this.resolve, this.reject);
    }

    then = (thenCallback, catchCallback) => {
        this.thenCallback = thenCallback;
        this.catchCallback = catchCallback;
    }

    resolve = (...args) => {
        this.thenCallback(...args);
    }

    reject = (...args) => {
        this.catchCallback(...args);
    }
}



// tests

async function app() {
    console.log('start');

    const result1 = await new SimplePromise((res, rej) => {
        setTimeout(() => {
            res('received async data 1');
        }, 2000);
    });

    console.log('result1', result1);

    const result2 = await new SimplePromise((res, rej) => {
        setTimeout(() => {
            res('received async data 2');
        }, 3000);
    });

    console.log('result2', result2);

    try {
        await new SimplePromise((res, rej) => {
            setTimeout(() => {
                rej('err mess');
            }, 1000);
        });
    } catch (err) {
        console.log('err', err);
    }

    console.log('end');
}

app();
