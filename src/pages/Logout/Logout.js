import { useHistory } from 'react-router-dom';

const Logout = () => {
    const history = useHistory();

    localStorage.removeItem('user');

    history.push('/login');

    return <h1>Desconectando...</h1>;
};

Logout.propTypes = {};

export default Logout;
