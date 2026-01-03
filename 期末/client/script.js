// API Base URL
const API_BASE = 'http://localhost:3001/api';

// 當 DOM 完全載入後執行整個程式
document.addEventListener('DOMContentLoaded', async () => {

    // --- 1. 生成導航列 (從隱藏的 #navbar-data 讀取) ---
    const navbarItems = document.querySelectorAll('#navbar-data li');
    const navbarUl = document.getElementById("navbar-items");
    navbarItems.forEach(item => {
        const li = document.createElement("li");
        li.className = "nav-item";
        li.innerHTML = `<a class="nav-link" href="${item.dataset.href}">${item.dataset.name}</a>`;
        navbarUl.appendChild(li);
    });

    // --- [NEW] 首頁分類按鈕快速生成 (基於靜態資料) ---
    const categoryBtnsContainer = document.getElementById('category-buttons');
    const uniqueCategories = new Set();
    // 仍然先讀取 DOM 裡的分類以產生按鈕 (或稍後從 API 資料產生)
    document.querySelectorAll('#restaurant-data div').forEach(div => uniqueCategories.add(div.dataset.category));

    if (categoryBtnsContainer) {
        uniqueCategories.forEach(cat => {
            const btn = document.createElement('button');
            btn.textContent = cat;
            btn.addEventListener('click', () => {
                const target = document.getElementById(cat);
                if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            });
            categoryBtnsContainer.appendChild(btn);
        });
    }

    // --- 2. 生成餐廳區塊 (改為從 API 獲取) ---
    let restaurantList = [];
    try {
        const res = await fetch(`${API_BASE}/restaurants`);
        if (res.ok) {
            restaurantList = await res.json();
        } else {
            console.error("Failed to fetch restaurants");
        }

        // Auto-seed if empty
        if (restaurantList.length === 0) {
            console.log("Seeding data...");
            await fetch(`${API_BASE}/restaurants/seed`, { method: 'POST' });
            const retry = await fetch(`${API_BASE}/restaurants`);
            restaurantList = await retry.json();
        }
    } catch (err) {
        console.error("API Error, using fallback DOM data", err);
        // Fallback logic (parsing original DOM)
        const restaurantDivs = document.querySelectorAll('#restaurant-data div');
        restaurantDivs.forEach(div => {
            restaurantList.push({
                category: div.dataset.category,
                name: div.dataset.name,
                phone: div.dataset.phone,
                img: div.dataset.img,
                link: div.dataset.link
            });
        });
    }

    const restaurants = {};
    restaurantList.forEach(rest => {
        const cat = rest.category;
        if (!restaurants[cat]) restaurants[cat] = [];
        restaurants[cat].push(rest);
    });

    const sectionsContainer = document.getElementById("restaurant-sections");
    sectionsContainer.innerHTML = ''; // Clear existing if any

    for (let category in restaurants) {
        const section = document.createElement("section");
        section.id = category;
        section.className = "category-section py-5";
        const container = document.createElement("div");
        container.className = "container";

        const title = document.createElement("h2");
        title.className = "category-title text-center";
        title.textContent = category;
        container.appendChild(title);

        const row = document.createElement("div");
        row.className = "row g-4";

        restaurants[category].forEach(rest => {
            const col = document.createElement("div");
            col.className = "col-md-6 col-lg-4 wow fadeUp";
            col.innerHTML = `
        <div class="card h-100">
          <div class="overflow-hidden">
             <img src="${rest.img}" class="card-img-top" alt="${rest.name}" onerror="this.src='https://via.placeholder.com/600x400?text=No+Image'">
          </div>
          <div class="card-body d-flex flex-column">
            <h5 class="card-title">${rest.name}</h5>
            <p class="card-text flex-grow-1"><i class="bi bi-telephone-fill text-primary me-2"></i>${rest.phone}</p>
            <a href="${rest.link}" class="btn btn-primary w-100 mt-3" target="_blank">
              <i class="bi bi-geo-alt-fill me-1"></i> 查看地圖
            </a>
          </div>
        </div>
      `;
            row.appendChild(col);
        });

        container.appendChild(row);
        section.appendChild(container);
        sectionsContainer.appendChild(section);
    }

    // --- 3. 生成表單 (動態建置欄位 + 驗證機制) ---
    // const allRestaurants = Array.from(restaurantDivs).map(d=>d.dataset.name); // OLD
    const allRestaurants = restaurantList.map(r => r.name); // NEW from API data
    const contactContainer = document.getElementById("contact-container");

    // Header
    const contactHeader = document.createElement('div');
    contactHeader.className = 'text-center mb-5';
    contactHeader.innerHTML = '<h2 class="fw-bold">留下您的評論</h2><p class="text-muted">告訴我們您的用餐體驗</p>';
    contactContainer.appendChild(contactHeader);

    const form = document.createElement('form');
    form.id = "contactForm";
    form.noValidate = true;

    function createFieldHtml({ id, labelText, controlHtml }) {
        const wrap = document.createElement('div');
        wrap.className = 'mb-4';

        const label = document.createElement('label');
        label.className = 'form-label';
        label.setAttribute('for', id);
        label.textContent = labelText;
        wrap.appendChild(label);

        const temp = document.createElement('div');
        temp.innerHTML = controlHtml.trim();
        const control = temp.firstElementChild;
        control.id = id;
        control.classList.add('form-control');
        wrap.appendChild(control);

        const feedback = document.createElement('p');
        feedback.className = 'invalid-feedback';
        feedback.id = `${id}-feedback`;
        control.setAttribute('aria-describedby', feedback.id);

        if (control.tagName.toLowerCase() === 'select') {
            control.classList.remove('form-control');
            control.classList.add('form-select');
        }
        if (control.tagName.toLowerCase() === 'textarea') {
            control.classList.remove('form-control');
            control.classList.add('form-control');
        }

        wrap.appendChild(feedback);
        return { wrap, control, feedback };
    }

    const nick = createFieldHtml({
        id: 'nickname',
        labelText: '您的暱稱',
        controlHtml: `<input type="text" placeholder="例如: 美食小當家" />`
    });
    form.appendChild(nick.wrap);

    const restOptions = ['<option value="">-- 請選擇用餐餐廳 --</option>'].concat(allRestaurants.map(n => `<option value="${n}">${n}</option>`)).join('');
    const restField = createFieldHtml({
        id: 'restaurant',
        labelText: '餐廳名稱',
        controlHtml: `<select>${restOptions}</select>`
    });
    form.appendChild(restField.wrap);

    // 星星評分
    const ratingCategories = ["服務品質", "環境衛生", "餐點口味"];
    // Map display names to API keys
    const ratingKeys = { "服務品質": "service", "環境衛生": "environment", "餐點口味": "food" };

    const ratingsState = {};
    const ratingHiddenInputs = {};
    const ratingFeedbacks = {};

    ratingCategories.forEach(cat => {
        ratingsState[cat] = 0;
        const wrap = document.createElement('div');
        wrap.className = 'mb-4';

        const label = document.createElement('label');
        label.className = 'form-label';
        label.textContent = cat;
        wrap.appendChild(label);

        const starContainer = document.createElement('div');
        starContainer.className = 'rating-star-container';
        starContainer.setAttribute('aria-label', cat + ' 評分');

        const fb = document.createElement('p');
        fb.className = 'invalid-feedback d-block mt-1';
        fb.style.display = 'none';
        const safeId = `rating-${cat.replace(/\s+/g, '-')}`.toLowerCase();
        fb.id = `${safeId}-feedback`;
        ratingFeedbacks[cat] = fb;

        const hidden = document.createElement('input');
        hidden.type = 'hidden';
        hidden.id = `${safeId}-value`;
        hidden.name = `${safeId}`;
        hidden.value = '0';
        hidden.setAttribute('aria-describedby', fb.id);
        ratingHiddenInputs[cat] = hidden;

        for (let i = 1; i <= 5; i++) {
            const star = document.createElement('i');
            star.className = 'bi bi-star-fill rating-star';
            star.dataset.value = i;

            star.addEventListener('click', () => {
                setRating(cat, i);
                hidden.value = String(i);
                clearErrorRating(cat);
                localStorage.setItem(`rating-${cat}`, i);
            });

            starContainer.appendChild(star);
        }

        function setRating(category, value) {
            ratingsState[category] = value;
            const children = starContainer.children;
            for (let idx = 0; idx < children.length; idx++) {
                const s = children[idx];
                const val = Number(s.dataset.value);
                const isActive = val <= value;
                s.classList.toggle('active', isActive);
                s.setAttribute('aria-checked', isActive ? 'true' : 'false');
            }
        }

        wrap.appendChild(starContainer);
        wrap.appendChild(hidden);
        wrap.appendChild(fb);
        form.appendChild(wrap);
    });

    const comment = createFieldHtml({
        id: 'comment',
        labelText: '詳細評論',
        controlHtml: `<textarea rows="4" placeholder="分享您的真實感受..."></textarea>`
    });
    form.appendChild(comment.wrap);

    const submitDiv = document.createElement('div');
    submitDiv.className = 'mt-5';
    const submitBtn = document.createElement('button');
    submitBtn.type = 'submit';
    submitBtn.className = 'btn btn-primary w-100 py-3 rounded-pill';
    submitBtn.innerHTML = `<i class="bi bi-send-fill me-2"></i> <span class="btn-text">送出評論</span> <span class="spinner-border spinner-border-sm d-none ms-2" role="status"></span>`;
    submitDiv.appendChild(submitBtn);
    form.appendChild(submitDiv);
    contactContainer.appendChild(form);

    // 驗證邏輯
    const fields = [
        { el: nick.control, fb: nick.feedback, validator: () => nick.control.value.trim() ? '' : '請輸入您的暱稱' },
        { el: restField.control, fb: restField.feedback, validator: () => restField.control.value ? '' : '請選擇一家餐廳' },
        { el: comment.control, fb: comment.feedback, validator: () => comment.control.value.trim() ? '' : '請寫下一些評論' }
    ];

    ratingCategories.forEach(cat => {
        const hidden = ratingHiddenInputs[cat];
        const fb = ratingFeedbacks[cat];
        fields.push({
            el: hidden,
            fb: fb,
            validator: () => (hidden.value && hidden.value !== '0') ? '' : `請為 ${cat} 評分`,
            isRating: true,
            category: cat
        });
    });

    function applyError(fieldObj, message) {
        if (fieldObj.isRating) {
            applyErrorRating(fieldObj.category, message);
        } else {
            const el = fieldObj.el;
            el.setCustomValidity(message);
            fieldObj.fb.textContent = message;
            el.classList.add('is-invalid');
        }
    }

    function clearError(fieldObj) {
        if (fieldObj.isRating) {
            clearErrorRating(fieldObj.category);
        } else {
            const el = fieldObj.el;
            el.setCustomValidity('');
            fieldObj.fb.textContent = '';
            el.classList.remove('is-invalid');
        }
    }

    function applyErrorRating(category, message) {
        const fb = ratingFeedbacks[category];
        fb.textContent = message;
        fb.style.display = 'block';

        const container = fb.previousElementSibling.previousElementSibling;
        if (container) {
            container.classList.add('shake');
            setTimeout(() => container.classList.remove('shake'), 500);
            container.style.borderColor = '#dc3545';
        }
    }

    function clearErrorRating(category) {
        const fb = ratingFeedbacks[category];
        fb.textContent = '';
        fb.style.display = 'none';
        const container = fb.previousElementSibling.previousElementSibling;
        if (container) container.style.borderColor = '#e2e8f0';
    }

    fields.forEach(f => {
        if (!f.isRating) {
            f.el.addEventListener('input', () => clearError(f));
            f.el.addEventListener('blur', () => {
                const msg = f.validator();
                if (msg) applyError(f, msg);
            });
        }
    });

    form.addEventListener('submit', async e => {
        e.preventDefault();
        let firstInvalid = null;
        let isValid = true;

        fields.forEach(f => {
            const msg = f.validator();
            if (msg) {
                isValid = false;
                applyError(f, msg);
                if (!firstInvalid) firstInvalid = f.isRating ? f.fb.previousElementSibling.previousElementSibling : f.el;
            } else clearError(f);
        });

        if (!isValid) {
            if (firstInvalid) firstInvalid.scrollIntoView({ behavior: 'smooth', block: 'center' });
            return;
        }

        const spinner = submitBtn.querySelector('.spinner-border');
        const btnText = submitBtn.querySelector('.btn-text');
        submitBtn.setAttribute('disabled', 'true');
        spinner.classList.remove('d-none');
        btnText.textContent = '送出中...';

        // Construct Data
        const formData = {
            nickname: nick.control.value,
            restaurant: restField.control.value,
            content: comment.control.value,
            ratings: {
                service: parseInt(ratingHiddenInputs["服務品質"].value),
                environment: parseInt(ratingHiddenInputs["環境衛生"].value),
                food: parseInt(ratingHiddenInputs["餐點口味"].value)
            }
        };

        try {
            const res = await fetch(`${API_BASE}/comments`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });

            if (!res.ok) throw new Error('Submission Failed');

            // Success UX
            setTimeout(() => {
                spinner.classList.add('d-none');
                submitBtn.removeAttribute('disabled');
                btnText.textContent = '送出評論';

                const modal = new bootstrap.Modal(document.getElementById('thankModal'));
                modal.show();

                form.reset();
                document.querySelectorAll('.rating-star').forEach(s => {
                    s.classList.remove('active');
                });
                ratingCategories.forEach(cat => ratingHiddenInputs[cat].value = '0');
                fields.forEach(f => clearError(f));

                // Clear LocalStorage
                localStorage.removeItem('nickname');
                localStorage.removeItem('restaurant');
                localStorage.removeItem('comment');
                ratingCategories.forEach(cat => localStorage.removeItem(`rating-${cat}`));

            }, 500);

        } catch (err) {
            console.error(err);
            alert('連線錯誤，請稍後再試！');
            spinner.classList.add('d-none');
            submitBtn.removeAttribute('disabled');
            btnText.textContent = '送出評論';
        }
    });

    // ------------------- Theme Switcher -------------------
    const nightBtn = document.createElement('button');
    nightBtn.innerHTML = '<i class="bi bi-moon-stars-fill"></i>';
    nightBtn.className = 'btn btn-primary rounded-circle shadow-lg';
    nightBtn.style.position = 'fixed';
    nightBtn.style.bottom = '30px';
    nightBtn.style.right = '30px';
    nightBtn.style.width = '60px';
    nightBtn.style.height = '60px';
    nightBtn.style.zIndex = '9999';
    nightBtn.style.fontSize = '1.5rem';
    nightBtn.style.display = 'flex';
    nightBtn.style.justifyContent = 'center';
    nightBtn.style.alignItems = 'center';

    document.body.appendChild(nightBtn);

    nightBtn.addEventListener('click', () => {
        document.body.classList.toggle('night-mode');
        const isDark = document.body.classList.contains('night-mode');
        nightBtn.innerHTML = isDark ? '<i class="bi bi-sun-fill"></i>' : '<i class="bi bi-moon-stars-fill"></i>';
        nightBtn.className = isDark ? 'btn btn-warning rounded-circle shadow-lg' : 'btn btn-primary rounded-circle shadow-lg';
        localStorage.setItem('theme', isDark ? 'dark' : 'light');
    });

    // Load Saved Data
    if (localStorage.getItem('nickname')) nick.control.value = localStorage.getItem('nickname');
    if (localStorage.getItem('restaurant')) restField.control.value = localStorage.getItem('restaurant');
    if (localStorage.getItem('comment')) comment.control.value = localStorage.getItem('comment');

    ratingCategories.forEach(cat => {
        const saved = localStorage.getItem(`rating-${cat}`);
        if (saved) {
            const val = parseInt(saved);
            ratingHiddenInputs[cat].value = val;
            const starContainer = ratingHiddenInputs[cat].previousElementSibling.previousElementSibling;
            if (starContainer) {
                Array.from(starContainer.children).forEach((s, idx) => {
                    s.classList.toggle('active', idx < val);
                });
            }
        }
    });

    if (localStorage.getItem('theme') === 'dark') {
        document.body.classList.add('night-mode');
        nightBtn.innerHTML = '<i class="bi bi-sun-fill"></i>';
        nightBtn.className = 'btn btn-warning rounded-circle shadow-lg';
    }

    // Auto Save
    [nick.control, restField.control, comment.control].forEach(input => {
        input.addEventListener('input', () => localStorage.setItem(input.id, input.value));
    });

});
