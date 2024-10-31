
 import * as Constants from "../../constants";

import styled from "styled-components";

const BackgroundDiv = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  overflow: hidden;
  background-image: url(${Constants.building});

  @media (max-width: 768px) {
    background-image: url(${Constants.building});
  }

  @media (max-width: 480px) {
    background-image: url(${Constants.blmobile});
  }
`;

const Tournaments = () => {
  return (
      <BackgroundDiv></BackgroundDiv>
     
     
   
  );
};

export default Tournaments;
  