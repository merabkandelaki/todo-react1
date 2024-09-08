import React, { useState } from 'react';
import { useMutation, useQueryClient, useQuery } from 'react-query';
import { supabase } from '../utils/supabaseInitial';
import { useParams, useNavigate } from 'react-router-dom';
// import './todoForm.css';

const createTodo = async (todo) => {
  const { data, error } = await supabase.from('todos').insert([todo]);
  if (error) throw error;
  return data;
};

const updateTodo = async ({ id, description }) => {
  const { data, error } = await supabase
    .from('todos')
    .update({ description })
    .eq('id', id);
  if (error) throw error;
  return data;
};

const fetchTodo = async (id) => {
  const { data, error } = await supabase
    .from('todos')
    .select('*')
    .eq('id', id)
    .single();
  if (error) throw error;
  return data;
};

function TodoForm() {
  const [description, setDescription] = useState('');
  const { id } = useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  useQuery(['todo', id], () => fetchTodo(id), {
    enabled: !!id,
    onSuccess: (data) => {
      if (data) setDescription(data.description);
    },
  });

  const createMutation = useMutation(createTodo, {
    onSuccess: () => {
      queryClient.invalidateQueries('todos');
      setDescription('');
    },
  });

  const updateMutation = useMutation(updateTodo, {
    onSuccess: () => {
      queryClient.invalidateQueries('todos');
      navigate('/');
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!description.trim()) return;

    if (id) {
      updateMutation.mutate({ id, description: description.trim() });
    } else {
      const newTodo = {
        description: description.trim(),
        complate: false,
        important: false,
        created_at: new Date().toISOString(),
      };
      createMutation.mutate(newTodo);
    }
  };

  return (
    <form
      className="flex items-center p-3 gap-2.5 mx-auto mb-14 bg-white rounded-lg shadow-md overflow-hidden max-w-[570px] md:max-w-[400px] sm:max-w-[300px]"
      onSubmit={handleSubmit}
    >
      <button
        type="submit"
        className="text-black bg-white border-none cursor-pointer"
      >
        {id ? '✓' : '+'}
      </button>
      <input
        type="text"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder={id ? "Edit task" : "Add a task"}
        className="w-full h-6 border-none text-base leading-6 outline-none"
      />
    </form>
  );
}

export default TodoForm;
