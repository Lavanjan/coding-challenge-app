import { Form, Radio, Button, Typography, message } from "antd";
import { useEffect, useState } from "react";
import { Question } from "../../../types";
import {
  completeQuestion,
  updateTimeSpent,
} from "../../../redux/slices/questionsSlice";
import { useAppDispatch } from "../../../hooks/useAppDispatch";
import { ClockCircleOutlined } from "@ant-design/icons";
import styles from "./questionForm.module.css";

const { Title } = Typography;

interface QuestionFormProps {
  question: Question;
  onClose: () => void;
}

const QuestionForm = ({ question, onClose }: QuestionFormProps) => {
  const [messageApi, contextHolder] = message.useMessage();

  const [form] = Form.useForm();
  const dispatch = useAppDispatch();
  const [seconds, setSeconds] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setSeconds((prev) => prev + 1);
    }, 1000);

    return () => {
      clearInterval(interval);
      dispatch(updateTimeSpent({ questionId: question.id, time: seconds }));
    };
  }, [dispatch, question.id, seconds]);

  const handleSubmit = async (values: { answer: string }) => {
    setIsSubmitting(true);
    try {
      if (values.answer === question.answer) {
        dispatch(completeQuestion(question.id));
        messageApi.open({
          type: "success",
          content: (
            <div>
              <Title level={5} style={{ color: "#52c41a", margin: 0 }}>
                Correct Answer!
              </Title>
              <p>Time spent: {seconds}s</p>
            </div>
          ),
        });

        onClose();
      } else {
        messageApi.open({
          type: "error",
          content: "Incorrect answer. Please try again!",
        });
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={styles.container}>
      {contextHolder}
      <Form form={form} onFinish={handleSubmit} layout="vertical">
        <Form.Item label={<Title level={4}>{question.question}</Title>}>
          <div className={styles.timer}>
            <ClockCircleOutlined style={{ marginRight: 8 }} />
            Time Spent: {seconds}s
          </div>
        </Form.Item>

        <Form.Item
          name="answer"
          rules={[{ required: true, message: "Please select an answer" }]}
        >
          <Radio.Group style={{ width: "100%" }}>
            {question.options.map((option, index) => (
              <Radio key={index} value={option} className={styles.option}>
                {option}
              </Radio>
            ))}
          </Radio.Group>
        </Form.Item>

        <Form.Item className={styles.submitButton}>
          <Button
            type="primary"
            htmlType="submit"
            loading={isSubmitting}
            disabled={!form.isFieldTouched("answer")}
            size="large"
            block
          >
            Submit Answer
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default QuestionForm;
