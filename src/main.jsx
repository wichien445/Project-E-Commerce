import React from 'react'
import ReactDOM from 'react-dom/client'
import MyRoute from './MyRoute'
// เรียก Bottstrap มาใข้งาน
//import 'bootstrap/dist/css/bootstrap.min.css'

// เรียก Tailwind CSS มาใข้งาน
import './index.css'

//Redux
import { Provider } from "react-redux";
import { createStore } from 'redux'
import { composeWithDevTools } from "redux-devtools-extension";
import rootReducer from './store/store';

const store = createStore(rootReducer, composeWithDevTools());

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
      <MyRoute />
  </Provider>
)
