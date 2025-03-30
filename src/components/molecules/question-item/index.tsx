import { Card, Button, Badge, Modal } from "antd";
import { useState } from "react";
import { ClockCircleOutlined } from "@ant-design/icons";
import { Question } from "../../../types";
import QuestionForm from "../question-form";
import { useAppSelector } from "../../../hooks/useAppSelector";

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

  return (
    <>
      <Card
        title={`Q${question.id}: ${question.question.substring(0, 40)}${
          question.question.length > 40 ? "..." : ""
        }`}
        extra={
          <Badge
            count={difficulty}
            style={{
              backgroundColor:
                difficulty === "EASY"
                  ? "#52c41a"
                  : difficulty === "MEDIUM"
                  ? "#faad14"
                  : "#f5222d",
            }}
          />
        }
        actions={[
          <Button
            type={isCompleted ? "default" : "primary"}
            onClick={() => setIsModalOpen(true)}
            disabled={isCompleted}
          >
            {isCompleted ? "Completed" : "Attempt"}
          </Button>,
        ]}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <span>{language}</span>
          <div>
            <ClockCircleOutlined style={{ marginRight: 4 }} />
            {timeSpent}s
          </div>
        </div>
      </Card>

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
