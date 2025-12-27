document.addEventListener('DOMContentLoaded', () => {
    const btn = document.getElementById('btn-click');
    const counterDisplay = document.getElementById('counter');
    const statusText = document.getElementById('status');

    let count = 0;

    btn.addEventListener('click', () => {
        count++;
        counterDisplay.textContent = count;
        
        // Update status UI
        statusText.textContent = `Tombol diklik ${count} kali`;
        statusText.style.background = '#dcfce7';
        statusText.style.color = '#166534';

        // Efek feedback kecil
        btn.style.transform = 'scale(0.95)';
        setTimeout(() => {
            btn.style.transform = 'scale(1)';
        }, 100);
    });

    console.log("Aplikasi siap digunakan di GitHub Pages!");
});