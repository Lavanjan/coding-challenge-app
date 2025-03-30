import { Form, Radio, Button, Typography, message } from "antd";
import { useEffect, useState } from "react";

import { Question } from "../../../types";
import {
  completeQuestion,
  updateTimeSpent,
} from "../../../redux/slices/questionsSlice";
import { useAppDispatch } from "../../../hooks/useAppDispatch";

const { Title } = Typography;

interface QuestionFormProps {
  question: Question;
  onClose: () => void;
}

const QuestionForm = ({ question, onClose }: QuestionFormProps) => {
  const [messageApi] = message.useMessage();

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
    console.log("test");

    setIsSubmitting(true);
    try {
      if (values.answer === question.answer) {
        console.log("if");

        dispatch(completeQuestion(question.id));
        messageApi.open({
          type: "success",
          content: (
            <div>
              <Title level={5} style={{ color: "#52c41a" }}>
                Correct Answer!
              </Title>
              <p>Time spent: {seconds}s</p>
            </div>
          ),
        });

        onClose();
      } else {
        console.log("else");
        messageApi.open({
          type: "success",
          content: "Incorrect answer. Please try again!",
        });
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Form form={form} onFinish={handleSubmit} layout="vertical">
      <Form.Item label={<Title level={4}>{question.question}</Title>}>
        <div style={{ margin: "16px 0" }}>
          <Typography.Text type="secondary">
            Time Spent: {seconds}s
          </Typography.Text>
        </div>
      </Form.Item>

      <Form.Item
        name="answer"
        rules={[{ required: true, message: "Please select an answer" }]}
      >
        <Radio.Group>
          {question.options.map((option, index) => (
            <Radio
              key={index}
              value={option}
              style={{
                display: "block",
                marginBottom: 8,
                padding: 8,
                borderRadius: 4,
                backgroundColor: "#f5f5f5",
              }}
            >
              {option}
            </Radio>
          ))}
        </Radio.Group>
      </Form.Item>

      <Form.Item>
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
  );
};

export default QuestionForm;
