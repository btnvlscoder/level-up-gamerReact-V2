// s:\PROGRAM\DUOC\4th Semester\P2\level-up-gamerReact-V2\src\components\VoucherEmailForm.jsx
import React from 'react';
import { Send, CheckCircleFill } from 'react-bootstrap-icons';
import styles from './VoucherModal.module.css';

export default function VoucherEmailForm({ isEmailSent, email, setEmail, onSubmit }) {
  return (
    <form className={styles.voucherEmailForm} onSubmit={onSubmit}>
      {!isEmailSent ? (
        <>
          <p>ingresa tu correo para enviar una copia:</p>
          <input
            type="email"
            placeholder="tu.correo@ejemplo.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <button type="submit" className="btn-imprimir">
            <Send /> enviar copia
          </button>
        </>
      ) : (
        <div className={styles.emailSuccessMessage}>
          <CheckCircleFill />
          <p>¡se ha enviado el comprobante al correo <strong>{email}</strong>!</p>
        </div>
      )}
    </form>
  );
}