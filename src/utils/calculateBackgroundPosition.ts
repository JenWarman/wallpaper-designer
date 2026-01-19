export const calculateBackgroundPosition = (motif: string, scale: string) => {
  let positionOne = "";
  let positionTwo = "";
  
  if (motif === "rose") {
    if (scale === "small") {
      positionOne = "50px";
      positionTwo = "35px";
    }
    if (scale === "medium") {
     positionOne = "75px";
    positionTwo = "50px";
    }
    if (scale === "large") {
      positionOne = "100px";
    positionTwo = "70px";
    }
  }

  if (motif === "daisy" || motif === "orchid") {
     if (scale === "small") {
      positionOne = "50px";
    positionTwo = "75px";
    }
    if (scale === "medium") {
    positionOne = "75px";
    positionTwo = "110px";
    }
    if (scale === "large") {
      positionOne = "100px";
    positionTwo = "150px";
    }
  }
  return {
    positionOne,
    positionTwo,
  };
};
