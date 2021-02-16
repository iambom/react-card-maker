import React, { useEffect } from 'react';
import { useHistory } from 'react-router';
import Editor from '../editor/Editor';
import Footer from '../footer/Footer';
import Header from '../header/Header';
import Preview from '../preview/Preview';
import styles from './Maker.module.css';

const Maker = ({authService}) => {
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
    return(
        <section className={styles.maker}>
            <Header onLogout={onLogout}/>
            <div className={styles.container}>
                <Editor />
                <Preview />
            </div>
            <Footer />
        </section>
    );
}

export default Maker;