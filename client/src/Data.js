import axios from 'axios'
import toast from 'react-hot-toast'
// this is the data componenet
export const Links = [
    {
        title: 'Pages',
        links: [
            {
                name: ' workshop approvance',
                linkto: 'admin/dashboard'
            },
            {
                name: 'All Users',
                linkto: 'admin/allusers'
            },
            {
                name: "Job Posting",
                linkto: "admin/job",
              },

        ]
    }
]
// below is approve function
const approve = async (id) => {
    try {
        // console.log(id)
        const { data } = await axios.put(`/api/v1/admin/approveStatus/${id}`)
        if (data?.success) {
            toast.success(data?.message)
            window.location.reload()
        }
    } catch (error) {
        console.log(error)
    }
}
// below is disapprove function
const Disapprove = async (id) => {
    try {
        const { data } = await axios.put(`/api/v1/admin/disapproveStatus/${id}`)
        if (data?.success) {
            toast.success(data?.message)
            window.location.reload()
        }
    } catch (error) {
        console.log(error)
    }
}
// below is the function which will represent the action template for the image
export const gridOrderImage = (props) => {
    return (
        <div>
            <img className="rounded-xl h-20" src={`/api/v1/user/postPhoto/${props._id}`} alt="workshop-item" />
        </div>
    );
};
// below is the function for action template
const actionTemplate = (props) => {
    return (
        <div className="flex gap-2">
            <button type="button" style={{ backgroundColor: 'green' }} className="text-white py-1 px-2 capitalize rounded-xl mr-2" onClick={() => approve(props?._id)}>
                Approve
            </button>
            <button type="button" style={{ backgroundColor: 'red' }} className="text-white py-1 px-2 capitalize rounded-xl mr-2" onClick={() => Disapprove(props?._id)}>
                Disapprove
            </button>
        </div>
    )

}

// below we are creating the data format for getting all the workshops which has to be shown allowance in the table
export const WorkshopStatusGrid = [
    {
        field: 'image',
        header: 'Image',
        template: gridOrderImage,
        textAlign: 'start',
        width: '120'
    },
    {
        field: 'name',
        headerText: 'Agenda',
        textAlign: 'start',
        width: '120'
    },
    {
        field: 'organizerName',
        headerText: 'Organizer',
        textAlign: 'start',
        width: '100'
    },
    {
        field: 'address',
        headerText: 'Location',
        textAlign: 'start',
        width: '120',
        customAttributes: { class: 'wrap-text' },
    },
    {
        field: 'date',
        headerText: 'date',
        textAlign: 'start',
        width: '120',
    },
    {
        field: 'approvedStatus',
        headerText: 'Status',
        textAlign: 'Start',
        width: '120'
    },
    {
        field: 'Action',
        headerText: 'Action',
        template: actionTemplate,
        textAlign: 'Start',
        width: '180',
    }
]
// below we are creating the table format for the user registersd in the participants
export const participantsGrid=[
    {
        field:'name',
        headerText:'Name',
        textAlign:'start',
        width:'120'
    },
    {
        field:'email',
        headerText:'Email',
        textAlign:'start',
        width:'240'
    },
    {
        field:'phone',
        headerText:'Phone',
        textAlign:'start',
        width:'240'
    },
    
]
// below is the grid for the users
export const usersGrid=[
    {
        field:'name',
        headerText:'Name',
        textAlign:'start',
        width:'120'
    },
    {
        field:'email',
        headerText:'Email',
        textAlign:'start',
        width:'240'
    },
    {
        field:'phone',
        headerText:'Phone',
        textAlign:'start',
        width:'240'
    },
    {
        field:'postLength',
        headertext:'Post',
        textAlign:'start',
        width:'120'
    }
]