const userModel = require('../models/userModel')
const workshopModel = require('../models/workshopPostModel')
// const getAllUsers = async (req, res) => {
//     try {
//         const data = await userModel.find({});
//         console.log('all users are', data);
//         const modifiedData=data.map((item,index)=>{
//            return{
//             ...item._doc,postLength:item.post.length
//            }
//         })
//         if (data) {
//             return res.status(200).send({
//                 success: true,
//                 data:modifiedData
//             })
//         }
//     } catch (error) {
//         console.log(error);
//         return res.status(500).send({
//             success: false,
//             message: 'error while finding all users'
//         })
//     }
// }

// below is the different way of getting all the users
const getAllUsers=async(req,res)=>{
    try {
        const data=await userModel.aggregate([{
            $project:{
                _id:1,
                name:1,
                email:1,
                phone:1,
                postLength:{$size:"$post"}
            }
        }])
        if (data) {
            return res.status(200).send({
                success: true,
                data,
            });
        }
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            success: false,
            message: 'Error while finding all users',
        });
    }
}

// below is the controller for admin status check
const getAdminPost = async () => {
    try {
        const allWorkshop = await workshopModel.find({}).select('-photo');
        const allPostDetails = allPost.map(item => ({
            _id: item?._id,
            name: item?.name,
            organizerName: item?.organizerName,
            address: item?.address,
            date: item?.date,
            status: item?.approvedStatus == 0 ? 'Not approved' : 'approved'
        }))
        res.send(allWorkshop)
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: 'Something went wrong in getting post status controller',
            error
        });
    }
}
const approveStatusController = async (req, res) => {
    try {
        const { id } = req.params;
        const workshop = await workshopModel.findById(id).select('-photo')
        workshop.approved = 1;
        await workshop.save();
        res.status(201).send({
            success: true,
            message: 'workshop approved successfully'
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: 'Something went wrong in getting post status controller',
            error
        });
    }
}
const disApproveStatusController = async (req, res) => {
    try {
        const { id } = req.params;
        const workshop = await workshopModel.findById(id).select('-photo')
        workshop.approved = 0;
        await workshop.save();
        res.status(201).send({
            success: true,
            message: 'workshop disapproved successfully'
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: 'Something went wrong in getting post status controller',
            error
        });
    }
}

// below is the controller for getting all the details

module.exports = { getAllUsers, getAdminPost, approveStatusController, disApproveStatusController }