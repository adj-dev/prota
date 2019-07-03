import React from "react";
import "./style.css";

export default function AddedContributors({
  contributors,
  handleRemoveContributor
}) {
  return (
    <div className="added-contributor-list-container">
      {contributors.length > 0
        ? contributors.map((contributor, i) => {
            return (
              <div className="added-contributor-container" key={i}>
                {contributor}
                <div
                  className="remove-contributor-button"
                  onClick={() => handleRemoveContributor(contributor)}
                >
                  x
                </div>
              </div>
            );
          })
        : "Add Contibutors!"}
    </div>
  );
}
