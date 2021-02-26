import React from 'react';
import CardAddForm from '../card_add_form/CardAddForm';
import CardEditForm from '../card_edit_form/CardEditForm';
import styles from './Editor.module.css';

const Editor = ({FileInput, cards, addCard, updateCard, deleteCard }) => (
    <section className={styles.editor}>
        <h1 className={styles.title}>Card Maker</h1>
        {
            Object.keys(cards).map(key => (
                <CardEditForm key={key} FileInput={FileInput} card={cards[key]} updateCard={updateCard} deleteCard={deleteCard}/>
            ))
        }
        <CardAddForm FileInput={FileInput} onAdd={addCard} />
    </section>
);

export default Editor;