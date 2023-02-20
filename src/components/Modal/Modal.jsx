import React, { useEffect } from "react";
import styles from './Modal.module.css';
import PropTypes from "prop-types";

export function Modal ({onClose, card}){
    useEffect (()=> {
        const handleKeyDown = e => {
                if (e.code === 'Escape') {
                return onClose();
                }
        };
        window.addEventListener("keydown", handleKeyDown);
        return () => {
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, [onClose]);
  
        return (
        <div className={styles.overlay} onClick={onClose}>
            <div className={styles.modal}>
                <img src={card} alt="modalPicture" />
            </div>
        </div>
        );
}


Modal.propTypes = {
    onClose: PropTypes.func.isRequired,
    card: PropTypes.string.isRequired,
};