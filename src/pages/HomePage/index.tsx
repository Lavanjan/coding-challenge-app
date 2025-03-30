import { useState } from "react";
import { Col, Row, Pagination, Spin, Alert } from "antd";
import ChallengeFilters from "../../components/molecules/ChallengeFilter";
import ChallengeCard from "../../components/molecules/ChallengeCard";
import { useChallenges } from "../../hooks/useChallenges";
import { useAppSelector } from "../../hooks/useAppSelector";

const HomePage = () => {
  const [filters, setFilters] = useState({
    page: 1,
    limit: 6,
    language: undefined as number | undefined,
    difficulty: undefined as string | undefined,
  });

  const { data, isLoading, isError, error } = useChallenges(filters);
  const { completed } = useAppSelector((state) => state.questions);

  const handleFilterChange = (newFilters: Partial<typeof filters>) => {
    setFilters((prev) => ({ ...prev, ...newFilters, page: 1 }));
  };

  if (isError) {
    return (
      <Alert
        message="Error Loading Challenges"
        description={error?.message}
        type="error"
        style={{ margin: 24 }}
      />
    );
  }

  return (
    <div style={{ padding: 24 }}>
      <ChallengeFilters onFilterChange={handleFilterChange} />

      {isLoading ? (
        <div style={{ textAlign: "center", margin: "40px 0" }}>
          <Spin size="large" />
        </div>
      ) : (
        <>
          <Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
            {data?.data.map((challenge) => {
              const isCompleted = challenge.questions.every((q) =>
                completed.includes(q.id)
              );

              return (
                <Col key={challenge.id} xs={24} sm={12} lg={8}>
                  <ChallengeCard
                    id={challenge.id}
                    title={challenge.challenge}
                    difficulty={challenge.level}
                    language={challenge.language.name}
                    isCompleted={isCompleted}
                  />
                </Col>
              );
            })}
          </Row>

          {data?.pagination.total ? (
            <Pagination
              current={filters.page}
              total={data.pagination.total}
              pageSize={filters.limit}
              onChange={(page) => setFilters((prev) => ({ ...prev, page }))}
              showSizeChanger={false}
              style={{ textAlign: "center" }}
            />
          ) : null}
        </>
      )}

      {!isLoading && !data?.data.length && (
        <Alert
          message="No challenges found"
          description="Try adjusting your filters"
          type="info"
          style={{ margin: 24 }}
        />
      )}
    </div>
  );
};

export default HomePage;
