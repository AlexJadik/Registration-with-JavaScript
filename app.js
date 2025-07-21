const btnRegister = document.getElementById('btnRegister')

btnRegister.addEventListener('click', function() {

    const inputElementLogin = document.getElementById('userNameRegister')

    const inputElementPassword = document.getElementById('passwordRegister')

    const TextInfoErrorRegister = document.getElementById('TextInfoErrorRegister')

    if (inputElementLogin.value === '' ||inputElementPassword.value === '') {
        TextInfoErrorRegister.style.display = 'block'
        return
    } else {
        TextInfoErrorRegister.style.display = 'none'
    }
    if (inputElementPassword.value.length < 8) {
        passErrorCharacters.style.display = 'block'
        return
    } else {
        passErrorCharacters.style.display = 'none'
    }

    const inputValueRegisterPassword = inputElementPassword.value
    const inputValueRegisterText = inputElementLogin.value

    const obj = {
      login: inputValueRegisterText,
      password: inputValueRegisterPassword
    }
    const jsonString = JSON.stringify(obj)
    localStorage.setItem('registerUser', jsonString)

    const successMessage = document.getElementById('successMessage')
    successMessage.style.display = 'block'
    successMessage.style.opacity = '1'

    setTimeout(() => {
        successMessage.style.opacity = '0'
    }, 2000)

    document.querySelector('.register_container').style.display = 'none'
    document.querySelector('.loginContainer').style.display = 'flex'
})




const btnLogin = document.getElementById('btnLogin')


btnLogin.addEventListener('click', function() {
const registerContainer = document.querySelector('.register_container')
    const loginContainer = document.querySelector('.loginContainer')
    const logoutBtn = document.getElementById('logoutBtn')
const inputLogin = document.getElementById('userNameLogin')
const loginText = inputLogin.value
console.log(loginText)

const inputPasswordLogin = document.getElementById('loginPassword')
const loginPassword = inputPasswordLogin.value
console.log(loginPassword)

const TextInfoErrorLogin = document.getElementById('TextInfoErrorLogin')

if (inputLogin.value === '' || inputPasswordLogin.value === '' ) {
    TextInfoErrorLogin.style.display = 'block'
    messageError.style.display = 'none'
    return
} else {
    TextInfoErrorLogin.style.display = 'none'
}

const savedUser = localStorage.getItem('registerUser')
const parsedUser = JSON.parse(savedUser)
console.log(parsedUser.login)
console.log(parsedUser.password)

const messageSuccess = document.getElementById('registerUser')
messageSuccess.textContent = 'Вы вошли как: ' + parsedUser.login
const messageError = document.getElementById('registerIsIncorrect')

if (loginText === parsedUser.login && loginPassword === parsedUser.password) {
    messageSuccess.style.display = 'block'
    registerContainer.style.display = 'none'
    loginContainer.style.display = 'none'
    logoutBtn.style.display = 'block'

    messageError.style.display = 'none'
} else {
    messageError.style.display = 'block'
}

const logoutBtnExit = document.getElementById('logoutBtn')

logoutBtnExit.addEventListener('click', function() {
    messageSuccess.style.display = 'none'
    registerContainer.style.display = 'flex'
    loginContainer.style.display = 'flex'
    logoutBtn.style.display = 'none'
    document.getElementById('userNameRegister').value = ''
    document.getElementById('passwordRegister').value = ''
    document.getElementById('userNameLogin').value = ''
    document.getElementById('loginPassword').value = ''
    messageError.style.display = 'none'
})
})


