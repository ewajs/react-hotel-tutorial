import React from "react";
import RoomFilter from "./RoomFilter";
import RoomList from "./RoomList";
// Import for Function As A Child method
// import { RoomConsumer } from "../Context";
// Import for Higher Order Function method
import { withRoomConsumer } from "../Context";
import Loading from "./Loading";

// Higher Order Function method implementation
function RoomContainer({ context }) {
  const { loading, sortedRooms, rooms } = context;
  if (loading) {
    return <Loading />;
  }
  return (
    <>
      <RoomFilter rooms={rooms} />
      <RoomList rooms={sortedRooms} />
    </>
  );
}

export default withRoomConsumer(RoomContainer);

// Function As A Child method implementation

// export default function RoomContainer() {
//   // For a functional component, you cannot access context as
//   // in a class based one, you do this by using the *Consumer
//   // Class Component from the context. This component takes a
//   // a function as a child that receives the context and returns
//   // a React Node.
//   return (
//     <RoomConsumer>
//       {(value) => {
//         // Child function receiving context through value
//         const { loading, sortedRooms, rooms } = value;
//         if (loading) {
//           return <Loading />;
//         }
//         return (
//           <div>
//             Hello from RC.
//             <RoomFilter rooms={rooms} />
//             <RoomList rooms={sortedRooms} />
//           </div>
//         );
//       }}
//     </RoomConsumer>
//   );
// }
