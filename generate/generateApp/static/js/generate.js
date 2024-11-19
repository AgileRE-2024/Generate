document.querySelectorAll('.card-container').forEach(card => {
    card.addEventListener('click', function(e) {
        e.preventDefault();
        
        document.body.style.opacity = '0';
        setTimeout(() => {
            window.location.href = this.getAttribute('href');
        }, 300);
    });
});

window.addEventListener('load', () => {
    document.body.style.opacity = '1';
});

document.body.style.transition = 'opacity 0.3s ease';