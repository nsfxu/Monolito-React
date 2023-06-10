import React, { useRef } from 'react';
import propTypes from 'prop-types';

/* eslint-disable */
// eslint-disable-next-line
const CreateSwinlane = ({ returnResult, modal_type, closeModal }) => {
    const title = useRef();

    const validateInputs = () => {
        returnResult(title.current.value, modal_type);
        closeModal();
    };

    return (
        <form className="pa4 black-80">
            {/* Title */}
            <div>
                <label className="f6 b db mb2">Nome da raia</label>

                <input
                    className="input-reset ba b--black-20 pa2 mb2 db w-100"
                    type="text"
                    ref={title}
                />
            </div>

            <div className="mt3">
                <input
                    className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6"
                    type="submit"
                    value="Criar Raia"
                    onClick={(e) => {
                        e.preventDefault();
                        validateInputs();
                    }}
                />
            </div>
        </form>
    );
};

CreateSwinlane.propTypes = {
    returnResult: propTypes.func,
    modal_type: propTypes.string,
    closeModal: propTypes.func
};

export default CreateSwinlane;
