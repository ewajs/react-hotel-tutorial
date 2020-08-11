import React, { Component } from "react";
import { FaCocktail, FaHiking, FaShuttleVan, FaBeer } from "react-icons/fa";
import Title from "./Title";

export default class Services extends Component {
  state = {
    services: [
      {
        icon: <FaCocktail />,
        title: "free cocktails",
        info: "some info",
      },
      {
        icon: <FaHiking />,
        title: "free hiking",
        info: "some info",
      },
      {
        icon: <FaShuttleVan />,
        title: "free shuttle",
        info: "some info",
      },
      {
        icon: <FaBeer />,
        title: "free beer",
        info: "some info",
      },
    ],
  };

  render() {
    return (
      <section className="services">
        <Title title="Services"></Title>
        <div className="services-center">
          {this.state.services.map((item, index) => {
            return (
              <article key={index} className="service">
                <span>{item.icon}</span>
                <h6>{item.title}</h6>
                <p>{item.info}</p>
              </article>
            );
          })}
        </div>
      </section>
    );
  }
}
