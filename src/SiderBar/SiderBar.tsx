import { Flex } from "antd";
import { Link } from "react-router-dom";
import Sider from "antd/es/layout/Sider";
import "./SiderBar.css";

const SiderBar: React.FC = () => {
  return (
    <Sider className="sider">
      <Flex vertical align="flex-start" style={{margin: "1rem 2rem"}}>
        <Link to="/">Задачи</Link>
        <Link to="/profile">Профиль</Link>
      </Flex>
    </Sider>
  );
};

export default SiderBar;
