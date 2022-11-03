import React, { useRef } from 'react';
import propTypes from 'prop-types';

/* eslint-disable */
// eslint-disable-next-line
const CreateCard = ({ addNewCard, currentColumn }) => {
    const title = useRef();
    const description = useRef();
    const person = useRef();
    const status = useRef();
    const tags = useRef();

    const validateInputs = () => {
        addNewCard(
            currentColumn,
            title.current.value,
            description.current.value,
            person.current.value,
            status.current.value,
            tags.current.value
        );
    };

    return (
        <form className="pa4 black-80">
            {/* Title */}
            <div>
                <label className="f6 b db mb2">Titulo</label>
                <input
                    className="input-reset ba b--black-20 pa2 mb2 db w-100"
                    type="text"
                    ref={title}
                />
            </div>

            {/* Description */}
            <div>
                <label className="f6 b db mb2">
                    Descrição <span className="normal black-60">(optional)</span>
                </label>
                <textarea
                    className="input-reset ba b--black-20 pa2 mb2 db w-100"
                    type="text"
                    ref={description}
                />
            </div>

            {/* Person */}
            <div>
                <label className="f6 b db mb2">
                    Responsável <span className="normal black-60">(optional)</span>
                </label>
                <select
                    className="input-reset ba b--black-20 pa2 mb2 db w-100"
                    ref={person}
                >
                    <option value="volvo">Volvo</option>
                    <option value="saab">Saab</option>
                    <option value="mercedes">Mercedes</option>
                    <option value="audi">Audi</option>
                </select>
            </div>

            {/* Status */}
            <div>
                <label className="f6 b db mb2">Status</label>
                <select
                    className="input-reset ba b--black-20 pa2 mb2 db w-100"
                    ref={status}
                >
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
                    ref={tags}
                />
            </div>

            <div className="mt3">
                <input
                    className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6"
                    type="submit"
                    value="Criar card"
                    onClick={(e) => {
                        e.preventDefault();
                        validateInputs();
                    }}
                />
            </div>
        </form>
    );
};

CreateCard.propTypes = {
    addNewCard: propTypes.func,
    currentColumn: propTypes.string
};

export default CreateCard;