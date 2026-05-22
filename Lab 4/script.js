document.addEventListener("DOMContentLoaded", () => {
    
    // 1. ІНФОРМАЦІЯ ПРО СИСТЕМУ (localStorage)
    const browserInfoElement = document.getElementById('browser-info');
    if (browserInfoElement) {
        // Отримуємо назву браузера та платформу
        const platform = navigator.platform;
        const browser = navigator.userAgent.includes("Chrome") ? "Chrome" : "Браузер";
        const info = `Ваша система: ${platform} | Браузер: ${browser}`;
        
        // Зберігаємо в локальне сховище та виводимо на екран
        localStorage.setItem('userSystem', info);
        browserInfoElement.innerText = localStorage.getItem('userSystem');
    }

    // 2. ДИНАМІЧНЕ ЗАВАНТАЖЕННЯ ВІДГУКІВ (API)
    const myVariant = 1; // Ваш варіант
    const commentsUrl = `https://jsonplaceholder.typicode.com/posts/${myVariant}/comments`;

    fetch(commentsUrl)
        .then(response => response.json())
        .then(data => {
            const container = document.getElementById('comments-container');
            if (container) {
                // Беремо перші 3 коментарі та стилізуємо їх
                container.innerHTML = data.slice(0, 3).map(c => `
                    <div style="margin-bottom: 15px; border-left: 3px solid var(--accent-color); padding-left: 10px;">
                        <strong style="color: var(--title-color);">${c.name}</strong> 
                        <br><small style="color: var(--link-color);">${c.email}</small>
                        <p style="font-size: 13px; margin-top: 5px;">${c.body}</p>
                    </div>
                `).join('');
            }
        })
        .catch(err => console.error("Помилка при завантаженні API:", err));

    // 3. МОДАЛЬНЕ ВІКНО (Поява через 1 хвилину)
    const modal = document.getElementById("contactModal");
    const closeBtn = document.querySelector(".close-modal");

    if (modal) {
        // Таймер на 60 секунд (60000 мс)
        setTimeout(() => {
            modal.style.display = "block";
        }, 60000); 

        // Закриття на хрестик
        if (closeBtn) {
            closeBtn.onclick = () => {
                modal.style.display = "none";
            };
        }

        // Закриття при кліку поза межами вікна
        window.onclick = (event) => {
            if (event.target === modal) {
                modal.style.display = "none";
            }
        };
    }

    // 4. КЕРУВАННЯ ТЕМАМИ (День/Ніч)
    const themeBtn = document.getElementById("theme-toggle");
    
    function applyAutoTheme() {
        const hour = new Date().getHours();
        // Денна тема від 07:00 до 21:00
        if (hour >= 7 && hour < 21) {
            document.body.classList.add("light-theme");
        } else {
            document.body.classList.remove("light-theme");
        }
    }

    // Ручне перемикання кнопкою
    if (themeBtn) {
        themeBtn.addEventListener("click", () => {
            document.body.classList.toggle("light-theme");
        });
    }

    // Запускаємо автоматичну перевірку часу при завантаженні
    applyAutoTheme();
});