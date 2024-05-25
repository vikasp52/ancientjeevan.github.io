'use strict';
const MANIFEST = 'flutter-app-manifest';
const TEMP = 'flutter-temp-cache';
const CACHE_NAME = 'flutter-app-cache';

const RESOURCES = {"version.json": "4be6115248c6faa66f7939092c190e52",
"index.html": "343f7f1e273f38f5a0581b354ea0e7f9",
"/": "343f7f1e273f38f5a0581b354ea0e7f9",
"main.dart.js": "90667fce11612c319ebcd3e7e437c799",
"flutter.js": "c71a09214cb6f5f8996a531350400a9a",
"favicon.png": "2c46e439e07faf754e9da8b6c0f1eeaf",
"icons/Icon-192.png": "2401de7ac59c234dc5446358730d01e1",
"icons/Icon-maskable-192.png": "2401de7ac59c234dc5446358730d01e1",
"icons/Icon-maskable-512.png": "4c724005c83f1e8b9f31baff39fbeda5",
"icons/Icon-512.png": "4c724005c83f1e8b9f31baff39fbeda5",
"manifest.json": "0d4115f7f5091c54a3b67e83fc23b916",
"assets/AssetManifest.json": "7909e630109dd2fe4f5270038cf79827",
"assets/NOTICES": "d0b86f7edddfb76ee824bce0820cf315",
"assets/FontManifest.json": "2d9a3670bc2a883981e6c4bfbc89c15f",
"assets/AssetManifest.bin.json": "e04dce8b023d912eb5b72e990563e4a6",
"assets/packages/cupertino_icons/assets/CupertinoIcons.ttf": "e986ebe42ef785b27164c36a9abc7818",
"assets/shaders/ink_sparkle.frag": "ecc85a2e95f5e9f53123dcaf8cb9b6ce",
"assets/AssetManifest.bin": "cda84beadf3588f866e3509d25c176a3",
"assets/fonts/MaterialIcons-Regular.otf": "0a184fd53616f08b5c41e79d40513959",
"assets/assets/images/banner.jpeg": "bd92152a4578bc65852e1146d573570b",
"assets/assets/images/why_choose1.jpeg": "2691e049f50d47699dccf0989f434dbb",
"assets/assets/images/health_benefits.png": "f7f1f58d880b1285ca022f28f4c40628",
"assets/assets/images/banner.png": "8a2ee5734287fab4bef891f20da52000",
"assets/assets/images/icon_logo.png": "46afe98620d5f722a4ff014fc242465a",
"assets/assets/images/ancient_jeevan_logo.png": "7c5fd258da4033f730ec6fa2f15faa9f",
"assets/assets/images/benefits_of_jaggery.jpg": "af451d0ffc90a71bd11bfb1fc00243a0",
"assets/assets/images/how_to_use_mobile.png": "6adcaf8fd1fcb5d47faafa628ba62b08",
"assets/assets/images/health_benefits_mobile.png": "24d6caf639a0e4e670e6f8b6018a0ee9",
"assets/assets/images/frequently_questions.jpg": "c08f94bde49acf2b5307fd6a3c7dbe4c",
"assets/assets/images/product2.png": "64191620b8844c5475f6ae5b8cd1c5a7",
"assets/assets/images/product3.png": "75b574172eb1249659e31563660b889a",
"assets/assets/images/product1.png": "977d168513e3c578774ec6596559540d",
"assets/assets/images/why_choose3.jpeg": "32e3644da58e20c439a1562e0580f856",
"assets/assets/images/why_choose2.jpeg": "072b8c72afb061587f24b8c6ca4acdd5",
"assets/assets/images/how_to_use.png": "0e85bfeebfb19e363cc5097164a0a084",
"assets/assets/images/how_to_use.jpg": "e5969317e39b88eca18688c591508f4c",
"assets/assets/icons/Instagram_icon.png": "adcdbcb1ddaa8852457305ac4083e9e9",
"assets/assets/icons/youtube_icon.png": "ca52040004058032766383ad85952220",
"assets/assets/icons/linkedin.png": "d112bcc365a601f65aed660ce17aa50c",
"assets/assets/icons/whatsapp.png": "921c71b3a19c98c9a9401afe67cf02ea",
"assets/assets/fonts/Unbounded-Variable.ttf": "f5a1b6e5ab9693e01c24de022f3ce09c",
"assets/assets/fonts/Cabin-Variable.ttf": "15513d73a6ba7f5bd7d337372608025b",
"canvaskit/skwasm.js": "445e9e400085faead4493be2224d95aa",
"canvaskit/skwasm.js.symbols": "741d50ffba71f89345996b0aa8426af8",
"canvaskit/canvaskit.js.symbols": "38cba9233b92472a36ff011dc21c2c9f",
"canvaskit/skwasm.wasm": "e42815763c5d05bba43f9d0337fa7d84",
"canvaskit/chromium/canvaskit.js.symbols": "4525682ef039faeb11f24f37436dca06",
"canvaskit/chromium/canvaskit.js": "43787ac5098c648979c27c13c6f804c3",
"canvaskit/chromium/canvaskit.wasm": "f5934e694f12929ed56a671617acd254",
"canvaskit/canvaskit.js": "c86fbd9e7b17accae76e5ad116583dc4",
"canvaskit/canvaskit.wasm": "3d2a2d663e8c5111ac61a46367f751ac",
"canvaskit/skwasm.worker.js": "bfb704a6c714a75da9ef320991e88b03"};
// The application shell files that are downloaded before a service worker can
// start.
const CORE = ["main.dart.js",
"index.html",
"assets/AssetManifest.bin.json",
"assets/FontManifest.json"];

// During install, the TEMP cache is populated with the application shell files.
self.addEventListener("install", (event) => {
  self.skipWaiting();
  return event.waitUntil(
    caches.open(TEMP).then((cache) => {
      return cache.addAll(
        CORE.map((value) => new Request(value, {'cache': 'reload'})));
    })
  );
});
// During activate, the cache is populated with the temp files downloaded in
// install. If this service worker is upgrading from one with a saved
// MANIFEST, then use this to retain unchanged resource files.
self.addEventListener("activate", function(event) {
  return event.waitUntil(async function() {
    try {
      var contentCache = await caches.open(CACHE_NAME);
      var tempCache = await caches.open(TEMP);
      var manifestCache = await caches.open(MANIFEST);
      var manifest = await manifestCache.match('manifest');
      // When there is no prior manifest, clear the entire cache.
      if (!manifest) {
        await caches.delete(CACHE_NAME);
        contentCache = await caches.open(CACHE_NAME);
        for (var request of await tempCache.keys()) {
          var response = await tempCache.match(request);
          await contentCache.put(request, response);
        }
        await caches.delete(TEMP);
        // Save the manifest to make future upgrades efficient.
        await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
        // Claim client to enable caching on first launch
        self.clients.claim();
        return;
      }
      var oldManifest = await manifest.json();
      var origin = self.location.origin;
      for (var request of await contentCache.keys()) {
        var key = request.url.substring(origin.length + 1);
        if (key == "") {
          key = "/";
        }
        // If a resource from the old manifest is not in the new cache, or if
        // the MD5 sum has changed, delete it. Otherwise the resource is left
        // in the cache and can be reused by the new service worker.
        if (!RESOURCES[key] || RESOURCES[key] != oldManifest[key]) {
          await contentCache.delete(request);
        }
      }
      // Populate the cache with the app shell TEMP files, potentially overwriting
      // cache files preserved above.
      for (var request of await tempCache.keys()) {
        var response = await tempCache.match(request);
        await contentCache.put(request, response);
      }
      await caches.delete(TEMP);
      // Save the manifest to make future upgrades efficient.
      await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
      // Claim client to enable caching on first launch
      self.clients.claim();
      return;
    } catch (err) {
      // On an unhandled exception the state of the cache cannot be guaranteed.
      console.error('Failed to upgrade service worker: ' + err);
      await caches.delete(CACHE_NAME);
      await caches.delete(TEMP);
      await caches.delete(MANIFEST);
    }
  }());
});
// The fetch handler redirects requests for RESOURCE files to the service
// worker cache.
self.addEventListener("fetch", (event) => {
  if (event.request.method !== 'GET') {
    return;
  }
  var origin = self.location.origin;
  var key = event.request.url.substring(origin.length + 1);
  // Redirect URLs to the index.html
  if (key.indexOf('?v=') != -1) {
    key = key.split('?v=')[0];
  }
  if (event.request.url == origin || event.request.url.startsWith(origin + '/#') || key == '') {
    key = '/';
  }
  // If the URL is not the RESOURCE list then return to signal that the
  // browser should take over.
  if (!RESOURCES[key]) {
    return;
  }
  // If the URL is the index.html, perform an online-first request.
  if (key == '/') {
    return onlineFirst(event);
  }
  event.respondWith(caches.open(CACHE_NAME)
    .then((cache) =>  {
      return cache.match(event.request).then((response) => {
        // Either respond with the cached resource, or perform a fetch and
        // lazily populate the cache only if the resource was successfully fetched.
        return response || fetch(event.request).then((response) => {
          if (response && Boolean(response.ok)) {
            cache.put(event.request, response.clone());
          }
          return response;
        });
      })
    })
  );
});
self.addEventListener('message', (event) => {
  // SkipWaiting can be used to immediately activate a waiting service worker.
  // This will also require a page refresh triggered by the main worker.
  if (event.data === 'skipWaiting') {
    self.skipWaiting();
    return;
  }
  if (event.data === 'downloadOffline') {
    downloadOffline();
    return;
  }
});
// Download offline will check the RESOURCES for all files not in the cache
// and populate them.
async function downloadOffline() {
  var resources = [];
  var contentCache = await caches.open(CACHE_NAME);
  var currentContent = {};
  for (var request of await contentCache.keys()) {
    var key = request.url.substring(origin.length + 1);
    if (key == "") {
      key = "/";
    }
    currentContent[key] = true;
  }
  for (var resourceKey of Object.keys(RESOURCES)) {
    if (!currentContent[resourceKey]) {
      resources.push(resourceKey);
    }
  }
  return contentCache.addAll(resources);
}
// Attempt to download the resource online before falling back to
// the offline cache.
function onlineFirst(event) {
  return event.respondWith(
    fetch(event.request).then((response) => {
      return caches.open(CACHE_NAME).then((cache) => {
        cache.put(event.request, response.clone());
        return response;
      });
    }).catch((error) => {
      return caches.open(CACHE_NAME).then((cache) => {
        return cache.match(event.request).then((response) => {
          if (response != null) {
            return response;
          }
          throw error;
        });
      });
    })
  );
}
