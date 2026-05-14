
  // Service Worker
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('./sw.js').catch(() => {});
    });
  }

  // Banner de instalação PWA
  let deferredInstallPrompt = null;
  const pwaBanner = document.getElementById('pwa-banner');

  window.addEventListener('beforeinstallprompt', e => {
    e.preventDefault();
    deferredInstallPrompt = e;
    if (pwaBanner && !sessionStorage.getItem('pwa-banner-fechado')) {
      setTimeout(() => { pwaBanner.style.display = 'flex'; }, 3000);
    }
    // Mostrar botão na nav
    const btnNav = document.getElementById('btn-instalar-app');
    if (btnNav) btnNav.style.display = 'inline-flex';
  });

  function instalarPWA() {
    if (!deferredInstallPrompt) {
      // iOS: mostrar instruções
      alert('Para instalar no iPhone/iPad:\n\n1. Toque no botão de Compartilhar (quadrado com seta)\n2. Role para baixo e toque em "Adicionar à Tela de Início"\n3. Confirme tocando em "Adicionar"');
      return;
    }
    deferredInstallPrompt.prompt();
    deferredInstallPrompt.userChoice.then(() => {
      deferredInstallPrompt = null;
      fecharBannerPWA();
    });
  }

  function fecharBannerPWA() {
    if (pwaBanner) pwaBanner.style.display = 'none';
    sessionStorage.setItem('pwa-banner-fechado', '1');
  }


  window.addEventListener('DOMContentLoaded', () => {
    const btnNav = document.getElementById('btn-instalar-app');
    if (btnNav) btnNav.style.display = 'inline-flex';
  });

  window.addEventListener('appinstalled', () => {
    fecharBannerPWA();
    deferredInstallPrompt = null;
    const btnNav = document.getElementById('btn-instalar-app');
    if (btnNav) btnNav.style.display = 'none';
  });
