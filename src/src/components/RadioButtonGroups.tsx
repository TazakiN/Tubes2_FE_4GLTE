import { Label } from "./ui/label";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { store } from "../App";

const RadioButtonGroups = ({
  radioGroupTitle,
  option1Label,
  option2Label,
}: {
  radioGroupTitle: string;
  option1Label: string;
  option2Label: string;
}) => {
  const [metode, setMetode] = store.useState("Metode");
  const [bahasa, setBahasa] = store.useState("Bahasa");

  const handleChange = (e: string) => {
    const value = e;
    if (radioGroupTitle === "Metode") {
      setMetode(value);
      console.log(metode);
    } else if (radioGroupTitle === "Bahasa") {
      setBahasa(value);
      console.log(bahasa);
    }
  };

  return (
    <div className="w-full">
      <h1 className="py-2 text-center text-lg">{radioGroupTitle}</h1>
      <RadioGroup
        defaultValue={option1Label}
        className="flex flex-grow justify-center gap-7"
        onValueChange={(value: string) => handleChange(value)}
      >
        <div className="flex items-center space-x-2">
          <RadioGroupItem value={option1Label} id={option1Label} />
          <Label htmlFor={option1Label}>{option1Label}</Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value={option2Label} id={option2Label} />
          <Label htmlFor={option2Label}>{option2Label}</Label>
        </div>
      </RadioGroup>
    </div>
  );
};

export default RadioButtonGroups;
