import React from 'react';
import Card from '../card/Card';
import CardAddForm from '../card_add_form/CardAddForm';
import CardEditForm from '../card_edit_form/CardEditForm';
import styles from './Editor.module.css';

const Editor = ({cards, addCard, updateCard, deleteCard }) => (
    <section className={styles.editor}>
        <h1 className={styles.title}>Card Maker</h1>
        {
            Object.keys(cards).map(key => (
                <CardEditForm key={key} card={cards[key]} updateCard={updateCard} deleteCard={deleteCard}/>
            ))
        }
        <CardAddForm onAdd={addCard} />
    </section>
);

export default Editor;