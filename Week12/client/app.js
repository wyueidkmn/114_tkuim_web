(() => {
  const $ = (id) => document.getElementById(id);

  const authCard = $("authCard");
  const userCard = $("userCard");
  const createCard = $("createCard");
  const listCard = $("listCard");
  const loginForm = $("loginForm");
  const loginEmail = $("loginEmail");
  const loginPassword = $("loginPassword");
  const loginMsg = $("loginMsg");
  const currentUser = $("currentUser");
  const logoutBtn = $("logoutBtn");
  const createForm = $("createForm");
  const nameInput = $("name");
  const emailInput = $("email");
  const phoneInput = $("phone");
  const createMsg = $("createMsg");
  const listEl = $("list");
  const pageInfo = $("pageInfo");
  const prevBtn = $("prevBtn");
  const nextBtn = $("nextBtn");
  const listMsg = $("listMsg");

  let token = localStorage.getItem("token") || "";
  let page = 1;
  let totalPages = 1;

  function show(el, visible) {
    el.classList.toggle("hide", !visible);
  }

  function setStatus(el, msg, type = "") {
    el.textContent = msg || "";
    el.classList.remove("error", "success");
    if (type) el.classList.add(type);
  }

  function authHeaders() {
    return token ? { Authorization: `Bearer ${token}` } : {};
  }

  async function fetchJSON(path, options = {}) {
    const res = await fetch(path, {
      ...options,
      headers: {
        "Content-Type": "application/json",
        ...authHeaders(),
        ...(options.headers || {}),
      },
    });
    if (!res.ok) {
      let errText = "Request failed";
      try {
        const data = await res.json();
        errText = data?.error || JSON.stringify(data);
      } catch (_) {}
      throw new Error(errText || `${res.status}`);
    }
    if (res.status === 204) return null;
    return res.json();
  }

  async function onLogin(e) {
    e.preventDefault();
    setStatus(loginMsg, "登入中…");
    try {
      const data = await fetchJSON("/auth/login", {
        method: "POST",
        body: JSON.stringify({
          email: loginEmail.value.trim(),
          password: loginPassword.value.trim(),
        }),
      });
      token = data.token;
      localStorage.setItem("token", token);
      loginPassword.value = "";
      setStatus(loginMsg, "登入成功", "success");
      await refreshUserAndList();
    } catch (err) {
      setStatus(loginMsg, `登入失敗：${err.message}`, "error");
    }
  }

  async function fetchMe() {
    const data = await fetchJSON("/auth/me");
    return data.user;
  }

  async function refreshUserAndList() {
    if (!token) {
      show(authCard, true);
      show(userCard, false);
      show(createCard, false);
      show(listCard, false);
      return;
    }
    try {
      const user = await fetchMe();
      currentUser.textContent = `${user.email}（${user.role}）`;
      show(authCard, false);
      show(userCard, true);
      show(createCard, true);
      show(listCard, true);
      page = 1;
      await loadList();
    } catch (err) {
      localStorage.removeItem("token");
      token = "";
      show(authCard, true);
      show(userCard, false);
      show(createCard, false);
      show(listCard, false);
      setStatus(loginMsg, `請重新登入：${err.message}`, "error");
    }
  }

  async function onCreate(e) {
    e.preventDefault();
    setStatus(createMsg, "送出中…");
    try {
      await fetchJSON("/api/signup", {
        method: "POST",
        body: JSON.stringify({
          name: nameInput.value.trim(),
          email: emailInput.value.trim(),
          phone: phoneInput.value.trim(),
        }),
      });
      nameInput.value = "";
      emailInput.value = "";
      phoneInput.value = "";
      setStatus(createMsg, "新增成功", "success");
      await loadList();
    } catch (err) {
      setStatus(createMsg, `新增失敗：${err.message}`, "error");
    }
  }

  async function loadList() {
    setStatus(listMsg, "讀取中…");
    try {
      const data = await fetchJSON(`/api/signup?page=${page}&limit=10`);
      listEl.innerHTML = "";
      (data.items || []).forEach((item) => {
        const li = document.createElement("li");
        const left = document.createElement("div");
        left.innerHTML = `<strong>${item.name}</strong> <span class=\"muted\">${item.email} · ${item.phone}</span>`;
        const del = document.createElement("button");
        del.textContent = "刪除";
        del.className = "danger";
        del.onclick = () => onDelete(item._id || item.id);
        li.appendChild(left);
        li.appendChild(del);
        listEl.appendChild(li);
      });
      totalPages = data.totalPages || 1;
      pageInfo.textContent = `第 ${data.page} / ${totalPages} 頁，共 ${
        data.total ?? 0
      } 筆`;
      prevBtn.disabled = data.page <= 1;
      nextBtn.disabled = data.page >= totalPages;
      setStatus(listMsg, "");
    } catch (err) {
      setStatus(listMsg, `讀取失敗：${err.message}`, "error");
    }
  }

  async function onDelete(id) {
    if (!id) return;
    if (!confirm("確定要刪除這筆資料嗎？")) return;
    try {
      await fetchJSON(`/api/signup/${id}`, { method: "DELETE" });
      await loadList();
    } catch (err) {
      alert(`刪除失敗：${err.message}`);
    }
  }

  function onLogout() {
    localStorage.removeItem("token");
    token = "";
    currentUser.textContent = "—";
    show(authCard, true);
    show(userCard, false);
    show(createCard, false);
    show(listCard, false);
  }

  prevBtn.addEventListener("click", async () => {
    if (page > 1) {
      page -= 1;
      await loadList();
    }
  });
  nextBtn.addEventListener("click", async () => {
    if (page < totalPages) {
      page += 1;
      await loadList();
    }
  });

  loginForm.addEventListener("submit", onLogin);
  createForm.addEventListener("submit", onCreate);
  logoutBtn.addEventListener("click", onLogout);

  refreshUserAndList();
})();