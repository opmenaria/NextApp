import React from 'react';
import { Button, Form, Input, Select, Space } from 'antd';

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};
interface DataType {
    id:number,
    donor: string,
    panels: string[],
    barcode: number,
    sourceData: string,
    date: string,
    amount: number,
    observedBy: string,
    status: string
  }
  interface formData {
    columns: any[];
    rowRef:object
    onSubmit:(res:object)=>{}
  }
  function DumyForm({columns, onSubmit, rowRef}:formData){
  
  return (
  <Form
    
    {...layout}
    name="nest-messages"
    onFinish={(respons)=>onSubmit(respons)}
    style={{ maxWidth: 800, marginTop:30 }}
    initialValues={rowRef?.current || {}}
  >
    {columns?.map((column:DataType) =>{
        return <Form.Item key={column.key} name={column.key} label={column.title} rules={column.rules}>
          {column.key=='panels'?
          <Select mode="tags" style={{ width: '100%' }} tokenSeparators={[',']} defaultValue={rowRef?.current?.[column.key]}>
          {column?.options?.map((item: string) => (
            <Select.Option key={item} value={item}>
              {item}
            </Select.Option>
          ))}
        </Select>
          :column.key=='type'?
          <Select
          style={{ width: 300 }}
          placeholder="Select Type"
          dropdownRender={(menu) => (
            <>
              {menu}
              <Space style={{ padding: '0 8px 4px' }}>
              </Space>
            </>
          )}
          options={column.options.map((item) => ({ label: item, value: item }))}
        />
          :<Input />}
          
        </Form.Item>
    })}
    <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
      <Button type="primary" htmlType="submit">
        Submit
      </Button>
    </Form.Item>
  </Form>
)};

export default DumyForm;