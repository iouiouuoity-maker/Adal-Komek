const burgerBtn = document.getElementById("burgerBtn");
const mobileMenu = document.getElementById("mobileMenu");

if (burgerBtn && mobileMenu) {
  burgerBtn.addEventListener("click", () => {
    mobileMenu.classList.toggle("open");
  });
}

// Анти-мошенничество
const analyzeBtn = document.getElementById("analyzeBtn");
const fraudInput = document.getElementById("fraudInput");
const fraudResult = document.getElementById("fraudResult");
const fraudStatusText = document.getElementById("fraudStatusText");

if (analyzeBtn && fraudInput && fraudResult && fraudStatusText) {
  analyzeBtn.addEventListener("click", () => {
    const text = fraudInput.value.toLowerCase().trim();

    if (!text) {
      fraudResult.classList.remove("hidden");
      fraudStatusText.innerHTML = "Пожалуйста, вставьте текст или ссылку для проверки.";
      return;
    }

    let score = 0;

    const riskyWords = [
      "срочно",
      "только на карту",
      "без документов",
      "очень срочно",
      "умоляю",
      "переводите",
      "личная карта",
      "нет времени"
    ];

    riskyWords.forEach(word => {
      if (text.includes(word)) score += 1;
    });

    if (text.includes("миллион") || text.includes("5000000") || text.includes("10000000")) {
      score += 1;
    }

    fraudResult.classList.remove("hidden");

    if (score >= 3) {
      fraudStatusText.innerHTML = "🔴 <strong>Риск мошенничества</strong><br>Обнаружены подозрительные формулировки, эмоциональное давление или непрозрачные способы перевода.";
      fraudResult.style.borderColor = "#ef4444";
      fraudResult.style.background = "#fef2f2";
    } else if (score === 1 || score === 2) {
      fraudStatusText.innerHTML = "🟡 <strong>Требует проверки</strong><br>Есть отдельные признаки риска. Рекомендуется запросить документы и проверить источник.";
      fraudResult.style.borderColor = "#f59e0b";
      fraudResult.style.background = "#fffbeb";
    } else {
      fraudStatusText.innerHTML = "🟢 <strong>Надёжный</strong><br>Явных признаков мошенничества не обнаружено, но всё равно важно проверить документы и реквизиты.";
      fraudResult.style.borderColor = "#22c55e";
      fraudResult.style.background = "#f0fdf4";
    }
  });
}

// Фильтр НПО
const filterButtons = document.querySelectorAll(".filter-btn");
const ngoCards = document.querySelectorAll(".ngo-card");

if (filterButtons.length && ngoCards.length) {
  filterButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      filterButtons.forEach(item => item.classList.remove("active"));
      btn.classList.add("active");

      const filter = btn.dataset.filter;

      ngoCards.forEach(card => {
        if (filter === "all" || card.dataset.category === filter) {
          card.style.display = "block";
        } else {
          card.style.display = "none";
        }
      });
    });
  });
}

// Чат для подростков
const teenInput = document.getElementById("teenInput");
const teenSendBtn = document.getElementById("teenSendBtn");
const chatBox = document.getElementById("chatBox");
const crisisBox = document.getElementById("crisisBox");

function addMessage(text, sender) {
  const div = document.createElement("div");
  div.className = `msg ${sender}`;
  div.textContent = text;
  chatBox.appendChild(div);
  chatBox.scrollTop = chatBox.scrollHeight;
}

function getAIResponse(message) {
  const msg = message.toLowerCase();

  const crisisWords = [
    "не хочу жить",
    "меня бьют",
    "я боюсь",
    "хочу умереть",
    "мне страшно",
    "суицид"
  ];

  if (crisisWords.some(word => msg.includes(word))) {
    if (crisisBox) crisisBox.classList.remove("hidden");
    return "Я очень серьёзно к этому отношусь. Пожалуйста, обратись за срочной помощью. Ты не один, и тебе могут помочь прямо сейчас.";
  }

  if (msg.includes("школ")) {
    return "Проблемы в школе могут сильно давить. Давай разберёмся: это конфликт, оценки или буллинг?";
  }

  if (msg.includes("семь") || msg.includes("родител")) {
    return "Проблемы в семье переживать очень тяжело. Ты уже сделал важный шаг, написав об этом. Я рядом.";
  }

  if (msg.includes("один") || msg.includes("одиночеств")) {
    return "Я тебя понимаю. Одиночество чувствуется очень тяжело, но ты не один. Давай попробуем вместе найти, с чего начать.";
  }

  if (msg.includes("тревог") || msg.includes("стресс")) {
    return "Похоже, тебе сейчас тяжело. Давай попробуем: сделай медленный вдох, выдох и напиши, что тревожит сильнее всего.";
  }

  return "Я тебя понимаю. Ты не один. Спасибо, что написал. Можешь рассказать чуть подробнее, что произошло?";
}

if (teenSendBtn && teenInput && chatBox) {
  teenSendBtn.addEventListener("click", () => {
    const value = teenInput.value.trim();
    if (!value) return;

    addMessage(value, "user");
    const reply = getAIResponse(value);

    setTimeout(() => {
      addMessage(reply, "ai");
    }, 500);

    teenInput.value = "";
  });
}
