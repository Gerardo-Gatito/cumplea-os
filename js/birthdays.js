// Obtener el usuario actual
function getCurrentUser() {
    return JSON.parse(localStorage.getItem('currentUser'));
}

// Obtener todos los usuarios
function getAllUsers() {
    return JSON.parse(localStorage.getItem('users')) || [];
}

// Actualizar los cumpleaños de un usuario
function updateUserBirthdays(username, birthdays) {
    const users = getAllUsers();
    const userIndex = users.findIndex(user => user.username === username);
    
    if (userIndex !== -1) {
        users[userIndex].birthdays = birthdays;
        localStorage.setItem('users', JSON.stringify(users));
        
        // Actualizar el usuario actual si es el mismo
        const currentUser = getCurrentUser();
        if (currentUser && currentUser.username === username) {
            currentUser.birthdays = birthdays;
            localStorage.setItem('currentUser', JSON.stringify(currentUser));
        }
        
        return true;
    }
    
    return false;
}

// Añadir un nuevo cumpleaños
function addBirthday(name, date) {
    const user = getCurrentUser();
    if (!user) return false;
    
    const newBirthday = { id: Date.now(), name, date };
    user.birthdays.push(newBirthday);
    
    return updateUserBirthdays(user.username, user.birthdays);
}

// Editar un cumpleaños existente
function editBirthday(id, name, date) {
    const user = getCurrentUser();
    if (!user) return false;
    
    const birthdayIndex = user.birthdays.findIndex(b => b.id === id);
    if (birthdayIndex === -1) return false;
    
    user.birthdays[birthdayIndex] = { id, name, date };
    return updateUserBirthdays(user.username, user.birthdays);
}

// Eliminar un cumpleaños
function deleteBirthday(id) {
    const user = getCurrentUser();
    if (!user) return false;
    
    user.birthdays = user.birthdays.filter(b => b.id !== id);
    return updateUserBirthdays(user.username, user.birthdays);
}

// Cargar y mostrar la lista de cumpleaños
function loadBirthdays() {
    const user = getCurrentUser();
    if (!user) return;
    
    const birthdayList = document.getElementById('birthday-list');
    if (!birthdayList) return;
    
    birthdayList.innerHTML = '';
    
    if (user.birthdays.length === 0) {
        birthdayList.innerHTML = '<p>No hay cumpleaños registrados.</p>';
        return;
    }
    
    user.birthdays.forEach(birthday => {
        const formattedDate = new Date(birthday.date).toLocaleDateString('es-ES', {
            day: 'numeric', month: 'long'
        });
        
        const birthdayElement = document.createElement('div');
        birthdayElement.className = 'birthday-item';
        birthdayElement.innerHTML = `
            <div>
                <strong>${birthday.name}</strong>
                <p>${formattedDate}</p>
            </div>
        `;
        
        birthdayList.appendChild(birthdayElement);
    });
}

// Cargar cumpleaños para editar
function loadBirthdaysForEdit() {
    const user = getCurrentUser();
    if (!user) return;
    
    const editList = document.getElementById('edit-list');
    if (!editList) return;
    
    editList.innerHTML = '';
    
    if (user.birthdays.length === 0) {
        editList.innerHTML = '<p>No hay cumpleaños registrados.</p>';
        return;
    }
    
    user.birthdays.forEach(birthday => {
        const editItem = document.createElement('div');
        editItem.className = 'edit-item';
        editItem.innerHTML = `
            <form class="edit-form" data-id="${birthday.id}">
                <input type="text" value="${birthday.name}" required>
                <input type="date" value="${birthday.date}" required>
                <div class="edit-actions">
                    <button type="submit" class="btn">Guardar</button>
                    <button type="button" class="btn delete-btn">Eliminar</button>
                </div>
            </form>
        `;
        
        editList.appendChild(editItem);
    });
    
    // Agregar event listeners para los formularios de edición
    document.querySelectorAll('.edit-form').forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            const id = parseInt(this.getAttribute('data-id'));
            const name = this.querySelector('input[type="text"]').value;
            const date = this.querySelector('input[type="date"]').value;
            
            if (editBirthday(id, name, date)) {
                alert('Cumpleaños actualizado correctamente');
                loadBirthdaysForEdit();
            }
        });
    });
    
    // Agregar event listeners para los botones de eliminar
    document.querySelectorAll('.delete-btn').forEach(button => {
        button.addEventListener('click', function() {
            const form = this.closest('.edit-form');
            const id = parseInt(form.getAttribute('data-id'));
            
            if (confirm('¿Estás seguro de que quieres eliminar este cumpleaños?')) {
                if (deleteBirthday(id)) {
                    alert('Cumpleaños eliminado correctamente');
                    loadBirthdaysForEdit();
                }
            }
        });
    });
}
