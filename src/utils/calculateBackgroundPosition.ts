export const calculateBackgroundPosition = (motif: string, scale: string, size: string) => {
 if (size === "large") {
  const positions: any = {
    daisy: {
      small: { positionOne: "5px", positionTwo: "8px" },
      medium: { positionOne: "15px", positionTwo: "22px" },
      large: { positionOne: "30px", positionTwo: "45px" },
    },
    orchid: {
       small: { positionOne: "5px", positionTwo: "8px" },
      medium: { positionOne: "15px", positionTwo: "22px" },
      large: { positionOne: "30px", positionTwo: "45px" },
    },
    rose: {
      small: { positionOne: "5px", positionTwo: "3px" },
      medium: { positionOne: "75px", positionTwo: "50px" },
      large: { positionOne: "30px", positionTwo: "20px" },
    },
  };

  return positions[motif]?.[scale] ?? {
    positionOne: "",
    positionTwo: ""
  };
 }
  const positions: any = {
    daisy: {
      small: { positionOne: "50px", positionTwo: "75px" },
      medium: { positionOne: "75px", positionTwo: "110px" },
      large: { positionOne: "100px", positionTwo: "150px" },
    },
    orchid: {
      small: { positionOne: "50px", positionTwo: "75px" },
      medium: { positionOne: "75px", positionTwo: "110px" },
      large: { positionOne: "100px", positionTwo: "150px" },
    },
    rose: {
      small: { positionOne: "50px", positionTwo: "35px" },
      medium: { positionOne: "75px", positionTwo: "50px" },
      large: { positionOne: "100px", positionTwo: "70px" },
    },
  };

  return positions[motif]?.[scale] ?? {
    positionOne: "",
    positionTwo: ""
  };
};


