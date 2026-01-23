import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import './contact-form.css';

const REDIRECT_URL = 'https://sige.letgrupo.com.br/link/comercial-atendentes';

const schema = yup.object({
  name: yup.string().required('Nome é obrigatório'),
  email: yup.string().email('Email inválido').required('Email é obrigatório'),
  phone: yup.string()
    .required('Telefone é obrigatório')
    .min(10, 'Telefone deve ter pelo menos 10 dígitos')
}).required();

const ContactForm = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [countdown, setCountdown] = useState(3);
  
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(schema)
  });

  useEffect(() => {
    if (!isSubmitted) return;

    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          window.location.href = REDIRECT_URL;
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    
    return () => clearInterval(timer);
  }, [isSubmitted]);

  const onSubmit = async (data) => {
    setIsLoading(true);
    
    if (window.dataLayer) {
      window.dataLayer.push({
        event: 'form_submit',
        form_name: 'contact_form',
        user_name: data.name,
        user_email: data.email,
        user_phone: data.phone
      });
    }

    setTimeout(() => {
      setIsSubmitted(true);
      setIsLoading(false);
    }, 500);
  };

  const handleButtonClick = () => {
    if (window.dataLayer) {
      window.dataLayer.push({
        event: 'redirect_button_click',
        redirect_url: REDIRECT_URL
      });
    }
    window.location.href = REDIRECT_URL;
  };

  if (isSubmitted) {
    return (
      <div className="contact-form-success">
        <div className="success-icon">✓</div>
        <h3 className="success-title">Cadastro realizado com sucesso!</h3>
        <p className="success-message">
          Obrigado pelo seu cadastro! Em instantes você será redirecionado para falar com nossa equipe.
        </p>
        <div className="redirect-countdown">
          <p>Redirecionando em <strong>{countdown}</strong> segundo{countdown !== 1 ? 's' : ''}...</p>
        </div>
        <button 
          onClick={handleButtonClick}
          className="btn btn-primary btn-redirect"
          aria-label="Falar com consultora agora"
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M13.832 16.568a1 1 0 0 0 1.213-.303l.355-.465A2 2 0 0 1 17 15h3a2 2 0 0 1 2 2v3a2 2 0 0 1 2-2A18 18 0 0 1 2 4a2 2 0 0 1 2-2h3a2 2 0 0 1 2 2v3a2 2 0 0 1-.8 1.6l-.468.351a1 1 0 0 0-.292 1.233a14 14 0 0 0 6.392 6.384" />
          </svg>
          <span>Falar com Consultora Agora</span>
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="contact-form" data-leadflow-form>
      <div className="form-group">
        <label htmlFor="name">Nome completo</label>
        <input
          id="name"
          type="text"
          placeholder="Digite seu nome"
          {...register('name')}
          className={errors.name ? 'input-error' : ''}
        />
        {errors.name && <span className="error-message">{errors.name.message}</span>}
      </div>

      <div className="form-group">
        <label htmlFor="email">Email</label>
        <input
          id="email"
          type="email"
          placeholder="seu@email.com"
          {...register('email')}
          className={errors.email ? 'input-error' : ''}
        />
        {errors.email && <span className="error-message">{errors.email.message}</span>}
      </div>

      <div className="form-group">
        <label htmlFor="phone">Telefone / WhatsApp</label>
        <input
          id="phone"
          type="tel"
          placeholder="(11) 99999-9999"
          {...register('phone')}
          className={errors.phone ? 'input-error' : ''}
        />
        {errors.phone && <span className="error-message">{errors.phone.message}</span>}
      </div>

      <button 
        type="submit" 
        className="btn btn-primary btn-submit"
        disabled={isLoading}
      >
        {isLoading ? 'Enviando...' : 'Continuar para WhatsApp'}
      </button>
      
      <p className="form-privacy">
        Ao continuar, você concorda em receber contato da nossa equipe
      </p>
    </form>
  );
};

export default ContactForm;
