"use client";
import Sidebar from '@/components/sidebar/Sidebar'
import React, { useState, useEffect, Suspense } from 'react'
import DashboardScreen from '@/components/DashboardScreen'
import { useRouter } from 'next/navigation';
import Loading from '@/components/Loading';

 const Dashboard = () => {
   const router = useRouter();
   
   const [orderData, setOrderData] = useState([]);
   useEffect(() => {
     const fetchData = async () => {
       const response = await fetch("/data.json");
       const data = await response.json();
       setOrderData(data);
     };
     fetchData();
   }, []);


   const handleSearch = (q) => {
    const encoded = encodeURIComponent(q.trim());
    router.push(`/admin/packing?filter=${encoded}`);
   };

   return (
     <div className="min-h-screen flex">
       <div className="w-[14%] md:w-[8%] lg:w-[16%] xl:w-[14%]">
         <Sidebar />
       </div>
       <div className="w-[86%] md:w-[92%] lg:w-[84%] xl:w-[86%] bg-blue-50">
         <Suspense fallback={<Loading />}>
           {orderData && (
             <DashboardScreen
               orderData={orderData}
               onSearch={handleSearch}
             />
           )}
         </Suspense>
       </div>
     </div>
   );
 };

 export default Dashboard;
