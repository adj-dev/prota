import React from "react";
import "./style.css";
const deleteButton = require("../../../assets/img/delete-icon.jpg");
export default function AddedContributors({
  contributors,
  handleRemoveContributor
}) {
  return (
    <div className="added-contributor-list-container">
      {contributors.length > 0 ? (
        contributors.map((contributor, i) => {
          return (
            <div className="added-contributor-container" key={i}>
              <span>{contributor}</span>
              <img
                className="remove-contributor-button"
                alt="remove"
                src={deleteButton}
                onClick={() => handleRemoveContributor(contributor)}
              />
            </div>
          );
        })
      ) : (
        <div>Add Contibutors!</div>
      )}
    </div>
  );
}
