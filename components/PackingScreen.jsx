"use client"
import React, { useState,useEffect } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Table, TableHeader, TableHead, TableBody, TableRow, TableCell } from './ui/table';
import { Badge } from './ui/badge';
import { UserRoundIcon, Box, Tag } from 'lucide-react';


const PackingScreen = ({
  orderData,
  onPackItem,
  initialFilter = "",
}) => {
  const [localOrderData, setLocalOrderData] = useState(orderData);
  const [filteredItems, setFilteredItems] = useState(orderData.items);
  const [skuInput, setSkuInput] = useState(initialFilter);

  useEffect(() => {
    setLocalOrderData(orderData);
  }, [orderData]);

  useEffect(() => {
    setSkuInput(initialFilter);

    const itemsToFilter = orderData.items;
    if (!initialFilter) {
      setFilteredItems(itemsToFilter);
    } else {
      setFilteredItems(
        itemsToFilter?.filter(item =>
          item.sku.includes(initialFilter) ||
          item.toteBox.includes(initialFilter)
        )
      );
    }
  }, [orderData, initialFilter]);

  const handleInputChange = (e) => {
    const query = e.target.value;
    setSkuInput(query);

    setFilteredItems(
      !query
        ? localOrderData.items
        : localOrderData.items.filter(item =>
            item.sku.includes(query) ||
            item.toteBox.includes(query)
          )
    );
  };

  const handlePackItem = (sku) => {
    const updated = localOrderData.items.map(item =>
      item.sku === sku ? { ...item, status: "packed" } : item
    );
    setLocalOrderData({ ...localOrderData, items: updated });
    setFilteredItems(updated);
    onPackItem(sku);
  };

  const tableHeader = [
    "SKU No",
    "Tote Box",
    "SKU Description",
    "Quantity",
    "Status",
    "Action",
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-6">

      {/* ----------- Cards ---------*/}
      <div className='pb-5'>
        <h1 className='lg:text-4xl text-2xl font-bold '>Packing</h1>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        <div className="flex items-start p-4 py-6 bg-[#255ece]/15  border border-gray-100 rounded-2xl">
          <div className="flex items-start space-x-3">
            <span className='flex bg-[#255ece] text-white p-3 rounded-lg'>
              <UserRoundIcon className="text-xl" />
            </span>
            <div>
              <h3 className="font-medium md:text-[15px] text-[#255ece]/70">
                Client</h3>
              <p className='font-bold md:text-[16px] '>{localOrderData.client}</p>
            </div>
          </div>
        </div>
        <div className="flex items-start p-4 py-6 bg-[#255ece]/15  border border-gray-100 rounded-2xl">
          <div className="flex items-start space-x-3">
            <span className='flex bg-[#255ece] text-white p-3 rounded-lg'>
              <Tag className="text-xl" />
              </span>
            <div>
              <h3 className="font-medium md:text-[15px] text-[#255ece]/70">
                Order Origin</h3>
              <p className='font-bold md:text-[16px] '>{localOrderData.orderOrigin}</p>
            </div>
          </div>
        </div>

        <div className="flex items-start p-4 py-6 bg-[#255ece]/15  border border-gray-100 rounded-2xl">
          <div className="flex items-start space-x-3">
            <span className='flex bg-[#255ece] text-white p-3 rounded-lg'>
              <Box className="text-xl" />
              </span>
            <div>
              <h3 className="font-medium md:text-[15px] text-[#255ece]/70">
                Order No</h3>
              <p className='font-bold md:text-[16px] '>{localOrderData.orderNumber}</p>
            </div>
          </div>
        </div>
      </div>


      <div className="mb-6">
        <Input
          value={skuInput}
          onChange={handleInputChange}
          placeholder="Scan SKU No and Tote Box"
          className="w-full h-12 p-4 border border-gray-300 rounded-md"
        />
      </div>

      {/* ------------Table ----------------*/}
      <div className="mb-6 relative rounded-lg border border-background/10 overflow-x-auto">
        <Table className="w-full table-auto">
          <TableHeader className="bg-gray-200/65">
            <TableRow>
              {tableHeader.map((header) => (
                <TableHead key={header} className="px-4 py-2 font-semibold text-left">
                  {header}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>

          <TableBody>
            {filteredItems?.map((item) => (
              <TableRow key={item.sku}>
                <TableCell className="px-4 py-2">{item.sku}</TableCell>
                <TableCell className="px-4 py-2">{item.toteBox}</TableCell> 
                <TableCell className="px-4 py-2">{item.description}</TableCell>
                <TableCell className="px-4 py-2">{item.quantity}</TableCell>
                <TableCell className="px-4 py-2">
                  <Badge variant={item.status === 'packed' ? 'success' : 'destructive'}
                    className={item.status === 'packed' ? 'bg-green-500 text-white border-green-500' : ''}
                  >
                    {item.status === 'packed' ? 'Packed' : 'Pending'}
                  </Badge>
                </TableCell>
                <TableCell className="px-4 py-2">
                  <Button
                    onClick={() => handlePackItem(item.sku)}
                    className={`cursor-pointer ${item.status === 'packed' ? 'bg-black/50' : 'bg-[#2361cf]'}
                      text-white w-20 rounded-md`}
                    disabled={item.status === 'packed'}
                  >
                    {item.status === 'packed' ? 'Packed' : 'Pack'}
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default PackingScreen;
