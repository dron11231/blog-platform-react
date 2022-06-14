import React from 'react';
import { Button, Result } from 'antd';
import { Link } from 'react-router-dom';

export default function ErrorPage({ status }) {
  if (status === '403') {
    return (
      <Result
        status="403"
        title="403"
        subTitle="Sorry, you do not have access to this page or you are not logged in."
        extra={
          <Link to="/">
            <Button type="primary">Back Home</Button>
          </Link>
        }
      />
    );
  }
  if (status === '404') {
    return (
      <Result
        status="404"
        title="404"
        subTitle="Sorry, the page you visited does not exist."
        extra={
          <Link to="/">
            <Button type="primary">Back Home</Button>
          </Link>
        }
      />
    );
  }
}
