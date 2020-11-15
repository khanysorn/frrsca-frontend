import React from 'react';
import { Result, Button } from 'antd';

function PageNotFound(){
return(
    <>
    <Result
    status="404"
    title={<h2>ไม่พบหน้าที่คุณต้องการ</h2>}
    subTitle="ขออภัย, ไม่พบหน้าที่คุณต้องการ"
    extra={<Button type="primary">กลับไปยังหน้าแรก</Button>}
  />
  </>
)
}

export default PageNotFound;
