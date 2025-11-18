import React, { useState, useEffect, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import './contact-form.css';

const schema = yup.object({
  name: yup.string().required('Nome é obrigatório'),
  email: yup.string().email('Email inválido').required('Email é obrigatório'),
  phone: yup.string()
    .required('Telefone é obrigatório')
    .min(10, 'Telefone deve ter pelo menos 10 dígitos')
}).required();

const getOrCreateSessionId = () => {
  let sessionId = sessionStorage.getItem('formSessionId');
  if (!sessionId) {
    sessionId = 'session_' + Date.now() + '_' + Math.random().toString(36).substring(2, 9);
    sessionStorage.setItem('formSessionId', sessionId);
  }
  return sessionId;
};

const ContactForm = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [leadId, setLeadId] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', phone: '' });
  const [countdown, setCountdown] = useState(3);
  const [redirectUrl, setRedirectUrl] = useState('');
  const saveTimeoutRef = useRef(null);
  const sessionIdRef = useRef(getOrCreateSessionId());
  
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch
  } = useForm({
    resolver: yupResolver(schema)
  });

  const savePartialData = async (data) => {
    try {
      const urlParams = new URLSearchParams(window.location.search);
      await fetch('/api/abandoned-signups', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          sessionId: sessionIdRef.current,
          name: data.name || null,
          email: data.email || null,
          phone: data.phone || null,
          utmSource: urlParams.get('utm_source'),
          utmMedium: urlParams.get('utm_medium'),
          utmCampaign: urlParams.get('utm_campaign')
        })
      });
    } catch (error) {
      console.error('Error saving partial data:', error);
    }
  };

  const handleFieldChange = (field, value) => {
    const updatedData = { ...formData, [field]: value };
    setFormData(updatedData);

    if (saveTimeoutRef.current) {
      clearTimeout(saveTimeoutRef.current);
    }

    if (value && value.length > 2) {
      saveTimeoutRef.current = setTimeout(() => {
        savePartialData(updatedData);
      }, 1500);
    }
  };

  useEffect(() => {
    const subscription = watch((value) => {
      if (value.name !== formData.name) handleFieldChange('name', value.name);
      if (value.email !== formData.email) handleFieldChange('email', value.email);
      if (value.phone !== formData.phone) handleFieldChange('phone', value.phone);
    });
    return () => subscription.unsubscribe();
  }, [watch, formData]);

  useEffect(() => {
    if (!isSubmitted) return;

    let timer = null;
    
    const fetchSettings = async () => {
      try {
        const response = await fetch('/api/settings');
        const data = await response.json();
        
        if (data.settings.redirectEnabled === 'true' && data.settings.redirectUrl) {
          setRedirectUrl(data.settings.redirectUrl);
          setCountdown(3);
          
          timer = setInterval(() => {
            setCountdown((prev) => {
              if (prev <= 1) {
                clearInterval(timer);
                window.location.href = data.settings.redirectUrl;
                return 0;
              }
              return prev - 1;
            });
          }, 1000);
        }
      } catch (error) {
        console.error('Error fetching settings:', error);
      }
    };

    fetchSettings();
    
    return () => {
      if (timer) {
        clearInterval(timer);
      }
    };
  }, [isSubmitted]);

  const onSubmit = async (data) => {
    setIsLoading(true);
    
    try {
      const urlParams = new URLSearchParams(window.location.search);
      const response = await fetch('/api/leads', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          ...data,
          utmSource: urlParams.get('utm_source'),
          utmMedium: urlParams.get('utm_medium'),
          utmCampaign: urlParams.get('utm_campaign')
        })
      });

      if (response.ok) {
        const result = await response.json();
        setLeadId(result.leadId);
        setIsSubmitted(true);

        await fetch('/api/abandoned-signups/mark-completed', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            sessionId: sessionIdRef.current
          })
        });

        sessionStorage.removeItem('formSessionId');
        sessionIdRef.current = 'session_' + Date.now() + '_' + Math.random().toString(36).substring(2, 9);
        sessionStorage.setItem('formSessionId', sessionIdRef.current);
        
        if (window.dataLayer) {
          window.dataLayer.push({
            event: 'form_submit',
            form_name: 'contact_form'
          });
        }
      } else {
        alert('Erro ao enviar formulário. Tente novamente.');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('Erro ao enviar formulário. Tente novamente.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleButtonClick = () => {
    if (redirectUrl) {
      if (window.dataLayer) {
        window.dataLayer.push({
          event: 'redirect_button_click',
          redirect_url: redirectUrl
        });
      }
      window.location.href = redirectUrl;
    }
  };

  if (isSubmitted) {
    return (
      <div className="contact-form-success">
        <div className="success-icon">✓</div>
        <h3 className="success-title">Cadastro realizado com sucesso!</h3>
        <p className="success-message">
          Obrigado pelo seu cadastro! Em instantes você será redirecionado para falar com nossa equipe.
        </p>
        {redirectUrl && (
          <div className="redirect-countdown">
            <p>Redirecionando em <strong>{countdown}</strong> segundo{countdown !== 1 ? 's' : ''}...</p>
          </div>
        )}
        <button 
          onClick={handleButtonClick}
          className="btn btn-primary btn-redirect"
          aria-label="Falar com consultora agora"
          disabled={!redirectUrl}
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
    <form onSubmit={handleSubmit(onSubmit)} className="contact-form">
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
