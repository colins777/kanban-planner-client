self.addEventListener('install', event => {
    console.log('Service Worker installing.');
    self.skipWaiting(); // Activate worker immediately
});

self.addEventListener('activate', event => {
    console.log('Service Worker activating.');
});

let timerInterval = null;
let secondsLeft = 0;

self.addEventListener('message', event => {
    if (event.data && event.data.type === 'START_TIMER') {

        startTimer()

    } else if (event.data && event.data.type === 'STOP_TIMER') {
        stopTimer();
    }
});


function startTimer() {

    if (timerInterval) return; // Prevent multiple intervals

    timerInterval = setInterval(() => {

        self.clients.matchAll().then(clients => {

            secondsLeft++

            console.log('secondsLeft', secondsLeft)

            clients.forEach(client => {
                client.postMessage({ type: 'TIME_LEFT', secondsLeft });
            });
        });

    }, 1000);
}

function stopTimer() {
    clearInterval(timerInterval)
    timerInterval = null

    let _seconds = secondsLeft;

    secondsLeft = 0;

    self.clients.matchAll().then(clients => {

    secondsLeft++

    //console.log('secondsLeft', secondsLeft)

    clients.forEach(client => {
        client.postMessage({type: 'TIME_LEFT', _seconds});
    });
    });

}


