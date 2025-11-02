const form = document.getElementById('signup-form');
const submitBtn = document.getElementById('submit-btn');
const resetBtn = document.getElementById('reset-btn');


const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const phoneInput = document.getElementById('phone');
const passwordInput = document.getElementById('password');
const confirmInput = document.getElementById('confirm');
const interestsDiv = document.getElementById('interests');
const agreeCheckbox = document.getElementById('agree');


const errors = {
  name: document.getElementById('name-error'),
  email: document.getElementById('email-error'),
  phone: document.getElementById('phone-error'),
  password: document.getElementById('password-error'),
  confirm: document.getElementById('confirm-error'),
  interests: document.getElementById('interests-error'),
  agree: document.getElementById('agree-error'),
  strengthText: document.getElementById('strength-text')
};


const STORAGE_KEY = 'signup_form_data';


function setError(input, message) {
  input.setCustomValidity(message);
  errors[input.id] && (errors[input.id].textContent = message);
}

function validateName() {
  const value = nameInput.value.trim();
  if (!value) setError(nameInput, '姓名必填');
  else setError(nameInput, '');
  return nameInput.checkValidity();
}

function validateEmail() {
  const value = emailInput.value.trim();
  const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!value) setError(emailInput, 'Email 必填');
  else if (!pattern.test(value)) setError(emailInput, 'Email 格式不正確');
  else setError(emailInput, '');
  return emailInput.checkValidity();
}

function validatePhone() {
  const value = phoneInput.value.trim();
  if (!value) setError(phoneInput, '手機必填');
  else if (!/^09\d{8}$/.test(value)) setError(phoneInput, '請輸入 09 開頭的 10 碼手機');
  else setError(phoneInput, '');
  return phoneInput.checkValidity();
}

function validatePassword() {
  const value = passwordInput.value.trim();
  const hasLetter = /[A-Za-z]/.test(value);
  const hasNumber = /\d/.test(value);
  let message = '';
  if (!value) message = '密碼必填';
  else if (value.length < 8) message = '密碼至少 8 碼';
  else if (!hasLetter || !hasNumber) message = '需包含英文字母與數字';
  setError(passwordInput, message);
  updateStrength(value);
  return passwordInput.checkValidity();
}

function validateConfirm() {
  const value = confirmInput.value.trim();
  if (!value) setError(confirmInput, '請再次輸入密碼');
  else if (value !== passwordInput.value.trim()) setError(confirmInput, '兩次密碼不一致');
  else setError(confirmInput, '');
  return confirmInput.checkValidity();
}

function validateInterests() {
  const checked = interestsDiv.querySelectorAll('input[type="checkbox"]:checked').length;
  const message = checked === 0 ? '至少選一個興趣' : '';
  errors.interests.textContent = message;
  return checked > 0;
}

function validateAgree() {
  const message = agreeCheckbox.checked ? '' : '須同意服務條款';
  errors.agree.textContent = message;
  return agreeCheckbox.checked;
}


function updateStrength(value) {
  let strength = '弱';
  let className = 'weak';
  if (value.length >= 8 && /[A-Za-z]/.test(value) && /\d/.test(value)) {
    if (value.length >= 12) {
      strength = '強';
      className = 'strong';
    } else {
      strength = '中';
      className = 'medium';
    }
  }
  errors.strengthText.textContent = strength;
  errors.strengthText.className = className;
}


function saveForm() {
  const data = {
    name: nameInput.value,
    email: emailInput.value,
    phone: phoneInput.value,
    password: passwordInput.value,
    confirm: confirmInput.value,
    interests: Array.from(interestsDiv.querySelectorAll('input[type="checkbox"]'))
                    .filter(c => c.checked)
                    .map(c => c.id),
    agree: agreeCheckbox.checked
  };
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}


function loadForm() {
  const data = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}');
  if (data.name) nameInput.value = data.name;
  if (data.email) emailInput.value = data.email;
  if (data.phone) phoneInput.value = data.phone;
  if (data.password) passwordInput.value = data.password;
  if (data.confirm) confirmInput.value = data.confirm;
  if (data.interests) {
    interestsDiv.querySelectorAll('input[type="checkbox"]').forEach(c => {
      c.checked = data.interests.includes(c.id);
    });
  }
  if (data.agree) agreeCheckbox.checked = data.agree;
  updateStrength(passwordInput.value);
}


[nameInput, emailInput, phoneInput, passwordInput, confirmInput].forEach(input => {
  input.addEventListener('blur', () => {
    switch(input.id) {
      case 'name': validateName(); break;
      case 'email': validateEmail(); break;
      case 'phone': validatePhone(); break;
      case 'password': validatePassword(); validateConfirm(); break;
      case 'confirm': validateConfirm(); break;
    }
    saveForm();
  });

  input.addEventListener('input', () => {
    switch(input.id) {
      case 'name': validateName(); break;
      case 'email': validateEmail(); break;
      case 'phone': validatePhone(); break;
      case 'password': validatePassword(); validateConfirm(); break;
      case 'confirm': validateConfirm(); break;
    }
    saveForm();
  });
});


interestsDiv.addEventListener('change', (event) => {
  if (event.target.matches('input[type="checkbox"]')) {
    validateInterests();
    saveForm();
  }
});


agreeCheckbox.addEventListener('change', () => {
  validateAgree();
  saveForm();
});


form.addEventListener('submit', async (event) => {
  event.preventDefault();

  const validators = [
    validateName,
    validateEmail,
    validatePhone,
    validatePassword,
    validateConfirm,
    validateInterests,
    validateAgree
  ];

  let firstInvalid = null;
  validators.forEach(fn => {
    const valid = fn();
    if (!valid && !firstInvalid) {
      switch(fn) {
        case validateName: firstInvalid = nameInput; break;
        case validateEmail: firstInvalid = emailInput; break;
        case validatePhone: firstInvalid = phoneInput; break;
        case validatePassword: firstInvalid = passwordInput; break;
        case validateConfirm: firstInvalid = confirmInput; break;
        case validateInterests: firstInvalid = interestsDiv; break;
        case validateAgree: firstInvalid = agreeCheckbox; break;
      }
    }
  });

  if (firstInvalid) {
    if (firstInvalid.focus) firstInvalid.focus();
    return;
  }

  submitBtn.disabled = true;
  submitBtn.textContent = '送出中...';
  await new Promise(resolve => setTimeout(resolve, 1000));
  alert('註冊成功！');
  form.reset();
  errors.strengthText.textContent = '尚未輸入';
  localStorage.removeItem(STORAGE_KEY);
  submitBtn.disabled = false;
  submitBtn.textContent = '送出';
});


resetBtn.addEventListener('click', () => {
  form.reset();
  errors.strengthText.textContent = '尚未輸入';
  Object.keys(errors).forEach(k => {
    if (k !== 'strengthText') errors[k].textContent = '';
  });
  localStorage.removeItem(STORAGE_KEY);
});


loadForm();
