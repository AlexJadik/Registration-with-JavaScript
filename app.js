const btnRegister = document.getElementById('btnRegister');
const chooseBlock = document.querySelector('.chooseBlock');
const registerContainer = document.querySelector('.register_container');
const loginContainer = document.querySelector('.loginContainer');
const chooseRegisterBtn = document.getElementById('chooseRegisterBtn');
const chooseLoginBtn = document.getElementById('chooseLoginBtn');

// Кнопка "Регистрация"
btnRegister.addEventListener('click', function () {
  const inputElementLogin = document.getElementById('userNameRegister');
  const inputElementPassword = document.getElementById('passwordRegister');
  const TextInfoErrorRegister = document.getElementById('TextInfoErrorRegister');
  const passErrorCharacters = document.getElementById('passErrorCharacters');
  const successMessage = document.getElementById('successMessage');

  if (inputElementLogin.value === '' || inputElementPassword.value === '') {
    TextInfoErrorRegister.style.display = 'block';
    return;
  } else {
    TextInfoErrorRegister.style.display = 'none';
  }

  if (inputElementPassword.value.length < 8) {
    passErrorCharacters.style.display = 'block';
    return;
  } else {
    passErrorCharacters.style.display = 'none';
  }

  const obj = {
    login: inputElementLogin.value,
    password: inputElementPassword.value
  };

  const englishRegex = /^[A-Za-z0-9!@#$%^&*()_+=-]*$/;

if (!englishRegex.test(inputElementLogin.value) || !englishRegex.test(inputElementPassword.value)) {
    alert('Допустимы только английские буквы и цифры!');
    return;
}

  localStorage.setItem('registerUser', JSON.stringify(obj));

  successMessage.style.display = 'block';
  successMessage.style.opacity = '1';

  setTimeout(() => {
    successMessage.style.opacity = '0';
  }, 2000);

  registerContainer.style.display = 'none';
  loginContainer.style.display = 'flex';
});

// Кнопка "Войти"
const btnLogin = document.getElementById('btnLogin');

btnLogin.addEventListener('click', function () {
  const inputLogin = document.getElementById('userNameLogin').value;
  const inputPassword = document.getElementById('loginPassword').value;
  const TextInfoErrorLogin = document.getElementById('TextInfoErrorLogin');
  const messageError = document.getElementById('registerIsIncorrect');

const englishRegex = /^[A-Za-z0-9!@#$%^&*()_+=-]*$/;

if (!englishRegex.test(inputLogin) || !englishRegex.test(inputPassword)) {
  alert('Разрешены только английские буквы, цифры и спец. символы');
  return;
}


  if (inputLogin === '' || inputPassword === '') {
    TextInfoErrorLogin.style.display = 'block';
    messageError.style.display = 'none';
    return;
  } else {
    TextInfoErrorLogin.style.display = 'none';
  }

  const savedUser = JSON.parse(localStorage.getItem('registerUser'));

  if (savedUser && inputLogin === savedUser.login && inputPassword === savedUser.password) {
    localStorage.setItem('currentUser', savedUser.login);
    window.location.href = window.location.origin + window.location.pathname.replace(/\/[^\/]*$/, '/account.html'); // Переход на личный кабинет
  } else {
    messageError.style.display = 'block';
  }
});

// Переключение между формами
chooseRegisterBtn.addEventListener('click', () => {
  registerContainer.style.display = 'flex';
  loginContainer.style.display = 'none';
});

chooseLoginBtn.addEventListener('click', () => {
  loginContainer.style.display = 'flex';
  registerContainer.style.display = 'none';
});


// (Удаление русских символов во время ввода) //
function preventCyrillicInput(input) {
  input.addEventListener('input', function () {
    this.value = this.value.replace(/[А-Яа-яЁё]/g, '');
  });
}

preventCyrillicInput(document.getElementById('userNameRegister'));
preventCyrillicInput(document.getElementById('passwordRegister'));
preventCyrillicInput(document.getElementById('userNameLogin'));
preventCyrillicInput(document.getElementById('loginPassword'));