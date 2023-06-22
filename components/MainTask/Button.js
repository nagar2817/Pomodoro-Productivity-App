import { memo } from "react";
const ButtonComponent = ({title,activeClass, _callback}) => {
    return (
        <button className={activeClass} onClick={_callback}>{title}</button>
      )
}
export default memo(ButtonComponent);