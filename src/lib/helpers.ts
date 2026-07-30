export type BMIStatus = "empty" | "ok" | "warning" | "blocked";

export const cleanLabel = (label: string) => {
  let newLabel = label.split("_").join(" ");
  return newLabel[0].toUpperCase() + newLabel.slice(1);
};

export const calcBmi = (
  heightFt: string | number,
  heightIn: string | number,
  weightLbs: string | number,
): number | null => {
  const totalInches = Number(heightFt) * 12 + Number(heightIn || 0);
  if (!totalInches || !weightLbs) return null;
  return (Number(weightLbs) / (totalInches * totalInches)) * 703;
};

export const getBmiStatus = (
  heightFt: string | number,
  heightIn: string | number,
  weightLbs: string | number,
): { bmi: number | null; status: BMIStatus } => {
  const bmi = calcBmi(heightFt, heightIn, weightLbs);
  if (bmi === null) return { bmi: null, status: "empty" };
  if (bmi > 32.9) return { bmi, status: "blocked" };
  if (bmi >= 31) return { bmi, status: "warning" };
  return { bmi, status: "ok" };
};
