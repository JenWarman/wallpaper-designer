export const calculateQuantity = (
  width: number,
  height: number,
  measurement: string
) => {
  if (measurement === "inches") {
    const drops = Math.ceil((width * 2.54) / 52);
    const dropsOnRoll = Math.floor(1000 / (height * 2.54 + 20));
    return Math.ceil(drops / dropsOnRoll);
  }

  const drops = Math.ceil(width / 52);
  const dropsOnRoll = Math.floor(1000 / (height + 20));
  return Math.ceil(drops / dropsOnRoll);
};

export const calculatePrice = (quantity: number) => quantity * 48;
