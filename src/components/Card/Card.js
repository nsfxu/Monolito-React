import React from 'react';

/* eslint-disable */
// eslint-disable-next-line
const Card = ({ title }) => (
    <div className="w-100 h-100 pt2 pl2" style={{ backgroundColor: 'gray' }}>
        <header className="flex flex-row justify-start items-center">
            <div className="pr3">
                <img
                    src="https://picsum.photos/200/300"
                    className="br-100"
                    style={{ width: '35px', height: '35px' }}
                />
            </div>
            <div>
                <h4>{title}</h4>
            </div>
        </header>

        <section className="flex flex-row justify-start items-center">
            <p className="pr2">Status:</p>
            <select name="cars" id="cars">
                <option value="volvo">Volvo</option>
                <option value="saab">Saab</option>
                <option value="mercedes">Mercedes</option>
                <option value="audi">Audi</option>
            </select>
        </section>
    </div>
);

Card.propTypes = {};

export default Card;
