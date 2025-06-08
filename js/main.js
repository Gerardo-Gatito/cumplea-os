// Manejar la navegación entre menús
document.addEventListener('DOMContentLoaded', () => {
    const mainMenu = document.getElementById('main-menu');
    const viewMenu = document.getElementById('view-menu');
    const createMenu = document.getElementById('create-menu');
    const editMenu = document.getElementById('edit-menu');
    
    // Mostrar el menú principal al cargar la página
    showMenu(mainMenu);
    
    // Manejar clics en los botones del menú
    document.querySelectorAll('.menu-btn').forEach(button => {
        button.addEventListener('click', () => {
            const action = button.getAttribute('data-action');
            
            switch(action) {
                case 'view':
                    loadBirthdays();
                    showMenu(viewMenu);
                    break;
                case 'create':
                    showMenu(createMenu);
                    break;
                case 'edit':
                    loadBirthdaysForEdit();
                    showMenu(editMenu);
                    break;
            }
        });
    });
    
    // Manejar el botón de volver
    document.querySelectorAll('.back-btn').forEach(button => {
        button.addEventListener('click', () => {
            showMenu(mainMenu);
        });
    });
    
    // Manejar el formulario de creación
    const createForm = document.getElementById('create-form');
    if (createForm) {
        createForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const name = document.getElementById('name').value;
            const date = document.getElementById('date').value;
            
            if (addBirthday(name, date)) {
                alert('Cumpleaños añadido correctamente');
                this.reset();
                showMenu(mainMenu);
            } else {
                alert('Error al añadir el cumpleaños');
            }
        });
    }
});

function showMenu(menuToShow) {
    // Ocultar todos los menús
    document.querySelectorAll('.container > div:not(header)').forEach(menu => {
        menu.classList.add('hidden');
    });
    
    // Mostrar el menú seleccionado
    menuToShow.classList.remove('hidden');
}
