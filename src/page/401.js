import React from "react";
import { Result, Button } from "antd";
import ModalBox from '../components/ModalBox';
import { Link } from "react-router-dom";

function PageUnauthorized() {
  return (
    <div className="background">
      <div style={ModalBox}>
        <Result
          status="warning"
          title={<h2>ไม่มีสิทธิ์เข้าถึง</h2>}
          subTitle="ขออภัย, คุณไม่มีสิทธิ์เข้าถึงหน้าที่คุณเรียก"
          extra={<Button type="primary"><Link to="/">กลับไปยังหน้าแรก</Link></Button>}
        />
      </div>
    </div>
  );
}

export default PageUnauthorized;
