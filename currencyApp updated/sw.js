const cacheName = 'static-cache-v1';

self.addEventListener('install', function(event) {
	console.log('[ServiceWorker] Installed');

	event.waitUntil(
		caches.open(cacheName).then(function(cache) {
			console.log("[ServiceWorker] Precaching App Shell");
			return cache.addAll([
				'/',
				'/index.html',
				'/js/script.js',
				'/css/style.css',
				'/js/idb.js',
				'/js/index.js',
				'/js/promise.js',
				'/js/fetch.js',
				'https://fonts.googleapis.com/css?family=Roboto:400,700'
			]);
		})
	)
})


self.addEventListener('activate', function (event) {
	console.log("[ServiceWorker] Activated", event);
	return self.client.claim();
	// e.waitUntil(
	
	// 	caches.keys().then(function (cacheNames) {
	// 		return Promise.all(cacheNames.map(function (thisCacheName) {

	// 			if (thisCacheName !== cacheName) {

	// 				console.log("[ServiceWorker] Removing Cache Files from ", thiscacheName);
	// 				return caches.delete(thiscacheName);
	// 			}
	// 		}));
	// 	})
	// );
});

self.addEventListener('fetch', function (event) {
	console.log("[ServiceWorker] Fetching", event.request.url);
	
	event.respondWith(
		//To respond with an entry from the cache if there is one, else fetch from the network.
      caches.match(e.request).then(function (response) {
			if (response) {
				return response;
			} else {
				return fetch(event.request);
			}
		})
	);

});