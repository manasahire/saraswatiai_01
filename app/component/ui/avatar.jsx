import React from "react";
import { Avatar, AvatarImage, AvatarFallback } from "./path/to/your/avatar/component";

function UserProfile({ user }) {
  return (
    <div className="user-profile">
      <Avatar className="custom-avatar-class">
        <AvatarImage src={user.avatarUrl} alt={user.name} className="custom-image-class" />
        <AvatarFallback className="custom-fallback-class">{user.name[0]}</AvatarFallback>
      </Avatar>
      <span>{user.name}</span>
    </div>
  );
}

export default UserProfile;
