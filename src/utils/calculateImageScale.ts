export const calculateImageScale = (component: string, scale: string) => {
  if (component === "saved") {
    return scale === "small" ? "10px" : scale === "medium" ? "25px" : "50px";
  }

  if (component === "demo") {
    return scale === "small" ? "10px" : scale === "medium" ? "30px" : "60px";
  }
  
  if (component === "tile") {
    return scale === "small" ? "100px" : scale === "medium" ? "150px" : "200px";
  }
};
