import {useSelector} from 'react-redux';
import { useRef, useState, useEffect } from 'react';
import {getDownloadURL, getStorage, ref, uploadBytes, uploadBytesResumable} from 'firebase/storage';
import { app } from '../../firebase';
export default function Profile() {
  const fileRef = useRef(null);
  const {currentUser} = useSelector(state => state.user);
  const [file, setFile] = useState(undefined)
  const [filePer, setFilePer] = useState(0)
  const [fileUploadErr, setFileUploadErr] = useState(null)
  console.log(file)
  //firebase storage
  // allow read;
  // allow write: if
  // request.resource.size < 2 * 1024 * 1024 &&
  // request.resource.contentType.matches('image/.*')
  useEffect(()=>{
    if(file){
      handleFileUpload(file)
    
    }
  },[file])

  const handleFileUpload=(file)=>{
    const storage = getStorage(app)
    const fileName = new Date().getTime() + file.name
    const storageRef = ref(storage, fileName)
    const uploadTask = uploadBytesResumable(storageRef, file)

    uploadTask.on(
      'state_changed',
       (snapshot)=>{
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setFilePer(Math.round(progress))

    }),
    (error)=>{
      setFileUploadErr(error)
    },
    ()=>{
      getDownloadURL(uploadTask.snapshot.ref)
      .then((downloadURL)=>{
    }


  }
  console.log(filePer)
  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className="text-3xl font-semibold my-7 text-center">
        Profile
      </h1>
      <form className='flex flex-col gap-4'>
        <input onChange={(e)=>setFile(e.target.files[0])} 
        type="file" ref={fileRef} hidden accept='image/*'/>
        <img onClick={()=>fileRef.current.click()} 
        className='rounded-full h-24 w-24 object-cover
        cursor-pointer self-center mt-3'
        src={currentUser.avatar} alt="profile"/>
        <input type="text" placeholder='username'
        id="username" className='border p-3 rounded-lg '/>
        <input type="email" placeholder='email'
        id="email" className='border p-3 rounded-lg '/>
        <input type="text" placeholder='password'
        id="password" className='border p-3 rounded-lg '/>
        <button className='bg-slate-700 text-white rounded-lg p-3 
        uppercase hover:opacity-95 disabled:opacity-80'>
          Update
        </button>
      </form>
      <div className='flex justify-between mt-5'>
        <span className='text-red-700 cursor-pointer'>Delete account</span>
        <span className='text-red-700 cursor-pointer'>Sign Out</span>
      </div>
    </div>
  )
}
