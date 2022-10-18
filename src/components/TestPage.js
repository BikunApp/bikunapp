import { useEffect, useState } from 'react';
import io from 'socket.io-client';

const socket = io('http://localhost:4000', {
    withCredentials: true
});

const TestPage = () => {

    const [theSocketMessage, setTheSocketMessage] = useState("");

    // connection with server
    socket.on('connect', (test) => {

        console.log('Connected to Server', socket.id)

    });

    socket.on('broadcast', (message) => {
        setTheSocketMessage(message.description);
    });


    socket.on('disconnect', function () {
        console.log('Disconnect from server')
    });


    return (
        <>
            <div>
                {theSocketMessage}
            </div>





        </>
    );
};

export default TestPage;
