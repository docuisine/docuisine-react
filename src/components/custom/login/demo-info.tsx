
import Admonition from "@/components/custom/admonition";

const DemoInfo = () => {
  return (
     <Admonition type="info" title="Demo Credentials" className="flex flex-col">
        <span>
          Username: <b>dev-admin</b>
        </span>
        <span>
          Password: <b>DevPassword2P!</b>
        </span>
    </Admonition>
  );
};

export default DemoInfo;
