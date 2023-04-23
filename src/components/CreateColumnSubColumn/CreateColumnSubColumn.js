import React, { useRef } from 'react';
import propTypes from 'prop-types';

/* eslint-disable */
// eslint-disable-next-line
const CreateColumnSubColumn = ({ returnResult, modal_type, closeModal }) => {
    const title = useRef();

    const validateInputs = () => {
        returnResult(title.current.value, modal_type);
        closeModal();
    };

    return (
        <form className="pa4 black-80">
            {/* Title */}
            <div>
                <label className="f6 b db mb2">
                    {modal_type == 'CreateSubColumn'
                        ? 'Nome da subcoluna'
                        : 'Nome da coluna'}
                </label>

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
                    value={
                        modal_type == 'CreateSubColumn'
                            ? 'Criar Subcoluna'
                            : 'Criar Coluna'
                    }
                    onClick={(e) => {
                        e.preventDefault();
                        validateInputs();
                    }}
                />
            </div>
        </form>
    );
};

CreateColumnSubColumn.propTypes = {
    returnResult: propTypes.func,
    modal_type: propTypes.string,
    closeModal: propTypes.func
};

export default CreateColumnSubColumn;