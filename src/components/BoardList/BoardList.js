import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

import propTypes from 'prop-types';

import { Card, CardContent, CardActions, Button, Grid } from '@mui/material';

import { getUserBoards } from '../../services/user-service';

/* eslint-disable */
// eslint-disable-next-line
const BoardList = ({ userObject }) => {
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
        <Grid container spacing={2} className="flex flex-row w-100 h-100">
            {boards && boards.length > 0 ? (
                boards.map((board) => (
                    <Grid item xs={4} key={board.id_board}>
                        <Card
                            sx={{
                                maxWidth: 500,
                                backgroundColor: '#252627'
                            }}
                        >
                            <CardContent>
                                <h1>{board.name}</h1>
                            </CardContent>
                            <CardActions>
                                <Button
                                    size="medium"
                                    onClick={() =>
                                        goToSelectedBoard(board.id_board)
                                    }
                                >
                                    Ver quadro
                                </Button>
                            </CardActions>
                        </Card>
                    </Grid>
                ))
            ) : (
                <h1>TEM NÃO</h1>
            )}
        </Grid>
    );
};

BoardList.propTypes = {
    userObject: propTypes.object
};

export default BoardList;
