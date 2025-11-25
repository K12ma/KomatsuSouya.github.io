// ===============================
// 1. 年の自動更新
// ===============================
const yearSpan = document.getElementById("year");
if (yearSpan) {
  yearSpan.textContent = new Date().getFullYear();
}

// ===============================
// 2. スクロール時のフェードイン（.reveal）
//    → セクションタイトルやテキストなど
// ===============================
const revealElements = document.querySelectorAll(".reveal");

if ("IntersectionObserver" in window) {
  const revealObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      });
    },
    { threshold: 0.15 }
  );

  revealElements.forEach((el) => revealObserver.observe(el));
} else {
  // 古いブラウザ用フォールバック
  revealElements.forEach((el) => el.classList.add("visible"));
}

// ===============================
// 3. カード用アニメーション
//    → スクロールしたときに「下からヒョイッ」と出てくる
// ===============================

// 対象にしたいカードのセレクタ
const cardSelectors = [
  ".project-card",
  ".gallery-card",
  ".pillar-card",
  ".contact-card",
  ".mini-card"
];

const cardElements = document.querySelectorAll(cardSelectors.join(","));

// まず全カードに「初期状態のクラス」を付与しておく
cardElements.forEach((card) => {
  card.classList.add("card-pop"); // CSS でオフスクリーン状態にしておく
});

// IntersectionObserver で画面内に入ったら「表示状態」に
if ("IntersectionObserver" in window) {
  const cardObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;

        entry.target.classList.add("card-pop-visible");
        observer.unobserve(entry.target);
      });
    },
    { threshold: 0.2 }
  );

  cardElements.forEach((card) => cardObserver.observe(card));
} else {
  // フォールバック：全部表示
  cardElements.forEach((card) => card.classList.add("card-pop-visible"));
}

// ===============================
// 4. スムーススクロール（ナビのアンカー）
// ===============================
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", (e) => {
    const targetId = anchor.getAttribute("href");
    if (!targetId || targetId === "#") return;

    const target = document.querySelector(targetId);
    if (!target) return;

    e.preventDefault();
    const rect = target.getBoundingClientRect();
    const offset = window.pageYOffset + rect.top - 70; // ヘッダー分

    window.scrollTo({
      top: offset,
      behavior: "smooth",
    });
  });
});

// ===============================
// 5. モバイルナビの開閉
// ===============================
const navToggle = document.querySelector(".nav-toggle");
const nav = document.querySelector(".nav");

if (navToggle && nav) {
  navToggle.addEventListener("click", () => {
    nav.classList.toggle("open");
  });

  nav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      nav.classList.remove("open");
    });
  });
}

// ===============================
// 6. Hero 画像のチルト（マウスで少し傾く）
// ===============================
const heroTilt = document.getElementById("hero-tilt");

if (heroTilt) {
  heroTilt.addEventListener("mousemove", (e) => {
    const bounds = heroTilt.getBoundingClientRect();
    const x = e.clientX - bounds.left;
    const y = e.clientY - bounds.top;

    const rotateX = ((y / bounds.height) - 0.5) * -8; // 上下
    const rotateY = ((x / bounds.width) - 0.5) * 8;   // 左右

    heroTilt.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
  });

  heroTilt.addEventListener("mouseleave", () => {
    heroTilt.style.transform = "rotateX(0deg) rotateY(0deg)";
  });
}
