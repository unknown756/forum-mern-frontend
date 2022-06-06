import { useContext } from 'react';
import { LoginCtx } from '../Contexts/LoginContext';

export default function Dashboard() {
    const { user } = useContext(LoginCtx);

    return (
        <h3>{ user.firstName + " " + user.lastName }</h3>    
    );
};
