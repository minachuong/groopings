import { useState, Fragment } from "react";
import './ToggleSwitch.css'

interface Props {
  id: string;
  label: string;
  toggleHandler: (value: boolean) => void;
}

function ToggleSwitch (props: Props) {
  const [isToggled, setIsToggled] = useState(true);
  const onToggle = (): void => { 
    setIsToggled(!isToggled);
    props.toggleHandler(!isToggled);
  };

  return(
    <Fragment>
      <label className="switch">
        <input id={props.id} type="checkbox" checked={isToggled} onChange={onToggle} />
        <span className="switch-toggle"></span>
        {props.label}
      </label>
    </Fragment>
  );
}

export default ToggleSwitch;