import { useNavigate } from "react-router-dom";
import { Typography, Tag } from "antd";
import styles from "./challengeCard.module.css";
import Button from "../../atoms/Button";
import { ChallengeCardProps } from "../../../types";

const { Title } = Typography;

const ChallengeCard = ({
  id,
  title,
  difficulty,
  language,
  isCompleted,
}: ChallengeCardProps) => {
  const navigate = useNavigate();

  const getDifficultyColor = () => {
    switch (difficulty.toUpperCase()) {
      case "EASY":
        return "green";
      case "MEDIUM":
        return "orange";
      case "HARD":
        return "red";
      default:
        return "default";
    }
  };

  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <Title level={4} className={styles.title}>
          {title}
        </Title>
      </div>

      <div className={styles.tags}>
        <Tag color="blue" className={styles.tag}>
          {language}
        </Tag>
        <Tag color={getDifficultyColor()} className={styles.tag}>
          {difficulty}
        </Tag>
        {isCompleted && (
          <Tag color="purple" className={styles.tag}>
            Completed
          </Tag>
        )}
      </div>

      <Button
        className={styles.button}
        onClick={() => !isCompleted && navigate(`/challenge/${id}`)}
        disabled={isCompleted}
      >
        {isCompleted ? "Completed" : "Start Challenge"}
      </Button>
    </div>
  );
};

export default ChallengeCard;
