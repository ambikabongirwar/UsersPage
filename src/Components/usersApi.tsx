import React from 'react'
import axios from 'axios'

export const api = axios.create({
    baseURL: "http://localhost:4000/",
});

export const getUsers = () => api.get('/users').then(res => res.data);

export const getUser = (id: number) => api.get(`/users/${id}`).then((res) => res.data);

export const updateUser = ({id, ...updateUser}: any) => api.put(`/users/${id}`, updateUser).then((res) => res.data);
