document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('modpackForm');
    const listContainer = document.getElementById('modpackList');
    const successMsg = document.getElementById('formSuccess');


    loadModpacks();

    form.addEventListener('submit', (e) => {
        e.preventDefault(); 
        
        let isValid = true;
        

        const username = document.getElementById('username').value.trim();
        const email = document.getElementById('email').value.trim();
        const packName = document.getElementById('packName').value.trim();
        const category = document.getElementById('category').value;


        clearErrors();


        if (username.length < 3) {
            showError('username', 'El nombre debe tener al menos 3 caracteres.');
            isValid = false;
        }


        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            showError('email', 'Introduce un correo válido.');
            isValid = false;
        }


        if (packName === '') {
            showError('packName', 'El nombre del modpack es obligatorio.');
            isValid = false;
        }


        if (category === '') {
            showError('category', 'Debes seleccionar una categoría.');
            isValid = false;
        }


        if (isValid) {
            const newPack = {
                id: Date.now(),
                username: username,
                email: email,
                packName: packName,
                category: category
            };
            
            saveModpack(newPack);
            
            successMsg.textContent = "¡Guardado correctamente!";
            form.reset();
            

            loadModpacks();
            
            setTimeout(() => successMsg.textContent = '', 3000);
        }
    });


    function showError(fieldId, msg) {
        const input = document.getElementById(fieldId);
        const errorSpan = document.getElementById('error-' + fieldId);
        input.classList.add('input-error');
        errorSpan.textContent = msg;
        errorSpan.style.display = 'block';
    }

    function clearErrors() {
        document.querySelectorAll('.input-error').forEach(el => el.classList.remove('input-error'));
        document.querySelectorAll('.error-msg').forEach(el => el.style.display = 'none');
    }


    function saveModpack(item) {
        let list = JSON.parse(localStorage.getItem('myModpacks')) || [];
        list.push(item);
        localStorage.setItem('myModpacks', JSON.stringify(list));
    }

    function loadModpacks() {
        let list = JSON.parse(localStorage.getItem('myModpacks')) || [];
        listContainer.innerHTML = '';

        if (list.length === 0) {
            listContainer.innerHTML = '<p style="grid-column: 1/-1; text-align: center; color: #aaa;">No hay sugerencias aún.</p>';
            return;
        }


        list.reverse().forEach(pack => {
            const card = document.createElement('div');
            card.className = 'crud-item';
            card.innerHTML = `
                <h3>${sanitize(pack.packName)}</h3>
                <p><strong>Categoría:</strong> ${sanitize(pack.category)}</p>
                <p><strong>Usuario:</strong> ${sanitize(pack.username)}</p>
            `;
            listContainer.appendChild(card);
        });
    }


    function sanitize(str) {
        const temp = document.createElement('div');
        temp.textContent = str;
        return temp.innerHTML;
    }
});