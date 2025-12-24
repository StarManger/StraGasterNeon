// Элементы DOM
const daysElement = document.getElementById('days');
const hoursElement = document.getElementById('hours');
const minutesElement = document.getElementById('minutes');
const secondsElement = document.getElementById('seconds');
const progressFill = document.getElementById('progressFill');
const progressPercent = document.getElementById('progressPercent');
const consoleOutput = document.getElementById('consoleOutput');
const launchButton = document.getElementById('launchButton');
const statusText = document.getElementById('statusText');
const gameLogo = document.getElementById('gameLogo');

// Целевая дата - 29 февраля 2026, 00:00:00
const targetDate = new Date('February 29, 2026 00:00:00').getTime();

// Загрузка логотипа с обработкой ошибок
function loadLogo() {
    if (gameLogo) {
        gameLogo.onerror = function() {
            // Создаем текстовый логотип если изображение не загрузилось
            const logoContainer = document.querySelector('.game-logo-container');
            logoContainer.innerHTML = `
                <div class="text-logo">
                    <div class="text-logo-title">THE ADVENTURE</div>
                    <div class="text-logo-subtitle">STAR TIME</div>
                    <div class="text-logo-company">STARCOMPANY</div>
                </div>
            `;
        };
        
        // Проверяем, загрузилось ли изображение
        gameLogo.onload = function() {
            console.log("Логотип игры успешно загружен");
        };
    }
}

// Добавление сообщения в консоль
function addConsoleMessage(message) {
    if (!consoleOutput) return;
    
    const consoleLine = document.createElement('div');
    consoleLine.className = 'console-line';
    consoleLine.textContent = `> ${message}`;
    consoleOutput.appendChild(consoleLine);
    
    // Прокрутка вниз
    consoleOutput.scrollTop = consoleOutput.scrollHeight;
    
    // Ограничение количества сообщений
    if (consoleOutput.children.length > 20) {
        consoleOutput.removeChild(consoleOutput.firstChild);
    }
}

// Симуляция работы лаунчера
function simulateLauncherActivity() {
    const activities = [
        "CHECKING INTEGRITY OF GAME FILES...",
        "VERIFYING SYSTEM COMPATIBILITY...",
        "DOWNLOADING LATEST PATCHES...",
        "OPTIMIZING SETTINGS FOR YOUR SYSTEM...",
        "INITIALIZING GRAPHICS SUBSYSTEM...",
        "LOADING GAME ASSETS...",
        "CONNECTING TO MULTIPLAYER SERVICES...",
        "LAUNCHER READY FOR BETA RELEASE"
    ];
    
    let index = 0;
    const activityInterval = setInterval(() => {
        if (index < activities.length) {
            addConsoleMessage(activities[index]);
            
            // Обновление статуса каждые 2 сообщения
            if (index % 2 === 0 && statusText) {
                statusText.textContent = activities[index].replace('...', '');
            }
            
            // Обновление прогресс-бара
            if (progressFill && progressPercent) {
                const progress = Math.min(95, ((index + 1) / activities.length) * 100);
                progressFill.style.width = `${progress}%`;
                progressPercent.textContent = `${Math.round(progress)}%`;
            }
            
            index++;
        } else {
            clearInterval(activityInterval);
        }
    }, 1500);
}

// Обновление таймера
function updateTimer() {
    const now = new Date().getTime();
    const timeLeft = targetDate - now;
    
    // Если время вышло
    if (timeLeft <= 0) {
        if (daysElement) daysElement.textContent = '00';
        if (hoursElement) hoursElement.textContent = '00';
        if (minutesElement) minutesElement.textContent = '00';
        if (secondsElement) secondsElement.textContent = '00';
        
        // Показываем кнопку запуска
        if (launchButton) {
            launchButton.style.display = 'inline-block';
            launchButton.addEventListener('click', launchGame);
        }
        
        if (statusText) statusText.textContent = 'BETA AVAILABLE - READY TO LAUNCH';
        if (progressFill) progressFill.style.width = '100%';
        if (progressPercent) progressPercent.textContent = '100%';
        
        addConsoleMessage("BETA VERSION IS NOW AVAILABLE!");
        addConsoleMessage("CLICK 'LAUNCH BETA VERSION' TO PLAY!");
        
        return;
    }
    
    // Расчет времени
    const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);
    
    // Обновление отображения
    if (daysElement) daysElement.textContent = days.toString().padStart(2, '0');
    if (hoursElement) hoursElement.textContent = hours.toString().padStart(2, '0');
    if (minutesElement) minutesElement.textContent = minutes.toString().padStart(2, '0');
    if (secondsElement) secondsElement.textContent = seconds.toString().padStart(2, '0');
    
    // Анимация секунд
    if (secondsElement) {
        secondsElement.style.transform = 'scale(1.1)';
        setTimeout(() => {
            secondsElement.style.transform = 'scale(1)';
        }, 200);
    }
    
    // Обновление прогресс-бара (основано на общем времени до даты)
    if (progressFill && progressPercent) {
        const totalTime = 1000 * 60 * 60 * 24 * 365 * 2; // Примерно 2 года до таргета
        const timePassed = totalTime - timeLeft;
        const progress = Math.min(95, (timePassed / totalTime) * 100);
        progressFill.style.width = `${progress}%`;
        progressPercent.textContent = `${Math.round(progress)}%`;
    }
}

// Запуск игры
function launchGame() {
    addConsoleMessage("LAUNCHING THE ADVENTURE STAR TIME BETA...");
    addConsoleMessage("REDIRECTING TO GAMEJOLT...");
    
    if (statusText) {
        statusText.textContent = "LAUNCHING GAME...";
    }
    
    // Эффект загрузки перед перенаправлением
    setTimeout(() => {
        window.open('https://gamejolt.com/games/stargaster1/1022697', '_blank');
        addConsoleMessage("GAME LAUNCHED SUCCESSFULLY!");
        addConsoleMessage("ENJOY THE ADVENTURE STAR TIME BETA!");
    }, 1500);
}

// Анимация для кнопок управления окном
function setupWindowControls() {
    const windowButtons = document.querySelectorAll('.window-button');
    
    windowButtons.forEach((button, index) => {
        button.addEventListener('click', function() {
            // Анимация нажатия
            this.style.transform = 'translateY(1px)';
            setTimeout(() => {
                this.style.transform = 'translateY(0)';
            }, 100);
            
            // Действия для разных кнопок (симуляция)
            if (index === 0) {
                addConsoleMessage("Launcher minimized to system tray.");
            } else if (index === 1) {
                addConsoleMessage("Launcher maximized.");
            } else if (index === 2) {
                addConsoleMessage("Closing launcher...");
                // В реальном приложении здесь было бы window.close()
                setTimeout(() => {
                    addConsoleMessage("Launcher closed.");
                }, 500);
            }
        });
    });
}

// Анимация заголовка окна
function setupWindowTitleAnimation() {
    const windowTitle = document.querySelector('.window-title span');
    
    if (windowTitle) {
        setInterval(() => {
            windowTitle.style.textShadow = windowTitle.style.textShadow 
                ? '' 
                : '0 0 5px #00FFFF';
        }, 1000);
    }
}

// Инициализация при загрузке страницы
document.addEventListener('DOMContentLoaded', function() {
    console.log("The Adventure Star Time Launcher initialized");
    
    // Загружаем логотип
    loadLogo();
    
    // Обновляем таймер сразу
    updateTimer();
    
    // Запускаем симуляцию активности лаунчера
    setTimeout(simulateLauncherActivity, 1000);
    
    // Обновление таймера каждую секунду
    setInterval(updateTimer, 1000);
    
    // Проверяем, не истек ли уже таймер
    const now = new Date().getTime();
    if (now >= targetDate) {
        if (launchButton) {
            launchButton.style.display = 'inline-block';
            launchButton.addEventListener('click', launchGame);
        }
        if (progressFill) progressFill.style.width = '100%';
        if (progressPercent) progressPercent.textContent = '100%';
        if (statusText) statusText.textContent = 'BETA AVAILABLE - READY TO LAUNCH';
    }
    
    // Эффект печатания для начальных сообщений
    const initialMessages = document.querySelectorAll('.console-line');
    initialMessages.forEach((msg, index) => {
        msg.style.animation = `typewriter ${0.5 + index * 0.2}s steps(40, end)`;
    });
    
    // Настройка элементов управления окном
    setupWindowControls();
    
    // Настройка анимации заголовка
    setupWindowTitleAnimation();
    
    // Добавляем обработчики для кнопок окна
    const windowButtons = document.querySelectorAll('.window-button');
    windowButtons.forEach(button => {
        button.addEventListener('mousedown', function() {
            this.style.borderTopColor = '#666666';
            this.style.borderLeftColor = '#666666';
            this.style.borderRightColor = '#FFFFFF';
            this.style.borderBottomColor = '#FFFFFF';
        });
        
        button.addEventListener('mouseup', function() {
            this.style.borderTopColor = '#FFFFFF';
            this.style.borderLeftColor = '#FFFFFF';
            this.style.borderRightColor = '#666666';
            this.style.borderBottomColor = '#666666';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.borderTopColor = '#FFFFFF';
            this.style.borderLeftColor = '#FFFFFF';
            this.style.borderRightColor = '#666666';
            this.style.borderBottomColor = '#666666';
        });
    });
});

// Обработка нажатия клавиш (дополнительная функциональность)
document.addEventListener('keydown', function(event) {
    // Ctrl+L для очистки консоли
    if (event.ctrlKey && event.key === 'l') {
        event.preventDefault();
        if (consoleOutput) {
            consoleOutput.innerHTML = '';
            addConsoleMessage("Console cleared.");
        }
    }
    
    // F5 для обновления лаунчера (симуляция)
    if (event.key === 'F5') {
        event.preventDefault();
        addConsoleMessage("Refreshing launcher...");
        setTimeout(() => {
            addConsoleMessage("Launcher refreshed successfully.");
        }, 1000);
    }
});