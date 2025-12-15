// Portfolio JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Initialize EmailJS
    emailjs.init('vTQabSyBj9TTkzrfr'); // EmailJS public key
    
    // ===== LOADER =====
    const loader = document.querySelector('.loader');
    setTimeout(() => {
        loader.classList.add('hidden');
    }, 1000);
    
    // ===== THEME TOGGLE =====
    const themeToggle = document.getElementById('theme-switch');
    const currentTheme = localStorage.getItem('theme') || 'light';
    
    if (currentTheme === 'dark') {
        document.body.classList.add('dark-theme');
        themeToggle.checked = true;
    }
    
    themeToggle.addEventListener('change', function() {
        if (this.checked) {
            document.body.classList.add('dark-theme');
            localStorage.setItem('theme', 'dark');
        } else {
            document.body.classList.remove('dark-theme');
            localStorage.setItem('theme', 'light');
        }
    });
    
    // ===== MOBILE MENU =====
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');
    
    mobileMenuBtn.addEventListener('click', function() {
        navLinks.classList.toggle('active');
        this.querySelector('i').classList.toggle('fa-bars');
        this.querySelector('i').classList.toggle('fa-times');
    });
    
    // Close mobile menu when clicking on a link
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            mobileMenuBtn.querySelector('i').classList.remove('fa-times');
            mobileMenuBtn.querySelector('i').classList.add('fa-bars');
        });
    });
    
    // ===== ACTIVE NAV LINK ON SCROLL =====
    const sections = document.querySelectorAll('section');
    const navItems = document.querySelectorAll('.nav-link');
    
    window.addEventListener('scroll', () => {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (scrollY >= (sectionTop - 100)) {
                current = section.getAttribute('id');
            }
        });
        
        navItems.forEach(item => {
            item.classList.remove('active');
            if (item.getAttribute('href').substring(1) === current) {
                item.classList.add('active');
            }
        });
    });
    
    // ===== ANIMATED COUNTERS =====
    const counters = document.querySelectorAll('.stat-number');
    const speed = 200;
    
    const startCounter = (counter) => {
        const target = +counter.getAttribute('data-count');
        const count = +counter.innerText;
        const increment = target / speed;
        
        if (count < target) {
            counter.innerText = Math.ceil(count + increment);
            setTimeout(() => startCounter(counter), 10);
        } else {
            counter.innerText = target;
        }
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                counters.forEach(counter => {
                    startCounter(counter);
                });
            }
        });
    }, { threshold: 0.5 });
    
    observer.observe(document.querySelector('.hero'));
    
    // ===== TYPING EFFECT =====
    const typingText = document.querySelector('.typing-text');
    const phrases = [
        'C#',
        'Java',
        '.NET',
        'JavaScript',
        'HTML/CSS',
        'clean code',
        'problem-solving'
    ];
    let phraseIndex = 0;
    let letterIndex = 0;
    let isDeleting = false;
    
    function type() {
        const currentPhrase = phrases[phraseIndex];
        
        if (isDeleting) {
            typingText.textContent = currentPhrase.substring(0, letterIndex - 1);
            letterIndex--;
        } else {
            typingText.textContent = currentPhrase.substring(0, letterIndex + 1);
            letterIndex++;
        }
        
        if (!isDeleting && letterIndex === currentPhrase.length) {
            isDeleting = true;
            setTimeout(type, 1500);
        } else if (isDeleting && letterIndex === 0) {
            isDeleting = false;
            phraseIndex = (phraseIndex + 1) % phrases.length;
            setTimeout(type, 500);
        } else {
            setTimeout(type, isDeleting ? 50 : 100);
        }
    }
    
    type();
    
    // ===== ANIMATE SKILL BARS =====
    const skillItems = document.querySelectorAll('.skill-item');
    
    const animateSkills = () => {
        skillItems.forEach(item => {
            const skillFill = item.querySelector('.skill-fill');
            const level = item.getAttribute('data-level');
            skillFill.style.width = `${level}%`;
        });
    };
    
    const skillsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateSkills();
            }
        });
    }, { threshold: 0.3 });
    
    if (document.querySelector('.skills')) {
        skillsObserver.observe(document.querySelector('.skills'));
    }
    
    // ===== PROJECT FILTERING =====
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            button.classList.add('active');
            
            const filterValue = button.getAttribute('data-filter');
            
            projectCards.forEach(card => {
                if (filterValue === 'all' || card.getAttribute('data-category') === filterValue) {
                    card.classList.remove('hidden');
                } else {
                    card.classList.add('hidden');
                }
            });
        });
    });
    
    // ===== SKILLS ASSESSMENT QUIZ =====
    const quizQuestions = [
        {
            question: "What is the output of: <code>Console.WriteLine(5 + '5')</code> in C#?",
            options: ["55", "10", "Error", "5"],
            correct: 0,
            explanation: "In C#, when you use the + operator with a string and a number, it performs string concatenation."
        },
        {
            question: "Which HTML tag is used for the largest heading?",
            options: ["&lt;h6&gt;", "&lt;heading&gt;", "&lt;h1&gt;", "&lt;head&gt;"],
            correct: 2,
            explanation: "&lt;h1&gt; is the largest heading tag in HTML."
        },
        {
            question: "In Java, which keyword is used to create a subclass?",
            options: ["subclass", "inherits", "extends", "implements"],
            correct: 2,
            explanation: "The 'extends' keyword is used to create a subclass in Java."
        },
        {
            question: "What does CSS stand for?",
            options: [
                "Computer Style Sheets",
                "Creative Style System",
                "Cascading Style Sheets",
                "Colorful Style Sheets"
            ],
            correct: 2,
            explanation: "CSS stands for Cascading Style Sheets."
        }
    ];
    
    let currentQuestion = 0;
    const quizContainer = document.querySelector('.quiz-container');
    const quizQuestion = document.querySelector('.quiz-question p');
    const quizOptions = document.querySelector('.quiz-options');
    const quizFeedback = document.querySelector('.quiz-feedback');
    const nextBtn = document.getElementById('next-question');
    
    function loadQuestion() {
        const question = quizQuestions[currentQuestion];
        quizQuestion.innerHTML = question.question;
        
        quizOptions.innerHTML = '';
        question.options.forEach((option, index) => {
            const button = document.createElement('button');
            button.className = 'quiz-option';
            button.innerHTML = option;
            button.addEventListener('click', () => checkAnswer(index));
            quizOptions.appendChild(button);
        });
        
        quizFeedback.style.display = 'none';
        nextBtn.style.display = 'none';
    }
    
    function checkAnswer(selectedIndex) {
        const question = quizQuestions[currentQuestion];
        const options = document.querySelectorAll('.quiz-option');
        
        options.forEach((option, index) => {
            option.disabled = true;
            if (index === question.correct) {
                option.classList.add('correct');
            } else if (index === selectedIndex) {
                option.classList.add('wrong');
            }
        });
        
        quizFeedback.innerHTML = question.explanation;
        quizFeedback.className = 'quiz-feedback ' + 
            (selectedIndex === question.correct ? 'correct' : 'wrong');
        quizFeedback.style.display = 'block';
        nextBtn.style.display = 'block';
    }
    
    nextBtn.addEventListener('click', () => {
        currentQuestion = (currentQuestion + 1) % quizQuestions.length;
        loadQuestion();
    });
    
    if (quizContainer) {
        loadQuestion();
    }
    
    // ===== CONTACT FORM =====
    const contactForm = document.getElementById('contactForm');
    const formSuccess = document.getElementById('formSuccess');
    
    if (contactForm) {
        contactForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            // Reset errors
            document.querySelectorAll('.form-error').forEach(error => {
                error.style.display = 'none';
            });
            
            // Get form values
            const name = document.getElementById('contactName').value.trim();
            const email = document.getElementById('contactEmail').value.trim();
            const subject = document.getElementById('contactSubject').value.trim();
            const message = document.getElementById('contactMessage').value.trim();
            
            let isValid = true;
            
            // Validation
            if (!name) {
                document.getElementById('nameError').textContent = 'Name is required';
                document.getElementById('nameError').style.display = 'block';
                isValid = false;
            }
            
            if (!email) {
                document.getElementById('emailError').textContent = 'Email is required';
                document.getElementById('emailError').style.display = 'block';
                isValid = false;
            } else if (!isValidEmail(email)) {
                document.getElementById('emailError').textContent = 'Please enter a valid email';
                document.getElementById('emailError').style.display = 'block';
                isValid = false;
            }
            
            if (!subject) {
                document.getElementById('subjectError').textContent = 'Subject is required';
                document.getElementById('subjectError').style.display = 'block';
                isValid = false;
            }
            
            if (!message) {
                document.getElementById('messageError').textContent = 'Message is required';
                document.getElementById('messageError').style.display = 'block';
                isValid = false;
            }
            
            if (!isValid) return;
            
            // Show loading state
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
            submitBtn.disabled = true;
            
            try {
                // Send email using EmailJS
                await emailjs.send(
                    'service_p4c959z', // EmailJS service ID
                    'template_hz5bbv8', // EmailJS template ID
                    {
                        from_name: name,
                        from_email: email,
                        subject: subject,
                        message: message,
                        to_email: 'sibusibo.mhlongo@gmail.com'
                    }
                );
                
                // Show success message
                formSuccess.textContent = 'Thank you! Your message has been sent successfully.';
                formSuccess.style.display = 'block';
                contactForm.reset();
                
                // Hide success message after 5 seconds
                setTimeout(() => {
                    formSuccess.style.display = 'none';
                }, 5000);
                
            } catch (error) {
                console.error('Email sending failed:', error);
                formSuccess.textContent = 'Sorry, there was an error sending your message. Please try again.';
                formSuccess.style.color = '#e74c3c';
                formSuccess.style.display = 'block';
            } finally {
                // Reset button state
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
            }
        });
    }
    
    function isValidEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }
    
    // ===== PROJECT MODAL =====
    const projectModal = document.getElementById('projectModal');
    const projectViews = document.querySelectorAll('.project-view, .project-link[data-project]');
    const modalClose = document.querySelectorAll('.modal-close');
    
    const projectDetails = {
        1: {
            title: "Student Management System",
            description: "A comprehensive desktop application built with C# and .NET for managing student records, grades, and attendance. Features include data validation, SQL database integration, and report generation.",
            technologies: ["C#", ".NET Framework", "SQL Server", "WinForms", "Entity Framework"],
            features: [
                "Student registration and profile management",
                "Grade calculation and transcript generation",
                "Attendance tracking system",
                "Report generation in PDF format",
                "User authentication and authorization"
            ],
            github: "#",
            demo: "#",
            image: "https://images.unsplash.com/photo-1551650975-87deedd944c3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
        },
        2: {
            title: "E-Commerce Platform",
            description: "A fully responsive online store with complete shopping functionality. Built with modern web technologies and featuring a clean, user-friendly interface.",
            technologies: ["HTML5", "CSS3", "JavaScript", "Bootstrap 5", "LocalStorage API"],
            features: [
                "Product catalog with filtering and search",
                "Shopping cart with persistent storage",
                "Checkout process with form validation",
                "Responsive design for all devices",
                "Product reviews and ratings system"
            ],
            github: "#",
            demo: "#",
            image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
        },
        3: {
            title: "Banking Application",
            description: "Console-based banking simulation built with Java, implementing object-oriented programming principles and file handling for data persistence.",
            technologies: ["Java", "OOP", "File I/O", "Collections Framework", "Exception Handling"],
            features: [
                "Account creation and management",
                "Deposit, withdrawal, and transfer operations",
                "Transaction history with date filtering",
                "Data persistence using text files",
                "Input validation and error handling"
            ],
            github: "#",
            demo: "#",
            image: "https://images.unsplash.com/photo-1555421689-491a97ff2040?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
        }
    };
    
    projectViews.forEach(view => {
        view.addEventListener('click', (e) => {
            e.preventDefault();
            const projectId = view.getAttribute('data-project');
            const project = projectDetails[projectId];
            
            if (project) {
                const modalBody = projectModal.querySelector('.modal-body');
                modalBody.innerHTML = `
                    <div class="project-modal-content">
                        <div class="project-modal-image">
                            <img src="${project.image}" alt="${project.title}">
                        </div>
                        <div class="project-modal-info">
                            <h2>${project.title}</h2>
                            <p class="project-modal-description">${project.description}</p>
                            
                            <div class="project-modal-section">
                                <h3><i class="fas fa-code"></i> Technologies Used</h3>
                                <div class="project-tech">
                                    ${project.technologies.map(tech => `<span class="tech-tag">${tech}</span>`).join('')}
                                </div>
                            </div>
                            
                            <div class="project-modal-section">
                                <h3><i class="fas fa-star"></i> Key Features</h3>
                                <ul class="project-features">
                                    ${project.features.map(feature => `<li><i class="fas fa-check"></i> ${feature}</li>`).join('')}
                                </ul>
                            </div>
                            
                            <div class="project-modal-links">
                                <a href="${project.github}" target="_blank" class="btn btn-primary">
                                    <i class="fab fa-github"></i> View Code
                                </a>
                                <a href="${project.demo}" target="_blank" class="btn btn-secondary">
                                    <i class="fas fa-eye"></i> Live Demo
                                </a>
                            </div>
                        </div>
                    </div>
                `;
                
                projectModal.classList.add('show');
                document.body.style.overflow = 'hidden';
            }
        });
    });
    
// ===== CERTIFICATE MODAL =====
const certificateModal = document.getElementById('certificateModal');
const certificateButtons = document.querySelectorAll('.view-certificate');

const certificateDetails = {
    fnb: {
        title: "FNB App Academy - Full Stack Development",
        issuer: "First National Bank App Academy",
        date: "July 2025",
        description: "Comprehensive full-stack development certification covering front-end and back-end technologies.",
        skills: ["HTML/CSS", "JavaScript", "React", "Node.js", "MongoDB", "APIs", "Git"],
        image: "Documents/fnb_app_academy.jpg",
        download: "Documents/fnb.pdf"
    },
    microsoft: {
        title: "Microsoft AI Fluency Course",
        issuer: "Microsoft",
        date: "April 2025",
        description: "Fundamentals of Artificial Intelligence and Machine Learning concepts.",
        skills: ["AI Fundamentals", "Machine Learning", "Neural Networks", "Ethical AI", "Azure AI"],
        image: "Documents/microsoft_ai.jpg",
        download: "Documents/Microsoft.pdf"
    }
};

certificateButtons.forEach(button => {
    button.addEventListener('click', (e) => {
        e.preventDefault();
        const certId = button.getAttribute('data-cert');
        const certificate = certificateDetails[certId];
        
        if (certificate) {
            const modalBody = certificateModal.querySelector('.modal-body');
            modalBody.innerHTML = `
                <div class="certificate-modal-content">
                    <div class="certificate-modal-image">
                        <img src="${certificate.image}" alt="${certificate.title}">
                    </div>
                    <div class="certificate-modal-info">
                        <h2>${certificate.title}</h2>
                        <p class="certificate-issuer"><strong>Issuer:</strong> ${certificate.issuer}</p>
                        <p class="certificate-date"><strong>Date:</strong> ${certificate.date}</p>
                        
                        <div class="certificate-description">
                            <p>${certificate.description}</p>
                        </div>
                        
                        <div class="certificate-skills">
                            <h3><i class="fas fa-check-circle"></i> Skills Acquired</h3>
                            <div class="skills-list">
                                ${certificate.skills.map(skill => `<span class="skill-tag">${skill}</span>`).join('')}
                            </div>
                        </div>
                        
                        <div class="certificate-actions">
                            <button class="btn btn-primary download-certificate" 
                                    data-pdf="${certificate.download}">
                                <i class="fas fa-download"></i> Download Certificate
                            </button>
                        </div>
                    </div>
                </div>
            `;
            
            certificateModal.classList.add('show');
            document.body.style.overflow = 'hidden';
            
            // === ADD THIS: Attach download functionality ===
            attachDownloadFunctionality(certificate);
        }
    });
});

// === ADD THIS FUNCTION: Handle certificate downloads ===
function attachDownloadFunctionality(certificate) {
    const downloadBtn = document.querySelector('.download-certificate');
    
    if (downloadBtn) {
        downloadBtn.addEventListener('click', function() {
            // Get the PDF URL from the certificate data
            const pdfUrl = certificate.download;
            const fileName = pdfUrl.split('/').pop(); // Gets "fnb.pdf" or "Microsoft.pdf"
            
            // Show loading state on button
            const originalText = this.innerHTML;
            this.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Downloading...';
            this.disabled = true;
            
            // Create and trigger download
            const link = document.createElement('a');
            link.href = pdfUrl;
            link.download = fileName;
            link.style.display = 'none';
            
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            
            // Show success message
            showDownloadSuccess(fileName);
            
            // Reset button after 1.5 seconds
            setTimeout(() => {
                this.innerHTML = originalText;
                this.disabled = false;
            }, 1500);
        });
    }
}

// === ADD THIS FUNCTION: Show download success message ===
function showDownloadSuccess(filename) {
    // Remove existing message if any
    const existingMsg = document.querySelector('.download-success-message');
    if (existingMsg) {
        existingMsg.remove();
    }
    
    // Create success message element
    const successMsg = document.createElement('div');
    successMsg.className = 'download-success-message';
    successMsg.innerHTML = `
        <i class="fas fa-check-circle"></i>
        <span>${filename} downloaded successfully!</span>
    `;
    
    // Add to page
    document.body.appendChild(successMsg);
    
    // Show with animation
    setTimeout(() => {
        successMsg.classList.add('show');
    }, 10);
    
    // Remove after 3 seconds
    setTimeout(() => {
        successMsg.classList.remove('show');
        setTimeout(() => {
            if (successMsg.parentNode) {
                successMsg.remove();
            }
        }, 300);
    }, 3000);
}

    // ===== MODAL CLOSE FUNCTIONALITY =====
    modalClose.forEach(closeBtn => {
        closeBtn.addEventListener('click', () => {
            projectModal.classList.remove('show');
            certificateModal.classList.remove('show');
            document.body.style.overflow = 'auto';
        });
    });
    
    // Close modal when clicking outside
    window.addEventListener('click', (e) => {
        if (e.target === projectModal) {
            projectModal.classList.remove('show');
            document.body.style.overflow = 'auto';
        }
        if (e.target === certificateModal) {
            certificateModal.classList.remove('show');
            document.body.style.overflow = 'auto';
        }
    });
    
// ===== DOWNLOAD RESUME =====
const downloadBtn = document.querySelector('.btn-download-resume');
if (downloadBtn) {
    downloadBtn.addEventListener('click', (e) => {
        e.preventDefault(); // Prevent any default behavior
        
        // Show loading state
        const originalText = downloadBtn.innerHTML;
        downloadBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Downloading...';
        downloadBtn.disabled = true;
        
        // File path - adjust based on your folder structure
        const resumePath = 'Documents/Sibusiso_Mhlongo  CV.pdf';
        
        // Test if file exists first
        fetch(resumePath, { method: 'HEAD' })
            .then(response => {
                if (response.ok) {
                    // File exists, trigger download
                    const link = document.createElement('a');
                    link.href = resumePath;
                    link.download = 'Sibusiso_Mhlongo  CV'; // Clean filename without spaces
                    link.style.display = 'none';
                    document.body.appendChild(link);
                    link.click();
                    document.body.removeChild(link);
                    
                    showDownloadSuccess('Sibusiso_Mhlongo_Resume.pdf');
                } else {
                    // File not found
                    showDownloadError('Resume file not found. Please check the file path.');
                }
            })
            .catch(error => {
                console.error('Error checking file:', error);
                showDownloadError('Error downloading resume. Please try again.');
            })
            .finally(() => {
                // Reset button after delay
                setTimeout(() => {
                    downloadBtn.innerHTML = originalText;
                    downloadBtn.disabled = false;
                }, 1500);
            });
    });
}

// ===== NEW FUNCTION: Show Download Error Message =====
function showDownloadError(message) {
    // Remove existing messages
    const existingMsg = document.querySelector('.download-error-message');
    if (existingMsg) {
        existingMsg.remove();
    }
    
    // Create error message
    const errorMsg = document.createElement('div');
    errorMsg.className = 'download-error-message';
    errorMsg.innerHTML = `
        <i class="fas fa-exclamation-triangle"></i>
        <span>${message}</span>
    `;
    
    // Add to page
    document.body.appendChild(errorMsg);
    
    // Show with animation
    setTimeout(() => {
        errorMsg.classList.add('show');
    }, 10);
    
    // Remove after 5 seconds
    setTimeout(() => {
        errorMsg.classList.remove('show');
        setTimeout(() => {
            if (errorMsg.parentNode) {
                errorMsg.remove();
            }
        }, 300);
    }, 5000);
}
    
    // ===== SET CURRENT YEAR =====
    document.getElementById('currentYear').textContent = new Date().getFullYear();
    
    // ===== SMOOTH SCROLL =====
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
});