import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

import propTypes from 'prop-types';

import {
    Card,
    CardContent,
    CardActions,
    Button,
    Grid,
    Typography
} from '@mui/material';

import { getUserBoards } from '../../services/user-service';

/* eslint-disable */
// eslint-disable-next-line
const BoardList = ({ userObject, openModal }) => {
    const [boards, setBoards] = useState(undefined);
    const history = useHistory();

    useEffect(async () => {
        const response = await getUserBoards(userObject.id_user);

        if (response.result) {
            setBoards(response.result);
            return;
        }

        setBoards([]);
    }, []);

    const goToSelectedBoard = async (board_id) => {
        history.push({
            pathname: '/board',
            state: board_id
        });

        return;
    };

    return (
        <>
            <div className="flex flex-column">
                <div className="pb3">
                    <Button
                        variant="contained"
                        color="success"
                        onClick={() => openModal()}
                    >
                        Criar um quadro
                    </Button>
                </div>
                <Grid
                    container
                    spacing={3}
                    className="flex flex-row w-100 h-100"
                >
                    {boards && boards.length > 0 ? (
                        boards.map((board) => (
                            <Grid item xs={4} key={board.id_board}>
                                <Card
                                    sx={{
                                        minWidth: 300,
                                        backgroundColor: '#252627'
                                    }}
                                >
                                    <CardContent>
                                        <Typography
                                            sx={{ color: 'white' }}
                                            variant="h5"
                                            component="div"
                                        >
                                            {board.name}
                                        </Typography>
                                        <Typography
                                            variant="body2"
                                            sx={{ color: 'lightgrey' }}
                                        >
                                            {board.description.length > 150
                                                ? board.description.slice(
                                                      0,
                                                      147
                                                  ) + '...'
                                                : board.description}
                                        </Typography>
                                    </CardContent>
                                    <CardActions>
                                        <Button
                                            size="medium"
                                            onClick={() =>
                                                goToSelectedBoard(
                                                    board.id_board
                                                )
                                            }
                                        >
                                            Ver quadro
                                        </Button>
                                    </CardActions>
                                </Card>
                            </Grid>
                        ))
                    ) : (
                        <h3>Sem quadros por enquanto.</h3>
                    )}
                </Grid>
            </div>
        </>
    );
};

BoardList.propTypes = {
    userObject: propTypes.object
};

export default BoardList;
