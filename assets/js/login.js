
// Animación simple para los inputs
$(document).ready(function() {
    $('.form-control-custom').on('focus', function() {
        $(this).parent().addClass('focused');
    });
    
    $('.form-control-custom').on('blur', function() {
        if ($(this).val() === '') {
            $(this).parent().removeClass('focused');
        }
    });
    
    // Verificar si hay parámetros de error en la URL (para mostrar mensajes de error)
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.has('error')) {
        // Aquí podrías mostrar un mensaje de error bonito
        console.log('Error de login detectado');
    }
});

// Manejo del menú móvil
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const nav = document.querySelector('nav ul');

mobileMenuBtn.addEventListener('click', () => {
    nav.style.display = nav.style.display === 'flex' ? 'none' : 'flex';
});

