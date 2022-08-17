import React from "react";
import { Link } from "react-router-dom";
export type THistoryChainProps = {
  title: string;
  language: string;
};

const HistoryChain: React.FC<THistoryChainProps> = ({ title, language }) => {
  return (
    <section className="historyChainContainer">
      <Link to="/all-modules">Modules /</Link>
      <h1>{language} /</h1>
      <h1>{title}</h1>
    </section>
  );
};

export default HistoryChain;
