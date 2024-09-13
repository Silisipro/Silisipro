
import React, { Suspense } from 'react';
import "./Content.css";
import ContentTop from '../../components/ContentTop/ContentTop';
import ContentMain from '../../components/ContentMain/ContentMain';
import Sidebar from '../Sidebar/Sidebar';
 import '../../App.css'

export const AppLayout = ({ children }) => {


  return (
      <>
        <Sidebar />
      <div className='main-content'>
      <ContentTop />
      <Suspense fallback={<div>Loading...</div>}>
          {children}
      </Suspense>
  
      {/* <ContentMain /> */}
    </div>
          

      </>
  )
}


export default (React.memo(AppLayout));