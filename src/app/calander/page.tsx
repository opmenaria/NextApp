"use client"
import React, { useEffect, useRef, useState } from 'react'
import { Alert, Badge, BadgeProps, Button, Calendar, CalendarProps, Modal, Popconfirm, Popover, Spin, TableProps, Tag } from 'antd';
import type { Dayjs } from 'dayjs';
import dayjs from 'dayjs';
import Data from '../clndr.json'

import {  BiPlusCircle } from 'react-icons/bi';
import DumyForm from '../components/Form';
import { PiNotePencilLight } from 'react-icons/pi';
import { BsAlarm } from 'react-icons/bs';
interface DataType {
  date: string
  events: any[]
}
export default function CalendarPage() {
    
  const [value, setValue] = useState(() => dayjs());
  const [selectedValue, setSelectedValue] = useState(dayjs());
    const rowRef=useRef({})
    const [data, setData] = useState<object>([])
    const [loding, setLoading] = useState(true)
    const [opnModl, setOpnModl] = useState(false)

  function getData(vals: DataType[]){
    setLoading(true)
    setTimeout(() => {
  
        let listData:any[]
      if(vals?.length>0){
        listData=vals
      }else listData=[]
        setLoading(false)
        setData(listData)
    }, 1500);
  }
  useEffect(()=>{
    getData(Data.events)
  },[])

const columns: TableProps<DataType>['columns'] = [
    {
      title: 'Type',
      key: 'type',
      dataIndex: 'type',
      options:['success','warning', 'error'],
      render: (_, {type }) => (
        <>
          {type?.map((pan, ind) => {
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
        title: 'Content',
      key: 'content',
      dataIndex: 'content',
    },
]
  const onSelect = (newValue: Dayjs) => {
    setValue(newValue);
    setSelectedValue(newValue);
  };

  const onPanelChange = (newValue: Dayjs) => {
    setValue(newValue);
  };
  

    const addReminder=(hasRe)=>{
        if(!hasRe){
            const isAvail=data.find(el=>el.date==value.date()) ?true: false;
            let newData
            if(isAvail){
                newData=data.map(elm=>{
                  if(elm.date==value.date()){
                      return {...elm, reminder:true}
                  }else return elm
              })
          }else newData= [...data,{date:value.date(), reminder:true}]
                setData(newData);
              setOpnModl(false)
              rowRef.current={};
        }else {
            let newData=data.map(elm=>{
                if(elm.date==value.date()){
                    return {...elm, reminder:false}
                }else return elm
            })
            setData(newData)
        }

    }
    const popContent=()=> {
        const hasReminder= data.find(el=>el.date==value.date())?.reminder;
        return(
        <>
        <div className='flex items-center gap-2 cursor-pointer ' onClick={()=>setOpnModl(true)}>
            <PiNotePencilLight color='blue' size={18}/>Add Event
        </div>
        <Popconfirm
            title="Reminder"
            description={`Want to ${hasReminder?'remove':'add'} reminder?`}
            onConfirm={()=>addReminder(hasReminder)}
            // onCancel={cancel}
            okText="Yes"
            cancelText="No"
            className='flex items-center gap-2 cursor-pointer mt-2'
            >
            {/* <div onClick={addReminder} className='flex items-center gap-2 cursor-pointer mt-2'> */}
            <BsAlarm color='blue' size={18}/>{hasReminder?'Remove Reminder':'Add Reminder'}
            {/* </div> */}
        </Popconfirm>
        </>
      )}
  const dateCellRender = (val: Dayjs) => {
      let vals=data?.length>0 ?data?.find(el=>el.date === val.date()):{events:[]}
    return (
        <div className={` w-auto h-36 border-2 overflow-hidden p-2 ml-1 mt-1 rounded-md ${vals?.reminder?'bg-orange-300':value.date()===val.date() && "bg-cyan-100"}`}>
            <div className='flex justify-between bg-indigo-100 p-1 items-center rounded-md '>
                {/* <BiPlusCircle onClick={()=>setOpnModl(true)}/> */}
                <Popover content={popContent} trigger="click">
                    {/* <Button>
                        </Button> */}
                        <BiPlusCircle/>
                </Popover>
                <div>{val.date()}</div>
            </div>      
          {vals?.events?.length>0 &&  <ul style={{scrollbarWidth:'thin'}} className={` h-24 overflow-y-auto scrollbar-thin`}>
                {vals?.events?.map((item) => (
                <li className=' flex justify-left w-full'  key={item.content}>
                    <Badge status={item.type as BadgeProps['status']} text={item.content} />
                </li>
                ))}
            </ul>}
    </div>
    );
  };
  
  const onSubmit = (respons) => {
    const currentDate = value.date();
    const isAvail = data.find(el => el.date === currentDate);
    let newData;
  
       if (isAvail) {
            newData = data.map(elm => {
                if (elm.date === currentDate) {
                const updatedEvents = elm.events ? [...elm.events, respons] : [respons];
                return { ...elm, date: currentDate, events: updatedEvents };
                    } else {
                    return elm;
                    }
                });
      } else {
            newData = [...data, { date: currentDate, events: [respons] }];
            }
            setData(newData);
            setOpnModl(false);
            rowRef.current = {};
  };
  
    const monthCellRender = (val: Dayjs) => {
    const num =  val.format('MMMM');
      return (
        <div className={` w-auto h-36 border-2 overflow-hidden p-2 ml-1 mt-1 rounded-md ${value.month()==val.month() && "bg-cyan-100"}`}>
            <div className='flex justify-between bg-indigo-100 p-1 items-center rounded-md '>
                <div>{num}</div>
            </div>      
    </div>
    )};
    const cellRender: CalendarProps<Dayjs>['cellRender'] = (current, info) => {
        if (info.type === 'date') return dateCellRender(current);
        if (info.type === 'month') return monthCellRender(current);
        return info.originNode;
      };
  return (
    <div className=' p-3 z-20'>
      <div className=' flex justify-between items-center mb-6 bg-sky-400 p-1 rounded-md'>
        <p className=' ml-5 text-2xl'>Calendar </p>
        <div className=' flex items-center gap-2'>
            <Button type='primary' onClick={()=>onSelect(dayjs())}>
                Today
            </Button>
        <Alert className=' text-green-700 font-bold' message={`Selected date: ${selectedValue?.format('YYYY-MM-DD')}`} />
        </div>
      </div>
      
      <div className=' flex justify-center flex-col'>
    <Spin spinning={loding}>
    <Modal 
        title={'Add Event'}
         open={opnModl}
         zIndex={1100}
         loading={false}
         footer={false}
         onCancel={()=>setOpnModl(false)}
         destroyOnClose
         >
         <DumyForm setOpnModl={setOpnModl} onSubmit={onSubmit} rowRef={rowRef} data={data} setData={setData} columns={columns}/>
         </Modal>
      <Calendar  className=' rounded-lg'
        onSelect={onSelect}  onPanelChange={onPanelChange}
        value={value} fullCellRender={cellRender} />
                
        </Spin>
         </div>
    </div>
  )
}
