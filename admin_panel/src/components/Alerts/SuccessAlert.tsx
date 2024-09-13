import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store';
import { hideMessage } from '../../store/activeMessageSlice';
import { IoIosCheckmarkCircleOutline } from "react-icons/io";

interface typeSuccessAlert {
    text: string | null,
}

function SuccessAlert({ text = null }: typeSuccessAlert) {
    const dispatch = useDispatch();
    const isActive = useSelector((state: RootState) => state.activeMessage.isActive);
    const message = useSelector((state: RootState) => state.activeMessage.message);

    useEffect(() => {
        if (isActive) {
            const timer = setTimeout(() => {
                dispatch(hideMessage())
            }, 3000);

            return () => clearTimeout(timer);
        }
    }, [isActive, dispatch])
    return (
        <div className={`fixed bottom-2 right-1 z-[1000] transition-transform duration-50 ease-in-out shadow-5 ${isActive ? "translate-x-0 opacity-1" : "translate-x-full opacity-0"}`}>
            <div className="flex items-center gap-2 bg-green-700 text-white px-4 py-2 rounded">
                <span className='text-green-200'><IoIosCheckmarkCircleOutline/></span> {message || "Success!" || text}
            </div>
        </div>
    )
}

export default SuccessAlert