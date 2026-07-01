import { Outlet } from 'react-router-dom';
//import Header from './Header';
//import Footer from './Footer';
import Navbar from './Navbar';

export default function BaseLayout() {
    return (
        <>
            {/* Header / Navbar que você tinha no base.html */}
            {/*<Header /> */}
            <Navbar />

            {/* Conteúdo dinâmico das páginas (substitui {% block content %}) */}
            <div className="container mt-4">
                {/* Mensagens de sucesso/erro (equivalente ao {% if messages %}) */}
                <div id="messages"></div>
            
                {/* Aqui entra o conteúdo de cada página (HomePage, StorePage, etc.) */}
                <Outlet />
            </div>
        </>
    );
}