import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { User, Mail, Shield, Save, AlertCircle, CheckSquare } from 'lucide-react';
import { DashboardLayout } from '../components/layout/DashboardLayout';
import { Button } from '../components/ui/Button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '../components/ui/Card';
import { Input } from '../components/ui/Input';
import { Label } from '../components/ui/Label';
import useAuthStore from '../store/authStore';
import axiosInstance from '../utils/axiosInstance';

const profileSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().min(1, 'Email is required').regex(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, 'Please enter a valid email address'),
});

export const Profile = ({ onNavigate, currentPage }) => {
  const { user } = useAuthStore();
  const [isLoading, setIsLoading] = useState(false);

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: user?.name || '',
      email: user?.email || '',
    }
  });

  const onSubmit = async (data) => {
    setIsLoading(true);
    try {
      await axiosInstance.put('/auth/profile', data);
      // In a real app with store sync:
      // login(user.token, response.data.user);
      alert('Profile updated successfully');
    } catch (error) {
      console.error('Update failed', error);
      alert(error.response?.data?.message || 'Failed to update profile');
    } finally {
      setIsLoading(false);
    }
  };


  return (
    <DashboardLayout onNavigate={onNavigate} currentPage={currentPage}>
      <div className="max-w-4xl mx-auto space-y-8">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Account Settings</h1>
          <p className="text-slate-500 mt-1">Manage your public profile and account security.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Sidebar Info */}
          <div className="space-y-4">
            <Card className="bg-gradient-to-br from-primary-600 to-primary-700 border-none text-white overflow-hidden relative shadow-xl">
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16" />
              <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/5 rounded-full -ml-12 -mb-12" />
              <CardContent className="p-6 relative z-10">
                <div className="h-20 w-20 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center mb-4 ring-4 ring-white/20">
                  <User className="h-10 w-10 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-2">{user?.name || 'User'}</h3>
                <p className="text-primary-100 text-sm leading-relaxed mb-4">
                  {user?.email || 'email@example.com'}
                </p>
                <div className="flex items-center gap-2 text-xs text-primary-100">
                  <Shield className="h-4 w-4" />
                  <span>Account is secure and verified</span>
                </div>
              </CardContent>
            </Card>
            
            <Card className="border-2 border-primary-100 bg-gradient-to-br from-primary-50 to-white">
              <CardContent className="p-6">
                <h4 className="font-semibold text-slate-900 mb-3 flex items-center gap-2">
                  <div className="h-8 w-8 rounded-lg bg-primary-100 flex items-center justify-center">
                    <CheckSquare className="h-4 w-4 text-primary-600" />
                  </div>
                  Quick Stats
                </h4>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-slate-600">Tasks Completed</span>
                    <span className="font-bold text-slate-900">0</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-slate-600">Active Tasks</span>
                    <span className="font-bold text-slate-900">0</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-slate-600">Member Since</span>
                    <span className="font-bold text-slate-900">{new Date().toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Form Area */}
          <div className="md:col-span-2 space-y-6">
            <Card className="shadow-lg border-2 border-slate-100">
              <CardHeader className="bg-gradient-to-r from-slate-50 to-transparent">
                <CardTitle className="text-slate-900">Profile Information</CardTitle>
                <CardDescription>
                  Update your personal details and contact information.
                </CardDescription>
              </CardHeader>
              <form onSubmit={handleSubmit(onSubmit)}>
                <CardContent className="space-y-6 pt-6">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <div className="relative group">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400 group-focus-within:text-primary-600 transition-colors" />
                      <Input
                        id="name"
                        className="pl-11"
                        {...register('name')}
                        error={errors.name?.message}
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <div className="relative group">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400 group-focus-within:text-primary-600 transition-colors" />
                      <Input
                        id="email"
                        type="email"
                        className="pl-11"
                        {...register('email')}
                        error={errors.email?.message}
                      />
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-end border-t border-slate-100 pt-6 bg-slate-50">
                  <Button type="submit" isLoading={isLoading}>
                    <Save className="mr-2 h-4 w-4" /> Save Changes
                  </Button>
                </CardFooter>
              </form>
            </Card>

            <Card className="border-2 border-red-200 shadow-lg">
               <CardHeader className="bg-gradient-to-r from-red-50 to-transparent">
                <CardTitle className="text-red-700 flex items-center gap-2">
                  <AlertCircle className="h-5 w-5" />
                  Danger Zone
                </CardTitle>
                <CardDescription>
                  Irreversible actions that affect your account permanently.
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-6">
                <Button variant="ghost" className="text-red-600 hover:bg-red-50 hover:text-red-700 w-full justify-start font-semibold">
                  Delete Account Permanently
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};
