import React from "react";
import "./style.css";
const deleteButton = require("../../../assets/img/delete-icon.jpg");

export default function AddedUsers({ users, handleRemoveUser, currentUser }) {
  return (
    <div className="added-contributor-list-container">
      {users.length > 0
        ? users.map((user, i) => {
            return (
              <div className="added-contributor-container" key={i}>
                <span>{user.username}</span>
                {currentUser !== user.username ? (
                  <img
                    className="remove-contributor-button"
                    alt="remove"
                    src={deleteButton}
                    onClick={() => handleRemoveUser(user)}
                  />
                ) : null}
              </div>
            );
          })
        : null}
    </div>
  );
}
