import React, { useEffect, useState } from 'react'
import AdminContentWrapper from '../../components/AdminContentWrapper'
import axios from 'axios'
import toast from 'react-hot-toast'
import {
  GridComponent,
  ColumnsDirective,
  ColumnDirective,
  Resize,
  Sort,
  ContextMenu,
  Filter,
  Page,
  ExcelExport,
  PdfExport,
  Edit,
} from "@syncfusion/ej2-react-grids";
import { Inject } from "@syncfusion/ej2-react-charts";
import { WorkshopStatus, WorkshopStatusGrid } from '../../Data'
import AdminHeader from '../../components/AdminHeader';
import { useDashboardContext } from '../../context/dashboardContextProvider';
const AdminDashboard = () => {
  // below is the fuction fior making the axios request for getting all the workshop
  const [workshopData, setWorkshopData] = useState([])
  // below is the function for making the axios call for getting all the workshops\
  const { activeSidebar } = useDashboardContext()
  const getAllWorkshopks = async () => {
    try {
      const { data } = await axios.get('/api/v1/user/getAllWorkshopPost')
      setWorkshopData(data?.modifiedPosts)
      console.log(data?.modifiedPosts)
      toast.success(data?.message)
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => { getAllWorkshopks() }, [])
  return (
    <>
      <AdminContentWrapper>
        <div className='mt-20'>
          <AdminHeader category='Page' title='workshop Allowance' />
          <div className='mt-10 m-2 md:mt-10 p-2 md:p-5 bg-white rounded-3xl'>
            <GridComponent id='gridComp' dataSource={workshopData} allowTextWrap={true} // Enable text wrapping globally
              textWrapSettings={{ wrapMode: 'Content' }}
              allowPaging
              allowSorting>
              <ColumnsDirective>{
                WorkshopStatusGrid?.map((item, index) => (
                  <ColumnDirective key={index} {...item} />
                ))
              }</ColumnsDirective>
              <Inject
                services={[
                  Resize,
                  Sort,
                  ContextMenu,
                  Filter,
                  Page,
                  ExcelExport,
                  Edit,
                  PdfExport,
                ]}
              />
            </GridComponent>
          </div>
        </div>
      </AdminContentWrapper>
    </>
  )
}

export default AdminDashboard
