const btns = document.querySelectorAll('.btn');
const sections = document.querySelectorAll('.section');

// 背景圖片設定
const bgImages = {
  home: 'url("image/bghome.png")',
  about: 'url("image/bgabout.png")',
  anime: 'url("image/bglist.png")',
  'oc-litt': 'url("image/bglit.png")',
  'oc-sako': 'url("image/bgsako.png")',
  friend: 'url("image/bgfriend.png")'
};

// 切換背景函式
function setBackground(section) {
  document.body.style.backgroundImage = bgImages[section] || 'none';
  document.body.style.backgroundSize = 'cover';      // 或 'contain' 視需求
  document.body.style.backgroundPosition = 'center';
  document.body.style.backgroundRepeat = 'no-repeat';
  document.body.style.transition = 'background 0.3s ease';
}

// 標籤按鈕切換事件
btns.forEach(btn => {
  btn.addEventListener('click', () => {
    const section = btn.getAttribute('data-target'); // ← 修正這行

    // 標籤 active 狀態切換
    btns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    // 顯示對應內容
    sections.forEach(s => {
      s.classList.remove('active');
      if (s.id === section) s.classList.add('active');
    });

    // 更換背景
    setBackground(section);

    // 回頂部
    window.scrollTo({ top: 0, behavior: 'smooth' });

    // 等切換完成再重新調整卡片位置
    setTimeout(adjustCardPosition, 400);
  });
});

// 初始背景
setBackground('home');

// 根據內容自動調整卡片垂直間距
function adjustCardPosition() {
  const card = document.querySelector('.card');
  const cardHeight = card.offsetHeight;
  const windowHeight = window.innerHeight;

  if (cardHeight < windowHeight * 0.9) {
    // 若卡片比視窗矮 → 垂直置中
    card.style.margin = `${(windowHeight - cardHeight) / 2}px auto`;
  } else {
    // 若內容多 → 上方留 2rem 間距
    card.style.margin = `2rem auto`;
  }
}

// 載入與視窗變動時都偵測
window.addEventListener('load', adjustCardPosition);
window.addEventListener('resize', adjustCardPosition);
