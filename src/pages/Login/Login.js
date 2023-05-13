/* eslint-disable */
// eslint-disable-next-line
import React, { useRef } from 'react';
import { useHistory } from 'react-router';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import {
    Box,
    Button,
    TextField,
    Typography,
    Container,
    Grid,
    Link
} from '@mui/material';

import { loginUser } from '../../services/user-service';

const Login = () => {
    const username = useRef();
    const password = useRef();

    const inputStyle = {
        input: { color: '#F2F7F2', height: '50px' },
        label: { color: 'grey', fontSize: '24px' },
        '& label.Mui-focused': {
            color: '#F0F0F0'
        },
        '& .MuiInput-underline:after': {
            borderBottomColor: '#F0F0F0'
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!username.current.value || !password.current.value) {
            toast('Por favor, preencha todos os campos.');
            return;
        }

        let response = await loginUser({
            username: username.current.value,
            password: password.current.value
        });

        if (response.error) {
            toast(response.error);

            return;
        }

        if(response.result){
            // redirecionar para dashboard
        }

    };

    return (
        <Container component="main" maxWidth="xs">
            <Box
                sx={{
                    marginTop: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    backgroundColor: '#35393C'
                }}
                className="br4 pa5"
            >
                <Typography component="h1" variant="h3">
                    Login
                </Typography>
                <Box
                    component="form"
                    onSubmit={handleSubmit}
                    noValidate
                    sx={{ mt: 4 }}
                >
                    <Grid>
                        <TextField
                            autoFocus
                            fullWidth
                            margin="normal"
                            id="username"
                            label="Usuário"
                            name="username"
                            variant="standard"
                            autoComplete="username"
                            sx={inputStyle}
                            InputLabelProps={{
                                shrink: true
                            }}
                            inputRef={username}
                        />
                        <TextField
                            fullWidth
                            margin="normal"
                            name="password"
                            label="Senha"
                            type="password"
                            id="password"
                            variant="standard"
                            autoComplete="current-password"
                            sx={inputStyle}
                            InputLabelProps={{
                                shrink: true
                            }}
                            inputRef={password}
                        />
                    </Grid>

                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                    >
                        Login
                    </Button>
                </Box>
                <Grid>
                    <Link href="/register" underline="none">Registrar uma nova conta</Link>
                </Grid>
            </Box>
            <ToastContainer />
        </Container>
    );
};
Login.propTypes = {};

export default Login;
