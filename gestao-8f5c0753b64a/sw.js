/* App do painel da Caya: recebe as notificacoes de venda, sacola e desistencia (Web Push)
   e abre o painel ao tocar. Sem cache: o painel sempre mostra dados atuais. */
self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', (e) => e.waitUntil(self.clients.claim()));

self.addEventListener('push', (e) => {
  let d = {};
  try { d = e.data ? e.data.json() : {}; } catch (_) { d = { title: 'Caya', body: e.data ? e.data.text() : '' }; }
  e.waitUntil(Promise.all([
    self.registration.showNotification(d.title || 'Caya', {
      body: d.body || '', tag: d.tag || 'caya', renotify: true, requireInteraction: !!d.venda,
      icon: 'icone-192.png', badge: 'selo-96.png', data: { venda: !!d.venda, aba: d.aba || '' },
    }),
    /* app aberto: atualiza os numeros na hora */
    self.clients.matchAll({ type: 'window' }).then((cs) => cs.forEach((c) => c.postMessage({ tipo: 'push', venda: !!d.venda }))),
  ]));
});

self.addEventListener('notificationclick', (e) => {
  e.notification.close();
  const aba = (e.notification.data && e.notification.data.aba) || '';
  e.waitUntil(self.clients.matchAll({ type: 'window', includeUncontrolled: true }).then((cs) => {
    const aberto = cs.find((c) => c.url.startsWith(self.registration.scope));
    if (aberto) return (aba && aberto.navigate ? aberto.navigate(self.registration.scope + '#' + aba) : Promise.resolve(aberto)).then((c) => (c || aberto).focus());
    return self.clients.openWindow(self.registration.scope + (aba ? '#' + aba : ''));
  }));
});
