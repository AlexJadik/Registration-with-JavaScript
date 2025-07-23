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

  const login = inputElementLogin.value.trim();
  const password = inputElementPassword.value.trim();

   if (login === '' || password === '') {
    TextInfoErrorRegister.style.display = 'block';
    return;
  } else {
    TextInfoErrorRegister.style.display = 'none';
  }

  if (password.length < 8) {
    passErrorCharacters.style.display = 'block';
    return;
  } else {
    passErrorCharacters.style.display = 'none';
  }

  const englishRegex = /^[A-Za-z0-9!@#$%^&*()_+=-]*$/;
  if (!englishRegex.test(login) || !englishRegex.test(password)) {
    alert('Допустимы только английские буквы и цифры!');
    return;
  }

  // Получаем массив пользователей (или пустой, если нет)
  let users = JSON.parse(localStorage.getItem('users')) || [];

  // Проверяем, есть ли уже такой логин
  const userExists = users.some(user => user.login === login);
  if (userExists) {
    alert('Пользователь с таким логином уже существует!');
    return;
  }

  // Добавляем нового пользователя
  users.push({ login, password });

  // Сохраняем всех в localStorage
  localStorage.setItem('users', JSON.stringify(users));

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
  const inputLogin = document.getElementById('userNameLogin').value.trim();
  const inputPassword = document.getElementById('loginPassword').value.trim();

  const TextInfoErrorLogin = document.getElementById('TextInfoErrorLogin');
  const messageError = document.getElementById('registerIsIncorrect');

  // Проверка на пустые поля
  if (inputLogin === '' || inputPassword === '') {
    TextInfoErrorLogin.style.display = 'block';
    messageError.style.display = 'none';
    return;
  } else {
    TextInfoErrorLogin.style.display = 'none';
  }

  // Проверка на английские символы
  const englishRegex = /^[A-Za-z0-9!@#$%^&*()_+=-]*$/;
  if (!englishRegex.test(inputLogin) || !englishRegex.test(inputPassword)) {
    alert('Разрешены только английские буквы, цифры и спец. символы');
    return;
  }

  // Проверка среди всех пользователей
  const users = JSON.parse(localStorage.getItem('users')) || [];
  const foundUser = users.find(user => user.login === inputLogin && user.password === inputPassword);

  if (foundUser) {
    localStorage.setItem('currentUser', foundUser.login);
    window.location.href = window.location.origin + window.location.pathname.replace(/\/[^\/]*$/, '/account.html');
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