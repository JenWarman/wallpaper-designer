export const calculateBackgroundPosition = (motif: string, scale: string) => {

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
