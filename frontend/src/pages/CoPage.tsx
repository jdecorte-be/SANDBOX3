import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Gaming } from '../components/Canvas';
import HomePage from './All';

export var game = new Gaming(1000, 1000);

function CoPage(){
    game.socketInit();
    const navigate = useNavigate();

    return (
        <div>
            <HomePage/>
        </div>
    );
}

export default CoPage;
