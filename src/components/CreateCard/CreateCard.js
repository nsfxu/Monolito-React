import React, { useEffect, useRef } from 'react';
import propTypes from 'prop-types';

import { hasSubColumns } from '../../utils/column-utils';

/* eslint-disable */
// eslint-disable-next-line
const CreateCard = ({
    addNewCard,
    currentColumn,
    statusArr,
    tagsArr,
    swinlanesArr
}) => {
    const title = useRef();
    const description = useRef();
    const person = useRef();
    const status = useRef();
    const subcolumn = useRef();
    const swinlane = useRef();
    const tags = useRef();

    useEffect(() => {
        if (!currentColumn) {
            currentColumn.id = statusArr[0].id;
        }        
    }, [currentColumn]);

    const validateInputs = () => {
        addNewCard(currentColumn, {
            title: title.current.value,
            description: description.current.value,
            person: person.current.value,
            status: status.current.value,
            groupId: subcolumn.current ? subcolumn.current.value : null,
            laneId: swinlane.current ? swinlane.current.value : null,
            tags: tags.current.value
        });
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
                    Descrição{' '}
                    <span className="normal black-60">(optional)</span>
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
                    Responsável{' '}
                    <span className="normal black-60">(optional)</span>
                </label>
                <select
                    className="input-reset ba b--black-20 pa2 mb2 db w-100"
                    ref={person}
                    disabled
                >
                    <option value="volvo">Você</option>
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
                    defaultValue={currentColumn.id}
                >
                    {statusArr?.map((status, index) => (
                        <option value={status.id} key={index}>
                            {status.name}
                        </option>
                    ))}
                </select>
            </div>

            {/* Subcolumns */}
            {hasSubColumns(currentColumn.groups) && (
                <div>
                    <label className="f6 b db mb2">Subcoluna</label>
                    <select
                        className="input-reset ba b--black-20 pa2 mb2 db w-100"
                        ref={subcolumn}
                    >
                        {currentColumn.groups?.map((group, index) => (
                            <option value={group.id} key={index}>
                                {group.name}
                            </option>
                        ))}
                    </select>
                </div>
            )}

            {/* Swinlane */}
            {currentColumn.showSwinLanes && (
                <div>
                    <label className="f6 b db mb2">Raia</label>
                    <select
                        className="input-reset ba b--black-20 pa2 mb2 db w-100"
                        ref={swinlane}
                    >
                        {swinlanesArr?.map((this_swinlane, index) => (
                            <option value={this_swinlane.id} key={index}>
                                {this_swinlane.name}
                            </option>
                        ))}
                    </select>
                </div>
            )}

            {/* Tags */}
            <div>
                <label className="f6 b db mb2">
                    Tags <span className="normal black-60">(optional)</span>
                </label>
                <input
                    className="input-reset ba b--black-20 pa2 mb2 db w-100"
                    type="text"
                    ref={tags}
                    disabled
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
    currentColumn: propTypes.object,
    statusArr: propTypes.array,
    tagsArr: propTypes.array,
    swinlanes: propTypes.array
};

export default CreateCard;
