import { useHistory } from "react-router-dom";
import { Button } from "reactstrap";

function Header(props) {
  const history = useHistory();

  return (
    <header>
      <h1>OğuzhanFlix</h1>
    </header>
  );
}

export default Header;
