import { useNavigate } from "react-router-dom";
import { Badge, Button, Card, Tag } from "antd";

interface ChallengeCardProps {
  id: number;
  title: string;
  difficulty: string;
  language: string;
  isCompleted: boolean;
}

const difficultyColorMap = {
  EASY: "green",
  MEDIUM: "orange",
  HARD: "red",
} as const;

const ChallengeCard = ({
  id,
  title,
  difficulty,
  language,
  isCompleted,
}: ChallengeCardProps) => {
  const navigate = useNavigate();

  return (
    <Card
      title={title}
      extra={
        <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
          <Badge
            color={
              difficultyColorMap[difficulty as keyof typeof difficultyColorMap]
            }
            text={difficulty}
          />
          {isCompleted && <Tag color="success">Completed</Tag>}
        </div>
      }
      actions={[
        <Button
          type={isCompleted ? "default" : "primary"}
          onClick={() => !isCompleted && navigate(`/challenge/${id}`)}
          disabled={isCompleted}
          block
        >
          {isCompleted ? "Completed" : "Start Challenge"}
        </Button>,
      ]}
    >
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <span>Language: {language}</span>
      </div>
    </Card>
  );
};

export default ChallengeCard;
