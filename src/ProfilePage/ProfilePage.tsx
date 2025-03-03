import { Button, Form, Input } from "antd";
import { Flex } from "antd";
import "./ProfilePage.css";

const ProfilePage: React.FC = () => {
  return (
    <div className="main-board">
      <Flex vertical align="center" justify="center" >
        <h3>Вход в профиль</h3>
        <p>Привет</p>
        <Form 
          style={{ width: "14rem" }}
          layout="vertical"
        >
          <Form.Item label="Логин" style={{ textAlign: "center" }}>
            <Input style={{ width: "100%" }} />
          </Form.Item>
          <Form.Item label="Пароль" style={{ textAlign: "center" }}>
            <Input.Password style={{ width: "100%" }} />
          </Form.Item>
          <Form.Item style={{ textAlign: "center" }}>
            <Button type="primary">Войти</Button>
          </Form.Item>
        </Form>
      </Flex>
    </div>
  );
};

export default ProfilePage;
