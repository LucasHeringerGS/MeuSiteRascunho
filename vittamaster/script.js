// Efeito suave de entrada (desdobrar leve do papel ao carregar)
document.addEventListener("DOMContentLoaded", () => {
    const lembrete = document.getElementById("lembrete");
    
    if (lembrete) {
        lembrete.style.opacity = "0";
        lembrete.style.transform = "translateY(25px) rotate(-2deg)";
        lembrete.style.transition = "all 0.8s cubic-bezier(0.16, 1, 0.3, 1)";
        
        setTimeout(() => {
            lembrete.style.opacity = "1";
            lembrete.style.transform = "translateY(0) rotate(-0.5deg)";
        }, 150);
    }
});