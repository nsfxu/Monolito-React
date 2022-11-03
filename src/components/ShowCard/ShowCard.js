import React, { useState } from 'react';
import propTypes from 'prop-types';

/* eslint-disable */
// eslint-disable-next-line
const ShowCard = ({ object }) => {
    const [name, setName] = useState(object.name);
    const [description, setDescription] = useState(object.description);

    const updateCardInfo = () => {
        object.name = name;
        object.description = description;
    };

    return (
        <form className="pa4 black-80">
            {/* Title */}
            <div>
                <label className="f6 b db mb2">Titulo</label>
                <input
                    className="input-reset ba b--black-20 pa2 mb2 db w-100"
                    type="text"
                    value={name}
                    onInput={(e) => {
                        setName(e.target.value);
                    }}
                />
            </div>

            {/* Description */}
            <div>
                <label className="f6 b db mb2">
                    Descrição{' '}
                    <span className="normal black-60">(optional)</span>
                </label>
                <textarea
                    className="input-reset ba b--black-20 pa2 mb2 db w-100"
                    type="text"
                    value={description}
                    onInput={(e) => {
                        setDescription(e.target.value);
                    }}
                />
            </div>

            {/* Person */}
            <div>
                <label className="f6 b db mb2">
                    Responsável{' '}
                    <span className="normal black-60">(optional)</span>
                </label>
                <select className="input-reset ba b--black-20 pa2 mb2 db w-100">
                    <option value="volvo">Volvo</option>
                    <option value="saab">Saab</option>
                    <option value="mercedes">Mercedes</option>
                    <option value="audi">Audi</option>
                </select>
            </div>

            {/* Status */}
            <div>
                <label className="f6 b db mb2">Status</label>
                <select className="input-reset ba b--black-20 pa2 mb2 db w-100">
                    <option value="volvo">Volvo</option>
                    <option value="saab">Saab</option>
                    <option value="mercedes">Mercedes</option>
                    <option value="audi">Audi</option>
                </select>
            </div>

            {/* Tags */}
            <div>
                <label className="f6 b db mb2">
                    Tags <span className="normal black-60">(optional)</span>
                </label>
                <input
                    className="input-reset ba b--black-20 pa2 mb2 db w-100"
                    type="text"
                />
            </div>

            <div className="mt3">
                <input
                    className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6"
                    type="submit"
                    value="Atualizar card"
                    onClick={(e) => {
                        e.preventDefault();
                        updateCardInfo();
                    }}
                />
            </div>
        </form>
    );
};

ShowCard.propTypes = {
    object: propTypes.object
};

export default ShowCard;
