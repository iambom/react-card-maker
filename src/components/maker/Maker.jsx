import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import Editor from '../editor/Editor';
import Footer from '../footer/Footer';
import Header from '../header/Header';
import Preview from '../preview/Preview';
import styles from './Maker.module.css';

const Maker = ({authService}) => {
    const [cards, setCards] = useState({
        '1' : {
            id:'1',
            name:'Ellie',
            company:'samsung',
            theme:'dark',
            email:'ellie@gmail.com',
            message: 'go for it',
            fileName:'ellie',
            fileURL: null
        },
        '2' : {
            id:'2',
            name:'Jay',
            company:'samsung',
            theme:'light',
            email:'ellie@gmail.com',
            message: 'go for it',
            fileName:'ellie',
            fileURL: null
        },
        '3' : {
            id:'3',
            name:'SAM',
            company:'samsung',
            theme:'colorful',
            email:'ellie@gmail.com',
            message: 'go for it',
            fileName:'ellie',
            fileURL:'ellie.png'
        },
    });

    const history = useHistory();
    const onLogout = () => {
        authService.logout();
    };
    useEffect(() =>{
        authService.onAuthChange(user => {
            if (!user) {
                history.push("/");
            }
        });
    });
    
    const createOrUpdateCard = card => {
        setCards(cards => {
            const updated = {...cards};
            updated[card.id] = card;
            return updated;
        })
    }
    const deleteCard = card => {
        setCards(cards => {
            const updated = {...cards};
            delete updated[card.id];
            return updated;
        })
    }
    return(
        <section className={styles.maker}>
            <Header onLogout={onLogout}/>
            <div className={styles.container}>
                <Editor cards={cards} addCard={createOrUpdateCard} updateCard={createOrUpdateCard} deleteCard={deleteCard}/>
                <Preview cards={cards} />
            </div>
            <Footer />
        </section>
    );
}

export default Maker;