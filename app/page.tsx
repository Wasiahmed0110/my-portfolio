'use client';

import { useState, FormEvent } from 'react';
import { Github, Linkedin, Mail, Code2, Cpu, Rocket, Menu, X, Terminal, Briefcase, GraduationCap } from 'lucide-react';

export default function Portfolio() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [formStatus, setFormStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  const handleNavClick = () => setIsMenuOpen(false);

  // Get current time in GMT+5
  const getGMT5Time = () => {
    const now = new Date();
    const gmt5Offset = 5 * 60; // minutes
    const utcMs = now.getTime() + now.getTimezoneOffset() * 60000;
    const gmt5Date = new Date(utcMs + gmt5Offset * 60000);
    return gmt5Date.toLocaleString('en-PK', {
      year: 'numeric', month: 'long', day: 'numeric',
      hour: '2-digit', minute: '2-digit', second: '2-digit',
      hour12: true,
    }) + ' (GMT+5)';
  };

  const handleContactSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormStatus('submitting');

    const form = e.currentTarget;
    const formData = new FormData(form);
    // Inject GMT+5 timestamp
    formData.set('_time_gmt5', getGMT5Time());

    try {
      const response = await fetch('https://formsubmit.co/ajax/wasiahmed0110@gmail.com', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();

      if (data.success === 'true' || data.success === true) {
        setFormStatus('success');
        form.reset();
      } else {
        throw new Error('Form submission failed');
      }
    } catch {
      setFormStatus('error');
    }

    setTimeout(() => setFormStatus('idle'), 5000);
  };

  return (
    <>
      {/* ── NAVBAR ─────────────────────────────────────── */}
      <nav className="navbar">
        <div className="logo">&lt;DevOps /&gt;</div>

        <ul className="nav-links">
          <li><a href="#about" onClick={handleNavClick}>About</a></li>
          <li><a href="#skills" onClick={handleNavClick}>Skills</a></li>
          <li><a href="#projects" onClick={handleNavClick}>Projects</a></li>
          <li><a href="#experience" onClick={handleNavClick}>Experience</a></li>
          <li><a href="#contact" onClick={handleNavClick}>Contact</a></li>
        </ul>

        <div
          className="hamburger-mobile"
          style={{ display: 'none', cursor: 'pointer', color: 'var(--text-main)' }}
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X size={26} /> : <Menu size={26} />}
        </div>
      </nav>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div style={{
          position: 'fixed', top: '68px', left: 0, right: 0,
          background: 'rgba(10,14,23,0.98)', padding: '2rem 6%',
          zIndex: 999, borderBottom: '1px solid rgba(255,255,255,0.08)',
        }}>
          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            {['about','skills','projects','experience','contact'].map((s) => (
              <li key={s}>
                <a href={`#${s}`} onClick={handleNavClick}
                  style={{ color: 'var(--text-main)', textDecoration: 'none', fontSize: '1.1rem', fontWeight: 600, textTransform: 'capitalize' }}>
                  {s}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}

      <main>
        {/* ── HERO ─────────────────────────────────────── */}
        <section id="home" className="hero">
          <p className="hero-eyebrow">// Hello, world! I am Wasi Ahmed</p>
          <h1 className="headline">
            Bridging Bare-Metal<br />
            Hardware to{' '}
            <span className="highlight">Scalable Cloud<br />Deployments.</span>
          </h1>
          <p className="sub-headline">
            Electrical Engineering Undergrad @ FAST-NUCES |{' '}<br/>
            Specializing in Embedded C++, DSA, and DevOps.
          </p>
          <div className="cta-buttons">
            <a href="#projects" className="btn btn-primary">View Projects</a>
            <a href="#contact" className="btn btn-secondary">Download Resume</a>
          </div>
        </section>

        {/* ── ABOUT ────────────────────────────────────── */}
        <section id="about">
          <p className="section-label">01. About</p>
          <h2 className="section-title">Who I Am</h2>
          <div className="about-card">
            <p>
              My journey into technology began with wiring up circuits and programming microcontrollers like the{' '}
              <strong>ESP32</strong>. As I delved deeper into building real-world hardware applications, I discovered a
              profound passion for logical problem-solving and software architecture, leading me to master{' '}
              <strong>Data Structures and Algorithms (DSA)</strong>.
            </p>
            <p>
              Today, I bridge the gap between low-level hardware and high-level software by designing and deploying
              robust, automated systems. Through <strong>DevOps practices and CI/CD pipelines</strong>, I ensure that
              scalable applications run smoothly and reliably in the cloud.
            </p>
            <div className="highlight-box">
              <Rocket style={{ color: 'var(--accent-primary)', flexShrink: 0 }} size={28} />
              <p style={{ color: 'var(--text-muted)', margin: 0 }}>
                Currently seeking remote <strong style={{ color: 'var(--text-main)' }}>Software Development</strong> and{' '}
                <strong style={{ color: 'var(--text-main)' }}>Cloud Infrastructure</strong> roles to build scalable,
                high-impact solutions.
              </p>
            </div>
          </div>
        </section>

        {/* ── SKILLS ───────────────────────────────────── */}
        <section id="skills">
          <p className="section-label">02. Skills</p>
          <h2 className="section-title">Technical Arsenal</h2>
          <div className="grid">
            <div className="card">
              <Code2 size={36} style={{ color: 'var(--accent-primary)', marginBottom: '1rem' }} />
              <h3>Software Engineering</h3>
              <p style={{ color: 'var(--text-muted)', lineHeight: 1.8 }}>
                Proficient in C++, Python, and JavaScript. Strong grasp of Data Structures, Algorithms, and
                Object-Oriented Design patterns.
              </p>
            </div>
            <div className="card">
              <Terminal size={36} style={{ color: 'var(--accent-secondary)', marginBottom: '1rem' }} />
              <h3>DevOps &amp; Cloud</h3>
              <p style={{ color: 'var(--text-muted)', lineHeight: 1.8 }}>
                Docker, CI/CD pipelines via GitHub Actions, Linux administration, and deployments on AWS &amp; Azure
                cloud platforms.
              </p>
            </div>
            <div className="card">
              <Cpu size={36} style={{ color: '#10b981', marginBottom: '1rem' }} />
              <h3>Embedded Systems</h3>
              <p style={{ color: 'var(--text-muted)', lineHeight: 1.8 }}>
                Programming ESP32/Arduino, IoT architecture, Real-Time Operating Systems (RTOS), and hardware-software
                integration.
              </p>
            </div>
          </div>
        </section>

        {/* ── PROJECTS ─────────────────────────────────── */}
        <section id="projects">
          <p className="section-label">03. Projects</p>
          <h2 className="section-title">Featured Projects</h2>
          <div className="grid">
            {/* Project 1 */}
            <div className="project-card">
              <h3 style={{ fontSize: '1.2rem', marginBottom: '0.8rem' }}>DevOps-Based Smart Carpool</h3>
              <p style={{ color: 'var(--text-muted)', marginBottom: '1.5rem', lineHeight: 1.8, flexGrow: 1 }}>
                Developed a university carpool management system focused on solving unverified booking issues. Handled
                full automation and CI/CD pipelines for optimal system reliability.
              </p>
              <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '1.5rem' }}>
                <span className="tag">DevOps</span>
                <span className="tag">CI/CD</span>
                <span className="tag">Docker</span>
                <span className="tag">GitHub Actions</span>
              </div>
              <div style={{ display: 'flex', gap: '1.2rem' }}>
                <a href="https://github.com/yourusername/carpool-system" target="_blank" rel="noreferrer"
                  style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: 'var(--text-muted)', textDecoration: 'none', fontSize: '0.9rem', transition: 'color 0.2s' }}
                  onMouseOver={e => (e.currentTarget.style.color = 'var(--accent-primary)')}
                  onMouseOut={e => (e.currentTarget.style.color = 'var(--text-muted)')}>
                  <Github size={16} /> Source Code
                </a>
              </div>
            </div>

            {/* Project 2 */}
            <div className="project-card">
              <h3 style={{ fontSize: '1.2rem', marginBottom: '0.8rem' }}>Real-Time Smart Energy Monitor</h3>
              <p style={{ color: 'var(--text-muted)', marginBottom: '1.5rem', lineHeight: 1.8, flexGrow: 1 }}>
                Engineered a hardware IoT solution for over/under-voltage protection using non-blocking C++ architecture.
                Implemented reliable real-time cloud data sync via Blynk IoT.
              </p>
              <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '1.5rem' }}>
                <span className="tag">ESP32</span>
                <span className="tag">C++</span>
                <span className="tag">IoT</span>
                <span className="tag">Blynk</span>
              </div>
              <div style={{ display: 'flex', gap: '1.2rem' }}>
                <a href="https://github.com/yourusername/energy-monitor" target="_blank" rel="noreferrer"
                  style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: 'var(--text-muted)', textDecoration: 'none', fontSize: '0.9rem', transition: 'color 0.2s' }}
                  onMouseOver={e => (e.currentTarget.style.color = 'var(--accent-primary)')}
                  onMouseOut={e => (e.currentTarget.style.color = 'var(--text-muted)')}>
                  <Github size={16} /> Source Code
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* ── EXPERIENCE ───────────────────────────────── */}
        <section id="experience">
          <p className="section-label">04. Experience</p>
          <h2 className="section-title">Work &amp; Education</h2>
          <div className="timeline">

            <div className="timeline-item">
              <div className="timeline-dot" />
              <div className="timeline-content">
                <h3 className="timeline-title">STEM Instructor</h3>
                <p className="timeline-org"><Briefcase size={13} style={{ verticalAlign: 'middle', marginRight: '0.4rem' }} />Freelance / Private Tutoring</p>
                <span className="timeline-date">2022 — Present</span>
                <p>
                  Simplified complex Physics, Mathematics, and Computer Science concepts for high school students.
                  Fostered an environment of curiosity and logical problem-solving, emphasizing strong communication and
                  leadership skills to guide students through challenging STEM subjects.
                </p>
              </div>
            </div>

            <div className="timeline-item">
              <div className="timeline-dot" />
              <div className="timeline-content">
                <h3 className="timeline-title">DevOps Engineer (Academic Project Lead)</h3>
                <p className="timeline-org"><Briefcase size={13} style={{ verticalAlign: 'middle', marginRight: '0.4rem' }} />FAST-NUCES — Software Engineering Dept.</p>
                <span className="timeline-date">Jan 2024 — May 2024</span>
                <p>
                  Led the DevOps track for a university-level carpool management system. Set up Docker-based
                  containerization, GitHub Actions CI/CD pipelines, and automated deployment workflows for seamless
                  integration and delivery across team members.
                </p>
              </div>
            </div>

            <div className="timeline-item">
              <div className="timeline-dot" style={{ background: 'var(--accent-purple)' }} />
              <div className="timeline-content">
                <h3 className="timeline-title">B.Sc. Electrical Engineering</h3>
                <p className="timeline-org" style={{ color: 'var(--accent-purple)' }}>
                  <GraduationCap size={13} style={{ verticalAlign: 'middle', marginRight: '0.4rem' }} />
                  FAST-NUCES, Islamabad
                </p>
                <span className="timeline-date">2022 — 2026 (Expected)</span>
                <p>
                  Specializing in Embedded Systems and Software Engineering. Coursework includes Data Structures &amp;
                  Algorithms, Digital Logic Design, Microprocessor Systems, Operating Systems, and Software Project
                  Management.
                </p>
              </div>
            </div>

          </div>
        </section>

        {/* ── CONTACT ──────────────────────────────────── */}
        <section id="contact">
          <p className="section-label">05. Contact</p>
          <h2 className="section-title">Let&apos;s Connect</h2>
          <div className="contact-container">
            {/* Left info */}
            <div>
              <h3 style={{ fontSize: '1.6rem', fontWeight: 700, marginBottom: '1rem', color: 'var(--accent-primary)' }}>
                Build scalable solutions together.
              </h3>
              <p style={{ color: 'var(--text-muted)', marginBottom: '2.5rem', fontSize: '1rem', lineHeight: 1.9 }}>
                I&apos;m always open to discussing new projects, technical challenges, or potential remote opportunities
                in Software Development and Cloud Infrastructure. Drop me a message and I&apos;ll get back to you within
                24 hours.
              </p>
              <div style={{ display: 'flex', gap: '1rem' }}>
                <a href="https://linkedin.com/in/yourusername" target="_blank" rel="noreferrer" className="social-icon" aria-label="LinkedIn">
                  <Linkedin size={22} />
                </a>
                <a href="https://github.com/yourusername" target="_blank" rel="noreferrer" className="social-icon" aria-label="GitHub">
                  <Github size={22} />
                </a>
                <a href="mailto:wasiahmed0110@gmail.com" className="social-icon" aria-label="Email">
                  <Mail size={22} />
                </a>
              </div>

              <div style={{ marginTop: '2.5rem', padding: '1.4rem', background: 'var(--glass-bg)', borderRadius: '10px', border: '1px solid var(--glass-border)' }}>
                <p style={{ fontFamily: 'Fira Code, monospace', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                  📧 <span style={{ color: 'var(--accent-primary)' }}>wasiahmed0110@gmail.com</span>
                </p>
                <p style={{ fontFamily: 'Fira Code, monospace', fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: '0.5rem' }}>
                  🕐 Timezone: <span style={{ color: 'var(--text-main)' }}>GMT+5 (Pakistan Standard Time)</span>
                </p>
              </div>
            </div>

            {/* Right form */}
            <form className="contact-form" onSubmit={handleContactSubmit}>
              {/* Hidden FormSubmit config */}
              <input type="hidden" name="_captcha" value="false" />
              <input type="hidden" name="_template" value="table" />
              <input type="hidden" name="_subject" value="New Portfolio Message" />

              {formStatus === 'success' && (
                <div className="status-msg status-success">
                  ✅ Message sent! I&apos;ll reply within 24 hours.
                </div>
              )}
              {formStatus === 'error' && (
                <div className="status-msg status-error">
                  ❌ Failed to send. Please email me directly at wasiahmed0110@gmail.com
                </div>
              )}

              <div className="input-group">
                <input type="text" name="name" required placeholder="Your Name" />
              </div>
              <div className="input-group">
                <input type="email" name="email" required placeholder="Your Email" />
              </div>
              <div className="input-group">
                <input type="text" name="subject" required placeholder="Subject" />
              </div>
              <div className="input-group">
                <textarea name="message" required rows={5} placeholder="Your Message" style={{ resize: 'vertical' }} />
              </div>

              <button
                type="submit"
                className="btn btn-primary"
                disabled={formStatus === 'submitting'}
                style={{ opacity: formStatus === 'submitting' ? 0.7 : 1, justifyContent: 'center' }}
              >
                {formStatus === 'submitting' ? 'Sending…' : 'Send Message'}
              </button>
            </form>
          </div>
        </section>
      </main>

      <footer>
        <p>Designed &amp; Built by <span style={{ color: 'var(--accent-primary)' }}>Wasi Ahmed</span> · GMT+5</p>
      </footer>
    </>
  );
}
