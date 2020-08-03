import React from 'react';

import whatsappIcon from '../../assets/images/icons/whatsapp.svg';

import './styles.css';

function TeacherItem() {
    return (
        <article className="teacher-item">
            <header>
                <img src="https://avatars0.githubusercontent.com/u/50931267?s=460&u=3110e194231c31ba4f7bcea3f2a7fd29d4e6afd7&v=4" alt="Daniel Sansão Araldi" />
                <div>
                    <strong>Daniel Sansão Araldi</strong>
                    <span>Matemática</span>
                </div>
            </header>

            <p>Existem muitas variações disponíveis de passagens de Lorem Ipsum.
            <br /><br />
            Mas a maioria sofreu algum tipo de alteração, seja por inserção de passagens com humor, ou palavras aleatórias que não parecem nem um pouco convincentes.
            </p>

            <footer>
                <p>
                    Preço/Hora
                    <strong>R$80,00</strong>
                </p>
                <button type="button">
                    <img src={whatsappIcon} alt="Whatsapp" />
                            Entrar em contanto
                        </button>
            </footer>
        </article>
    );
}

export default TeacherItem;