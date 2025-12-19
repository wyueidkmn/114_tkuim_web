const loginForm = document.getElementById('loginForm');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const list = document.getElementById('list');


loginForm.addEventListener('submit', async e => {
e.preventDefault();


const res = await fetch('/auth/login', {
method: 'POST',
headers: { 'Content-Type': 'application/json' },
body: JSON.stringify({
email: emailInput.value,
password: passwordInput.value
})
});


const data = await res.json();
if (!res.ok) return alert(data.error);


localStorage.setItem('token', data.token);
alert('登入成功');
});


document.getElementById('load').onclick = async () => {
const token = localStorage.getItem('token');
const res = await fetch('/api/signup', {
headers: { Authorization: `Bearer ${token}` }
});
const data = await res.json();


list.innerHTML = '';
data.data.forEach(p => {
const li = document.createElement('li');
li.textContent = JSON.stringify(p);
list.appendChild(li);
});
};