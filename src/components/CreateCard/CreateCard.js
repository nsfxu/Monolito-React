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
        <form class="pa4 black-80">
            {/* Title */}
            <div>
                <label class="f6 b db mb2">Titulo</label>
                <input
                    class="input-reset ba b--black-20 pa2 mb2 db w-100"
                    type="text"
                    ref={title}
                />
            </div>

            {/* Description */}
            <div>
                <label class="f6 b db mb2">
                    Descrição <span class="normal black-60">(optional)</span>
                </label>
                <textarea
                    class="input-reset ba b--black-20 pa2 mb2 db w-100"
                    type="text"
                    ref={description}
                />
            </div>

            {/* Person */}
            <div>
                <label class="f6 b db mb2">
                    Responsável <span class="normal black-60">(optional)</span>
                </label>
                <select
                    class="input-reset ba b--black-20 pa2 mb2 db w-100"
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
                <label class="f6 b db mb2">Status</label>
                <select
                    class="input-reset ba b--black-20 pa2 mb2 db w-100"
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
                <label class="f6 b db mb2">
                    Tags <span class="normal black-60">(optional)</span>
                </label>
                <input
                    class="input-reset ba b--black-20 pa2 mb2 db w-100"
                    type="text"
                    ref={tags}
                />
            </div>

            <div class="mt3">
                <input
                    class="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6"
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
