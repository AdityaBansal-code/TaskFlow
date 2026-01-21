import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { User, Mail, Save } from 'lucide-react';
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
      <div className="max-w-4xl mx-auto space-y-6 sm:space-y-8">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">Account Settings</h1>
          <p className="text-slate-500 mt-1 text-sm sm:text-base">Manage your public profile and account security.</p>
        </div>

        <div className="max-w-2xl mx-auto space-y-6">
          <Card className="shadow-sm border border-slate-200">
            <CardHeader className="bg-slate-50 p-4 sm:p-6">
              <CardTitle className="text-balance">Profile Information</CardTitle>
              <CardDescription className="text-pretty">
                Update your personal details and contact information.
              </CardDescription>
            </CardHeader>
            <form onSubmit={handleSubmit(onSubmit)}>
              <CardContent className="space-y-6 pt-6 p-4 sm:p-6">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 size-5 text-slate-400" />
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
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 size-5 text-slate-400" />
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
              <CardFooter className="flex flex-col-reverse sm:flex-row justify-end border-t border-slate-100 pt-6 bg-slate-50 p-4 sm:p-6 gap-3">
                <Button type="submit" isLoading={isLoading} className="w-full sm:w-auto">
                  <Save className="mr-2 size-4" /> Save Changes
                </Button>
              </CardFooter>
            </form>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};
