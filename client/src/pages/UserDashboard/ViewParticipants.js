import React,{useState,useEffect} from 'react'
import { Inject } from "@syncfusion/ej2-react-charts";
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
import AdminHeader from '../../components/AdminHeader'
import {participantsGrid} from '../../Data'
import axios from 'axios'
import { useParams } from 'react-router-dom';
const ViewParticipants = () => {
    const [participants,setParticipants]=useState([]);
    const params=useParams();
    const getAllParticipants=async()=>{
        try {
            const {workshopId}=params;
            console.log('workshop id is',workshopId)
            const {data}=await axios.get(`/api/v1/user/getUsersRegisteredDetais/${workshopId}`);
            console.log(data)
            setParticipants(data?.participants)
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(()=>{getAllParticipants()},[])
    return (
        <div>
<div className="m-2 md:m-10 p-2 md:p-10 bg-white rounded-3xl">
                <AdminHeader category={'page'} title={'participants Information'}/>
                <GridComponent
                    id="gridComp"
                    //   dataSource={ordersData}
                    dataSource={participants}
                    allowPaging
                    allowSorting
                >
                    <ColumnsDirective>
                        {participantsGrid.map((item, index) => (
                            <ColumnDirective key={index} {...item} />
                        ))}
                    </ColumnsDirective>
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
    )
}

export default ViewParticipants
