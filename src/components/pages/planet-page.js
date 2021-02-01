import React, { Component } from "react";
import Row from '../row';
import {PlanetList, PlanetDetails} from '../sw-components';

export default class PlanetPage extends Component {

  state = {
    selectedItem: null
  }

  onItemSelected = (selectedItem) => {
    this.setState({
      selectedItem
    })
  }

  render() {
    return (
      <Row
        left={<PlanetList onItemSelected={this.onItemSelected} />}
        right={<PlanetDetails itemId={this.state.selectedItem} />}
      />
    );
  }
}
