import { IconButton } from '@mui/material'
import { FaArrowLeft } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom';

function BackButton() {
    const navigate = useNavigate();

    function handleBackClick () {
        navigate(-1);
    }
    return (
        <>
            <button onClick={handleBackClick} className='p-3 rounded-full text-[20px] dark:hover:bg-slate-800 hover:bg-slate-200' title="to back">
                <FaArrowLeft />
            </button>
        </>
    )
}

export default BackButton