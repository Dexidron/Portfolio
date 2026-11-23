// Apparition des sections au scroll
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add("show");
            observer.unobserve(entry.target);
        }
    });
}, { threshold: 0.1 });

document.querySelectorAll(".hidden").forEach(el => observer.observe(el));


// Bouton "À propos" → remonter en haut
document.querySelectorAll('a[href="#"]').forEach(link => {
    link.addEventListener("click", (e) => {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: "smooth" });
    });
});


// Lien actif dans la navigation selon la section visible
const navLinks = document.querySelectorAll('nav a[href^="#"]');
const aboutLink = document.querySelector('nav a[href="#"]');
const sections = document.querySelectorAll("section[id]");

function updateActiveLink() {
    let current = null;
    sections.forEach(section => {
        if (section.getBoundingClientRect().top <= 150) current = section.id;
    });

    navLinks.forEach(link => link.classList.remove("active"));

    if (current) {
        const active = document.querySelector(`nav a[href="#${current}"]`);
        if (active) active.classList.add("active");
    } else if (aboutLink) {
        aboutLink.classList.add("active");
    }
}

window.addEventListener("scroll", updateActiveLink, { passive: true });
updateActiveLink();


// Bouton retour en haut
const toTop = document.getElementById("to-top");
window.addEventListener("scroll", () => {
    toTop.classList.toggle("visible", window.scrollY > 600);
}, { passive: true });

// Copier l'adresse email
const copyBtn = document.getElementById("copy-email");
if (copyBtn) {
    copyBtn.addEventListener("click", async () => {
        try {
            await navigator.clipboard.writeText("nathan.dugal28@gmail.com");
            copyBtn.textContent = "Adresse copiée !";
        } catch {
            copyBtn.textContent = "Copie impossible";
        }
        setTimeout(() => copyBtn.textContent = "Copier l'adresse", 2000);
    });
}
