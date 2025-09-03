
let currentStep = 1;

function nextStep(step) {
    // Validar el paso actual antes de avanzar
    if (step === 2 && !validateStep1()) {
        return;
    }
    if (step === 3 && !validateStep2()) {
        return;
    }
    
    // Ocultar el paso actual
    document.getElementById(`step${currentStep}`).classList.remove('active');
    document.getElementById(`step${currentStep}-indicator`).classList.remove('active');
    
    // Mostrar el siguiente paso
    document.getElementById(`step${step}`).classList.add('active');
    document.getElementById(`step${step}-indicator`).classList.add('active');
    
    currentStep = step;
}

function prevStep(step) {
    // Ocultar el paso actual
    document.getElementById(`step${currentStep}`).classList.remove('active');
    document.getElementById(`step${currentStep}-indicator`).classList.remove('active');
    
    // Mostrar el paso anterior
    document.getElementById(`step${step}`).classList.add('active');
    document.getElementById(`step${step}-indicator`).classList.add('active');
    
    currentStep = step;
}

function validateStep1() {
    const nombre = document.getElementById('nombre').value;
    const tipoDocumento = document.getElementById('tipo_documento').value;
    const documento = document.getElementById('documento').value;
    const telefono = document.getElementById('telefono').value;
    const email = document.getElementById('email').value;
    
    if (!nombre || !tipoDocumento || !documento || !telefono || !email) {
        alert('Por favor, complete todos los campos obligatorios.');
        return false;
    }
    
    // Validación básica de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        alert('Por favor, ingrese un correo electrónico válido.');
        return false;
    }
    
    return true;
}

function validateStep2() {
    const direccionFacturacion = document.getElementById('direccion_facturacion').value;
    const direccion = document.getElementById('direccion').value;
    
    if (!direccionFacturacion || !direccion) {
        alert('Por favor, complete todas las direcciones.');
        return false;
    }
    
    return true;
}

// Función para verificar fortaleza de contraseña
function checkPasswordStrength(password) {
    let strength = 0;
    const strengthBar = document.getElementById('passwordStrengthBar');
    const strengthText = document.getElementById('passwordStrengthText');
    
    if (password.length >= 8) strength += 20;
    if (password.match(/[a-z]+/)) strength += 20;
    if (password.match(/[A-Z]+/)) strength += 20;
    if (password.match(/[0-9]+/)) strength += 20;
    if (password.match(/[!@#$%^&*(),.?":{}|<>]+/)) strength += 20;
    
    strengthBar.style.width = strength + '%';
    
    if (strength < 40) {
        strengthBar.style.backgroundColor = '#dc3545';
        strengthText.textContent = 'Contraseña débil';
    } else if (strength < 80) {
        strengthBar.style.backgroundColor = '#fd7e14';
        strengthText.textContent = 'Contraseña moderada';
    } else {
        strengthBar.style.backgroundColor = '#198754';
        strengthText.textContent = 'Contraseña fuerte';
    }
}

// Función para verificar coincidencia de contraseñas
function checkPasswordMatch() {
    const password = document.getElementById('contrasena').value;
    const confirmPassword = document.getElementById('confirmar_contrasena').value;
    const matchText = document.getElementById('passwordMatchText');
    
    if (confirmPassword === '') {
        matchText.textContent = '';
    } else if (password === confirmPassword) {
        matchText.textContent = 'Las contraseñas coinciden';
        matchText.style.color = '#198754';
    } else {
        matchText.textContent = 'Las contraseñas no coinciden';
        matchText.style.color = '#dc3545';
    }
}

// Copiar dirección de facturación a dirección de envío
document.getElementById('misma_direccion').addEventListener('change', function() {
    if (this.checked) {
        document.getElementById('direccion').value = document.getElementById('direccion_facturacion').value;
    }
});

// Event listeners para verificación de contraseña
document.getElementById('contrasena').addEventListener('input', function() {
    checkPasswordStrength(this.value);
    checkPasswordMatch();
});

document.getElementById('confirmar_contrasena').addEventListener('input', checkPasswordMatch);

// Validación del formulario completo antes de enviar
document.getElementById('registerForm').addEventListener('submit', function(e) {
    if (!validateStep3()) {
        e.preventDefault();
    }
});

function validateStep3() {
    const usuario = document.getElementById('usuario').value;
    const contrasena = document.getElementById('contrasena').value;
    const confirmarContrasena = document.getElementById('confirmar_contrasena').value;
    const terminos = document.getElementById('terminos').checked;
    
    if (!usuario || usuario.length < 4) {
        alert('El nombre de usuario debe tener al menos 4 caracteres.');
        return false;
    }
    
    if (!contrasena || contrasena.length < 8) {
        alert('La contraseña debe tener al menos 8 caracteres.');
        return false;
    }
    
    if (contrasena !== confirmarContrasena) {
        alert('Las contraseñas no coinciden.');
        return false;
    }
    
    if (!terminos) {
        alert('Debe aceptar los términos y condiciones.');
        return false;
    }
    
    return true;
}


// Manejo del menú móvil
const menuBtn = document.getElementById("menu-btn");
const menu = document.getElementById("menu");

menuBtn.addEventListener("click", () => {
  menu.classList.toggle("show");
});

