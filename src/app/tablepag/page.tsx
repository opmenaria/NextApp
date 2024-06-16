"use client"
import React, { useEffect, useRef, useState } from 'react'
import { Button, Modal, Space, Spin, Table,Tag } from 'antd';
import type { TableProps } from 'antd';

import Data from '../medi1.json'
import { FiDelete } from 'react-icons/fi';
import { MdDeleteOutline } from 'react-icons/md';
import { BiEdit, BiPlusCircle } from 'react-icons/bi';
import DumyForm from '../components/Form';
import Link from 'next/link';
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
export default function TablePage() {
  const rowRef=useRef({})
  const [data, setData] = useState<DataType[]>([])
  const [loding, setLoading] = useState(true)
  const [opnModl, setOpnModl] = useState(false)

  function getData(vals: DataType[]){
    setLoading(true)
    setTimeout(() => {
      setData(vals)
    setLoading(false)
    }, 1500);
  }
  useEffect(()=>{
    getData(Data.UsrData)
  },[])
  
    const handleDelete=(ev)=>{
      setLoading(true)
      setTimeout(() => {
        let deleted=data.filter(data => data.id != ev.id)
        setData(deleted)
        setLoading(false)
      }, 1000);

  }
  const handleEdit=(evv)=>{
    rowRef.current=evv
    setOpnModl(true)
  }
const columns: TableProps<DataType>['columns'] = [
  {
    title: 'Donor',
    fixed: 'left',
    dataIndex: 'donor',
    key: 'donor',
    render: (text) => <a>{text}</a>,
  },
  {
    title: 'Barcode',
    dataIndex: 'barcode',
    key: 'barcode',
  },
  {
    title: 'Source Data',
    dataIndex: 'sourceData',
    key: 'sourceData',
  },
  {
    title: 'Panels',
    key: 'panels',
    dataIndex: 'panels',
    width: 250,
    options:['Unable',"Refused", 'Duplicate', 'Insufficient', 'Approved'],
    render: (_, { panels }) => (
      <>
        {panels?.map((pan, ind) => {
          let color = ind ==0 ? 'geekblue': ind ==1?'cyan' : 'red'
          if (pan === 'loser') {
            color = 'volcano';
          }
          return (
            <Tag color={color} key={pan}>
              {pan?.toUpperCase()}
            </Tag>
          );
        })}
      </>
    ),
  },
  {
    title: 'Amount($)',
    dataIndex: 'amount',
    key: 'amount'
  },
  {
    title: 'ObservedBy',
    dataIndex: 'observedBy',
    key: 'observedBy',
  },
  {
    title: 'Status',
    dataIndex: 'status',
    key: 'status',
  },

  {
    title: 'Date',
    key: 'date',
    dataIndex: 'date',
    // render: (_, record) => (
    //   <Space size="middle">
    //     <a>Invite {record?.name}</a>
    //   </Space>
    // ),
  },
  {
    title: 'Actions',
    dataIndex: '',
    key: 'action',
    fixed:'right',
    render: (itm, record) => (
      <Space size="middle">
        <Button onClick={()=>handleEdit(itm)} icon={<BiEdit size={20} color='blue'/>}/>
        <Button onClick={()=>handleDelete(itm)} icon={<MdDeleteOutline size={20} color='red'/>}/>
      </Space>
    ),
  },
];
  const onSubmit=(respons)=>{
    if(Object.keys(rowRef.current).length>0){
      let newData=data.map(elm=>{
          if(elm.id==rowRef.current?.id){
              return { id:elm.id,...respons}
          }else return elm
      })
       setData(newData)
  }else setData([{...respons,id: data.length+1}, ...data])
      setOpnModl(false)
      rowRef.current={};
  }
  return (
    <div className=' p-3 z-20'>
      <div className=' flex justify-between items-center mb-6 bg-sky-400 p-1 rounded-md'>
        <p className=' ml-5 text-2xl'>Users Table </p>
        <div>
        <Button onClick={()=>setOpnModl(true)} icon={<BiPlusCircle size={20} color='blue'/>}>Add Row</Button>
        </div>
      </div>
      <div className=' flex justify-center flex-col'>
        {data.length<0 && !loding? <Spin/>: <Table loading={loding} scroll={{ x: 1300 }} bordered columns={columns} dataSource={data} />}
         <Modal 
          title={Object.keys(rowRef.current).length>0?'Update Row':'Create Row'}
         open={opnModl}
         loading={false}
         footer={false}
         onCancel={()=>{rowRef.current={};setOpnModl(false)}}
         destroyOnClose
        //  onOk={onFinish}
         >
         <DumyForm setOpnModl={setOpnModl} onSubmit={onSubmit} rowRef={rowRef} data={data} setData={setData} columns={columns.filter(el=>el.key!='action')}/>
         </Modal>
         </div>
    </div>
  )
}
