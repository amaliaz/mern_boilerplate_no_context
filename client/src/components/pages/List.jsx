import React from "react";
import api from "../../api";

class List extends React.Component {
  state = {
    list: [],
  };

  componentDidMount() {
    api
      .getStreetArts()
      .then((data) => {
        this.setState({ list: data });
      })
      .catch((err) => console.log(err));
  }

  render() {
    return (
      <div className="List">
        <h2>List of Street Arts</h2>
        {this.state.list.map((streetArt) => (
          <li key={streetArt._id}><img src={streetArt.pictureUrl} alt={streetArt.pictureUrl}/></li>
        ))}
      </div>
    );
  }
}

export default List;
