/* eslint-disable @typescript-eslint/no-explicit-any */
import { Space } from "antd";
import Select from "../../atoms/Select";

const programmingLanguages = [
  { id: 101, name: "TYPESCRIPT" },
  { id: 102, name: "PYTHON" },
  { id: 103, name: "C" },
  { id: 104, name: "JAVA" },
  { id: 105, name: "SQL" },
];

const ChallengeFilters = ({ onFilterChange }: any) => (
  <Space style={{ marginBottom: 24 }} wrap>
    <Select
      placeholder="Select Language"
      style={{ width: 200 }}
      onChange={(value) => onFilterChange({ language: value })}
      allowClear
      options={programmingLanguages.map((lang) => ({
        value: lang.id,
        label: lang.name,
      }))}
    />

    <Select
      placeholder="Select Difficulty"
      style={{ width: 200 }}
      onChange={(value) => onFilterChange({ difficulty: value })}
      allowClear
      options={["EASY", "MEDIUM", "HARD"].map((diff) => ({
        value: diff,
        label: diff.charAt(0) + diff.slice(1).toLowerCase(),
      }))}
    />
  </Space>
);

export default ChallengeFilters;
