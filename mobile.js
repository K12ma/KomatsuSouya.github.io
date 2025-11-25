// 年の自動更新
const yearSpan = document.getElementById("year");
if (yearSpan) {
  yearSpan.textContent = new Date().getFullYear();
}

// スクロールフェードイン（.fade-in）
const fadeTargets = document.querySelectorAll(".fade-in");

if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("visible");
        obs.unobserve(entry.target);
      });
    },
    { threshold: 0.2 }
  );

  fadeTargets.forEach((el) => observer.observe(el));
} else {
  fadeTargets.forEach((el) => el.classList.add("visible"));
}
