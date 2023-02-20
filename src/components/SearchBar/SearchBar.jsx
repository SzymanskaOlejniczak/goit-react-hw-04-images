import PropTypes from 'prop-types';
import React from 'react';
import styles from './SearchBar.module.css';

export const Searchbar =( {handleSubmit, onInputChange, search})=>{
    

        return (
            <header className={styles.searchbar_header}>
                <form className={styles.form} onSubmit={handleSubmit}>
                    <button type="submit" className={styles.form_button}>&#x1F50D;</button>

                    <input 
                        onChange={onInputChange}
                        className={styles.form_input}
                        name='searchInput'
                        type="text"
                        autoComplete="off"
                        autoFocus
                        placeholder="Search images and photos"
                        value={search}
                    />
                </form>
            </header>
        );
}
  
Searchbar.propTypes = {
    handleSubmit: PropTypes.func.isRequired,
    onInputChange:PropTypes.func.isRequired,
    search: PropTypes.string.isRequired,
}