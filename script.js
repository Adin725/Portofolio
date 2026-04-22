// --- 1. Typing Animation ---
const textElement = document.querySelector(".typing-text");
// Array kata-kata yang akan muncul bergantian
const words = ["DATA SCIENCE ENTHUSIAST", "WELCOME TO MY PORTFOLIO"];
let wordIndex = 0;
let charIndex = 0;
let isDeleting = false;

function typeEffect() {
    if (!textElement) return;

    const currentWord = words[wordIndex];
    
    if (isDeleting) {
        // Menghapus huruf
        charIndex--;
        textElement.textContent = currentWord.substring(0, charIndex);
    } else {
        // Mengetik huruf
        charIndex++;
        textElement.textContent = currentWord.substring(0, charIndex);
    }

    // Mengatur kecepatan mengetik dan menghapus
    let typeSpeed = isDeleting ? 50 : 100;

    if (!isDeleting && charIndex === currentWord.length) {
        isDeleting = true;
        typeSpeed = 2000; 
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        wordIndex = (wordIndex + 1) % words.length;
        typeSpeed = 500;
    }

    setTimeout(typeEffect, typeSpeed);
}

// Jalankan
document.addEventListener("DOMContentLoaded", typeEffect);


// --- 2. Header Scroll Effect ---
const header = document.querySelector("header");
let lastScrollTop = 0;

window.addEventListener("scroll", () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    // Tambahkan background gelap saat discroll
    if (scrollTop > 50) {
        header.classList.add("scrolled");
    } else {
        header.classList.remove("scrolled");
    }

    // Sembunyikan header saat scroll ke bawah, dan munculkan saat ke atas
    if (scrollTop > lastScrollTop && scrollTop > 100) {
        header.classList.add("hidden");
    } else {
        header.classList.remove("hidden");
    }
    lastScrollTop = scrollTop;
});


// --- 3. Custom Cursor Logic ---
const cursorDot = document.querySelector(".cursor-dot");
const cursorOutline = document.querySelector(".cursor-outline");

window.addEventListener("mousemove", (e) => {
    const posX = e.clientX;
    const posY = e.clientY;

    if (cursorDot && cursorOutline) {
        cursorDot.style.left = `${posX}px`;
        cursorDot.style.top = `${posY}px`;

        cursorOutline.animate({
            left: `${posX}px`,
            top: `${posY}px`
        }, { duration: 500, fill: "forwards" });
    }
});

const hoverTriggers = document.querySelectorAll(".hover-trigger, a, button");
hoverTriggers.forEach(trigger => {
    trigger.addEventListener("mouseenter", () => {
        document.body.classList.add("hovering");
    });
    trigger.addEventListener("mouseleave", () => {
        document.body.classList.remove("hovering");
    });
});


// --- 4. Lightbox Gallery ---
const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightbox-img");
const galleryImages = document.querySelectorAll(".masonry-item img");
const closeBtn = document.querySelector(".close-lightbox");

if (lightbox) {
    galleryImages.forEach(img => {
        img.addEventListener("click", () => {
            lightbox.style.display = "flex";
            lightboxImg.src = img.src;
        });
    });

    closeBtn.addEventListener("click", () => {
        lightbox.style.display = "none";
    });

    lightbox.addEventListener("click", (e) => {
        if (e.target !== lightboxImg) {
            lightbox.style.display = "none";
        }
    });
}
// --- 5. Auto Year Footer 
const yearSpan = document.getElementById("year");
if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
}

// --- 6. Certificate Logic ---
const certModal = document.getElementById("cert-modal");
const certImgFull = document.getElementById("cert-img-full");

function openCert(element) {
    const imgSource = element.querySelector("img").src;
    certModal.style.display = "flex";
    certImgFull.src = imgSource;
    document.body.style.overflow = "hidden"; 
}

// Fungsi tutup modal
function closeCert() {
    certModal.style.display = "none";
    document.body.style.overflow = "auto"; 
}

// Tutup jika klik di luar gambar
window.onclick = function(event) {
    if (event.target == certModal) {
        closeCert();
    }
}


// --- 7. Contact Form 
const contactForm  = document.getElementById('contact-form');
const formResponse = document.getElementById('form-response');

if (contactForm && formResponse) {

    /**
     * Tampilkan pesan notifikasi di bawah tombol submit.
     * @param {string} msg   - Teks yang ditampilkan
     * @param {boolean} isOk - true = sukses (hijau), false = error (merah)
     */
    function showFormResponse(msg, isOk) {
        formResponse.textContent = msg;
        formResponse.style.display    = 'block';
        formResponse.style.background = isOk
            ? 'rgba(0, 200, 120, 0.15)'
            : 'rgba(255, 70, 70, 0.15)';
        formResponse.style.color  = isOk ? '#00e888' : '#ff6b6b';
        formResponse.style.border = isOk
            ? '1px solid rgba(0, 200, 120, 0.4)'
            : '1px solid rgba(255, 70, 70, 0.4)';
    }

    contactForm.addEventListener('submit', async function (e) {
        // Cegah reload halaman (submit biasa)
        e.preventDefault();

        // Ubah tombol agar user tahu sedang proses
        const btn = contactForm.querySelector('button[type="submit"]');
        const originalText = btn.textContent;
        btn.textContent = 'SENDING…';
        btn.disabled    = true;
        formResponse.style.display = 'none';

        // Kumpulkan data form
        const payload = {
            name:    contactForm.querySelector('[name="name"]').value.trim(),
            email:   contactForm.querySelector('[name="email"]').value.trim(),
            subject: contactForm.querySelector('[name="subject"]').value.trim(),
            message: contactForm.querySelector('[name="message"]').value.trim(),
        };

        try {
            const res  = await fetch('backend/contact.php', {
                method:  'POST',
                headers: { 'Content-Type': 'application/json' },
                body:    JSON.stringify(payload),
            });

            const data = await res.json();

            if (data.success) {
                showFormResponse((data.message || 'Pesan berhasil dikirim!'), true);
                contactForm.reset();   // Kosongkan semua field
            } else {
                showFormResponse((data.error || 'Terjadi kesalahan. Coba lagi.'), false);
            }
        } catch (err) {
            // Gagal fetch (misal: server mati, atau network error)
            showFormResponse('Tidak dapat terhubung ke server. Pastikan backend berjalan.', false);
        } finally {
            // Kembalikan tombol ke keadaan semula
            btn.textContent = originalText;
            btn.disabled    = false;
        }
    });
}

// --- 8. God-Tier Splash Screen Logic ---
window.addEventListener("load", () => {
    const splashScreen = document.getElementById("splash-screen");
    const body = document.body;

    if (splashScreen) {
        // Durasi total animasi loader progress (2.8s) + sedikit buffer
        setTimeout(() => {
            // Trigger shutter untuk membuka
            splashScreen.classList.add("loaded");
            
            // Setelah animasi shutter selesai (1.2s), hapus dari DOM dan izinkan scrolling
            setTimeout(() => {
                splashScreen.classList.add("hidden");
                body.classList.remove("no-scroll");
            }, 1200); 
        }, 3000); 
    }
});

// --- 9. Bio Typing Animation (God-tier) ---
const bioTrigger = document.getElementById("bio-trigger");
const bioTypedText = document.getElementById("bio-typed-text");
const bioCursor = document.getElementById("bio-cursor");

const fullBioText = " Informatics student at Syiah Kuala University with a keen interest in Mathematics, Machine Learning, and Data Science. I enjoy exploring how data and algorithms can be applied to solve real world challenges. Currently, I am focused on learning and developing practical, data driven solutions that are both effective and impactful.";

let bioCharIndex = 0;
let isBioTyping = false;

function typeBio() {
    if (bioCharIndex < fullBioText.length) {
        bioTypedText.textContent += fullBioText.charAt(bioCharIndex);
        bioCharIndex++;
        // Variasi kecepatan typing agar terasa lebih natural/pro (30ms - 60ms)
        const nextSpeed = Math.random() * 30 + 30; 
        setTimeout(typeBio, nextSpeed);
    } else {
        // Menghilangkan kursor setelah selesai
        if (bioCursor) {
            bioCursor.style.display = "none";
        }
    }
}

if (bioTrigger) {
    bioTrigger.addEventListener("mouseenter", () => {
        if (!isBioTyping) {
            isBioTyping = true;
            bioTrigger.classList.add("bio-typing-active");
            typeBio();
        }
    });
}

// --- 10. Community Messages Logic ---
async function loadMessages() {
    const container = document.getElementById("messages-container");
    if (!container) return;

    try {
        const response = await fetch('backend/get_messages.php');
        const result = await response.json();

        if (result.success && result.data.length > 0) {
            container.innerHTML = ""; // Clear loader
            result.data.forEach((msg, index) => {
                const card = document.createElement("div");
                card.className = "message-card";
                card.setAttribute("data-aos", "fade-up");
                card.setAttribute("data-aos-delay", (index * 100).toString());

                const initial = msg.name.charAt(0).toUpperCase();
                const dateStr = msg.created_at ? new Date(msg.created_at).toLocaleDateString() : "Recently";

                card.innerHTML = `
                    <div class="message-user">
                        <div class="user-avatar">${initial}</div>
                        <div class="user-info">
                            <h3>${msg.name}</h3>
                            <span>${dateStr}</span>
                        </div>
                    </div>
                    <div class="message-content">
                        <p>${msg.message}</p>
                    </div>
                `;
                container.appendChild(card);
            });
            if (typeof AOS !== 'undefined') {
                AOS.refresh();
            }
        } else {
            container.innerHTML = `<div class="empty-state" style="color: #666; text-align: center; grid-column: 1/-1; padding: 3rem; font-style: italic;">No community messages yet. Be the first to say hi!</div>`;
        }
    } catch (error) {
        console.error("Error loading messages:", error);
        container.innerHTML = `<div class="error-state" style="color: #ff6b6b; text-align: center; grid-column: 1/-1; padding: 3rem;">Failed to load messages.</div>`;
    }
}

// Tambahkan inisialisasi Community Feed ke DOMContentLoaded yang sudah ada atau buat baru
document.addEventListener("DOMContentLoaded", () => {
    loadMessages();
});

// --- 11. Toggle Comments Logic ---
const toggleBtn = document.getElementById("toggle-comments");
const messagesGrid = document.getElementById("messages-container");

if (toggleBtn && messagesGrid) {
    toggleBtn.addEventListener("click", () => {
        const isCollapsed = messagesGrid.classList.contains("collapsed");
        
        if (isCollapsed) {
            messagesGrid.classList.remove("collapsed");
            toggleBtn.classList.add("active");
            toggleBtn.querySelector("span").textContent = "Hide Feed";
            
            // Refresh AOS specifically for the new view
            if (typeof AOS !== 'undefined') {
                setTimeout(() => AOS.refresh(), 100);
            }
        } else {
            messagesGrid.classList.add("collapsed");
            toggleBtn.classList.remove("active");
            toggleBtn.querySelector("span").textContent = "Show Feed";
        }
    });
}