import React, { Component } from "react";
import Client from "./Contentful";

const RoomContext = React.createContext();

class RoomProvider extends Component {
  state = {
    rooms: [],
    sortedRooms: [],
    featuredRooms: [],
    loading: true,
    type: "all",
    capacity: 1,
    price: 0,
    minPrice: 0,
    maxPrice: 0,
    maxSize: 0,
    minSize: 0,
    breakfast: false,
    pets: false,
  };

  getData = async () => {
    try {
      let response = await Client.getEntries({
        content_type: "beachResortRoom",
        order: "fields.price",
      });
      let rooms = this.formatData(response.items);
      let featuredRooms = rooms.filter((room) => room.featured === true);
      let maxPrice = Math.max(...rooms.map((room) => room.price));
      let maxSize = Math.max(...rooms.map((room) => room.size));
      this.setState({
        rooms,
        featuredRooms,
        sortedRooms: rooms,
        loading: false,
        price: maxPrice,
        maxPrice,
        maxSize,
      });
    } catch (error) {
      console.log(error);
    }
  };

  componentDidMount() {
    this.getData();
  }

  // Custom methods will need to be bound in the constructor as:
  // this.methodName = this.methodName.bind(this)
  // This is only needed if the method will need to access any other
  // of its objects properties/methods, such as setState.
  // to create an autobound method, you need to use arrow notation,
  // see below handleChange.
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

  handleChange = (event) => {
    const target = event.target;
    // Handle difference between Checkbox and other form controls
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;
    console.log(name, value);
    this.setState(
      {
        [name]: value,
      },
      this.filterRooms
    );
  };

  filterRooms = () => {
    let {
      rooms,
      type,
      capacity,
      price,
      minSize,
      maxSize,
      breakfast,
      pets,
    } = this.state;
    // Transform from String to Int
    capacity = parseInt(capacity);
    price = parseInt(price);

    // Make a copy to start filtering
    let tempRooms = [...rooms];

    // Filter by type (if selection is not 'all')
    if (type !== "all") {
      tempRooms = tempRooms.filter((room) => room.type === type);
    }

    // Filter by capacity (bigger or equal than user selection)
    if (capacity !== 1) {
      tempRooms = tempRooms.filter((room) => room.capacity >= capacity);
    }

    // Filter by price
    tempRooms = tempRooms.filter((room) => room.price <= price);

    // Filter by size
    tempRooms = tempRooms.filter(
      (room) => room.size >= minSize && room.size <= maxSize
    );

    // Checkbox filter only work when active \
    // (breakfast/pets unchecked bring in all options)

    // Filter by breakfast
    if (breakfast) {
      tempRooms = tempRooms.filter((room) => room.breakfast === true);
    }

    // Filter by pets
    if (pets) {
      tempRooms = tempRooms.filter((room) => room.pets === true);
    }

    // tempRooms = tempRooms.filter((room) => room.pets == pets);

    this.setState({
      sortedRooms: tempRooms,
    });
  };

  render() {
    return (
      <RoomContext.Provider
        value={{
          ...this.state,
          getRoom: this.getRoom,
          handleChange: this.handleChange,
        }}
      >
        {this.props.children}
      </RoomContext.Provider>
    );
  }
}

const RoomConsumer = RoomContext.Consumer;

export function withRoomConsumer(Component) {
  return function ConsumerWrapper(props) {
    return (
      <RoomConsumer>
        {(value) => <Component {...props} context={value} />}
      </RoomConsumer>
    );
  };
}

export { RoomProvider, RoomConsumer, RoomContext };
