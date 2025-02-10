import React, { useContext, useEffect, useState } from 'react'
import toast from 'react-hot-toast';
import { UserData } from '../context/UserContext';
import axios from 'axios';

const CreateProduct = () => {
    const { user } = UserData();
    // below are the usestates
    const [workshopAgenda, setWorkshopAgenda] = useState("");
    const username = user?.name
    const [organizerName, setOrganizerName] = useState(username);
    const [photo, setPhoto] = useState("");
    const [date, setDate] = useState('')
    const [address, setAddress] = useState('')
    const [description, setDescription] = useState('')
    const [RegisterationAllowed, setRegsitrationAllowed] = useState(Number)
    const handleCreate = async (e) => {
        e.preventDefault();
        try {
            // console.log('date', date)
            // console.log('date', workshopAgenda)
            // console.log('date', address)
            // console.log('date', organizerName)
            // console.log('date', photo)
            const postData = new FormData();
            postData.append('name', workshopAgenda);
            postData.append('organizerName', organizerName);
            postData.append('date', date);
            postData.append('address', address);
            postData.append('description', description);
            postData.append('photo', photo);
            postData.append('participantsNumber', RegisterationAllowed);
            // const { data } = await axios.post('/api/v1/user/createWorkshopPost/:userId')'
            console.log('user is', user)
            const { data } = await axios.post(`/api/v1/user/createWorkshopPost/${user?._id}`, postData);
            if (data?.success) {
                toast.success(data?.message);
            }
        } catch (error) {
            console.log(error)
            toast.error('something went wrong')
        }
    }

    useEffect(() => {
        setOrganizerName(user?.name || '');
    }, [user]);
    return (
        <><div className='max-w-4xl mx-auto mt-12'>
            <div className='text-center mt-6 text-4xl justify-center font-semibold text-[#FAA845] font-roboto'>
                You can create your workshop session
                <p className='text-center mt-4 text-lg text-gray-500 font-poppins'>
                    Empowering women means creating safer spaces for them to thrive and lead. Together, we can build a world where every woman feels protected, valued, and heard.
                </p>
            </div>
        </div>
            <form className="grid md:grid-cols-2 gap-3 max-w-4xl mx-auto mt-12 px-4 md:px-0" onSubmit={handleCreate}>
                {/* Workshop Agenda */}
                <div>
                    <input
                        type="text"
                        name="WorkshopName"
                        required
                        aria-label="Workshop Agenda"
                        className="peer border-2 border-muted-medium py-4 px-4 rounded-xl placeholder:text-default focus:border-primary  outline-none w-full ring-2 ring-yellow-400 invalid:ring-2 invalid:ring-red-400 cursor-pointer select-none"
                        placeholder="Workshop Agenda"
                        value={workshopAgenda}
                        onChange={(e) => setWorkshopAgenda(e.target.value)}
                    />
                    <p className="mt-2 hidden peer-invalid:block text-red-400 text-sm">Please provide your workshop agenda.</p>
                </div>

                {/* Organizer Name */}
                <div>
                    <input
                        type="text"
                        name="OrganizerName"
                        required
                        aria-label="Organizer Name"
                        className="peer border-2 border-muted-medium py-4 px-4 rounded-xl placeholder:text-default focus:border-primary  outline-none w-full ring-2 ring-yellow-400 invalid:ring-2 invalid:ring-red-400 cursor-pointer select-none"
                        placeholder="Organizer Name*"
                        value={organizerName}
                        // onChange={(e) => setOrganizerName(e.target.value)}
                        disabled
                    />
                    <p className="mt-2 hidden peer-invalid:block text-red-400 text-sm">Organizer name is required.</p>
                </div>

                {/* Complete Address */}
                <div className="md:col-span-2">
                    <p className="mt-2 hidden peer-invalid:block invalid:text-red-400  text-sm">Post image</p>
                    <div className={`peer border-2 py-14 px-6 rounded-xl placeholder:text-default focus:border-primary outline-none w-full  ${!photo ? 'ring-red-400 ring-2' : 'ring-2 ring-yellow-400'} flex justify-center`}>
                        <div className="text-center">
                            {!photo && <svg className="mx-auto h-12 w-12 text-gray-300" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                                <path fillRule="evenodd" d="M1.5 6a2.25 2.25 0 012.25-2.25h16.5A2.25 2.25 0 0122.5 6v12a2.25 2.25 0 01-2.25 2.25H3.75A2.25 2.25 0 011.5 18V6zM3 16.06V18c0 .414.336.75.75.75h16.5A.75.75 0 0021 18v-1.94l-2.69-2.689a1.5 1.5 0 00-2.12 0l-.88.879.97.97a.75.75 0 11-1.06 1.06l-5.16-5.159a1.5 1.5 0 00-2.12 0L3 16.061zm10.125-7.81a1.125 1.125 0 112.25 0 1.125 1.125 0 01-2.25 0z" clipRule="evenodd" />
                            </svg>}
                            <div className="mt-4 flex text-sm leading-6 text-gray-600">
                                <label htmlFor="file-upload" className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500">
                                    {!photo && <span>Upload a file</span>}
                                    <input id="file-upload" name="file-upload" type="file" className="sr-only" accept='image/*' onChange={(e) => setPhoto(e.target.files[0])} />
                                    {photo && <img src={URL.createObjectURL(photo)} alt="post_photo" className='img img-responsive rounded-xl' style={{ height: '300px' }} />}
                                </label>
                                {!photo && <p className="pl-1">or drag and drop</p>}
                            </div>
                            {!photo && <p className="text-xs leading-5 text-gray-600">PNG, JPG, GIF up to 10MB</p>}
                        </div>
                    </div>

                </div>


                {/* Image URL */}
                <div className="md:col-span-2">
                    <textarea
                        name="Address"
                        required
                        aria-label="Image URL"
                        className="peer border-2 border-muted-medium py-6 px-6 rounded-xl placeholder:text-default focus:border-primary  outline-none w-full ring-2 ring-yellow-400 invalid:ring-2 invalid:ring-red-400  cursor-pointer select-none"
                        placeholder="Complete Address"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}></textarea>
                    <p className="mt-2 hidden peer-invalid:block text-red-400 text-sm">Complete Address</p>
                </div>

                <div className="md:col-span-2">
                    <textarea
                        name="Address"
                        required
                        aria-label="Image URL"
                        className="peer border-2 border-muted-medium py-6 px-6 rounded-xl placeholder:text-default focus:border-primary  outline-none w-full ring-2 ring-yellow-400 invalid:ring-2 invalid:ring-red-400  cursor-pointer select-none"
                        placeholder="Enter Description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}></textarea>
                    <p className="mt-2 hidden peer-invalid:block text-red-400 text-sm">Enter description</p>
                </div>

                {/* Date */}
                <div>
                    <input
                        type="date"
                        name="date"
                        required
                        aria-label="Event Date"
                        className="peer border-2 border-muted-medium py-4 px-6 rounded-xl placeholder:text-default focus:border-primary  outline-none w-full ring-2 ring-yellow-400   invalid:ring-2 invalid:ring-red-400  cursor-pointer select-none"
                        placeholder="Event Date"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                    />
                    <p className="mt-2 hidden peer-invalid:block text-red-400 text-sm">Please provide a valid date.</p>
                </div>
                <div>
                    <input

                        name="participantsNumber"
                        required
                        aria-label="Event Date"
                        className="peer border-2 border-muted-medium py-4 px-6 rounded-xl placeholder:text-default focus:border-primary  outline-none w-full ring-2 ring-yellow-400   invalid:ring-2 invalid:ring-red-400  cursor-pointer select-none"
                        placeholder="Total Participants allowed"
                        value={RegisterationAllowed}
                        onChange={(e) => setRegsitrationAllowed(e.target.value)}
                    />
                    <p className="mt-2 hidden peer-invalid:block text-red-400 text-sm">Please provide Number of participants.</p>
                </div>

                {/* Submit Button */}
                <div className="md:col-span-1">
                    <button
                        type="submit"
                        className="bg-[#FAA845] hover:bg-[#20B486] text-lg font-medium rounded-lg py-4 px-14 text-white transition hover:bg-primary-strong  w-full">
                        Submit Now
                    </button>
                </div>
            </form >
        </>
    )
}

export default CreateProduct
