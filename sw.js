self.addEventListener("install", e => {
    e.waitUntil(
        caches.open("static").then(cache => {
            return cache.addAll(["./", "./assets/logo192.png", "./assets/logo512.png", "./index.html","./main.js", "./index.js", "./manifest.json", "./sw.js", "./libs/three.js-r132/examples/jsm/loaders/GLTFLoader.js", "./assets/models/antelope/scene.glb", "./libs/mindar/mindar-image-three.prod.js"]);
        })
    );
});


self.addEventListener("fetch", e => {
    e.respondWith(
        caches.match(e.request).then(response => {
            return response || fetch(e.request);
        })
    );
});