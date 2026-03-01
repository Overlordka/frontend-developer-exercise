import { BsThreeDotsVertical } from "react-icons/bs";

export default function HeaderStatistik() {


  return (
    <header className="header">
      <span className="header_span">
      <h1 className="header_h1">Statistik</h1>
      </span>
      <button className="header_button"><BsThreeDotsVertical className="header_button-svg" /></button>
    </header>
  );
}