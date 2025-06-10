import React from 'react';
import './AboutPage.css'
const AboutPage = () => {
  return (
    <div className="about-container">
      <div className="about-hero">
        <h1 className="about-title">О нашей компании</h1>
        <p className="about-subtitle">Мы создаем решения, которые делают жизнь проще</p>
      </div>

      <div className="about-content">
        <section className="about-section">
          <h2 className="about-section-title">Наша история</h2>
          <div className="about-section-content">
            <p>Наша компания была основана в 2010 году с целью предоставления качественных услуг в сфере IT. С тех пор мы выросли в команду профессионалов, обслуживающих клиентов по всей стране.</p>
            <p>Начиная с малого офиса с тремя сотрудниками, сегодня мы имеем представительства в 5 крупных городах и штат из более чем 100 специалистов.</p>
          </div>
        </section>

        <section className="about-section">
          <h2 className="about-section-title">Наши ценности</h2>
          <div className="about-values">
            <div className="about-value-card">
              <h3 className="about-value-title">Качество</h3>
              <p>Мы стремимся к совершенству в каждом проекте, гарантируя высочайшее качество наших услуг.</p>
            </div>
            <div className="about-value-card">
              <h3 className="about-value-title">Инновации</h3>
              <p>Постоянное развитие и внедрение новых технологий - наш ключевой принцип работы.</p>
            </div>
            <div className="about-value-card">
              <h3 className="about-value-title">Клиентоориентированность</h3>
              <p>Наши клиенты - наш главный приоритет. Мы всегда готовы пойти навстречу вашим потребностям.</p>
            </div>
          </div>
        </section>

        <section className="about-section">
          <h2 className="about-section-title">Наша команда</h2>
          <div className="about-team">
            <div className="about-team-member">
              <div className="about-team-avatar"></div>
              <h3 className="about-team-name">Иван Иванов</h3>
              <p className="about-team-position">Генеральный директор</p>
            </div>
            <div className="about-team-member">
              <div className="about-team-avatar"></div>
              <h3 className="about-team-name">Анна Петрова</h3>
              <p className="about-team-position">Технический директор</p>
            </div>
            <div className="about-team-member">
              <div className="about-team-avatar"></div>
              <h3 className="about-team-name">Сергей Сидоров</h3>
              <p className="about-team-position">Руководитель отдела разработки</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default AboutPage;