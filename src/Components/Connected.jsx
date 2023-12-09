import React, { useState, useEffect } from "react";
import "./connected.css";
import MetamaskLogo from "./metamask";

const Connected = (props) => {
  const [winner, setWinner] = useState(null);

  useEffect(() => {
    if (!props.showButton) {
      calculateWinner();
    }
  }, [props.showButton, props.candidates]);

  const calculateWinner = () => {
    if (props.candidates.length > 0) {
      const maxVotes = Math.max(
        ...props.candidates.map((candidate) => candidate.voteCount)
      );
      const winners = props.candidates.filter(
        (candidate) => candidate.voteCount === maxVotes
      );

      if (winners.length === 1) {
        setWinner(winners[0].name);
      } else {
        // Handle tie scenario
        setWinner("Tie");
      }
    }
  };

  return (
    <div className="connected-container">
      {/* <MetamaskLogo />  */}
      <h1 className="connected-header">You are Connected to Metamask</h1>
      <p className="connected-account">Metamask Account: {props.account}</p>
      <p className="connected-account">Remaining Time: {props.remainingTime}</p>

      {props.showButton ? (
        <p className="connected-account">You have already voted</p>
      ) : (
        <div className="voteee">
          <input
            type="number"
            placeholder="Enter Candidate Index"
            value={props.number}
            onChange={props.handleNumberChange}
            className="input"
          ></input>
          <br />
          <button
            className="login-button"
            onClick={props.voteFunction}
          >
            Vote
          </button>
        </div>
      )}

      <table
        id="myTable"
        className="table"
        // style={{ background: "linear-gradient(to right, #f1f1f1, #ffffff)" }}
      >
        <thead>
          <tr>
            <th>Index</th>
            <th>Candidate name</th>
            <th>Candidate votes</th>
          </tr>
        </thead>
        <tbody className="tbody">
          {props.candidates.map((candidate, index) => (
            <tr key={index}>
              <td>{candidate.index}</td>
              <td>{candidate.name}</td>
              <td>{candidate.voteCount}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {winner && !props.showButton && (
        <div className="win">
          <h2>
            Winner: {winner}
          </h2>
        </div>
      )}
    </div>
  );
};

export default Connected;
