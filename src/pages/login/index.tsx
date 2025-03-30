/* eslint-disable @typescript-eslint/no-explicit-any */
import { useFormik } from "formik";
import * as Yup from "yup";
import { useLogin } from "../../hooks/useLogin";
import { Alert, Button, Form, Input, Card, Typography } from "antd";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import styles from "./login.module.css";

const { Title, Text } = Typography;

const LoginPage = () => {
  const { mutate: login, isPending, error } = useLogin();
  const navigate = useNavigate();
  const [loginError, setLoginError]: any = useState(null);

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Invalid email address")
        .required("Email is required"),
      password: Yup.string().required("Password is required"),
    }),
    onSubmit: (values) => {
      setLoginError(null);
      login(values, {
        onSuccess: () => {
          navigate("/home");
        },
        onError: (err) => {
          setLoginError(err.message || "An error occurred. Please try again.");
        },
      });
    },
  });

  return (
    <div className={styles.container}>
      <Card className={styles.card} bordered={false}>
        <div className={styles.header}>
          <Title level={3}>Welcome Back</Title>
          <Text type="secondary">Sign in to your account</Text>
        </div>

        <Form onFinish={formik.handleSubmit} layout="vertical">
          <Form.Item
            label="Email"
            className={styles.formItem}
            validateStatus={
              formik.touched.email && formik.errors.email ? "error" : ""
            }
            help={formik.touched.email && formik.errors.email}
          >
            <Input
              prefix={<UserOutlined className={styles.inputIcon} />}
              name="email"
              type="email"
              size="large"
              placeholder="your.email@example.com"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
          </Form.Item>

          <Form.Item
            label="Password"
            className={styles.formItem}
            validateStatus={
              formik.touched.password && formik.errors.password ? "error" : ""
            }
            help={formik.touched.password && formik.errors.password}
          >
            <Input.Password
              prefix={<LockOutlined className={styles.inputIcon} />}
              name="password"
              size="large"
              placeholder="Your password"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              loading={isPending}
              disabled={!formik.isValid || formik.isSubmitting}
              className={styles.submitButton}
              size="large"
            >
              Sign In
            </Button>
          </Form.Item>

          {(loginError || error) && (
            <Alert
              message={
                loginError ||
                (error && error.message) ||
                "An unknown error occurred"
              }
              type="error"
              showIcon
              className={styles.errorAlert}
            />
          )}
        </Form>
      </Card>
    </div>
  );
};

export default LoginPage;
