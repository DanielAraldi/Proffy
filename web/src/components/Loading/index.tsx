import imgLoading from "../../assets/images/loading.gif";

import "./styles.css";

export function Loading() {
  return (
    <div className="loading-container">
      <img src={imgLoading} alt="Carregando..." title="Carregando..." />
    </div>
  );
}
