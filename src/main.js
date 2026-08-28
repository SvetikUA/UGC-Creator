import './style.css';

// Mobile menu logic
const mobileMenuBtn = document.getElementById('mobile-menu-btn');
const mobileMenu = document.getElementById('mobile-menu');
const menuOpenIcon = document.querySelector('.menu-open');
const menuCloseIcon = document.querySelector('.menu-close');
const mobileLinks = document.querySelectorAll('.mobile-link');

function toggleMenu() {
  mobileMenu.classList.toggle('opacity-0');
  mobileMenu.classList.toggle('pointer-events-none');
  menuOpenIcon.classList.toggle('hidden');
  menuCloseIcon.classList.toggle('hidden');
}

mobileMenuBtn.addEventListener('click', toggleMenu);

// Close menu when a link is clicked
mobileLinks.forEach(link => {
  link.addEventListener('click', () => {
    if (!mobileMenu.classList.contains('hidden')) {
      toggleMenu();
    }
  });
});

// Language Management
const urlParams = new URLSearchParams(window.location.search);
let currentLang = urlParams.get('lang');

if (currentLang) {
  localStorage.setItem('preferredLang', currentLang);
} else {
  currentLang = localStorage.getItem('preferredLang') || 'nl';
}

// Update language buttons styling and events
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.lang-btn').forEach(btn => {
    if (btn.dataset.lang === currentLang) {
      btn.classList.add('font-bold', 'text-brand-brown');
      btn.classList.remove('opacity-30'); // if you had opacity
    } else {
      btn.classList.remove('font-bold', 'text-brand-brown');
    }

    btn.addEventListener('click', () => {
      window.location.href = `?lang=${btn.dataset.lang}`;
    });
  });
});

import { client, urlFor } from './sanity';

// Fetch site settings from Sanity
async function loadSiteSettings() {
  try {
    let settings = await client.fetch(`*[_type == "siteSettings" && language == "${currentLang}"][0]`);
    if (!settings) {
      // Fallback to the document without language (for migration purposes)
      settings = await client.fetch(`*[_type == "siteSettings"][0]`);
    }
    if (!settings) settings = {};

    // Update Logo
    const logoContainer = document.getElementById('dynamic-logo');
    if (logoContainer) {
      logoContainer.innerHTML = `
        <span class="font-serif font-normal text-sm md:text-lg tracking-widest leading-none">${settings.logoTop || 'SVITLANA YAVORSKA'}</span>
        <span class="font-sans font-light text-[9px] md:text-[11px] tracking-[0.3em] mt-1 leading-none">${settings.logoBottom || 'CREATOR'}</span>
      `;
    }

    // Update Desktop Nav
    const desktopNav = document.getElementById('desktop-nav');
    if (desktopNav && settings.navLinks) {
      desktopNav.innerHTML = settings.navLinks.map(link =>
        `<a href="${link.url}" class="hover:text-brand-brown transition-colors">${link.title}</a>`
      ).join('');
    }

    // Update Mobile Nav
    const mobileNav = document.getElementById('mobile-nav-links');
    if (mobileNav && settings.navLinks) {
      mobileNav.innerHTML = settings.navLinks.map(link =>
        `<a href="${link.url}" class="mobile-link hover:scale-110 transition-transform">${link.title}</a>`
      ).join('');

      // Re-attach event listeners to new mobile links
      const newMobileLinks = document.querySelectorAll('.mobile-link');
      newMobileLinks.forEach(link => {
        link.addEventListener('click', () => {
          if (!document.getElementById('mobile-menu').classList.contains('hidden')) {
            toggleMenu();
          }
        });
      });
    }

    // Update Hero Section
    const heroTitle = document.getElementById('hero-title');
    if (heroTitle) heroTitle.textContent = settings.heroTitle || 'Svitlana Yavorska';

    const heroSubtitle = document.getElementById('hero-subtitle');
    if (heroSubtitle) heroSubtitle.textContent = settings.heroSubtitle || 'UGC Creator';

    // Update About Section
    const aboutTitle = document.getElementById('about-title');
    if (aboutTitle) aboutTitle.textContent = settings.aboutTitle || 'About Me';

    const aboutImage = document.getElementById('about-image');
    if (aboutImage) {
      if (settings.aboutImage) {
        aboutImage.src = urlFor(settings.aboutImage).width(800).auto('format').quality(80).url();
        aboutImage.alt = settings.aboutTitle || 'About Me';
        aboutImage.classList.remove('hidden');
      } else {
        // Fallback image
        aboutImage.src = 'https://images.pexels.com/photos/7564595/pexels-photo-7564595.jpeg?auto=compress&cs=tinysrgb&w=800';
        aboutImage.classList.remove('hidden');
      }
    }

    const aboutTextContainer = document.getElementById('about-text');
    if (aboutTextContainer) {
      const text = settings.aboutText || 'I’m a UGC content creator based in the Netherlands, specializing in product video content for brands.\n\nMy focus is on textures, details, lighting, and movement to bring products to life and make them visually irresistible. I enjoy working with light, textures, details, and simple compositions.';

      const paragraphs = text.split('\n').filter(p => p.trim() !== '');
      aboutTextContainer.innerHTML = paragraphs.map((p, index) => {
        const isLast = index === paragraphs.length - 1;
        return `<p class="text-lg leading-relaxed text-brand-dark/80 font-light ${isLast ? '' : 'mb-6'}">${p}</p>`;
      }).join('');
    }

    // Update Services Section
    const servicesTitle = document.getElementById('services-title');
    if (servicesTitle) servicesTitle.textContent = settings.servicesTitle || 'What I do';

    const servicesList = document.getElementById('services-list');
    if (servicesList && settings.servicesList) {
      servicesList.innerHTML = settings.servicesList.map(item => `
        <li class="flex items-center gap-3">
          <span class="w-1.5 h-1.5 rounded-full bg-brand-sand"></span>
          ${item}
        </li>
      `).join('');
    }

    const nicheTitle = document.getElementById('niche-title');
    if (nicheTitle) nicheTitle.textContent = settings.nicheTitle || 'My niche';

    const nicheList = document.getElementById('niche-list');
    if (nicheList && settings.nicheList) {
      nicheList.innerHTML = settings.nicheList.map(item => `
        <li class="flex items-center gap-3">
          <span class="w-1.5 h-1.5 rounded-full bg-brand-sand"></span>
          ${item}
        </li>
      `).join('');
    }

    // Update Portfolio Section Texts
    const portfolioSubtitle = document.getElementById('portfolio-subtitle');
    if (portfolioSubtitle) portfolioSubtitle.textContent = settings.portfolioSubtitle || 'Portfolio';

    const portfolioTitle = document.getElementById('portfolio-title');
    if (portfolioTitle) portfolioTitle.textContent = settings.portfolioTitle || 'Selected Work';

    const portfolioDescription = document.getElementById('portfolio-description');
    if (portfolioDescription) portfolioDescription.textContent = settings.portfolioDescription || 'A collection of product photos and short-form videos.';

    // Update Contact Section
    const contactTitle = document.getElementById('contact-title');
    if (contactTitle) contactTitle.textContent = settings.contactTitle || "Let's Work Together";

    const contactSubtitle = document.getElementById('contact-subtitle');
    if (contactSubtitle) contactSubtitle.textContent = settings.contactSubtitle || "Have a product you’d like to see in content?";

    const socialLinksContainer = document.getElementById('contact-social-links');
    if (socialLinksContainer) {
      if (settings.socialLinks && settings.socialLinks.length > 0) {
        socialLinksContainer.innerHTML = settings.socialLinks.map(link => `
          <a href="${link.url || '#'}" target="_blank" class="group flex items-center gap-2 hover:text-brand-brown transition-colors border-b border-brand-brown/30 hover:border-brand-brown pb-1 min-h-[28px]">
            <span>${link.platform || ''} ${link.handle || ''}</span>
            <svg class="w-4 h-4 opacity-40 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path></svg>
          </a>
        `).join('');
      } else {
        socialLinksContainer.innerHTML = `
          <a href="https://instagram.com/LANA_YAVORSKA" target="_blank" class="group flex items-center gap-2 hover:text-brand-brown transition-colors border-b border-brand-brown/30 hover:border-brand-brown pb-1 min-h-[28px]">
            <span>Insta: @LANA_YAVORSKA</span>
            <svg class="w-4 h-4 opacity-40 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path></svg>
          </a>
        `;
      }
    }

    const contactButton = document.getElementById('contact-button');
    if (contactButton) {
      contactButton.textContent = settings.contactButtonText || 'Get in touch →';
      contactButton.href = `mailto:${settings.contactEmail || 'svetaberynda@gmail.com'}`;
    }

  } catch (error) {
    console.error('Error fetching site settings:', error);
  }
}

// Fetch portfolio from Sanity
async function loadPortfolio() {
  const grid = document.getElementById('portfolio-grid');
  if (!grid) return;

  try {
    let projects = await client.fetch(`*[_type == "portfolio" && language == "${currentLang}"] | order(orderRank) {
      ...,
      "videoFileUrl": videoFile.asset->url,
      "coverImageUrl": coverImage.asset->url
    }`);

    // Fallback for non-translated legacy documents
    if (!projects || projects.length === 0) {
      projects = await client.fetch(`*[_type == "portfolio" && !defined(language)] | order(orderRank) {
        ...,
        "videoFileUrl": videoFile.asset->url,
        "coverImageUrl": coverImage.asset->url
      }`);
    }

    if (projects.length === 0) {
      grid.innerHTML = '<p class="text-center w-full text-brand-dark/50 italic py-10">Немає проєктів. Додайте перше відео в Sanity Studio!</p>';
      return;
    }

    grid.innerHTML = projects.map(project => {
      let mediaContent = '';
      let isVideo = false;

      // Legacy support for old images if they exist
      if (project.mediaType === 'image' && project.image) {
        mediaContent = `<img src="${urlFor(project.image).width(600).auto('format').quality(80).url()}" alt="${project.title}" class="w-full h-full object-cover opacity-90 pointer-events-none" />`;
      }
      // Default to video for all new projects and old videos
      else if (project.videoUrl || project.videoFileUrl) {
        isVideo = true;
        const url = project.videoUrl || project.videoFileUrl;
        const optimizedPoster = project.coverImageUrl ? `${project.coverImageUrl}?w=600&auto=format&q=80` : '';
        const posterAttr = optimizedPoster ? `poster="${optimizedPoster}"` : '';
        mediaContent = `<video src="${url}" ${posterAttr} class="w-full h-full object-cover opacity-90 pointer-events-none" loop playsinline preload="metadata"></video>`;
      }

      return `
        <div class="portfolio-item snap-center shrink-0 mx-auto w-72 sm:w-80 aspect-9/17 bg-black rounded-[2.5rem] p-2 relative group cursor-pointer hover:-translate-y-2 transition-transform duration-300">
          <div class="w-full h-full rounded-4xl overflow-hidden relative bg-zinc-800 flex items-center justify-center">
            ${mediaContent}
            <div class="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition duration-300 pointer-events-none"></div>
            ${isVideo ? `
            <div class="play-btn absolute w-14 h-14 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white shadow-lg transition-all duration-300 z-10">
              <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z" />
              </svg>
            </div>
            ` : ''}
            <div class="absolute inset-0 flex flex-col justify-end p-6 text-center z-20 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none">
              <h4 class="text-white font-serif text-2xl mb-2 drop-shadow-lg">${project.title}</h4>
              <p class="text-white/90 text-[10px] uppercase tracking-[0.2em] drop-shadow-md">${project.category}</p>
            </div>
          </div>
          <div class="absolute top-0 inset-x-0 h-6 bg-black rounded-b-3xl mx-auto w-1/3 z-20 pointer-events-none"></div>
        </div>
      `;
    }).join('');

    // Add click listeners for video play/pause
    const items = grid.querySelectorAll('.portfolio-item');
    items.forEach(item => {
      const video = item.querySelector('video');
      const playBtn = item.querySelector('.play-btn');

      if (video && playBtn) {
        item.addEventListener('click', () => {
          if (video.paused) {
            video.play();
            playBtn.classList.add('opacity-0', 'scale-150');
          } else {
            video.pause();
            playBtn.classList.remove('opacity-0', 'scale-150');
          }
        });
      }
    });

  } catch (error) {
    console.error('Error fetching portfolio:', error);
    grid.innerHTML = '<p class="text-center w-full text-red-500 py-10">Помилка завантаження бази даних.</p>';
  }
}

document.addEventListener('DOMContentLoaded', () => {
  loadSiteSettings();
  loadPortfolio();
});
