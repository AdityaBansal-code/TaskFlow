import React, { useState, useEffect } from 'react';
import {
  Plus,
  Edit2,
  Trash2,
  Search,
  Filter,
  Calendar,
  Clock,
  LayoutDashboard,
  CheckSquare
} from 'lucide-react';
import axiosInstance from '../utils/axiosInstance';
import { DashboardLayout } from '../components/layout/DashboardLayout';
import { Button } from '../components/ui/Button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '../components/ui/Card';
import { Input } from '../components/ui/Input';
import { Badge } from '../components/ui/Badge';

export const Dashboard = ({ onNavigate, currentPage }) => {
  
  const [tasks, setTasks] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    status: 'pending'
  });

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await axiosInstance.get('/tasks');
      setTasks(response.data.data || []);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    } finally {
      setLoading(false);
    }
  };

  const openModal = (task = null) => {
    if (task) {
      setEditingTask(task);
      setFormData({
        title: task.title,
        description: task.description || '',
        status: task.status
      });
    } else {
      setEditingTask(null);
      setFormData({ title: '', description: '', status: 'pending' });
    }
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setEditingTask(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingTask) {
        const response = await axiosInstance.put(`/tasks/${editingTask._id}`, formData);
        setTasks(tasks.map(t => t._id === editingTask._id ? response.data.data : t));
      } else {
        const response = await axiosInstance.post('/tasks', formData);
        setTasks([response.data.data, ...tasks]);
      }
      closeModal();
    } catch (error) {
      console.error('Error saving task:', error);
    }
  };

  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [taskToDelete, setTaskToDelete] = useState(null);

  const handleDelete = (taskId) => {
    setTaskToDelete(taskId);
    setShowDeleteConfirm(true);
  };

  const confirmDelete = async () => {
    if (!taskToDelete) return;
    try {
      await axiosInstance.delete(`/tasks/${taskToDelete}`);
      setTasks(tasks.filter(t => t._id !== taskToDelete));
      setShowDeleteConfirm(false);
      setTaskToDelete(null);
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  const cancelDelete = () => {
    setShowDeleteConfirm(false);
    setTaskToDelete(null);
  };

  const filteredTasks = tasks.filter(task => {
    const matchesSearch = task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (task.description && task.description.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesStatus = statusFilter === 'all' || task.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusVariant = (status) => {
    switch (status) {
      case 'completed': return 'success';
      case 'in-progress': return 'warning';
      default: return 'default';
    }
  };

  return (
    <DashboardLayout onNavigate={onNavigate} currentPage={currentPage}>
      <div className="flex flex-col space-y-8">
        {/* Header Section */}
        <div className="flex flex-col sm:flex-col md:flex-row md:items-center justify-between gap-3 sm:gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight text-balance">Overview</h1>
            <p className="text-slate-500 mt-1 text-sm sm:text-base text-pretty">Manage your active projects and daily tasks.</p>
          </div>
          <Button onClick={() => openModal()} className="w-full sm:w-full md:w-auto">
            <Plus className="mr-2 h-4 w-4" /> Add New Task
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card className="border-none shadow-[2px_2px_0_0_black,inset_0_2px_0_0_white] bg-primary-600 text-white">
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-sm font-semibold text-white">Total Tasks</CardTitle>
              <div className="size-10 rounded-xl bg-white/20 flex items-center justify-center">
                <LayoutDashboard className="size-5 text-white" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold tabular-nums">{tasks.length}</div>
              <p className="text-xs text-white/80 mt-1 text-pretty">Total managed tasks</p>
            </CardContent>
          </Card>
          <Card className="border-none shadow-[2px_2px_0_0_black,inset_0_2px_0_0_white] bg-amber-600 text-white">
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-sm font-semibold text-white">In Progress</CardTitle>
              <div className="size-10 rounded-xl bg-white/20 flex items-center justify-center">
                <Clock className="size-5 text-white" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold tabular-nums">
                {tasks.filter(t => t.status === 'in-progress').length}
              </div>
              <p className="text-xs text-white/80 mt-1 text-pretty">Currently active</p>
            </CardContent>
          </Card>
          <Card className="border-none shadow-[2px_2px_0_0_black,inset_0_2px_0_0_white] bg-green-600 text-white">
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-sm font-semibold text-white">Completed</CardTitle>
              <div className="size-10 rounded-xl bg-white/20 flex items-center justify-center">
                <CheckSquare className="size-5 text-white" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold tabular-nums">
                {tasks.filter(t => t.status === 'completed').length}
              </div>
              <p className="text-xs text-white/80 mt-1 text-pretty">Successfully finished</p>
            </CardContent>
          </Card>
        </div>

        {/* Filters and List */}
        <Card className="border-none shadow-lg bg-white/50 backdrop-blur-sm">
          <div className="p-6 space-y-6">
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
              <div className="relative flex-1 group">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400 group-focus-within:text-primary-600 transition-colors" />
                <input
                  type="text"
                  placeholder="Search tasks..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-11 pr-4 py-3 bg-white border-2 border-slate-200 rounded-xl text-sm focus:ring-4 focus:ring-primary-500/10 focus:border-primary-500 outline-none transition-all shadow-sm"
                />
              </div>
              <div className="flex gap-2">
                <div className="relative flex-1 sm:flex-auto">
                  <Filter className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 pointer-events-none" />
                  <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="w-full pl-10 pr-10 py-3 bg-white border-2 border-slate-200 rounded-xl text-sm font-medium focus:ring-4 focus:ring-primary-500/10 focus:border-primary-500 outline-none transition-all appearance-none cursor-pointer shadow-sm hover:border-slate-300"
                  >
                    <option value="all">All Status</option>
                    <option value="pending">Pending</option>
                    <option value="in-progress">In Progress</option>
                    <option value="completed">Completed</option>
                  </select>
                  <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                    <svg className="h-4 w-4 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              {loading ? (
                <div className="text-center py-20 bg-white rounded-3xl border border-slate-100 italic text-slate-400">
                  Loading your tasks...
                </div>
              ) : filteredTasks.length === 0 ? (
                <div className="text-center py-20 bg-white rounded-3xl border border-slate-100">
                  <p className="text-slate-400">No tasks found. Start by creating one!</p>
                </div>
              ) : (
                filteredTasks.map((task) => (
                  <Card key={task._id} className="group hover:border-primary-300 hover:shadow-md bg-white">
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-3 mb-3">
                            <Badge variant={getStatusVariant(task.status)} dot>
                              {task.status.replace('-', ' ')}
                            </Badge>
                            <span className="text-xs text-slate-400 flex items-center gap-1">
                              <Calendar className="h-3.5 w-3.5" />
                              {new Date(task.createdAt || Date.now()).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                            </span>
                          </div>
                          <h3 className="text-lg font-bold text-slate-900 mb-2 group-hover:text-primary-700 line-clamp-1">
                            {task.title}
                          </h3>
                          <p className="text-slate-600 text-sm line-clamp-2 leading-relaxed text-pretty">
                            {task.description || "No description provided for this task."}
                          </p>
                        </div>
                        <div className="flex items-center gap-1 opacity-0 sm:opacity-0 sm:group-hover:opacity-100 md:opacity-0 md:group-hover:opacity-100 lg:opacity-100 active:opacity-100 touch:opacity-100">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => openModal(task)}
                            className="text-slate-400 hover:text-primary-600 hover:bg-primary-50 active:bg-primary-50 active:text-primary-600 rounded-lg transition-all duration-200"
                            aria-label="Edit task"
                          >
                            <Edit2 className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleDelete(task._id)}
                            className="text-slate-400 hover:text-red-600 hover:bg-red-50 active:bg-red-50 active:text-red-600 rounded-lg transition-all duration-200"
                            aria-label="Delete task"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))
              )}
            </div>
          </div>
        </Card>
      </div>

      {/* Delete Confirmation Dialog */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 md:p-4">
          <div className="absolute inset-0 bg-slate-900/60" onClick={cancelDelete} />
          <div className="w-full max-w-md relative z-10 max-h-[90vh] overflow-y-auto">
            <Card className="shadow-lg border border-slate-200">
              <CardHeader className="bg-slate-50">
                <CardTitle className="text-balance">Delete Task</CardTitle>
                <CardDescription className="text-pretty">
                  This action cannot be undone. This will permanently delete the task.
                </CardDescription>
              </CardHeader>
              <CardFooter className="flex justify-end gap-3 pt-4 border-t border-slate-100 bg-slate-50">
                <Button type="button" variant="secondary" onClick={cancelDelete}>
                  Cancel
                </Button>
                <Button type="button" variant="danger" onClick={confirmDelete}>
                  Delete
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      )}

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 md:p-4">
          <div className="absolute inset-0 bg-slate-900/60" onClick={closeModal} />
          <div className="w-full max-w-lg relative z-10 max-h-[90vh] overflow-y-auto">
            <Card className="shadow-lg border border-slate-200">
              <CardHeader className="bg-slate-50">
                <CardTitle className="text-balance">{editingTask ? 'Edit Task' : 'Create New Task'}</CardTitle>
                <CardDescription className="text-pretty">
                  Fill in the details below to {editingTask ? 'update' : 'organize'} your work.
                </CardDescription>
              </CardHeader>
              <form onSubmit={handleSubmit}>
                <CardContent className="space-y-5 pt-6 p-4 sm:p-6">
                  <Input
                    label="Task Title"
                    placeholder="e.g. Design System Audit"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    required
                  />
                  <div className="space-y-2">
                     <label className="text-sm font-semibold text-slate-700">Description</label>
                     <textarea
                       value={formData.description}
                       onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                       rows="3"
                       placeholder="A brief explanation of what needs to be done..."
                       className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl text-sm focus:ring-4 focus:ring-primary-500/10 focus:border-primary-500 outline-none resize-none"
                     />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-slate-700">Status</label>
                    <select
                      value={formData.status}
                      onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                      className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl text-sm focus:ring-4 focus:ring-primary-500/10 focus:border-primary-500 outline-none"
                    >
                      <option value="pending">Pending</option>
                      <option value="in-progress">In Progress</option>
                      <option value="completed">Completed</option>
                    </select>
                  </div>
                </CardContent>
                <CardFooter className="flex flex-col-reverse sm:flex-row justify-end gap-3 pt-4 border-t border-slate-100 bg-slate-50 p-4 sm:p-6">
                  <Button type="button" variant="secondary" onClick={closeModal} className="w-full sm:w-auto">
                    Cancel
                  </Button>
                  <Button type="submit" variant="primary" className="w-full sm:w-auto">
                    {editingTask ? 'Save Changes' : 'Create Task'}
                  </Button>
                </CardFooter>
              </form>
            </Card>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
};
