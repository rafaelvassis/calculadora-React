import "./Credits.css";
import bearLogo from "../../assets/img/bear_transparent.png";

function Credits() {
  return (
    <div>
      <div className="credits">
        <p>
          <img src={bearLogo} width="50" alt="Bear Logo" />
        </p>

        <p>
          <strong>Desenvolvido por Rafael Vassis</strong>
        </p>
      </div>
    </div>
  );
}

export default Credits;
