// Simulación de base de datos de usuarios
const users = JSON.parse(localStorage.getItem('users')) || [];

// Función para registrar un nuevo usuario
function registerUser(username, password) {
    // Verificar si el usuario ya existe
    if (users.some(user => user.username === username)) {
        return { success: false, message: 'El usuario ya existe' };
    }
    
    // Crear nuevo usuario
    const newUser = { username, password, birthdays: [] };
    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));
    
    return { success: true, user: newUser };
}

// Función para autenticar un usuario
function loginUser(username, password) {
    const user = users.find(user => user.username === username && user.password === password);
    
    if (!user) {
        return { success: false, message: 'Usuario o contraseña incorrectos' };
    }
    
    return { success: true, user };
}

// Función para cerrar sesión
function logout() {
    localStorage.removeItem('currentUser');
    window.location.href = 'login.html';
}

// Verificar si hay un usuario logueado al cargar la página
document.addEventListener('DOMContentLoaded', () => {
    if (window.location.pathname.endsWith('index.html')) {
        const currentUser = JSON.parse(localStorage.getItem('currentUser'));
        if (!currentUser) {
            window.location.href = 'login.html';
        } else {
            document.getElementById('username-display').textContent = currentUser.username;
        }
    }
});

// Manejar cierre de sesión
if (document.getElementById('logout-btn')) {
    document.getElementById('logout-btn').addEventListener('click', logout);
}
