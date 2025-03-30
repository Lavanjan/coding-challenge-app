import { Badge, Button, Drawer, List, Tag } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { useState } from "react";
import { useAppSelector } from "../../../hooks/useAppSelector";
import { useChallenges } from "../../../hooks/useChallenges";

const Navbar = () => {
  const [showCompleted, setShowCompleted] = useState(false);
  const { completed, timeSpent } = useAppSelector((state) => state.questions);
  const { data: challenges } = useChallenges({});

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

  return (
    <nav
      style={{
        padding: "16px 24px",
        background: "#fff",
        boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <div style={{ fontSize: "1.5rem", fontWeight: "bold" }}>
        Code Challenges
      </div>

      <div style={{ display: "flex", gap: "24px" }}>
        <Badge
          count={completedChallenges.length}
          showZero
          style={{ cursor: "pointer" }}
          onClick={() => setShowCompleted(true)}
        >
          <Button type="text">Completed Challenges</Button>
        </Badge>

        <Button type="text" icon={<UserOutlined />} />
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
              <div style={{ width: "100%" }}>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginBottom: "8px",
                  }}
                >
                  <h4>{challenge.challenge}</h4>
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
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <span>{challenge.language.name}</span>
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
