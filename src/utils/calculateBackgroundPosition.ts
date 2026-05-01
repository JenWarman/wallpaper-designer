export const calculateBackgroundPosition = (motif: string, scale: string, component: string) => {
  if (component === "demo") {
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
      sunflower: {
        small: { positionOne: "5px", positionTwo: "7px" },
        medium: { positionOne: "75px", positionTwo: "20px" },
        large: { positionOne: "30px", positionTwo: "42px" },
      },
    };

    return positions[motif]?.[scale] ?? {
      positionOne: "",
      positionTwo: ""
    };
  }

  if (component === "saved") {
    const positions: any = {
      daisy: {
        small: { positionOne: "5px", positionTwo: "8px" },
        medium: { positionOne: "12px", positionTwo: "18px" },
        large: { positionOne: "22px", positionTwo: "38px" },
      },
      orchid: {
        small: { positionOne: "5px", positionTwo: "8px" },
        medium: { positionOne: "12px", positionTwo: "18px" },
        large: { positionOne: "25px", positionTwo: "30px" },
      },
      rose: {
        small: { positionOne: "5px", positionTwo: "10px" },
        medium: { positionOne: "12px", positionTwo: "25px" },
        large: { positionOne: "25px", positionTwo: "20px" },
      },
      sunflower: {
        small: { positionOne: "5px", positionTwo: "7px" },
        medium: { positionOne: "10px", positionTwo: "18px" },
        large: { positionOne: "30px", positionTwo: "35px" },
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
    sunflower: {
      small: { positionOne: "50px", positionTwo: "68px" },
      medium: { positionOne: "75px", positionTwo: "105px" },
      large: { positionOne: "100px", positionTwo: "140px" },
    },
  };

  return positions[motif]?.[scale] ?? {
    positionOne: "",
    positionTwo: ""
  };
};


