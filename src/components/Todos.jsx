import React, { useState, useCallback } from "react";
import { useQuery, useQueryClient } from "react-query";
import { supabase } from "../utils/supabaseInitial";
// import "./todos.css";
import TodoCard from "./TodoCard";
import TodoForm from "./TodoForm";
import Header from "./Header";
import Sidebar from './Sidebar';

const fetchTodos = async () => {
  const { data, error } = await supabase.from("todos").select("*");
  if (error) throw error;
  console.log(data);
  return data;
};

function Todos() {
  const queryClient = useQueryClient();
  const { data: todos, isLoading, isError } = useQuery("todos", fetchTodos);

  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const onUpdate = useCallback(() => {
    queryClient.invalidateQueries("todos");
  }, [queryClient]);

  const handleFilterChange = useCallback((newFilter) => {
    setFilter(newFilter);
  }, []);

  const handleSearchChange = useCallback((newSearchTerm) => {
    setSearchTerm(newSearchTerm);
  }, []);

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error loading todos.</p>;

  const filteredTodos = todos.filter((todo) => {
    const matchesFilter =
      filter === 'all' ||
      (filter === 'important' && todo.important) ||
      (filter === 'completed' && todo.complate);

    const matchesSearch = todo.description
      .toLowerCase()
      .includes(searchTerm.toLowerCase());

    return matchesFilter && matchesSearch;
  });

  return (
    <div className="flex flex-col lg:flex-row lg:justify-between lg:overflow-x-hidden">
      <div className="lg:w-1/4 w-full">
        <Sidebar onFilterChange={handleFilterChange} />
      </div>
      <div className="lg:w-3/4 w-full p-4">
        <Header searchTerm={searchTerm} onSearchChange={handleSearchChange} />
        <TodoForm onUpdate={onUpdate} />
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {filteredTodos.map((todo) => (
            <TodoCard todo={todo} key={todo.id} onUpdate={onUpdate} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Todos;
