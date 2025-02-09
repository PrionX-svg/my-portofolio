"use client";

import React, { useEffect, useState } from 'react'
import { NextPage } from 'next';
// import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { List } from '@/types';
import TodoList from './TodoList';
// import { add } from 'date-fns';


interface HomePageProps {
  lists: List[]
}

// Fetching data from the API 
const filterData = async (page: number) => {
  const res = await fetch(`http://127.0.0.1:8000/lists?page=${page}`)
  const data = await res.json()

  return data;
}

const filterButton = async (flag: string) => {
  const res = await fetch(`http://127.0.0.1:8000/filter/lists?flag=${flag}`)
  const data = await res.json()

  return data;
}

const HomePage: NextPage<HomePageProps> = () => {
  const router = useRouter();
  // Initialize useState for flag and data
  const [flag, setFlag] = useState<string>();
  const [data, setData] = useState([]);
  const [total, setTotal] = useState(0);
  const [limit, setLimit] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

  // useEffect to fetch data from the API
  useEffect(() => {
    filterData(currentPage).then((data) => {
      setData(data.lists);
      setTotal(data.pagination.total);
      setLimit(data.pagination.limit);
    })
  }, [currentPage])

  useEffect(() => {
    if (flag === "true" || flag === "false") {
      filterButton(flag).then((data) => {
        setData(data.lists);
        setTotal(data.pagination.total);
        setLimit(data.pagination.limit);

      })
    } else if (flag === "all") {
      filterData(currentPage).then((data) => {
        setData(data.lists);
        setTotal(data.pagination.total);
        setLimit(data.pagination.limit);
      })
    }
  }, [flag])

  const handleNextPage = () => {
    if (currentPage * limit < total) setCurrentPage((prev) => prev + 1);
  }

  const handlePreviousPage = () => {
    if (currentPage > 1) setCurrentPage((prev) => prev - 1);
  }

  return (
    <div className="container mx-auto p-20">
      {/* <Home /> */}

      {/* Title */}
      <h1 className="text-3xl font-bold text-center">Todo List</h1>
      {/* Upper Button */}
      <div className="flex justify-end mt-6">
        <div className="flex items-center gap-2">
          {/* Add Button */}
          <Button variant={"outline"} onClick={() => router.push('/create')}>
            <Plus />
          </Button>
          {/* Select Button */}
          <Select onValueChange={(value) => setFlag(value)}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select a status" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Status</SelectLabel>
                <SelectItem value="all">All Lists</SelectItem>
                <SelectItem value="true">Complete</SelectItem>
                <SelectItem value="false">Incomplete</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </div>
      {/* Displaying TodoList table & data*/}
      <TodoList lists={data} pagination={{
        total: total,
        page: currentPage,
        limit: limit
      }} onNextPage={handleNextPage}
        onPreviousPage={handlePreviousPage} />
      {/* ^ handling next and previous page */}


    </div>
  )
}

export default HomePage;