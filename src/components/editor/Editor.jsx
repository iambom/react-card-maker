import React from 'react';
import Card from '../card/Card';
import CardAddForm from '../card_add_form/CardAddForm';
import CardEditForm from '../card_edit_form/CardEditForm';
import styles from './Editor.module.css';

const Editor = ({cards, addCard }) => (
    <section className={styles.editor}>
        <h1 className={styles.title}>Card Maker</h1>
        {
            cards.map(card => (
                <CardEditForm key={card.id} card={card}/>
            ))
        }
        <CardAddForm onAdd={addCard} />
    </section>
);

export default Editor;