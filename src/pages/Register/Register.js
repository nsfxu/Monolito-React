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

import { registerUser } from '../../services/user-service';

const Register = () => {
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

    const history = useHistory();

    const name = useRef();
    const username = useRef();
    const password = useRef();
    const repeated_password = useRef();

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (
            !name.current.value ||
            !username.current.value ||
            !password.current.value ||
            !repeated_password.current.value
        ) {
            toast('Por favor, preencha todos os campos.');
            return;
        }

        if (password.current.value != repeated_password.current.value) {
            toast('As senhas não são iguais.');
            return;
        }

        if (password.current.value.length <= 8) {
            toast('A senha precisa ter mais de 8 caracteres.');
            return;
        }

        let response = await registerUser({
            name: name.current.value,
            username: username.current.value,
            password: password.current.value
        });

        if (response.error) {
            toast(response.error);
        } else {
            toast(
                'Usuário registrado com sucesso, redirecionando para a página de login...'
            );
            setTimeout(() => {
                history.push('/login');
            }, 4000);
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
                    Registrar
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
                            id="name"
                            label="Seu nome"
                            name="name"
                            variant="standard"
                            autoComplete="name"
                            sx={inputStyle}
                            InputLabelProps={{
                                shrink: true
                            }}
                            inputRef={name}
                        />
                        <TextField
                            autoFocus
                            fullWidth
                            margin="normal"
                            id="username"
                            label="Seu usuário"
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
                            label="Sua senha"
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
                        <TextField
                            fullWidth
                            margin="normal"
                            name="repeat-password"
                            label="Digite novamente sua senha"
                            type="password"
                            id="repeat-password"
                            variant="standard"
                            autoComplete="repeat-password"
                            sx={inputStyle}
                            InputLabelProps={{
                                shrink: true
                            }}
                            inputRef={repeated_password}
                        />
                    </Grid>

                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                    >
                        Registrar
                    </Button>
                </Box>
                <Grid>
                    <Link href="/login" underline="none">
                        Fazer login em uma conta existente
                    </Link>
                </Grid>
            </Box>
            <ToastContainer />
        </Container>
    );
};
Register.propTypes = {};

export default Register;
