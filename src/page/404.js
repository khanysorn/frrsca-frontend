import React from "react";
import { Result, Button } from "antd";
import ModalBox from '../components/ModalBox';
import { Link } from "react-router-dom";

function PageNotFound() {
  return (
    <div className="background">
      <div style={ModalBox}>
        <Result
          status="warning"
          title={<h2>ไม่พบหน้าที่คุณต้องการ</h2>}
          subTitle="ขออภัย, ไม่พบหน้าที่คุณต้องการ"
          extra={<Button type="primary"><Link to="/">กลับไปยังหน้าแรก</Link></Button>}
        />
      </div>
    </div>
  );
}

export default PageNotFound;
