import { useNavigate } from "react-router-dom";
import { BsThreeDotsVertical } from "react-icons/bs";

export default function HeaderIndst() {
    const navigate = useNavigate();

    return (
        <header className="header">
            <button className="header_button" onClick={() => navigate('/')}><img src="../public/icons/icon_left.png" alt="arrow" /></button>
            <span className="header_span">
                <h1 className="header_h1">Varme</h1>
            </span>
            <button className="header_button"><BsThreeDotsVertical className="header_button-svg" /></button>
        </header>
    );
}