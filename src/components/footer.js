import React from 'react'

import Script from 'dangerous-html/react'

import './footer.css'

const Footer = (props) => {
  return (
    <div className="footer-container1">
      <footer id="footer-empreenda" className="footer-section">
        <div className="footer-container">
          <div className="footer-main">
            <div className="footer-column footer-brand-column">
              <div className="footer-brand">
                <div className="footer-logo">
                  <h3 className="footer-logo-text">MINHA T-SHIRT</h3>
                  <span className="footer-logo-subtitle">Atacado</span>
                </div>
                <p className="footer-brand-description">
                  {' '}
                  Mais de 80 mil mulheres conquistando independência financeira
                  através da revenda das nossas peças. Junte-se a nós e comece
                  seu próprio negócio.
                  <span
                    dangerouslySetInnerHTML={{
                      __html: ' ',
                    }}
                  />
                </p>
                <div className="footer-trust-badges">
                  <div className="footer-badge">
                    <div className="footer-badge-icon">
                      <svg
                        width="24"
                        xmlns="http://www.w3.org/2000/svg"
                        height="24"
                        viewBox="0 0 24 24"
                      >
                        <path
                          d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        ></path>
                      </svg>
                    </div>
                    <span className="footer-badge-text">Desde 2017</span>
                  </div>
                  <div className="footer-badge">
                    <div className="footer-badge-icon">
                      <svg
                        width="24"
                        xmlns="http://www.w3.org/2000/svg"
                        height="24"
                        viewBox="0 0 24 24"
                      >
                        <g
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M14 18V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v11a1 1 0 0 0 1 1h2m10 0H9m10 0h2a1 1 0 0 0 1-1v-3.65a1 1 0 0 0-.22-.624l-3.48-4.35A1 1 0 0 0 17.52 8H14"></path>
                          <circle r="2" cx="17" cy="18"></circle>
                          <circle r="2" cx="7" cy="18"></circle>
                        </g>
                      </svg>
                    </div>
                    <span className="footer-badge-text">
                      Envio em até 72 horas
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div className="footer-column">
              <h4 className="footer-column-title">Links Rápidos</h4>
              <ul className="footer-links">
                <li className="footer-link-item">
                  <a href="#">
                    <div className="footer-link">
                      <span>Quem Somos</span>
                    </div>
                  </a>
                </li>
                <li className="footer-link-item">
                  <a href="#">
                    <div className="footer-link">
                      <span>Política de Privacidade</span>
                    </div>
                  </a>
                </li>
                <li className="footer-link-item">
                  <a href="#">
                    <div className="footer-link">
                      <span>Política de Entrega</span>
                    </div>
                  </a>
                </li>
                <li className="footer-link-item">
                  <a href="#">
                    <div className="footer-link">
                      <span>Contato</span>
                    </div>
                  </a>
                </li>
                <li className="footer-link-item">
                  <a href="#">
                    <div className="footer-link">
                      <span>Trabalhe Conosco</span>
                    </div>
                  </a>
                </li>
              </ul>
            </div>
            <div className="footer-column">
              <h4 className="footer-column-title">Nossas Lojas</h4>
              <div className="footer-locations">
                <div className="footer-location">
                  <div className="footer-location-icon">
                    <svg
                      width="20"
                      xmlns="http://www.w3.org/2000/svg"
                      height="20"
                      viewBox="0 0 24 24"
                    >
                      <g
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M17.97 9.304A8 8 0 0 0 2 10c0 4.69 4.887 9.562 7.022 11.468m12.356-4.842a1 1 0 0 0-3.004-3.004l-4.01 4.012a2 2 0 0 0-.506.854l-.837 2.87a.5.5 0 0 0 .62.62l2.87-.837a2 2 0 0 0 .854-.506z"></path>
                        <circle r="3" cx="10" cy="10"></circle>
                      </g>
                    </svg>
                  </div>
                  <div className="footer-location-content">
                    <p className="footer-location-label">Loja Física 1</p>
                    <p className="footer-location-address">
                      {' '}
                      Av. Elizabeth Marques, Trindade-GO, Qd32 Lt16/17 Sala 3
                      <span
                        dangerouslySetInnerHTML={{
                          __html: ' ',
                        }}
                      />
                    </p>
                  </div>
                </div>
                <div className="footer-location">
                  <div className="footer-location-icon">
                    <svg
                      width="20"
                      xmlns="http://www.w3.org/2000/svg"
                      height="20"
                      viewBox="0 0 24 24"
                    >
                      <g
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M17.97 9.304A8 8 0 0 0 2 10c0 4.69 4.887 9.562 7.022 11.468m12.356-4.842a1 1 0 0 0-3.004-3.004l-4.01 4.012a2 2 0 0 0-.506.854l-.837 2.87a.5.5 0 0 0 .62.62l2.87-.837a2 2 0 0 0 .854-.506z"></path>
                        <circle r="3" cx="10" cy="10"></circle>
                      </g>
                    </svg>
                  </div>
                  <div className="footer-location-content">
                    <p className="footer-location-label">Loja Física 2</p>
                    <p className="footer-location-address">
                      {' '}
                      Rua Miller, 289 Brás-SP / Shopping Miller Mal - Loja 04
                      <span
                        dangerouslySetInnerHTML={{
                          __html: ' ',
                        }}
                      />
                    </p>
                  </div>
                </div>
                <div className="footer-location">
                  <div className="footer-location-icon">
                    <svg
                      width="20"
                      xmlns="http://www.w3.org/2000/svg"
                      height="20"
                      viewBox="0 0 24 24"
                    >
                      <g
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M17.97 9.304A8 8 0 0 0 2 10c0 4.69 4.887 9.562 7.022 11.468m12.356-4.842a1 1 0 0 0-3.004-3.004l-4.01 4.012a2 2 0 0 0-.506.854l-.837 2.87a.5.5 0 0 0 .62.62l2.87-.837a2 2 0 0 0 .854-.506z"></path>
                        <circle r="3" cx="10" cy="10"></circle>
                      </g>
                    </svg>
                  </div>
                  <div className="footer-location-content">
                    <p className="footer-location-label">
                      Centro de Distribuição
                    </p>
                    <p className="footer-location-address">
                      {' '}
                      Rua Nova Veneza, Trindade-GO, Qd32 Lt16
                      <span
                        dangerouslySetInnerHTML={{
                          __html: ' ',
                        }}
                      />
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="footer-column">
              <h4 className="footer-column-title">Entre em Contato</h4>
              <div className="footer-contact">
                <div className="footer-contact-item">
                  <div className="footer-contact-icon">
                    <svg
                      width="20"
                      xmlns="http://www.w3.org/2000/svg"
                      height="20"
                      viewBox="0 0 24 24"
                    >
                      <path
                        d="M13.832 16.568a1 1 0 0 0 1.213-.303l.355-.465A2 2 0 0 1 17 15h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2A18 18 0 0 1 2 4a2 2 0 0 1 2-2h3a2 2 0 0 1 2 2v3a2 2 0 0 1-.8 1.6l-.468.351a1 1 0 0 0-.292 1.233a14 14 0 0 0 6.392 6.384"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      ></path>
                    </svg>
                  </div>
                  <a href="tel:+556234567890">
                    <div className="footer-contact-link">
                      <span>
                        {' '}
                        (62) 3456-7890
                        <span
                          dangerouslySetInnerHTML={{
                            __html: ' ',
                          }}
                        />
                      </span>
                    </div>
                  </a>
                </div>
                <div className="footer-contact-item">
                  <div className="footer-contact-icon">
                    <svg
                      width="20"
                      xmlns="http://www.w3.org/2000/svg"
                      height="20"
                      viewBox="0 0 24 24"
                    >
                      <g
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="m22 7l-8.991 5.727a2 2 0 0 1-2.009 0L2 7"></path>
                        <rect x="2" y="4" rx="2" width="20" height="16"></rect>
                      </g>
                    </svg>
                  </div>
                  <a href="mailto:contato@minhatshirt.com.br?subject=">
                    <div className="footer-contact-link">
                      <span>
                        {' '}
                        contato@minhatshirt.com.br
                        <span
                          dangerouslySetInnerHTML={{
                            __html: ' ',
                          }}
                        />
                      </span>
                    </div>
                  </a>
                </div>
                <div className="footer-social">
                  <p className="footer-social-title">Siga-nos</p>
                  <div className="footer-social-links">
                    <a href="#">
                      <div aria-label="Facebook" className="footer-social-link">
                        <svg
                          width="24"
                          xmlns="http://www.w3.org/2000/svg"
                          height="24"
                          viewBox="0 0 24 24"
                        >
                          <path
                            d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          ></path>
                        </svg>
                      </div>
                    </a>
                    <a href="#">
                      <div
                        aria-label="Instagram"
                        className="footer-social-link"
                      >
                        <svg
                          width="24"
                          xmlns="http://www.w3.org/2000/svg"
                          height="24"
                          viewBox="0 0 24 24"
                        >
                          <g
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <rect
                              x="2"
                              y="2"
                              rx="5"
                              ry="5"
                              width="20"
                              height="20"
                            ></rect>
                            <path d="M16 11.37A4 4 0 1 1 12.63 8A4 4 0 0 1 16 11.37m1.5-4.87h.01"></path>
                          </g>
                        </svg>
                      </div>
                    </a>
                    <a href="#">
                      <div aria-label="WhatsApp" className="footer-social-link">
                        <svg
                          width="24"
                          xmlns="http://www.w3.org/2000/svg"
                          height="24"
                          viewBox="0 0 24 24"
                        >
                          <g
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <path d="m3 21l1.65-3.8a9 9 0 1 1 3.4 2.9z"></path>
                            <path d="M9 10a.5.5 0 0 0 1 0V9a.5.5 0 0 0-1 0za5 5 0 0 0 5 5h1a.5.5 0 0 0 0-1h-1a.5.5 0 0 0 0 1"></path>
                          </g>
                        </svg>
                      </div>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="footer-cta">
            <div className="footer-cta-content">
              <h3 className="footer-cta-title">
                {' '}
                Pronta para começar seu próprio negócio?
                <span
                  dangerouslySetInnerHTML={{
                    __html: ' ',
                  }}
                />
              </h3>
              <p className="footer-cta-description">
                {' '}
                Fale com uma consultora e receba atendimento personalizado
                <span
                  dangerouslySetInnerHTML={{
                    __html: ' ',
                  }}
                />
              </p>
            </div>
            <a href="https://atacado.minhatshirt.com.br/#formulario-wpp">
              <div className="btn btn-primary btn-lg">
                <span>
                  {' '}
                  Falar com Consultora
                  <span
                    dangerouslySetInnerHTML={{
                      __html: ' ',
                    }}
                  />
                </span>
              </div>
            </a>
          </div>
          <div className="footer-bottom">
            <div className="footer-bottom-content">
              <p className="footer-copyright">
                <span className="footer-footer-copyright-highlight">
                  MINHA T-SHIRT©
                </span>
                <span className="footer-footer-copyright-divider">|</span>
                <span>
                  {' '}
                  CNPJ: 34.054.672/0001-00
                  <span
                    dangerouslySetInnerHTML={{
                      __html: ' ',
                    }}
                  />
                </span>
              </p>
              <p className="footer-legal">
                {' '}
                Todos os direitos reservados © 2025 Empreenda T-Shirt
                <span
                  dangerouslySetInnerHTML={{
                    __html: ' ',
                  }}
                />
              </p>
            </div>
            <div className="footer-payment-info">
              <span className="footer-payment-text">
                {' '}
                Pagamento seguro via Pix e Cartão de Crédito
                <span
                  dangerouslySetInnerHTML={{
                    __html: ' ',
                  }}
                />
              </span>
            </div>
          </div>
        </div>
        <div className="footer-decoration-top footer-decoration"></div>
        <div className="footer-decoration-bottom footer-decoration"></div>
      </footer>
      <div className="footer-container2">
        <div className="footer-container3">
          <Script
            html={`<script defer data-name="footer-empreenda">
(function(){
  const footerLinks = document.querySelectorAll(".footer-link")

  footerLinks.forEach((link) => {
    link.addEventListener("mouseenter", function () {
      this.style.paddingLeft = "var(--spacing-md)"
    })

    link.addEventListener("mouseleave", function () {
      this.style.paddingLeft = "var(--spacing-sm)"
    })
  })

  const footerSocialLinks = document.querySelectorAll(".footer-social-link")

  footerSocialLinks.forEach((link, index) => {
    link.style.animationDelay = \`\${index * 0.1}s\`
  })

  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  }

  const footerObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = "1"
        entry.target.style.transform = "translateY(0)"
      }
    })
  }, observerOptions)

  const footerColumns = document.querySelectorAll(".footer-column")
  footerColumns.forEach((column, index) => {
    column.style.opacity = "0"
    column.style.transform = "translateY(20px)"
    column.style.transition = \`opacity 0.6s var(--animation-curve-primary) \${
      index * 0.1
    }s, transform 0.6s var(--animation-curve-primary) \${index * 0.1}s\`
    footerObserver.observe(column)
  })

  const footerCtaElement = document.querySelector(".footer-cta")
  if (footerCtaElement) {
    footerCtaElement.style.opacity = "0"
    footerCtaElement.style.transform = "scale(0.95)"
    footerCtaElement.style.transition =
      "opacity 0.6s var(--animation-curve-primary) 0.3s, transform 0.6s var(--animation-curve-primary) 0.3s"
    footerObserver.observe(footerCtaElement)
  }
})()
</script>`}
          ></Script>
        </div>
      </div>
    </div>
  )
}

export default Footer
