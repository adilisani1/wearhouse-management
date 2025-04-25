"use client";
import React, { useState, useEffect, Suspense } from "react";
import PackingScreen from "@/components/PackingScreen";
import Sidebar from "@/components/sidebar/Sidebar";
import { useSearchParams } from 'next/navigation';
import Loading from "@/components/Loading";

const PackingPage = () => {
  const params = useSearchParams();
  const filterFromUrl = params.get('filter') || "";
  const [orderData, setOrderData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const storedOrderData = localStorage.getItem("orderData");
      if (storedOrderData) {
        setOrderData(JSON.parse(storedOrderData));
      } else {
        const response = await fetch("/data.json");
        const data = await response.json();
        setOrderData(data);
        localStorage.setItem("orderData", JSON.stringify(data));
      }
    };
    fetchData();
  }, []);

  const handlePackItem = (sku) => {
    if (orderData) {
      const updatedItems = orderData.items.map((item) =>
        item.sku === sku ? { ...item, status: "packed" } : item
      );

      const updatedOrderData = { ...orderData, items: updatedItems };
      setOrderData(updatedOrderData);

      localStorage.setItem("orderData", JSON.stringify(updatedOrderData));

      const packedCount = updatedItems.filter(item => item.status === "packed")?.length;
      localStorage.setItem("packedItemsCount", packedCount.toString())
    }
  };

  if (!orderData) return null;

  return (
    <div className="min-h-screen flex">
      <div className="w-[14%] md:w-[8%] lg:w-[16%] xl:w-[14%]">
        <Sidebar />
      </div>
      <div className="w-[86%] md:w-[92%] lg:w-[84%] xl:w-[86%] bg-blue-50">
        {orderData &&
          <Suspense fallback={<Loading />}>

            <PackingScreen
              orderData={orderData}
              initialFilter={filterFromUrl}
              onPackItem={handlePackItem} />
          </Suspense>
        }
      </div>
    </div>
  );
};

export default PackingPage;
