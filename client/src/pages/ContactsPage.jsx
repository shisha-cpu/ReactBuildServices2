import React from 'react';
import './ContactsPage.css'
const ContactsPage = () => {
  return (
    <div className="contacts-container">
      <div className="contacts-hero">
        <h1 className="contacts-title">Контакты</h1>
        <p className="contacts-subtitle">Свяжитесь с нами удобным для вас способом</p>
      </div>

      <div className="contacts-content">
        <div className="contacts-grid">
          <section className="contacts-info">
            <h2 className="contacts-section-title">Контактная информация</h2>
            
            <div className="contacts-info-item">
              <div className="contacts-icon">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <div>
                <h3 className="contacts-info-title">Адрес</h3>
                <p className="contacts-info-text">г. Москва, ул. Примерная, д. 123, офис 456</p>
              </div>
            </div>

            <div className="contacts-info-item">
              <div className="contacts-icon">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              </div>
              <div>
                <h3 className="contacts-info-title">Телефон</h3>
                <p className="contacts-info-text">+7 (123) 456-78-90</p>
              </div>
            </div>

            <div className="contacts-info-item">
              <div className="contacts-icon">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <div>
                <h3 className="contacts-info-title">Email</h3>
                <p className="contacts-info-text">info@example.com</p>
              </div>
            </div>

            <div className="contacts-info-item">
              <div className="contacts-icon">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <h3 className="contacts-info-title">Часы работы</h3>
                <p className="contacts-info-text">Пн-Пт: 9:00 - 18:00</p>
                <p className="contacts-info-text">Сб-Вс: выходной</p>
              </div>
            </div>
          </section>

          <section className="contacts-form-section">
            <h2 className="contacts-section-title">Напишите нам</h2>
            <form className="contacts-form">
              <div className="form-group">
                <label htmlFor="name" className="form-label">Ваше имя</label>
                <input type="text" id="name" className="form-input" placeholder="Иван Иванов" />
              </div>
              <div className="form-group">
                <label htmlFor="email" className="form-label">Email</label>
                <input type="email" id="email" className="form-input" placeholder="example@mail.com" />
              </div>
              <div className="form-group">
                <label htmlFor="message" className="form-label">Сообщение</label>
                <textarea id="message" className="form-textarea" rows="5" placeholder="Ваше сообщение..."></textarea>
              </div>
              <button type="submit" className="form-submit">Отправить сообщение</button>
            </form>
          </section>
        </div>


      </div>
    </div>
  );
};

export default ContactsPage;