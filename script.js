// Оптимизированная версия скрипта
document.addEventListener('DOMContentLoaded', () => {
    // Кэшируем селекторы
    const scrollTop = document.querySelector('.scroll-top');
    const loader = document.querySelector('.loader');
    const stats = document.querySelectorAll('.stat-number');
    
    // Оптимизированная прокрутка
    let scrollTimeout;
    window.addEventListener('scroll', () => {
        if (scrollTimeout) {
            window.cancelAnimationFrame(scrollTimeout);
        }
        
        scrollTimeout = window.requestAnimationFrame(() => {
            if (window.pageYOffset > 100) {
                scrollTop.classList.add('visible');
            } else {
                scrollTop.classList.remove('visible');
            }
        });
    }, { passive: true });

    // Оптимизированная анимация статистики
    const animateStats = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const stat = entry.target;
                const target = parseInt(stat.dataset.target);
                const duration = 2000; // 2 секунды
                const start = parseInt(stat.innerText);
                const increment = (target - start) / (duration / 16);
                
                let current = start;
                const updateStat = () => {
                    current += increment;
                    if (current < target) {
                        stat.innerText = Math.floor(current);
                        requestAnimationFrame(updateStat);
                    } else {
                        stat.innerText = target;
                    }
                };
                
                requestAnimationFrame(updateStat);
                observer.unobserve(stat);
            }
        });
    };

    // Оптимизированный Observer
    const observer = new IntersectionObserver(animateStats, {
        threshold: 0.5,
        rootMargin: '0px'
    });

    stats.forEach(stat => observer.observe(stat));

    // Оптимизированная загрузка
    window.addEventListener('load', () => {
        requestAnimationFrame(() => {
            loader.style.opacity = '0';
            setTimeout(() => {
                loader.style.display = 'none';
            }, 500);
        });
    });

    // Добавление активного класса к текущей странице
    const currentPage = window.location.pathname.split('/').pop();
    const navLinks = document.querySelectorAll('.nav-list li a');
    
    navLinks.forEach(link => {
        if (link.getAttribute('href') === currentPage) {
            link.classList.add('active');
        }
    });

    const container = document.getElementById('meal-container');
    const firstDay = document.querySelector('.day-tab').dataset.day;
    
    // Показываем меню для первого дня при загрузке
    if (container && mealPlans[firstDay]) {
        updateMealPlan(container, mealPlans[firstDay]);
    }

    // Обработчики для табов дней недели
    document.querySelectorAll('.day-tab').forEach(tab => {
        tab.addEventListener('click', () => {
            const day = tab.dataset.day;
            document.querySelectorAll('.day-tab').forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            
            if (container && mealPlans[day]) {
                updateMealPlan(container, mealPlans[day]);
            }
        });
    });
});

function calculateCalories() {
    const weight = document.getElementById('weight').value;
    const height = document.getElementById('height').value;
    const age = document.getElementById('age').value;
    const activity = document.getElementById('activity').value;
    
    if (!weight || !height || !age) {
        alert('Будь ласка, заповніть всі поля!');
        return;
    }
    
    // Формула Харріса-Бенедикта
    const bmr = 447.593 + (9.247 * weight) + (3.098 * height) - (4.330 * age);
    const calories = Math.round(bmr * activity);
    
    const result = document.getElementById('result');
    result.textContent = `Ваша денна норма калорій: ${calories} ккал`;
    result.classList.add('show');
    
    // Анімація результату
    result.style.animation = 'none';
    result.offsetHeight; // Перезапуск анімації
    result.style.animation = 'fadeInUp 0.5s ease-out';
}

// Добавить в конец существующего файла

function showRecipe(id) {
    // Здесь можно добавить модальное окно с полным рецептом
    const recipes = {
        1: {
            title: "Салат з кіноа та овочами",
            ingredients: [
                "1 стакан кіноа",
                "2 огірки",
                "1 перець",
                "помідори черрі",
                "оливкова олія"
            ],
            instructions: "1. Відваріть кіноа...\n2. Наріжте овочі...\n3. Змішайте все..."
        },
        2: {
            title: "Зелений смузі",
            ingredients: [
                "Шпинат",
                "Банан",
                "Яблуко",
                "Вода"
            ],
            instructions: "1. Помийте інгредієнти...\n2. Складіть у блендер...\n3. Збийте до однорідності..."
        }
    };

    const recipe = recipes[id];
    alert(`${recipe.title}\n\nІнгредієнти:\n${recipe.ingredients.join("\n")}\n\nПриготування:\n${recipe.instructions}`);
}

// Обработка кликов по дням недели
document.querySelectorAll('.day-tab').forEach(tab => {
    tab.addEventListener('click', () => {
        document.querySelectorAll('.day-tab').forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        // Здесь можно добавить загрузку меню для выбранного дня
    });
});

// Добавьте в конец файла
const mealPlans = {
    monday: {
        breakfast: {
            title: 'Вівсяна каша з ягодами та медом',
            calories: '320',
            image: 'img/Вівсяна каша з ягодами та медом.jpg'
        },
        lunch: {
            title: 'Салат з кіноа та печеними овочами',
            calories: '450',
            image: 'img/Салат з кіноа та печеними овочами.jpg'
        },
        dinner: {
            title: 'Запечена риба з овочами',
            calories: '380',
            image: 'img/Запечена риба з овочами.webp'
        }
    },
    tuesday: {
        breakfast: {
            title: 'Омлет з овочами та цільнозерновим хлібом',
            calories: '350',
            image: 'https://images.unsplash.com/photo-1510693206972-df098062cb71'
        },
        lunch: {
            title: 'Суп з сочевиці',
            calories: '380',
            image: 'https://images.unsplash.com/photo-1547592166-23ac45744acd'
        },
        dinner: {
            title: 'Куряча грудка з гречкою',
            calories: '420',
            image: 'img/Куряча грудка з гречкою.jpg'
        }
    },
    wednesday: {
        breakfast: {
            title: 'Смузі боул з гранолою',
            calories: '310',
            image: 'img/Смузі боул з гранолою.jpg'
        },
        lunch: {
            title: 'Індичка з булгуром',
            calories: '400',
            image: 'img/Індичка з булгуром.jpg'
        },
        dinner: {
            title: 'Запечені овочі з тофу',
            calories: '340',
            image: 'img/Запечені овочі з тофу.jpg'
        }
    },
    thursday: {
        breakfast: {
            title: 'Йогурт з горіхами та фруктами',
            calories: '290',
            image: 'https://images.unsplash.com/photo-1514946379532-90281f815889'
        },
        lunch: {
            title: 'Боул з лососем та авокадо',
            calories: '460',
            image: 'img/Боул.jpeg'
        },
        dinner: {
            title: 'Овочевий рататуй',
            calories: '310',
            image: 'img/Рататуй.jpg'
        }
    },
    friday: {
        breakfast: {
            title: 'Млинці з протеїном та ягодами',
            calories: '340',
            image: 'https://images.unsplash.com/photo-1528207776546-365bb710ee93'
        },
        lunch: {
            title: 'Паста з морепродуктами',
            calories: '430',
            image: 'https://images.unsplash.com/photo-1563379926898-05f4575a45d8'
        },
        dinner: {
            title: 'Салат з квіноа та овочами',
            calories: '350',
            image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd'
        }
    },
    saturday: {
        breakfast: {
            title: 'Тости з авокадо та яйцем',
            calories: '380',
            image: 'https://images.unsplash.com/photo-1525351484163-7529414344d8'
        },
        lunch: {
            title: 'Овочевий суп з куркою',
            calories: '320',
            image: 'https://images.unsplash.com/photo-1547592180-85f173990554'
        },
        dinner: {
            title: 'Запечена форель з рисом',
            calories: '410',
            image: 'https://images.unsplash.com/photo-1467003909585-2f8a72700288'
        }
    },
    sunday: {
        breakfast: {
            title: 'Фруктовий салат з йогуртом',
            calories: '280',
            image: 'img/Фруктовий салат.png'
        },
        lunch: {
            title: 'Чечевичні котлети з овочами',
            calories: '390',
            image: 'img/Котлети.webp'
        },
        dinner: {
            title: 'Овочеве рагу з кіноа',
            calories: '330',
            image: 'img/рагу.webp'
        }
    }
};

document.querySelectorAll('.day-tab').forEach(tab => {
    tab.addEventListener('click', () => {
        const day = tab.dataset.day;
        document.querySelectorAll('.day-tab').forEach(t => t.classList.remove('active'));
        document.querySelectorAll('.meal-content').forEach(c => c.classList.remove('active'));
        
        tab.classList.add('active');
        const content = document.getElementById(day);
        if (content) {
            content.classList.add('active');
            
            // Обновляем контент для выбранного дня
            const plan = mealPlans[day];
            if (plan) {
                updateMealPlan(content, plan);
            }
        }
    });
});

function updateMealPlan(container, plan) {
    container.innerHTML = '';
    
    ['breakfast', 'lunch', 'dinner'].forEach(mealTime => {
        const meal = plan[mealTime];
        const mealCard = createMealCard(meal);
        container.appendChild(mealCard);
    });
}

function createMealCard(meal) {
    const card = document.createElement('div');
    card.className = 'meal-card';
    card.innerHTML = `
        <img src="${meal.image}" alt="${meal.title}">
        <h4>${meal.title}</h4>
        <span class="calories">${meal.calories} ккал</span>
    `;
    return card;
}

// Добавьте после существующего кода
const seasonalProducts = {
    spring: [
        {
            image: 'img/Редиска.jpg',
            title: 'Редиска',
            description: 'Багата на вітамін С та клітковину'
        },
        {
            image: 'img/Шпинат.jpg',
            title: 'Шпинат',
            description: 'Джерело заліза та фолієвої кислоти'
        },
        {
            image: 'img/Спаржа.jpg',
            title: 'Спаржа',
            description: 'Низькокалорійний овоч, багатий на вітаміни'
        }
    ],
    summer: [
        {
            image: 'img/Помідори.jpg',
            title: 'Помідори',
            description: 'Джерело лікопіну та антиоксидантів'
        },
        {
            image: 'img/Полуниця.jpg',
            title: 'Полуниця',
            description: 'Багата на вітамін С та клітковину'
        },
        {
            image: 'img/Огірки.jpg',
            title: 'Огірки',
            description: 'Освіжаючий овоч з високим вмістом води'
        }
    ],
    autumn: [
        {
            image: 'img/гарбуз.webp',
            title: 'Гарбуз',
            description: 'Багатий на бета-каротин та клітковину'
        },
        {
            image: 'img/Яблука.jpg',
            title: 'Яблука',
            description: 'Джерело пектину та антиоксидантів'
        },
        {
            image: 'img/Брюссельськакапуста.jpeg',
            title: 'Брюссельська капуста',
            description: 'Багата на вітамін К та фолати'
        }
    ],
    winter: [
        {
            image: 'img/Цитрусові.jpg',
            title: 'Цитрусові',
            description: 'Багаті на вітамін С та антиоксиданти'
        },
        {
            image: 'img/Хурма.jpg',
            title: 'Хурма',
            description: 'Джерело вітамінів А та С'
        },
        {
            image: 'img/Капуста.jpg',
            title: 'Капуста',
            description: 'Багата на вітамін С та клітковину'
        }
    ]
};

// Функция для обновления сезонных продуктов
function updateSeasonalProducts(season) {
    const container = document.querySelector('.season-content');
    const products = seasonalProducts[season];
    
    if (!products) return;
    
    container.innerHTML = `
        <div class="season-products" id="${season}">
            ${products.map(product => `
                <div class="season-product">
                    <img src="${product.image}" alt="${product.title}" loading="lazy">
                    <div class="season-product-info">
                        <h4>${product.title}</h4>
                        <p>${product.description}</p>
                    </div>
                </div>
            `).join('')}
        </div>
    `;
}

// Обработчики для табов сезонов
document.querySelectorAll('.season-tab').forEach(tab => {
    tab.addEventListener('click', () => {
        const season = tab.dataset.season;
        document.querySelectorAll('.season-tab').forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        updateSeasonalProducts(season);
    });
});

// Инициализация с весенними продуктами
document.addEventListener('DOMContentLoaded', () => {
    updateSeasonalProducts('spring');
});

// Данные рецептов
const recipes = {
    1: {
        title: "Салат з кіноа та овочами",
        ingredients: [
            "1 склянка кіноа",
            "2 огірки",
            "1 червоний перець",
            "200г помідорів черрі",
            "1 авокадо",
            "оливкова олія",
            "сік лимону",
            "сіль та перець"
        ],
        instructions: [
            "1. Відваріть кіноа згідно з інструкцією на упаковці",
            "2. Наріжте всі овочі дрібними кубиками",
            "3. Змішайте кіноа з овочами",
            "4. Заправте оливковою олією та лимонним соком",
            "5. Додайте сіль та перець за смаком"
        ]
    },
    2: {
        title: "Зелений смузі",
        ingredients: [
            "2 жмені шпинату",
            "1 банан",
            "1 зелене яблуко",
            "1 см імбиру",
            "200 мл води або мигдального молока",
            "1 ст.л. меду (за бажанням)"
        ],
        instructions: [
            "1. Помийте всі інгредієнти",
            "2. Очистіть банан та яблуко",
            "3. Складіть всі інгредієнти в блендер",
            "4. Збийте до однорідної консистенції",
            "5. За необхідності додайте більше рідини"
        ]
    },
    3: {
        title: "Боул з авокадо",
        ingredients: [
            "1 стакан коричневого рису",
            "1 авокадо",
            "100г нуту",
            "1 морква",
            "жменя шпинату",
            "кунжут",
            "соєвий соус"
        ],
        instructions: [
            "1. Відваріть рис",
            "2. Нут промийте та обсмажте з спеціями",
            "3. Наріжте авокадо та моркву",
            "4. Викладіть все шарами у миску",
            "5. Полийте соєвим соусом та посипте кунжутом"
        ]
    }
};

// Обработчик для кнопок рецептов
document.querySelectorAll('.recipe-btn').forEach(button => {
    button.addEventListener('click', () => {
        const recipeId = button.dataset.recipe;
        const recipe = recipes[recipeId];
        showRecipeModal(recipe);
    });
});

// Функция показа модального окна
function showRecipeModal(recipe) {
    const modal = document.getElementById('recipeModal');
    const modalTitle = document.getElementById('modalTitle');
    const modalIngredients = document.getElementById('modalIngredients');
    const modalInstructions = document.getElementById('modalInstructions');

    modalTitle.textContent = recipe.title;
    
    modalIngredients.innerHTML = `
        <h4>Інгредієнти:</h4>
        <ul>${recipe.ingredients.map(ing => `<li>${ing}</li>`).join('')}</ul>
    `;
    
    modalInstructions.innerHTML = `
        <h4>Приготування:</h4>
        <ol>${recipe.instructions.map(inst => `<li>${inst}</li>`).join('')}</ol>
    `;

    modal.style.display = 'block';
}

// Закрытие модального окна
document.querySelector('.close-modal').addEventListener('click', () => {
    document.getElementById('recipeModal').style.display = 'none';
});

// Закрытие по клику вне модального окна
window.addEventListener('click', (event) => {
    const modal = document.getElementById('recipeModal');
    if (event.target === modal) {
        modal.style.display = 'none';
    }
});