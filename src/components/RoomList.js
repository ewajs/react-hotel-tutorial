import React from "react";
import Room from "./Room";

export default function RoomList({ rooms }) {
  if (rooms.length === 0) {
    return (
      <div className="empty-search">
        <h3>No rooms matched your search</h3>
      </div>
    );
  }

  return (
    <section className="roomsList">
      <div className="roomslist-center">
        {rooms.map((room) => (
          <Room key={room.id} room={room} />
        ))}
      </div>
    </section>
  );
}
