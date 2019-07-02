import React from "react";
import "./style.css";

export default function FuzzyList({ users, handleSelectContributor, newUser }) {
  //results.push("Add ", query);

  let inputMatchesListItem = () => {
    for (let user in users) {
      if (newUser === users[user].username) {
        return true;
      }
    }
    return false;
  };

  return (
    <div className="fuzzy-list-container">
      {users.map((user, i) => {
        return (
          <div
            className="fuzzy-user"
            key={i}
            onClick={() => {
              handleSelectContributor(user.username);
            }}
          >
            {user.username}
          </div>
        );
      })}
      {newUser !== "" && !inputMatchesListItem() ? (
        <div
          className="fuzzy-invite"
          onClick={() => {
            handleSelectContributor(newUser);
          }}
        >
          Invite: {newUser}
        </div>
      ) : (
        ""
      )}
    </div>
  );
}
