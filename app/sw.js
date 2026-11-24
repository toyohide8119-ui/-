// アプリの画面を端末に保存して、電波が弱くても開けるようにします。
// 在庫データ自体は Firebase が端末に保存・同期します。
const CACHE = "zaiko-v12";
const SHELL = ["./", "index.html", "firebase-config.js", "manifest.webmanifest", "icon.svg", "icon-192.png"];

self.addEventListener("install", (e) => {
  e.waitUntil(caches.open(CACHE).then((c) => c.addAll(SHELL)).then(() => self.skipWaiting()));
});
self.addEventListener("activate", (e) => {
  e.waitUntil(
    caches.keys().then((keys) => Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});
// 自分のサイトのファイルは「まずネット、だめなら保存済み」で返す（更新がすぐ届くように）
self.addEventListener("fetch", (e) => {
  const url = new URL(e.request.url);
  if (e.request.method !== "GET" || url.origin !== location.origin) return;
  e.respondWith(
    fetch(e.request)
      .then((res) => {
        const copy = res.clone();
        caches.open(CACHE).then((c) => c.put(e.request, copy));
        return res;
      })
      .catch(() => caches.match(e.request).then((r) => r || caches.match("./")))
  );
});
