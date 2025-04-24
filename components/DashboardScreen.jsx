"use client";
import React, { useEffect, useState } from 'react';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { ScanBarcode, Package, Box } from 'lucide-react';

const DashboardScreen = ({ orderData, onSearch }) => {
  const [query, setQuery] = useState('');

  const skuCount = orderData?.items?.length;
  const toteBoxCount = new Set(orderData?.items?.map(item => item.toteBox)).size;
  const [packedItemsCount, setPackedItemsCount] = useState(orderData?.items?.filter(item => item.status === "packed")?.length);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedPackedItemsCount = parseInt(localStorage.getItem("packedItemsCount") || "0");
      setPackedItemsCount(storedPackedItemsCount);
    }
  }, []); 

  const handleSearchClick = () => {
    onSearch(query.trim());
  };

 
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Header */}
      <div className="pb-5">
        <h1 className="lg:text-4xl text-2xl font-bold">Dashboard</h1>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        <div className="flex items-start p-4 py-6 bg-[#255ece]/15 border border-gray-100 rounded-2xl">
          <div className="flex items-start space-x-3">
            <span className="flex bg-[#255ece] text-white p-3 rounded-lg">
              <ScanBarcode className="text-xl" />
            </span>
            <div>
              <h3 className="font-medium md:text-[15px] text-[#255ece]/70">SKU Count</h3>
              <p className="font-bold md:text-[16px]">{skuCount}</p>
            </div>
          </div>
        </div>

        <div className="flex items-start p-4 py-6 bg-[#255ece]/15 border border-gray-100 rounded-2xl">
          <div className="flex items-start space-x-3">
            <span className="flex bg-[#255ece] text-white p-3 rounded-lg">
              <Package className="text-xl" />
            </span>
            <div>
              <h3 className="font-medium md:text-[15px] text-[#255ece]/70">Totebox Count</h3>
              <p className="font-bold md:text-[16px]">{toteBoxCount}</p>
            </div>
          </div>
        </div>

        <div className="flex items-start p-4 py-6 bg-[#255ece]/15 border border-gray-100 rounded-2xl">
          <div className="flex items-start space-x-3">
            <span className="flex bg-[#255ece] text-white p-3 rounded-lg">
              <Box className="text-xl" />
            </span>
            <div>
              <h3 className="font-medium md:text-[15px] text-[#255ece]/70">Packed Items</h3>
              <p className="font-bold md:text-[16px]">{packedItemsCount}</p>
            </div>
          </div>
        </div>
      </div>

      <div className='flex-col justify-center items-center flex place-items-center mx-auto lg:pt-50'>
        <h1 className='py-4 font-bold lg:text-lg text-sm text-center'>Scan a Sku number or Totebox number to start packing</h1>
      <div className="mb-6 flex space-x-2 justify-center items-center mx-auto  flex-wrap">
        <Input
          value={query}
          onChange={e => setQuery(e.target.value)}
          placeholder="Scan SKU Number or Tote Box Number"
          className="flex-1 h-12 p-4 border border-gray-300 rounded-md lg:w-75 w-auto lg:placeholder:text-md placeholder:text-xs"
        />
        <Button onClick={handleSearchClick} className="h-12 cursor-pointer bg-[#2361cf]">
          Search
        </Button>
      </div>
      </div>
    </div>
  );
};

export default DashboardScreen;
