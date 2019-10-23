import React from 'react';
import ReactDOM from 'react-dom';

import NavRouter from './components/nav_router';


require('dotenv').config()

ReactDOM.render(<NavRouter />, document.getElementById('root'));
//serviceWorker.unregister();
