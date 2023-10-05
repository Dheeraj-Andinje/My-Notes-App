import React,{useContext} from 'react';
import noteContext from '../contex/notes/noteContex';


const Alert = () => {
  const context = useContext(noteContext);
  const {alert}=context;

  return (
   alert.showalert&& <div>
      <div className={`alert alert-${alert.type} text-center fw-bold fs-5` } role="alert">
        {alert.content}
      </div>

    </div>
  );
}

Alert.defaultProps = {
  color: "primary"
};

export default Alert;
