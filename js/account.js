    const user = localStorage.getItem('currentUser')
    if (!user) {
      window.location.href = 'index.html'
    } else {
      document.getElementById('welcomeUser').textContent = 'Вы вошли как: ' + user
    }

    document.getElementById('logoutBtn').addEventListener('click', () => {
      localStorage.removeItem('currentUser')
      window.location.href = 'index.html'
    })