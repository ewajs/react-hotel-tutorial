import React, { Component } from "react";
import items from "./data";

const RoomContext = React.createContext();

class RoomProvider extends Component {
  state = {
    rooms: [],
    sortedRooms: [],
    featuredRooms: [],
    loading: true,
  };

  // getData { }

  componentDidMount() {
    let rooms = this.formatData(items);
    let featuredRooms = rooms.filter((room) => room.featured === true);
    this.setState({
      rooms,
      featuredRooms,
      sortedRooms: rooms,
      loading: false,
    });
  }

  formatData(items) {
    let tempItems = items.map((item) => {
      let id = item.sys.id;
      let images = item.fields.images.map((image) => image.fields.file.url);
      // Spread syntax allows to copy the fields object
      // the images property is repeated and will be overriden (see data.js)
      // the id property is not part of it and will be added
      let room = { ...item.fields, images, id };

      return room;
    });
    return tempItems;
  }

  getRoom = (slug) => {
    // copy the rooms from the state (why?)
    let tempRooms = [...this.state.rooms];
    // Return first room where slug matches
    const room = tempRooms.find((room) => room.slug === slug);
    return room;
  };

  render() {
    return (
      <RoomContext.Provider value={{ ...this.state, getRoom: this.getRoom }}>
        {this.props.children}
      </RoomContext.Provider>
    );
  }
}

const RoomConsumer = RoomContext.Consumer;

export { RoomProvider, RoomConsumer, RoomContext };
