import React from "react";
import "./style.css";

export default function FuzzyList({
  users,
  handleSelectUser,
  handleInviteUser,
  newUser
}) {
  //results.push("Add ", query);

  //if the selected user matches a user in the added list return true
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
              handleSelectUser(user);
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
            handleInviteUser(newUser);
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
