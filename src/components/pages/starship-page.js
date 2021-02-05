import React from "react";
import {StarshipList} from '../sw-components';

const StarshipPage = ({history}) => {
  return (<StarshipList
    onItemSelected={(id) => history.push(id)} />
  )
}

export default StarshipPage;
