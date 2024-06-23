"use client"
import React, { useState } from 'react';
import {Icon} from "@iconify/react"
import { ToastContainer, toast } from 'react-toastify';

const MessageComp = ({ message }:{
    message: any
}) => {
    const [showTooltip, setShowTooltip] = useState(false);
    const notify = () => toast("Copied to clipboard");

    const handleCopy = () => {
        navigator.clipboard.writeText(message.text)
            .then(() => {
                console.log('Text copied to clipboard');
            })
            .catch(err => {
                console.error('Failed to copy text: ', err);
            });
            notify()
    };

    return (
        <div
            onClick={handleCopy}
            onMouseEnter={() => setShowTooltip(true)}
            onMouseLeave={() => setShowTooltip(false)}
            className={`relative p-3 m-2 w-fit rounded text-white cursor-pointer ${message.type === 'USER' ? 'bg-green-500 ml-auto hover:bg-green-600' : 'bg-blue-500 hover:bg-blue-600 mr-auto'
                }`}
        >

            <p className={` ${message.type === 'USER' ? 'text-right' : 'text-left'}`}>{message.text}
            {showTooltip && (
                <div className="absolute bottom-0 right-0 text-white text-xs rounded p-1">
                    <Icon icon="iconamoon:copy" />
                </div>
            )}
            </p>

            {/* <ToastContainer/> */}
        </div>
    );
};

export default MessageComp;
