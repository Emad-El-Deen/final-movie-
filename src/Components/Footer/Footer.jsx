import React from 'react';
import styles from './Footer.module.css';

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className="container">
        <div className="row">
          <div className="col-md-6">
            <h4>About Us</h4>
            <p>
              MovieMight is your go-to platform for the latest movies and TV shows. 
              Discover, watch, and enjoy a vast collection of content.
            </p>
          </div>
          <div className="col-md-6">
            <h4>Contact Us</h4>
            <p>
              Email: info@moviemight.com<br />
              Phone: +123 456 7890
            </p>
          </div>
        </div>
        <div className="row">
          <div className="col-12 text-center">
            <div className={styles.socialIcons}>
              <a href="https://www.facebook.com" aria-label="Facebook">
                <i className="fab fa-facebook"></i>
              </a>
              <a href="https://twitter.com" aria-label="Twitter">
                <i className="fab fa-twitter"></i>
              </a>
              <a href="https://www.instagram.com" aria-label="Instagram">
                <i className="fab fa-instagram"></i>
              </a>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-12 text-center">
            <div className={styles.copyright}>
              &copy; {new Date().getFullYear()} MovieMight. All rights reserved.
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
