/* ============================================================
   Service Worker — تطبيق مترو القاهرة
   الغرض: تخزين الصفحة والبيانات في ذاكرة المتصفح (Cache Storage)
   ليعمل التطبيق بالكامل تحت الأرض وبدون إنترنت.
   ============================================================
   عند نشر تحديث جديد للتطبيق: غيّر رقم النسخة CACHE_VERSION أدناه
   حتى يقوم المتصفح بتنزيل واستبدال الملفات القديمة المخزنة.
   ============================================================ */

const CACHE_VERSION = 'metro-cairo-v1';
const CORE_ASSETS = [
  './',
  './index.html',
  './manifest.json',
  './icon-192.png',
  './icon-512.png',
  './icon-512-maskable.png',
  './apple-touch-icon.png',
  './favicon-32.png'
];

// 1) التثبيت: تخزين الملفات الأساسية فور تثبيت الـ Service Worker
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_VERSION)
      .then((cache) => cache.addAll(CORE_ASSETS))
      .then(() => self.skipWaiting())
  );
});

// 2) التفعيل: حذف أي نسخ كاش قديمة من إصدارات سابقة من التطبيق
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys
          .filter((key) => key !== CACHE_VERSION)
          .map((key) => caches.delete(key))
      )
    ).then(() => self.clients.claim())
  );
});

// 3) الجلب: استراتيجية مناسبة لتطبيق يعمل تحت الأرض بدون شبكة
self.addEventListener('fetch', (event) => {
  const req = event.request;

  // نتعامل فقط مع طلبات GET
  if (req.method !== 'GET') return;

  const url = new URL(req.url);
  const isSameOrigin = url.origin === self.location.origin;

  // أ) طلبات التنقل بين الصفحات (فتح التطبيق): جرّب الشبكة أولاً،
  //    وإن فشلت (لا يوجد إنترنت) أعطِ النسخة المخزنة من index.html
  if (req.mode === 'navigate') {
    event.respondWith(
      fetch(req)
        .then((res) => {
          const copy = res.clone();
          caches.open(CACHE_VERSION).then((cache) => cache.put(req, copy));
          return res;
        })
        .catch(() => caches.match('./index.html'))
    );
    return;
  }

  // ب) ملفات التطبيق نفسه (نفس المصدر): كاش أولاً، ثم تحديث بالخلفية
  if (isSameOrigin) {
    event.respondWith(
      caches.match(req).then((cached) => {
        const network = fetch(req)
          .then((res) => {
            if (res && res.status === 200) {
              const copy = res.clone();
              caches.open(CACHE_VERSION).then((cache) => cache.put(req, copy));
            }
            return res;
          })
          .catch(() => cached);
        return cached || network;
      })
    );
    return;
  }

  // ج) موارد خارجية (مثل خطوط Google Fonts): كاش مع تحديث بالخلفية،
  //    وإن لم تتوفر ولا يوجد إنترنت، يستمر التطبيق بخط النظام الافتراضي
  event.respondWith(
    caches.match(req).then((cached) => {
      if (cached) return cached;
      return fetch(req)
        .then((res) => {
          if (res && res.status === 200) {
            const copy = res.clone();
            caches.open(CACHE_VERSION).then((cache) => cache.put(req, copy));
          }
          return res;
        })
        .catch(() => cached);
    })
  );
});
