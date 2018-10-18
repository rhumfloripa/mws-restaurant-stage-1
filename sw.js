var nomeDoCache = 'restaurant-cache';
var arquivosParaCache = [
    './index.html',
    './restaurant.html',
    './css/styles.css',
    './js/dbhelper.js',
    './js/main.js',
    './js/restaurant_info.js',
    './data/restaurants.json',
    './img/1.jpg',
    './img/2.jpg',
    './img/3.jpg',
    './img/4.jpg',
    './img/5.jpg',
    './img/6.jpg',
    './img/7.jpg',
    './img/8.jpg',
    './img/9.jpg',
    './img/10.jpg',
];
// Perform install steps
self.addEventListener('install', function (event) {
    console.log('sw instalado');
    event.waitUntil(
        caches.open(nomeDoCache)
            .then(function (cache) {
                console.log('cache iniciado');
                return cache.addAll(arquivosParaCache);
            })
    );
});
self.addEventListener('activate',  event => {
    console.log('ativo');
    event.waitUntil(self.clients.claim());
});

self.addEventListener('fetch', event => {
    console.log('fetch');
    event.respondWith(
        caches.match(event.request, { ignoreSearch: true }).then(response => {
            if (response) return response;
            return fetch(event.request);
        }).catch((error) => {
            console.log(error);}
        )
    );
});