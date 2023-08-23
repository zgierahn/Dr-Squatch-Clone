import React from 'react';
import woodGrain from "../../images/woodgrain.webp";
import bCorp from "../../images/b-corp-logo.webp";
import amex from "../../images/Amex-logo.png";
import google from "../../images/Google-pay.png";
import mc from "../../images/mc-logo.png";
import payPal from "../../images/PayPal-logo.png";
import shopPay from "../../images/Shop-Pay-logo.png";
import visa from "../../images/Visa-logo.png";
import trusted1 from "../../images/trusted_by_1.png";
import trusted2 from "../../images/trusted_by_2.png";
import trusted3 from "../../images/trusted_by_3.png";
import trusted4 from "../../images/trusted_by_4.png";

import "./Footer.css";



function Footer() {

  return (
    <main className='footerMain'>
        <section className='footerSection'>
        <img  className="woodGrain" src={woodGrain} alt="footer woodgrain graphic"/>
            <div className='bCorpContainer'>
                <img  className="corpLogo" src={bCorp} alt="B corp logo"/>
                <span className='faBrandsSpan'>
                    <i className="fa-brands fa-instagram"></i>
                    <i className="fa-brands fa-youtube"></i>
                    <i className="fa-brands fa-facebook"></i>
                    <i className="fa-brands fa-twitter"></i>
                    <i className="fa-brands fa-linkedin"></i>
                </span>
            </div>
            <span className='paymentSpan'>
                <img  className="paymentLogos" src={amex} alt="american express logo"/>
                <img  className="paymentLogos" src={google} alt="google pay logo"/>
                <img  className="paymentLogos" src={mc} alt="mastercard logo"/>
                <img  className="paymentLogos" src={payPal} alt="paypal logo"/>
                <img  className="paymentLogos" src={shopPay} alt="shop pay logo"/>
                <img  className="paymentLogos" src={visa} alt="visa logo"/>
            </span>
            <div className='rightsReserved'>
                DR. SQUATCH is a registered trademark of Dr. Squatch, LLC © 2023, Dr. Squatch, LLC All rights reserved.  Terms of Use  |  Privacy Policy
            </div>
        </section>
    </main>

  )
}

export default Footer
