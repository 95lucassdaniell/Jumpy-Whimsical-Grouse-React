import React from 'react'

import Script from 'dangerous-html/react'
import { Helmet } from 'react-helmet'

import Navigation from '../components/navigation'
import Footer from '../components/footer'
import './home.css'

const Home = (props) => {
  return (
    <div className="home-container1">
      <Helmet>
        <title>Jumpy Whimsical Grouse</title>
        <meta property="og:title" content="Jumpy Whimsical Grouse" />
        <link
          rel="canonical"
          href="https://jumpy-whimsical-grouse-d4noum.teleporthq.app/"
        />
      </Helmet>
      <Navigation></Navigation>
      <div className="home-container2">
        <div className="home-container3">
          <Script
            html={`<style>
@media (prefers-reduced-motion: reduce) {
.hero__content, .hero__visual, .features__visual, .features__card, .process__step, .testimonials__card {
  animation: none;
  opacity: 1;
  transform: none;
}
.hero__content, .features__card, .process__step, .testimonials__card, .product-tile, .whatsapp-cta {
  transition: none;
}
}
</style>`}
          ></Script>
        </div>
      </div>
      <div id="empreenda-tshirt-page">
        <section role="region" aria-labelledby="hero-title" className="hero">
          <div className="hero__content">
            <h1 id="hero-title" className="hero__title">
              {' '}
              Saia da dependência financeira: comece hoje o seu próprio negócio
              <span
                dangerouslySetInnerHTML={{
                  __html: ' ',
                }}
              />
            </h1>
            <p className="hero__sub">
              {' '}
              Revenda t-shirts no atacado com suporte real e lucro garantido
              <span
                dangerouslySetInnerHTML={{
                  __html: ' ',
                }}
              />
            </p>
            <p className="hero__body">
              {' '}
              Nossa experiência desde 2017, mais de 93.530 pedidos entregues e
              uma rede de 53.000 revendedoras garantem suporte consistente para
              sua jornada empreendedora.
              <span
                dangerouslySetInnerHTML={{
                  __html: ' ',
                }}
              />
            </p>
            <a href="#contato">
              <div
                aria-label="Falar com consultora pelo WhatsApp"
                className="btn btn-primary"
              >
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
          <div className="hero__visual">
            <div className="hero__photo">
              <img
                alt="Empreendedora confiante gerenciando seu negócio de revenda"
                src="/hero-image.png"
                loading="eager"
              />
            </div>
          </div>
        </section>
        <section
          role="region"
          aria-labelledby="about-heading"
          className="about"
        >
          <h2 id="about-heading" className="section-title">
            Quem é a Minha T-Shirt?
          </h2>
          <div className="about__content">
            <p className="about__text">
              Uma marca de roupas nacional, orgulhosamente Goiana, única e diferente. Com nossa identidade visual cheia de personalidade, a Minha T-shirt é divertida, moderna, motivada e criativa.
            </p>
            <p className="about__text">
              Somos movidos pelas tendências e demandas de vocês, nossas clientes. Desenvolvemos t-shirt, cropped, moletom, blusa de manga longa e entre outras peças maravilhosas, que fazem parte dos nossos catálogos que atendem cada vez mais pessoas. Somos uma empresa que não vende somente roupas, trabalhamos juntas para buscarmos cada vez mais a independência financeira da mulher, realização de sonhos e com isso, a construção de uma vida melhor.
            </p>
            <p className="about__text about__text--highlight">
              Buscamos levar nossas clientes com a gente, sempre JUNTAS!
            </p>
          </div>
        </section>
        <section
          role="region"
          aria-labelledby="features-heading"
          className="features"
        >
          <div className="features__hero-image">
            <div className="features__scrim"></div>
            <img
              alt="Loja Minha T-Shirt com coleção colorida de produtos"
              src="/banner-loja.jpg"
              loading="lazy"
            />
            <div className="features__trust-metrics">
              <div className="features__trust-item">
                <svg
                  width="24"
                  xmlns="http://www.w3.org/2000/svg"
                  height="24"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
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
                <span>Desde 2017</span>
              </div>
              <div className="features__trust-item">
                <svg
                  width="24"
                  xmlns="http://www.w3.org/2000/svg"
                  height="24"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.12 2.12 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.12 2.12 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.12 2.12 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.12 2.12 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.12 2.12 0 0 0 1.597-1.16z"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  ></path>
                </svg>
                <span>Qualidade Premium</span>
              </div>
              <div className="features__trust-item">
                <svg
                  width="24"
                  xmlns="http://www.w3.org/2000/svg"
                  height="24"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <g
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2M16 3.128a4 4 0 0 1 0 7.744M22 21v-2a4 4 0 0 0-3-3.87"></path>
                    <circle r="4" cx="9" cy="7"></circle>
                  </g>
                </svg>
                <span>53k Revendedoras</span>
              </div>
            </div>
          </div>
          <div className="features__content">
            <h2 id="features-heading" className="section-title">
              {' '}
              Por que começar com a Empreenda T-Shirt
              <span
                dangerouslySetInnerHTML={{
                  __html: ' ',
                }}
              />
            </h2>
            <div className="features__grid">
              <article aria-labelledby="benefit-1" className="features__card">
              <svg
                width="28"
                xmlns="http://www.w3.org/2000/svg"
                height="28"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <g
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M19 5L5 19"></path>
                  <circle r="2.5" cx="6.5" cy="6.5"></circle>
                  <circle r="2.5" cx="17.5" cy="17.5"></circle>
                </g>
              </svg>
              <h3 id="benefit-1" className="features__card-title">
                Lucro de até 200%
              </h3>
              <p className="features__card-body">
                {' '}
                Margem competitiva no atacado para você crescer com segurança
                financeira
                <span
                  dangerouslySetInnerHTML={{
                    __html: ' ',
                  }}
                />
              </p>
            </article>
            <article aria-labelledby="benefit-2" className="features__card">
              <svg
                width="28"
                xmlns="http://www.w3.org/2000/svg"
                height="28"
                viewBox="0 0 24 24"
                aria-hidden="true"
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
              <h3 id="benefit-2" className="features__card-title">
                {' '}
                Envio em 3 dias úteis
                <span
                  dangerouslySetInnerHTML={{
                    __html: ' ',
                  }}
                />
              </h3>
              <p className="features__card-body">
                {' '}
                Logística ágil com rastreio completo por Correios,
                transportadora ou ônibus
                <span
                  dangerouslySetInnerHTML={{
                    __html: ' ',
                  }}
                />
              </p>
            </article>
            <article aria-labelledby="benefit-3" className="features__card">
              <svg
                width="28"
                xmlns="http://www.w3.org/2000/svg"
                height="28"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <g
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M11 21.73a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73zm1 .27V12"></path>
                  <path d="M3.29 7L12 12l8.71-5M7.5 4.27l9 5.15"></path>
                </g>
              </svg>
              <h3 id="benefit-3" className="features__card-title">
                {' '}
                Pedido mínimo: 10 peças
                <span
                  dangerouslySetInnerHTML={{
                    __html: ' ',
                  }}
                />
              </h3>
              <p className="features__card-body">
                {' '}
                Comece pequeno e teste coleções sem alto investimento inicial
                <span
                  dangerouslySetInnerHTML={{
                    __html: ' ',
                  }}
                />
              </p>
            </article>
            <article aria-labelledby="benefit-4" className="features__card">
              <svg
                width="28"
                xmlns="http://www.w3.org/2000/svg"
                height="28"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  d="M20 6L9 17l-5-5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></path>
              </svg>
              <h3 id="benefit-4" className="features__card-title">
                {' '}
                Qualidade 100% algodão
                <span
                  dangerouslySetInnerHTML={{
                    __html: ' ',
                  }}
                />
              </h3>
              <p className="features__card-body">
                {' '}
                Malha premium com variedade de modelos e estampas para rápido
                giro
                <span
                  dangerouslySetInnerHTML={{
                    __html: ' ',
                  }}
                />
              </p>
            </article>
            <article aria-labelledby="benefit-5" className="features__card">
              <svg
                width="28"
                xmlns="http://www.w3.org/2000/svg"
                height="28"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <g
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect x="2" y="5" rx="2" width="20" height="14"></rect>
                  <path d="M2 10h20"></path>
                </g>
              </svg>
              <h3 id="benefit-5" className="features__card-title">
                Pix ou 3x sem juros
              </h3>
              <p className="features__card-body">
                {' '}
                Flexibilidade de pagamento para facilitar sua compra e aumentar
                margem
                <span
                  dangerouslySetInnerHTML={{
                    __html: ' ',
                  }}
                />
              </p>
            </article>
            <article aria-labelledby="benefit-6" className="features__card">
              <svg
                width="28"
                xmlns="http://www.w3.org/2000/svg"
                height="28"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <g
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2M16 3.128a4 4 0 0 1 0 7.744M22 21v-2a4 4 0 0 0-3-3.87"></path>
                  <circle r="4" cx="9" cy="7"></circle>
                </g>
              </svg>
              <h3 id="benefit-6" className="features__card-title">
                {' '}
                Consultoria especializada
                <span
                  dangerouslySetInnerHTML={{
                    __html: ' ',
                  }}
                />
              </h3>
              <p className="features__card-body">
                {' '}
                Suporte humano para montar catálogo e estratégias de revenda
                <span
                  dangerouslySetInnerHTML={{
                    __html: ' ',
                  }}
                />
              </p>
            </article>
            </div>
          </div>
        </section>
        <section
          role="region"
          aria-labelledby="products-heading"
          className="products-carousel"
        >
          <h2 id="products-heading" className="section-title">
            Conheça Nossos Produtos
          </h2>
          <div className="carousel-container">
            <button
              className="carousel-btn carousel-btn--prev"
              aria-label="Ver produtos anteriores"
              onClick={(e) => {
                const container = e.target.closest('.carousel-container').querySelector('.carousel-track');
                container.scrollBy({ left: -container.offsetWidth / 3, behavior: 'smooth' });
              }}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="15 18 9 12 15 6"></polyline>
              </svg>
            </button>
            <div className="carousel-track">
              <div className="carousel-item">
                <img
                  src="https://images.tcdn.com.br/img/img_prod/1094352/t_shirt_coracoes_na_gola_alto_relevo_vermelho_9301_1_a8deca38610facc3420e85781808e280.jpg"
                  alt="T-Shirt Corações na Gola Alto Relevo Vermelho"
                  loading="lazy"
                />
              </div>
              <div className="carousel-item">
                <img
                  src="https://images.tcdn.com.br/img/img_prod/1094352/t_shirt_deixe_deus_cuidar_vermelho_9297_1_9d03e894f8e41a80b0a6ece1dd62b6fd.jpg"
                  alt="T-Shirt Deixe Deus Cuidar Vermelho"
                  loading="lazy"
                />
              </div>
              <div className="carousel-item">
                <img
                  src="https://images.tcdn.com.br/img/img_prod/1094352/t_shirt_coracoes_na_manga_preto_9291_1_4889b5006f9205e77d03509ff076e30b.jpg"
                  alt="T-Shirt Corações na Manga Preto"
                  loading="lazy"
                />
              </div>
              <div className="carousel-item">
                <img
                  src="https://images.tcdn.com.br/img/img_prod/1094352/t_shirt_coracoes_alto_relevo_vermelho_9293_1_a1cd4c344c9a839193b4f1c80877b842.jpg"
                  alt="T-Shirt Corações Alto Relevo Vermelho"
                  loading="lazy"
                />
              </div>
              <div className="carousel-item">
                <img
                  src="https://images.tcdn.com.br/img/img_prod/1094352/t_shirt_tua_graca_rosa_pink_10612_1_7ff06a0c3a241a2ebfab24d03d3d4469.jpg"
                  alt="T-Shirt Tua Graça Rosa Pink"
                  loading="lazy"
                />
              </div>
              <div className="carousel-item">
                <img
                  src="https://images.tcdn.com.br/img/img_prod/1094352/t_shirt_abencoada_por_deus_preto_10180_1_0a6e9429f3cafc767b1c4d199d3a170a.jpg"
                  alt="T-Shirt Abençoada por Deus Preto"
                  loading="lazy"
                />
              </div>
            </div>
            <button
              className="carousel-btn carousel-btn--next"
              aria-label="Ver próximos produtos"
              onClick={(e) => {
                const container = e.target.closest('.carousel-container').querySelector('.carousel-track');
                container.scrollBy({ left: container.offsetWidth / 3, behavior: 'smooth' });
              }}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="9 18 15 12 9 6"></polyline>
              </svg>
            </button>
          </div>
        </section>
        <section
          role="region"
          aria-labelledby="process-heading"
          className="process"
        >
          <div className="process__steps">
            <article aria-labelledby="step-1" className="process__step">
              <div className="process__step-badge">
                <span>1</span>
              </div>
              <div className="process__step-content">
                <h3 id="step-1" className="process__step-title">
                  {' '}
                  Fale com uma consultora
                  <span
                    dangerouslySetInnerHTML={{
                      __html: ' ',
                    }}
                  />
                </h3>
                <p className="process__step-body">
                  {' '}
                  Clique e receba atendimento personalizado para montar seu
                  catálogo e entender preços
                  <span
                    dangerouslySetInnerHTML={{
                      __html: ' ',
                    }}
                  />
                </p>
              </div>
            </article>
            <article aria-labelledby="step-2" className="process__step">
              <div className="process__step-badge">
                <span>2</span>
              </div>
              <div className="process__step-content">
                <h3 id="step-2" className="process__step-title">
                  Escolha seus produtos
                </h3>
                <p className="process__step-body">
                  {' '}
                  Acesse nosso catálogo exclusivo, selecione modelos e cores
                  adequados ao seu público
                  <span
                    dangerouslySetInnerHTML={{
                      __html: ' ',
                    }}
                  />
                </p>
              </div>
            </article>
            <article aria-labelledby="step-3" className="process__step">
              <div className="process__step-badge">
                <span>3</span>
              </div>
              <div className="process__step-content">
                <h3 id="step-3" className="process__step-title">
                  {' '}
                  Receba suporte profissional
                  <span
                    dangerouslySetInnerHTML={{
                      __html: ' ',
                    }}
                  />
                </h3>
                <p className="process__step-body">
                  {' '}
                  Orientação sobre precificação, montagem de kits e estratégias
                  de venda por WhatsApp
                  <span
                    dangerouslySetInnerHTML={{
                      __html: ' ',
                    }}
                  />
                </p>
              </div>
            </article>
            <article aria-labelledby="step-4" className="process__step">
              <div className="process__step-badge">
                <span>4</span>
              </div>
              <div className="process__step-content">
                <h3 id="step-4" className="process__step-title">
                  Acompanhe e venda
                </h3>
                <p className="process__step-body">
                  {' '}
                  Rastreio completo do pedido e assistência pós-venda para
                  fidelizar seus clientes
                  <span
                    dangerouslySetInnerHTML={{
                      __html: ' ',
                    }}
                  />
                </p>
              </div>
            </article>
          </div>
          <div className="process__sidebar">
            <div className="process__proof">
              <div className="process__stat">
                <span className="process__stat-number">93.530+</span>
                <span className="process__stat-label">Pedidos entregues</span>
              </div>
              <div className="process__stat">
                <span className="process__stat-number">8 anos</span>
                <span className="process__stat-label">Construindo sonhos</span>
              </div>
              <div className="process__stat">
                <span className="process__stat-number">3 dias</span>
                <span className="process__stat-label">Envio rápido</span>
              </div>
            </div>
            <div className="process__intro">
            <h2 id="process-heading" className="section-title">
              Como Começar
            </h2>
            <p className="section-content">
              {' '}
              4 passos simples e seguros para abrir sua revenda e conquistar
              independência financeira
              <span
                dangerouslySetInnerHTML={{
                  __html: ' ',
                }}
              />
            </p>
            <a href="#contato">
              <div
                aria-label="Iniciar jornada empreendedora"
                className="btn btn-primary"
              >
                <span>
                  {' '}
                  Começar Agora
                  <span
                    dangerouslySetInnerHTML={{
                      __html: ' ',
                    }}
                  />
                </span>
              </div>
            </a>
            </div>
          </div>
        </section>
        <section
          aria-labelledby="testimonials-heading"
          className="testimonials"
        >
          <h2 id="testimonials-heading" className="section-title">
            {' '}
            O que nossas revendedoras dizem
            <span
              dangerouslySetInnerHTML={{
                __html: ' ',
              }}
            />
          </h2>
          <p className="section-subtitle">
            Histórias reais, resultados concretos
          </p>
          <div className="testimonials__grid">
            <article
              role="article"
              aria-label="Depoimento de Tati M."
              className="testimonials__card"
            >
              <div className="testimonials__card-header">
                <div className="testimonials__avatar">
                  <span>TM</span>
                </div>
                <div className="testimonials__meta">
                  <strong className="testimonials__name">Tati Marques</strong>
                  <div className="testimonials__rating">
                    <svg
                      width="16"
                      xmlns="http://www.w3.org/2000/svg"
                      height="16"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <path
                        d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.12 2.12 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.12 2.12 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.12 2.12 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.12 2.12 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.12 2.12 0 0 0 1.597-1.16z"
                        fill="currentColor"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      ></path>
                    </svg>
                    <svg
                      width="16"
                      xmlns="http://www.w3.org/2000/svg"
                      height="16"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <path
                        d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.12 2.12 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.12 2.12 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.12 2.12 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.12 2.12 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.12 2.12 0 0 0 1.597-1.16z"
                        fill="currentColor"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      ></path>
                    </svg>
                    <svg
                      width="16"
                      xmlns="http://www.w3.org/2000/svg"
                      height="16"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <path
                        d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.12 2.12 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.12 2.12 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.12 2.12 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.12 2.12 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.12 2.12 0 0 0 1.597-1.16z"
                        fill="currentColor"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      ></path>
                    </svg>
                    <svg
                      width="16"
                      xmlns="http://www.w3.org/2000/svg"
                      height="16"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <path
                        d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.12 2.12 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.12 2.12 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.12 2.12 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.12 2.12 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.12 2.12 0 0 0 1.597-1.16z"
                        fill="currentColor"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      ></path>
                    </svg>
                    <svg
                      width="16"
                      xmlns="http://www.w3.org/2000/svg"
                      height="16"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <path
                        d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.12 2.12 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.12 2.12 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.12 2.12 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.12 2.12 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.12 2.12 0 0 0 1.597-1.16z"
                        fill="currentColor"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      ></path>
                    </svg>
                  </div>
                </div>
              </div>
              <blockquote className="testimonials__quote">
                <span>
                  {' '}
                  Comecei com 10 peças e em 2 meses já recuperei o investimento.
                  Atendimento impecável e peças que vendem sozinhas. Hoje tenho
                  minha renda estável.
                  <span
                    dangerouslySetInnerHTML={{
                      __html: ' ',
                    }}
                  />
                </span>
              </blockquote>
            </article>
            <article
              role="article"
              aria-label="Depoimento de Renata A."
              className="testimonials__card"
            >
                <div className="testimonials__card-header">
                  <div className="testimonials__avatar">
                    <span>RA</span>
                  </div>
                  <div className="testimonials__meta">
                    <strong className="testimonials__name">
                      Renata Araújo
                    </strong>
                    <div className="testimonials__rating">
                      <svg
                        width="14"
                        xmlns="http://www.w3.org/2000/svg"
                        height="14"
                        viewBox="0 0 24 24"
                        aria-hidden="true"
                      >
                        <path
                          d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.12 2.12 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.12 2.12 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.12 2.12 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.12 2.12 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.12 2.12 0 0 0 1.597-1.16z"
                          fill="currentColor"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        ></path>
                      </svg>
                      <svg
                        width="14"
                        xmlns="http://www.w3.org/2000/svg"
                        height="14"
                        viewBox="0 0 24 24"
                        aria-hidden="true"
                      >
                        <path
                          d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.12 2.12 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.12 2.12 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.12 2.12 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.12 2.12 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.12 2.12 0 0 0 1.597-1.16z"
                          fill="currentColor"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        ></path>
                      </svg>
                      <svg
                        width="14"
                        xmlns="http://www.w3.org/2000/svg"
                        height="14"
                        viewBox="0 0 24 24"
                        aria-hidden="true"
                      >
                        <path
                          d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.12 2.12 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.12 2.12 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.12 2.12 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.12 2.12 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.12 2.12 0 0 0 1.597-1.16z"
                          fill="currentColor"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        ></path>
                      </svg>
                      <svg
                        width="14"
                        xmlns="http://www.w3.org/2000/svg"
                        height="14"
                        viewBox="0 0 24 24"
                        aria-hidden="true"
                      >
                        <path
                          d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.12 2.12 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.12 2.12 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.12 2.12 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.12 2.12 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.12 2.12 0 0 0 1.597-1.16z"
                          fill="currentColor"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        ></path>
                      </svg>
                      <svg
                        width="14"
                        xmlns="http://www.w3.org/2000/svg"
                        height="14"
                        viewBox="0 0 24 24"
                        aria-hidden="true"
                      >
                        <path
                          d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.12 2.12 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.12 2.12 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.12 2.12 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.12 2.12 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.12 2.12 0 0 0 1.597-1.16z"
                          fill="currentColor"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        ></path>
                      </svg>
                    </div>
                  </div>
                </div>
                <blockquote className="testimonials__quote">
                  <span>
                    {' '}
                    Produto de alta qualidade, envio rápido e cliente volta
                    sempre. Hoje tenho minha renda fixa mensal graças à Minha
                    T-Shirt.
                    <span
                      dangerouslySetInnerHTML={{
                        __html: ' ',
                      }}
                    />
                  </span>
                </blockquote>
              </article>
              <article
                role="article"
                aria-label="Depoimento de Gabi A."
                className="testimonials__card"
              >
                <div className="testimonials__card-header">
                  <div className="testimonials__avatar">
                    <span>GA</span>
                  </div>
                  <div className="testimonials__meta">
                    <strong className="testimonials__name">Gabi Andrade</strong>
                    <div className="testimonials__rating">
                      <svg
                        width="14"
                        xmlns="http://www.w3.org/2000/svg"
                        height="14"
                        viewBox="0 0 24 24"
                        aria-hidden="true"
                      >
                        <path
                          d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.12 2.12 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.12 2.12 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.12 2.12 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.12 2.12 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.12 2.12 0 0 0 1.597-1.16z"
                          fill="currentColor"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        ></path>
                      </svg>
                      <svg
                        width="14"
                        xmlns="http://www.w3.org/2000/svg"
                        height="14"
                        viewBox="0 0 24 24"
                        aria-hidden="true"
                      >
                        <path
                          d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.12 2.12 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.12 2.12 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.12 2.12 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.12 2.12 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.12 2.12 0 0 0 1.597-1.16z"
                          fill="currentColor"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        ></path>
                      </svg>
                      <svg
                        width="14"
                        xmlns="http://www.w3.org/2000/svg"
                        height="14"
                        viewBox="0 0 24 24"
                        aria-hidden="true"
                      >
                        <path
                          d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.12 2.12 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.12 2.12 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.12 2.12 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.12 2.12 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.12 2.12 0 0 0 1.597-1.16z"
                          fill="currentColor"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        ></path>
                      </svg>
                      <svg
                        width="14"
                        xmlns="http://www.w3.org/2000/svg"
                        height="14"
                        viewBox="0 0 24 24"
                        aria-hidden="true"
                      >
                        <path
                          d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.12 2.12 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.12 2.12 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.12 2.12 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.12 2.12 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.12 2.12 0 0 0 1.597-1.16z"
                          fill="currentColor"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        ></path>
                      </svg>
                      <svg
                        width="14"
                        xmlns="http://www.w3.org/2000/svg"
                        height="14"
                        viewBox="0 0 24 24"
                        aria-hidden="true"
                      >
                        <path
                          d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.12 2.12 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.12 2.12 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.12 2.12 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.12 2.12 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.12 2.12 0 0 0 1.597-1.16z"
                          fill="currentColor"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        ></path>
                      </svg>
                    </div>
                  </div>
                </div>
                <blockquote className="testimonials__quote">
                  <span>
                    {' '}
                    Peças lindas, tecido excelente e estampas que atraem. Cresci
                    minhas vendas nas redes sociais em semanas.
                    <span
                      dangerouslySetInnerHTML={{
                        __html: ' ',
                      }}
                    />
                  </span>
                </blockquote>
              </article>
              <article
                role="article"
                aria-label="Depoimento de Ka S."
                className="testimonials__card"
              >
                <div className="testimonials__card-header">
                  <div className="testimonials__avatar">
                    <span>KS</span>
                  </div>
                  <div className="testimonials__meta">
                    <strong className="testimonials__name">Ka Santos</strong>
                    <div className="testimonials__rating">
                      <svg
                        width="14"
                        xmlns="http://www.w3.org/2000/svg"
                        height="14"
                        viewBox="0 0 24 24"
                        aria-hidden="true"
                      >
                        <path
                          d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.12 2.12 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.12 2.12 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.12 2.12 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.12 2.12 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.12 2.12 0 0 0 1.597-1.16z"
                          fill="currentColor"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        ></path>
                      </svg>
                      <svg
                        width="14"
                        xmlns="http://www.w3.org/2000/svg"
                        height="14"
                        viewBox="0 0 24 24"
                        aria-hidden="true"
                      >
                        <path
                          d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.12 2.12 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.12 2.12 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.12 2.12 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.12 2.12 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.12 2.12 0 0 0 1.597-1.16z"
                          fill="currentColor"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        ></path>
                      </svg>
                      <svg
                        width="14"
                        xmlns="http://www.w3.org/2000/svg"
                        height="14"
                        viewBox="0 0 24 24"
                        aria-hidden="true"
                      >
                        <path
                          d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.12 2.12 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.12 2.12 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.12 2.12 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.12 2.12 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.12 2.12 0 0 0 1.597-1.16z"
                          fill="currentColor"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        ></path>
                      </svg>
                      <svg
                        width="14"
                        xmlns="http://www.w3.org/2000/svg"
                        height="14"
                        viewBox="0 0 24 24"
                        aria-hidden="true"
                      >
                        <path
                          d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.12 2.12 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.12 2.12 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.12 2.12 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.12 2.12 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.12 2.12 0 0 0 1.597-1.16z"
                          fill="currentColor"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        ></path>
                      </svg>
                      <svg
                        width="14"
                        xmlns="http://www.w3.org/2000/svg"
                        height="14"
                        viewBox="0 0 24 24"
                        aria-hidden="true"
                      >
                        <path
                          d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.12 2.12 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.12 2.12 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.12 2.12 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.12 2.12 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.12 2.12 0 0 0 1.597-1.16z"
                          fill="currentColor"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        ></path>
                      </svg>
                    </div>
                  </div>
                </div>
                <blockquote className="testimonials__quote">
                  <span>
                    {' '}
                    Equipe atenciosa, entrega dentro do prazo e opções para
                    revenda que cabem no meu capital inicial.
                    <span
                      dangerouslySetInnerHTML={{
                        __html: ' ',
                      }}
                    />
                  </span>
                </blockquote>
              </article>
          </div>
          <div className="testimonials__cta">
            <p className="section-content">Quer ver resultados parecidos?</p>
            <a href="#contato">
              <div
                aria-label="Começar agora com consultora"
                className="btn btn-primary"
              >
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
        </section>
        <section id="contato" className="contact-card">
          <div className="cta-panel">
            <h2 className="hero-title">
              Pronta para transformar seu sonho em renda?
            </h2>
            <p className="section-content">
              {' '}
              Fale agora com uma consultora pelo WhatsApp e ganhe atendimento
              personalizado para montar seu negócio de revenda com segurança e
              lucro real.
              <span
                dangerouslySetInnerHTML={{
                  __html: ' ',
                }}
              />
            </p>
            <div className="cta-panel__features">
              <div className="cta-panel__feature">
                <svg
                  width="24"
                  xmlns="http://www.w3.org/2000/svg"
                  height="24"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    d="M20 6L9 17l-5-5"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  ></path>
                </svg>
                <span>Orientação completa sobre catálogo e margens</span>
              </div>
              <div className="cta-panel__feature">
                <svg
                  width="24"
                  xmlns="http://www.w3.org/2000/svg"
                  height="24"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    d="M20 6L9 17l-5-5"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  ></path>
                </svg>
                <span>Suporte na primeira compra até seu primeiro pedido</span>
              </div>
              <div className="cta-panel__feature">
                <svg
                  width="24"
                  xmlns="http://www.w3.org/2000/svg"
                  height="24"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    d="M20 6L9 17l-5-5"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  ></path>
                </svg>
                <span>Resposta rápida e acompanhamento personalizado</span>
              </div>
            </div>
            <a href="https://atacado.minhatshirt.com.br/#formulario-wpp">
              <div
                aria-label="Falar com consultora no WhatsApp"
                className="btn btn-primary btn-lg whatsapp-cta"
              >
                <svg
                  width="24"
                  xmlns="http://www.w3.org/2000/svg"
                  height="24"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
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
                <span>
                  {' '}
                  Falar com Consultora Agora
                  <span
                    dangerouslySetInnerHTML={{
                      __html: ' ',
                    }}
                  />
                </span>
              </div>
            </a>
          </div>
          <div className="credentials">
            <div className="credentials__badges">
              <span className="credentials__badge">8 Anos no Mercado</span>
              <span className="credentials__badge">93.530+ Pedidos</span>
            </div>
            <div className="credentials__consultant">
              <img
                alt="Consultora especialista em atacado"
                src="https://images.pexels.com/photos/4467687/pexels-photo-4467687.jpeg?auto=compress&amp;cs=tinysrgb&amp;w=1500"
                loading="lazy"
                className="credentials__photo"
              />
              <div className="credentials__info">
                <h3 className="credentials__name">Equipe Especializada</h3>
                <p className="credentials__role">
                  Consultoras prontas para ajudar você
                </p>
              </div>
            </div>
            <div className="credentials__trust">
              <svg
                width="20"
                xmlns="http://www.w3.org/2000/svg"
                height="20"
                viewBox="0 0 24 24"
                aria-hidden="true"
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
              <p>Atendimento seguro e confiável desde 2017</p>
            </div>
          </div>
        </section>
      </div>
      <div className="home-container5">
        <div className="home-container6">
          <Script
            html={`<style>
        @keyframes heroFadeIn {to {opacity: 1;
transform: translateY(0);}}@keyframes heroVisualSlide {to {opacity: 1;
transform: translateX(0);}}@keyframes featuresFadeIn {to {opacity: 1;
transform: translateX(0);}}@keyframes cardFadeIn {to {opacity: 1;
transform: translateY(0);}}@keyframes stepFadeIn {to {opacity: 1;
transform: translateY(0);}}@keyframes testimonialFadeIn {to {opacity: 1;
transform: translateY(0);}}
        </style> `}
          ></Script>
        </div>
      </div>
      <div className="home-container7">
        <div className="home-container8">
          <Script
            html={`<script defer data-name="empreenda-tshirt-interactions">
(function(){
  // Intersection Observer for scroll-triggered animations
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  }

  const fadeInObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = "1"
        entry.target.style.transform = "translateY(0)"
      }
    })
  }, observerOptions)

  // Observe all animated elements
  const animatedElements = document.querySelectorAll(
    ".features__card, .process__step, .testimonials__card, .product-tile"
  )
  animatedElements.forEach((el) => fadeInObserver.observe(el))

  // Add smooth hover enhancement for CTA buttons
  const ctaButtons = document.querySelectorAll(".btn, .whatsapp-cta")
  ctaButtons.forEach((button) => {
    button.addEventListener("mouseenter", () => {
      button.style.transform = "scale(1.02)"
    })

    button.addEventListener("mouseleave", () => {
      button.style.transform = "scale(1)"
    })
  })

  // Track scroll position for mobile sticky CTA
  let lastScroll = 0
  const mobileCTA = document.querySelector(".whatsapp-cta")

  if (window.innerWidth <= 479 && mobileCTA) {
    window.addEventListener("scroll", () => {
      const currentScroll = window.pageYOffset

      if (currentScroll > lastScroll && currentScroll > 500) {
        mobileCTA.style.opacity = "1"
        mobileCTA.style.pointerEvents = "auto"
      }

      lastScroll = currentScroll
    })
  }

  // Enhanced focus states for accessibility
  const focusableElements = document.querySelectorAll("a, button")
  focusableElements.forEach((element) => {
    element.addEventListener("focus", function () {
      this.style.outline = "2px solid var(--color-outline)"
      this.style.outlineOffset = "2px"
    })

    element.addEventListener("blur", function () {
      this.style.outline = ""
      this.style.outlineOffset = ""
    })
  })
})()
</script>`}
          ></Script>
        </div>
      </div>
      <Footer></Footer>
    </div>
  )
}

export default Home
