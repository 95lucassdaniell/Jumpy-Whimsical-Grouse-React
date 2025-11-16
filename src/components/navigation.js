import React from 'react'

import Script from 'dangerous-html/react'

import './navigation.css'

const Navigation = (props) => {
  return (
    <div className="navigation-container1">
      <nav
        id="mainNavigation"
        aria-label="Navegação Principal"
        className="navigation"
      >
        <div className="navigation__container">
          <div className="navigation__brand">
            <a href="/">
              <div
                aria-label="Empreenda T-Shirt - Página Inicial"
                className="navigation__logo-link"
              >
                <div className="navigation__logo">
                  <span className="navigation__logo-text">Empreenda</span>
                  <span className="navigation__logo-accent">T-Shirt</span>
                </div>
              </div>
            </a>
          </div>
          <button
            id="navToggle"
            type="button"
            aria-label="Abrir menu de navegação"
            aria-controls="navMenu"
            aria-expanded="false"
            className="navigation__toggle"
          >
            <svg
              width="24"
              xmlns="http://www.w3.org/2000/svg"
              height="24"
              viewBox="0 0 24 24"
              aria-hidden="true"
              className="navigation-navigationtoggle-icon1 navigation__toggle-icon--open"
            >
              <path
                d="M4 5h16M4 12h16M4 19h16"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              ></path>
            </svg>
            <svg
              width="24"
              xmlns="http://www.w3.org/2000/svg"
              height="24"
              viewBox="0 0 24 24"
              aria-hidden="true"
              className="navigation-navigationtoggle-icon2"
            >
              <path
                d="M18 6L6 18M6 6l12 12"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              ></path>
            </svg>
          </button>
          <div id="navMenu" className="navigation__menu">
            <ul className="navigation__list">
              <li className="navigation__item">
                <a href="#quem-somos">
                  <div className="navigation__link">
                    <span>Quem Somos</span>
                  </div>
                </a>
              </li>
              <li className="navigation__item">
                <a href="#produtos">
                  <div className="navigation__link">
                    <span>Produtos</span>
                  </div>
                </a>
              </li>
              <li className="navigation__item">
                <a href="#vantagens">
                  <div className="navigation__link">
                    <span>Vantagens</span>
                  </div>
                </a>
              </li>
              <li className="navigation__item">
                <a href="#depoimentos">
                  <div className="navigation__link">
                    <span>Depoimentos</span>
                  </div>
                </a>
              </li>
              <li className="navigation__item">
                <a href="#contato">
                  <div className="navigation__link">
                    <span>Contato</span>
                  </div>
                </a>
              </li>
            </ul>
            <div className="navigation__actions">
              <a href="#formulario-wpp">
                <div className="btn btn-outline navigation__action-btn">
                  <svg
                    width="20"
                    xmlns="http://www.w3.org/2000/svg"
                    height="20"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                    className="navigation__action-icon"
                  >
                    <path
                      d="M13.832 16.568a1 1 0 0 0 1.213-.303l.355-.465A2 2 0 0 1 17 15h3a2 2 0 0 1 2 2v3a2 2 0 0 1 2-2A18 18 0 0 1 2 4a2 2 0 0 1 2-2h3a2 2 0 0 1 2 2v3a2 2 0 0 1-.8 1.6l-.468.351a1 1 0 0 0-.292 1.233a14 14 0 0 0 6.392 6.384"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    ></path>
                  </svg>
                  <span>Falar com Consultora</span>
                </div>
              </a>
              <a href="#cadastro">
                <div className="btn btn-primary navigation__action-btn--primary navigation__action-btn">
                  <svg
                    width="20"
                    xmlns="http://www.w3.org/2000/svg"
                    height="20"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                    className="navigation__action-icon"
                  >
                    <g
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
                      <circle r="4" cx="12" cy="7"></circle>
                    </g>
                  </svg>
                  <span>Começar Agora</span>
                </div>
              </a>
            </div>
          </div>
          <div id="navBackdrop" className="navigation__backdrop"></div>
        </div>
      </nav>
      <div className="navigation-container2">
        <div className="navigation-container3">
          <Script
            html={`<style>
@media (prefers-reduced-motion: reduce) {
.navigation, .navigation__menu, .navigation__link::after, .navigation__toggle, .navigation__toggle-icon, .navigation__backdrop {
  transition: none;
}
}
</style>`}
          ></Script>
        </div>
      </div>
      <div className="navigation-container4">
        <div className="navigation-container5">
          <Script
            html={`<script defer data-name="navigation">
(function(){
  // Navigation Toggle Functionality
  const navToggle = document.getElementById("navToggle")
  const navMenu = document.getElementById("navMenu")
  const navBackdrop = document.getElementById("navBackdrop")
  const navigation = document.getElementById("mainNavigation")

  // Toggle mobile menu
  function toggleMenu() {
    const isOpen = navToggle.getAttribute("aria-expanded") === "true"

    navToggle.setAttribute("aria-expanded", !isOpen)
    navMenu.classList.toggle("navigation__menu--open")
    navBackdrop.classList.toggle("navigation__backdrop--active")

    // Prevent body scroll when menu is open
    if (!isOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }
  }

  // Close menu when clicking outside
  function closeMenu() {
    navToggle.setAttribute("aria-expanded", "false")
    navMenu.classList.remove("navigation__menu--open")
    navBackdrop.classList.remove("navigation__backdrop--active")
    document.body.style.overflow = ""
  }

  // Event listeners
  navToggle.addEventListener("click", toggleMenu)
  navBackdrop.addEventListener("click", closeMenu)

  // Close menu when clicking navigation links
  const navLinks = document.querySelectorAll(".navigation__link")
  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      if (window.innerWidth <= 767) {
        closeMenu()
      }
    })
  })

  // Close menu on escape key
  document.addEventListener("keydown", (e) => {
    if (
      e.key === "Escape" &&
      navToggle.getAttribute("aria-expanded") === "true"
    ) {
      closeMenu()
      navToggle.focus()
    }
  })

  // Handle window resize
  let resizeTimer
  window.addEventListener("resize", () => {
    clearTimeout(resizeTimer)
    resizeTimer = setTimeout(() => {
      if (window.innerWidth > 767) {
        closeMenu()
      }
    }, 250)
  })

  // Add scrolled class on scroll
  let lastScroll = 0
  window.addEventListener("scroll", () => {
    const currentScroll = window.pageYOffset

    if (currentScroll > 20) {
      navigation.classList.add("navigation--scrolled")
    } else {
      navigation.classList.remove("navigation--scrolled")
    }

    lastScroll = currentScroll
  })
})()
</script>`}
          ></Script>
        </div>
      </div>
    </div>
  )
}

export default Navigation
