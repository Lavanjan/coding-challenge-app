import { Badge, Button, Drawer, List, Tag, Typography, Dropdown } from "antd";
import { UserOutlined, LogoutOutlined } from "@ant-design/icons";
import { useState } from "react";
import { useAppSelector } from "../../../hooks/useAppSelector";
import { useChallenges } from "../../../hooks/useChallenges";
import { Link, useNavigate } from "react-router-dom";
import styles from "./Navbar.module.css";

const { Title, Text } = Typography;

const Navbar = () => {
  const [showCompleted, setShowCompleted] = useState(false);
  const { completed, timeSpent } = useAppSelector((state) => state.questions);
  const { data: challenges } = useChallenges({});
  const navigate = useNavigate();

  const completedChallenges =
    challenges?.data
      ?.filter((challenge) =>
        challenge.questions.every((q) => completed.includes(q.id))
      )
      .map((challenge) => ({
        ...challenge,
        totalTime: challenge.questions.reduce(
          (acc, q) => acc + (timeSpent[q.id] || 0),
          0
        ),
      }))
      .sort((a, b) => b.totalTime - a.totalTime) || [];

  const handleLogout = () => {
    navigate("/");
  };

  const userMenuItems = [
    {
      key: "logout",
      label: "Logout",
      icon: <LogoutOutlined />,
      onClick: handleLogout,
    },
  ];

  return (
    <nav className={styles.navcontainer}>
      <Link className={styles.link} to="/home">
        <Title level={3} className={styles.navTitle}>
          Code Challenges
        </Title>
      </Link>

      <div className={styles.navButtons}>
        <Badge
          count={completedChallenges.length}
          showZero
          className={styles.completedButton}
          onClick={() => setShowCompleted(true)}
        >
          <Button type="text">Completed Challenges</Button>
        </Badge>

        <Dropdown menu={{ items: userMenuItems }} placement="bottomRight">
          <Button type="text" icon={<UserOutlined />} />
        </Dropdown>
      </div>

      <Drawer
        title="Completed Challenges"
        open={showCompleted}
        onClose={() => setShowCompleted(false)}
        width={600}
      >
        <List
          dataSource={completedChallenges}
          renderItem={(challenge) => (
            <List.Item key={challenge.id}>
              <div className={styles.completedListContainer}>
                <div className={styles.completedHeader}>
                  <Title level={5} className={styles.completedTitle}>
                    {challenge.challenge}
                  </Title>
                  <Tag
                    color={
                      challenge.level === "EASY"
                        ? "green"
                        : challenge.level === "MEDIUM"
                        ? "orange"
                        : "red"
                    }
                  >
                    {challenge.level}
                  </Tag>
                </div>
                <div className={styles.completedTimeContainer}>
                  <Text>{challenge.language.name}</Text>
                  <Tag>Total Time: {challenge.totalTime}s</Tag>
                </div>
              </div>
            </List.Item>
          )}
        />
      </Drawer>
    </nav>
  );
};

export default Navbar;
