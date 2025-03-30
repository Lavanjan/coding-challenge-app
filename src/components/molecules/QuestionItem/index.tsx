import { Button, Badge, Modal } from "antd";
import { useState } from "react";
import { ClockCircleOutlined } from "@ant-design/icons";
import { Question } from "../../../types";
import QuestionForm from "../QuestionForm";
import { useAppSelector } from "../../../hooks/useAppSelector";
import styles from "./questionItem.module.css";

interface QuestionItemProps {
  question: Question;
  isCompleted: boolean;
  language: string;
  difficulty: string;
}

const QuestionItem = ({
  question,
  isCompleted,
  language,
  difficulty,
}: QuestionItemProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const timeSpent = useAppSelector(
    (state) => state.questions.timeSpent[question.id] || 0
  );

  const getBadgeColor = () => {
    switch (difficulty) {
      case "EASY":
        return "#52c41a";
      case "MEDIUM":
        return "#faad14";
      case "HARD":
        return "#f5222d";
      default:
        return "#1890ff";
    }
  };

  return (
    <>
      <div className={styles.card}>
        <div className={styles.cardContent}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginBottom: 12,
            }}
          >
            <div className={styles.cardTitle}>
              Q{question.id}: {question.question.substring(0, 40)}
              {question.question.length > 40 ? "..." : ""}
            </div>
            <Badge
              count={difficulty}
              style={{
                backgroundColor: getBadgeColor(),
              }}
            />
          </div>
        </div>

        <div className={styles.footer}>
          <div className={styles.language}>{language}</div>
          <div className={styles.timeSpent}>
            <ClockCircleOutlined style={{ marginRight: 4 }} />
            {timeSpent}s
          </div>
        </div>

        <div style={{ padding: "10px 16px", borderTop: "1px solid #f0f0f0" }}>
          <Button
            className={styles.button}
            type={isCompleted ? "default" : "primary"}
            onClick={() => setIsModalOpen(true)}
            disabled={isCompleted}
          >
            {isCompleted ? "Completed" : "Attempt"}
          </Button>
        </div>
      </div>

      <Modal
        title={`Question #${question.id}`}
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        footer={null}
        width={800}
        destroyOnClose
      >
        <QuestionForm
          question={question}
          onClose={() => setIsModalOpen(false)}
        />
      </Modal>
    </>
  );
};

export default QuestionItem;
