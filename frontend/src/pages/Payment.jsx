import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:wght@300;400;500;600&display=swap');

  * { box-sizing: border-box; margin: 0; padding: 0; }

  .pay-root {
    min-height: 100vh;
    background: #1f001d;
    font-family: 'DM Sans', sans-serif;
    position: relative;
    overflow-x: hidden;
    padding: 32px 20px 60px;
  }

  .pay-orb {
    position: fixed; border-radius: 50%;
    filter: blur(90px); pointer-events: none; z-index: 0;
    animation: floatOrb 10s ease-in-out infinite;
  }
  .pay-orb-1 { width:400px; height:400px; background:radial-gradient(circle,#9900ff22,transparent); top:-80px; left:-80px; }
  .pay-orb-2 { width:340px; height:340px; background:radial-gradient(circle,#ff00aa18,transparent); bottom:-60px; right:-60px; animation-delay:-4s; }
  @keyframes floatOrb {
    0%,100% { transform:translate(0,0) scale(1); }
    50% { transform:translate(20px,-28px) scale(1.05); }
  }

  .pay-inner {
    position: relative; z-index: 1;
    max-width: 520px; margin: 0 auto;
  }

  .pay-back {
    display: inline-flex; align-items: center; gap: 7px;
    margin-bottom: 28px;
    font-size: 13px; font-weight: 600;
    color: rgba(255,255,255,.5);
    cursor: pointer; border: none; background: none;
    padding: 0; transition: color .2s;
    font-family: 'DM Sans', sans-serif;
  }
  .pay-back:hover { color: #fff; }
  .pay-back-arrow {
    width: 28px; height: 28px; border-radius: 8px;
    border: 1px solid rgba(255,255,255,.12);
    background: rgba(255,255,255,.05);
    display: flex; align-items: center; justify-content: center;
    font-size: 13px; transition: all .2s;
  }
  .pay-back:hover .pay-back-arrow { background: rgba(153,3,125,.2); border-color: rgba(153,3,125,.4); color: #fff; }

  .pay-title {
    font-family: 'Syne', sans-serif;
    font-weight: 800; font-size: 24px; color: #fff;
    margin-bottom: 6px;
  }
  .pay-subtitle {
    font-size: 13px; color: rgba(255,255,255,.38);
    margin-bottom: 28px;
  }

  /* ── SUMMARY CARD ── */
  .pay-summary {
    position: relative;
    border-radius: 20px;
    background: rgba(255,255,255,.05);
    border: 1px solid rgba(255,255,255,.1);
    backdrop-filter: blur(24px);
    padding: 22px 24px;
    margin-bottom: 20px;
    box-shadow: 0 8px 40px rgba(0,0,0,.3);
  }
  .pay-summary::before {
    content: '';
    position: absolute; inset: 0; border-radius: 20px; padding: 1px;
    background: linear-gradient(135deg, rgba(153,3,125,.5), rgba(76,0,62,.15), rgba(255,0,170,.25));
    -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
    -webkit-mask-composite: xor; mask-composite: exclude; pointer-events: none;
  }

  .pay-summary-title {
    font-family: 'Syne', sans-serif; font-weight: 700;
    font-size: 13px; letter-spacing: 1px; text-transform: uppercase;
    color: rgba(255,255,255,.4); margin-bottom: 16px;
    display: flex; align-items: center; gap: 8px;
  }
  .pay-summary-title::after {
    content: ''; flex: 1; height: 1px;
    background: rgba(255,255,255,.07);
  }

  .pay-row {
    display: flex; justify-content: space-between; align-items: center;
    margin-bottom: 12px; font-size: 14px;
  }
  .pay-row-label { color: rgba(255,255,255,.5); }
  .pay-row-val { color: rgba(255,255,255,.85); font-weight: 500; }

  .pay-divider {
    height: 1px;
    background: linear-gradient(90deg, transparent, rgba(255,255,255,.1), transparent);
    margin: 14px 0;
  }

  .pay-total-row {
    display: flex; justify-content: space-between; align-items: center;
  }
  .pay-total-label {
    font-family: 'Syne', sans-serif; font-weight: 700; font-size: 15px; color: #fff;
  }
  /* ── PRICE FONT FIX: simple white, no gradient clip ── */
  .pay-total-amount {
    font-family: 'DM Sans', sans-serif;
    font-weight: 700;
    font-size: 22px;
    color: #ff88dd;
  }

  /* ── PAYMENT METHODS ── */
  .pay-methods-title {
    font-family: 'Syne', sans-serif; font-weight: 700; font-size: 15px;
    color: #fff; margin-bottom: 14px;
  }

  .pay-method {
    border-radius: 16px;
    border: 1px solid rgba(255,255,255,.09);
    background: rgba(255,255,255,.04);
    margin-bottom: 12px;
    overflow: hidden;
    transition: border-color .25s, box-shadow .25s;
  }
  .pay-method.selected {
    border-color: rgba(153,3,125,.6);
    box-shadow: 0 0 0 3px rgba(153,3,125,.12);
    background: rgba(153,3,125,.06);
  }

  /* Header is clickable to toggle */
  .pay-method-header {
    display: flex; align-items: center; justify-content: space-between;
    padding: 16px 18px;
    user-select: none;
    cursor: pointer;
  }

  .pay-method-left {
    display: flex; align-items: center; gap: 13px;
  }

  .pay-method-icon {
    width: 40px; height: 40px; border-radius: 11px;
    display: flex; align-items: center; justify-content: center;
    font-size: 18px;
    background: rgba(255,255,255,.07);
    border: 1px solid rgba(255,255,255,.1);
    flex-shrink: 0;
    transition: all .2s;
  }
  .pay-method.selected .pay-method-icon {
    background: rgba(153,3,125,.2);
    border-color: rgba(153,3,125,.35);
  }

  .pay-method-name {
    font-weight: 600; font-size: 14px; color: #fff;
  }
  .pay-method-desc {
    font-size: 11px; color: rgba(255,255,255,.35); margin-top: 2px;
  }

  .pay-method-right {
    display: flex; align-items: center; gap: 10px;
  }

  .pay-radio {
    width: 18px; height: 18px; border-radius: 50%;
    border: 2px solid rgba(255,255,255,.2);
    background: rgba(255,255,255,.04);
    display: flex; align-items: center; justify-content: center;
    transition: all .2s; flex-shrink: 0;
  }
  .pay-method.selected .pay-radio {
    border-color: #cc05a0;
    background: rgba(153,3,125,.15);
  }
  .pay-radio-dot {
    width: 8px; height: 8px; border-radius: 50%;
    background: #cc05a0;
    transform: scale(0); transition: transform .2s;
  }
  .pay-method.selected .pay-radio-dot { transform: scale(1); }

  .pay-chevron {
    font-size: 11px; color: rgba(255,255,255,.3);
    transition: transform .3s ease;
  }
  .pay-method.selected .pay-chevron { transform: rotate(180deg); color: #cc05a0; }

  /* ── DROPDOWN BODY ── */
  .pay-dropdown {
    max-height: 0; overflow: hidden;
    transition: max-height .35s cubic-bezier(0.4,0,0.2,1), opacity .25s ease;
    opacity: 0;
  }
  .pay-dropdown.open { max-height: 400px; opacity: 1; }

  .pay-dropdown-inner {
    padding: 16px 18px 18px;
    display: flex; flex-direction: column; gap: 12px;
    border-top: 1px solid rgba(255,255,255,.07);
    /* Stop clicks inside dropdown from bubbling to parent toggle */
  }

  .pay-field { display: flex; flex-direction: column; gap: 6px; }
  .pay-field-label {
    font-size: 11px; font-weight: 600;
    color: rgba(255,255,255,.45);
    letter-spacing: .8px; text-transform: uppercase;
  }
  .pay-field-input {
    width: 100%; padding: 11px 14px;
    background: rgba(255,255,255,.08);
    border: 1px solid rgba(255,255,255,.13);
    border-radius: 11px; color: #fff;
    font-family: 'DM Sans', sans-serif; font-size: 14px;
    outline: none; transition: all .25s ease;
    letter-spacing: .5px;
    /* Critical fix: ensure pointer events work */
    pointer-events: all;
    position: relative;
    z-index: 10;
  }
  .pay-field-input::placeholder { color: rgba(255,255,255,.25); }
  .pay-field-input:focus {
    border-color: rgba(153,3,125,.65);
    background: rgba(153,3,125,.1);
    box-shadow: 0 0 0 3px rgba(153,3,125,.15);
  }

  .pay-field-row { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }

  .pay-upi-note {
    display: flex; align-items: center; gap: 8px;
    padding: 10px 14px; border-radius: 10px;
    background: rgba(68,238,136,.07);
    border: 1px solid rgba(68,238,136,.18);
    font-size: 12px; color: rgba(68,238,136,.85);
  }

  .pay-qr-stub {
    display: flex; align-items: center; gap: 14px;
    padding: 14px; border-radius: 12px;
    background: rgba(255,255,255,.04);
    border: 1px solid rgba(255,255,255,.08);
  }
  .pay-qr-box {
    width: 56px; height: 56px; border-radius: 10px;
    background: rgba(255,255,255,.08);
    border: 1px solid rgba(255,255,255,.1);
    display: flex; align-items: center; justify-content: center;
    font-size: 26px; flex-shrink: 0;
  }
  .pay-qr-text { font-size: 12px; color: rgba(255,255,255,.45); line-height: 1.6; }
  .pay-qr-text strong { color: rgba(255,255,255,.75); font-size: 13px; display: block; margin-bottom: 2px; }

  /* ── PAY BUTTON ── */
  .pay-btn-wrap { margin-top: 24px; }
  .pay-btn {
    width: 100%; padding: 15px;
    background: linear-gradient(135deg, #99037d, #4C003E 60%, #7a0260);
    border: none; border-radius: 14px;
    color: #fff; font-family: 'Syne', sans-serif;
    font-size: 16px; font-weight: 700; letter-spacing: .5px;
    cursor: pointer; position: relative; overflow: hidden;
    transition: all .3s cubic-bezier(0.16,1,0.3,1);
    box-shadow: 0 8px 28px rgba(153,3,125,.4), 0 0 0 1px rgba(255,255,255,.08) inset;
  }
  .pay-btn::before {
    content: ''; position: absolute; inset: 0;
    background: linear-gradient(135deg,rgba(255,255,255,.15),transparent);
    opacity: 0; transition: opacity .3s;
  }
  .pay-btn:hover::before { opacity: 1; }
  .pay-btn:hover:not(:disabled) { transform: translateY(-2px); box-shadow: 0 16px 44px rgba(153,3,125,.55); }
  .pay-btn:active { transform: translateY(0); }
  .pay-btn:disabled { opacity: 0.45; cursor: not-allowed; }
  .pay-btn::after {
    content: ''; position: absolute;
    top:0; left:-100%; width:60%; height:100%;
    background: linear-gradient(90deg,transparent,rgba(255,255,255,.1),transparent);
    animation: shimmer 3s ease-in-out infinite;
  }
  @keyframes shimmer { 0%{left:-100%} 50%,100%{left:150%} }

  .pay-secure {
    text-align: center; margin-top: 14px;
    font-size: 12px; color: rgba(255,255,255,.28);
    display: flex; align-items: center; justify-content: center; gap: 6px;
  }

  @media(max-width:540px){
    .pay-root { padding: 24px 16px 48px; }
    .pay-field-row { grid-template-columns: 1fr; }
  }
`;

const METHODS = [
  { id: "visa",   name: "Credit / Debit Card",  desc: "Visa, Mastercard, RuPay",          icon: "💳" },
  { id: "gpay",   name: "Google Pay",            desc: "Pay via UPI with Google Pay",      icon: "🔵" },
  { id: "upi",    name: "UPI",                   desc: "Any UPI app — PhonePe, BHIM, etc.", icon: "📲" },
  { id: "paypal", name: "PayPal",                desc: "Pay with your PayPal account",     icon: "🅿️" },
];

export default function Payment() {
  const location  = useLocation();
  const navigate  = useNavigate();
  const price     = location.state?.price || 0;

  const [selected, setSelected]   = useState(null);
  const [cardNum, setCardNum]      = useState("");
  const [expiry, setExpiry]        = useState("");
  const [cvv, setCvv]              = useState("");
  const [cardName, setCardName]    = useState("");
  const [upiId, setUpiId]          = useState("");
  const [gpayId, setGpayId]        = useState("");
  const [paypalEmail, setPaypalEmail] = useState("");

  const formatCard   = v => v.replace(/\D/g,"").slice(0,16).replace(/(.{4})/g,"$1 ").trim();
  const formatExpiry = v => { const d = v.replace(/\D/g,"").slice(0,4); return d.length >= 3 ? d.slice(0,2)+"/"+d.slice(2) : d; };

  const handlePay = () => {
    if (window.confirm(`Confirm payment of ₹${price}?`)) {
      navigate("/payment-success", { state: { courseId: location.state?.courseId } });
    }
  };

  /* Only toggle when clicking the HEADER, not the form inside */
  const toggleMethod = (id) => setSelected(prev => prev === id ? null : id);

  /* Stop clicks inside dropdown from closing it */
  const stopProp = (e) => e.stopPropagation();

  return (
    <>
      <style>{styles}</style>
      <div className="pay-root">
        <div className="pay-orb pay-orb-1" />
        <div className="pay-orb pay-orb-2" />

        <div className="pay-inner">

          <button className="pay-back" onClick={() => navigate(-1)}>
            <span className="pay-back-arrow">←</span>
            Back
          </button>

          <div className="pay-title">Checkout</div>
          <div className="pay-subtitle">Review your order and complete payment</div>

          {/* ── SUMMARY ── */}
          <div className="pay-summary">
            <div className="pay-summary-title">Order Summary</div>
            <div className="pay-row">
              <span className="pay-row-label">Course Price</span>
              <span className="pay-row-val">₹ {price}</span>
            </div>
            <div className="pay-row">
              <span className="pay-row-label">Discount</span>
              <span className="pay-row-val" style={{ color: "#44ee88" }}>– ₹ 0</span>
            </div>
            <div className="pay-row">
              <span className="pay-row-label">Platform Fee</span>
              <span className="pay-row-val">₹ 0</span>
            </div>
            <div className="pay-divider" />
            <div className="pay-total-row">
              <span className="pay-total-label">Total Due</span>
              <span className="pay-total-amount">₹ {price}</span>
            </div>
          </div>

          {/* ── METHODS ── */}
          <div className="pay-methods-title">Select Payment Method</div>

          {METHODS.map((m) => (
            <div key={m.id} className={`pay-method ${selected === m.id ? "selected" : ""}`}>

              {/* Clickable header only */}
              <div className="pay-method-header" onClick={() => toggleMethod(m.id)}>
                <div className="pay-method-left">
                  <div className="pay-method-icon">{m.icon}</div>
                  <div>
                    <div className="pay-method-name">{m.name}</div>
                    <div className="pay-method-desc">{m.desc}</div>
                  </div>
                </div>
                <div className="pay-method-right">
                  <div className="pay-radio"><div className="pay-radio-dot" /></div>
                  <span className="pay-chevron">▼</span>
                </div>
              </div>

              {/* CARD */}
              {m.id === "visa" && (
                <div className={`pay-dropdown ${selected === "visa" ? "open" : ""}`}>
                  <div className="pay-dropdown-inner" onClick={stopProp}>
                    <div className="pay-field">
                      <label className="pay-field-label">Card Number</label>
                      <input className="pay-field-input" placeholder="1234 5678 9012 3456"
                        value={cardNum} onChange={e => setCardNum(formatCard(e.target.value))} maxLength={19} />
                    </div>
                    <div className="pay-field">
                      <label className="pay-field-label">Cardholder Name</label>
                      <input className="pay-field-input" placeholder="Name on card"
                        value={cardName} onChange={e => setCardName(e.target.value)} />
                    </div>
                    <div className="pay-field-row">
                      <div className="pay-field">
                        <label className="pay-field-label">Expiry Date</label>
                        <input className="pay-field-input" placeholder="MM/YY"
                          value={expiry} onChange={e => setExpiry(formatExpiry(e.target.value))} maxLength={5} />
                      </div>
                      <div className="pay-field">
                        <label className="pay-field-label">CVV</label>
                        <input className="pay-field-input" placeholder="•••" type="password"
                          value={cvv} onChange={e => setCvv(e.target.value.replace(/\D/g,"").slice(0,4))} maxLength={4} />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* GOOGLE PAY */}
              {m.id === "gpay" && (
                <div className={`pay-dropdown ${selected === "gpay" ? "open" : ""}`}>
                  <div className="pay-dropdown-inner" onClick={stopProp}>
                    <div className="pay-qr-stub">
                      <div className="pay-qr-box">📱</div>
                      <div className="pay-qr-text">
                        <strong>Pay with Google Pay</strong>
                        Enter your UPI ID linked to Google Pay
                      </div>
                    </div>
                    <div className="pay-field">
                      <label className="pay-field-label">Google Pay UPI ID</label>
                      <input className="pay-field-input" placeholder="yourname@okaxis"
                        value={gpayId} onChange={e => setGpayId(e.target.value)} />
                    </div>
                    <div className="pay-upi-note">✓ You'll get a payment request on your Google Pay app</div>
                  </div>
                </div>
              )}

              {/* UPI */}
              {m.id === "upi" && (
                <div className={`pay-dropdown ${selected === "upi" ? "open" : ""}`}>
                  <div className="pay-dropdown-inner" onClick={stopProp}>
                    <div className="pay-field">
                      <label className="pay-field-label">UPI ID</label>
                      <input className="pay-field-input" placeholder="yourname@upi"
                        value={upiId} onChange={e => setUpiId(e.target.value)} />
                    </div>
                    <div className="pay-upi-note">✓ Works with PhonePe, BHIM, Paytm and all UPI apps</div>
                  </div>
                </div>
              )}

              {/* PAYPAL */}
              {m.id === "paypal" && (
                <div className={`pay-dropdown ${selected === "paypal" ? "open" : ""}`}>
                  <div className="pay-dropdown-inner" onClick={stopProp}>
                    <div className="pay-field">
                      <label className="pay-field-label">PayPal Email</label>
                      <input className="pay-field-input" placeholder="you@paypal.com" type="email"
                        value={paypalEmail} onChange={e => setPaypalEmail(e.target.value)} />
                    </div>
                    <div className="pay-upi-note">✓ You'll be redirected to PayPal to complete payment</div>
                  </div>
                </div>
              )}

            </div>
          ))}

          {/* ── PAY BUTTON ── */}
          <div className="pay-btn-wrap">
            <button className="pay-btn" onClick={handlePay} disabled={!selected}>
              {selected ? `Pay ₹${price} →` : "Select a payment method"}
            </button>
          </div>

          <div className="pay-secure">
            🔒 256-bit SSL encrypted · Secure Checkout
          </div>

        </div>
      </div>
    </>
  );
}