import { Alert, Col, Progress, Row, Spin } from "antd";
import QuestionItem from "../../components/molecules/QuestionItem";
import { useChallengeDetails } from "../../hooks/useChallengesDetails";
import { useParams } from "react-router-dom";
import { useAppSelector } from "../../hooks/useAppSelector";

const ChallengePage = () => {
  const { id } = useParams<{ id: string }>();
  const { completed } = useAppSelector((state) => state.questions);

  const {
    data: challengeData,
    isLoading,
    isError,
    error,
  } = useChallengeDetails(id!);

  const progress = challengeData?.questions
    ? (completed.filter((id) =>
        challengeData.questions.some((q) => q.id === id)
      ).length /
        challengeData.questions.length) *
      100
    : 0;

  if (isLoading) return <Spin size="large" />;
  if (isError) return <Alert message={error.message} type="error" />;
  if (!challengeData) {
    return <Alert message="Challenge not found" type="error" />;
  }

  return (
    <div style={{ padding: 24 }}>
      <h1>{challengeData.challenge}</h1>
      <div style={{ marginBottom: 24 }}>
        <Progress percent={Math.round(progress)} status="active" />
        <span style={{ marginLeft: 8 }}>
          {Math.round(progress)}% Completed ({completed.length}/
          {challengeData.questions.length})
        </span>
      </div>

      <Row gutter={[16, 16]}>
        {challengeData.questions.map((question) => (
          <Col key={question.id} xs={24} sm={12} lg={8}>
            <QuestionItem
              question={question}
              isCompleted={completed.includes(question.id)}
              language={challengeData.language.name}
              difficulty={challengeData.level}
            />
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default ChallengePage;
