


// Fade in 
document.addEventListener("DOMContentLoaded", () => {
  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("show");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.2 });

  const container = document.querySelector(".fade-in");
  if (container) {
    observer.observe(container);
  }
});


// Hero scroll 
document.addEventListener("DOMContentLoaded", () => {
  window.scrollToContent = function () {
    const content = document.getElementById("main-content");
    if (content) {
      content.scrollIntoView({ behavior: "smooth" });
    }
  };
});



// Contact - EMAILJS
document.addEventListener("DOMContentLoaded", function () {
  emailjs.init(EMAILJS_PUBLIC_KEY);

  const form = document.getElementById("contactForm");
  if (!form) return;

  const btn = document.getElementById("submitBtn");
  const status = document.getElementById("formStatus");

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    btn.disabled = true;
    btn.textContent = 'Sending...';
    status.style.display = 'none';

    const params = {
      from_name: document.getElementById('senderName').value,
      from_email: document.getElementById('senderEmail').value,
      message: document.getElementById('senderMessage').value,
    };

    emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, params)
      .then(() => {
        // Close modal after success
        const modalEl = document.getElementById("emailModal");
        const modalInstance = bootstrap.Modal.getInstance(modalEl);
        if (modalInstance) modalInstance.hide();

        showToast("Message sent successfully!");

        btn.textContent = 'Send Message';
        btn.disabled = false;
        form.reset();
      })
      .catch(() => {
        status.textContent = '// Failed to send. Try again.';
        status.style.color = 'var(--red)';
        status.style.display = 'block';
        btn.textContent = 'Send Message';
        btn.disabled = false;
      });
  });
});


function showToast(message) {
  let toast = document.getElementById("responseMessage");
  if (!toast) {
    toast = document.createElement("p");
    toast.id = "responseMessage";
    toast.style.cssText = `
      position: fixed;
      bottom: 20px;
      left: 50%;
      transform: translateX(-50%);
      padding: 10px 20px;
      background-color: rgba(205, 0, 0, 0.85);
      color: white;
      border-radius: 5px;
      font-size: 14px;
      font-family: 'Courier New', monospace;
      letter-spacing: 0.08em;
      z-index: 9999;
    `;
    document.body.appendChild(toast);
  }
  toast.innerText = message;
  toast.style.display = 'block';
  setTimeout(() => { toast.style.display = 'none'; }, 3000);
}
