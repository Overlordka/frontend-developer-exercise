import { RxHamburgerMenu } from "react-icons/rx";

export default function Header() {


  return (
    <header className="header">
      <button className="header_button"><RxHamburgerMenu className="header_button-svg" /></button>
      <span className="header_span">
        <h1 className="header_h1">Smart Home</h1>
      </span>
    </header>
  );
}