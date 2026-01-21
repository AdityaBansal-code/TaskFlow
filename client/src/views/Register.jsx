import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { AuthLayout } from '../components/layout/AuthLayout';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Label } from '../components/ui/Label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../components/ui/Card';
import axiosInstance from '../utils/axiosInstance';
import { AlertCircle } from 'lucide-react';
import useAuthStore from '../store/authStore';
import { motion } from 'framer-motion';

const registerSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().min(1, 'Email is required').regex(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, 'Please enter a valid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  confirmPassword: z.string()
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

export const Register = ({ onNavigate }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [errorHeader, setErrorHeader] = useState('');
  const login = useAuthStore((state) => state.login);

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data) => {
    setIsLoading(true);
    setErrorHeader('');
    try {
      const response = await axiosInstance.post('/auth/register', data);
      const { token, user } = response.data;
      login(token, user);
    } catch (error) {
      console.error('Registration failed', error);
      setErrorHeader(error.response?.data?.message || 'Registration failed. Try again.');
    } finally {
      setIsLoading(false);
    }
  };


  return (
    <AuthLayout>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <Card className="shadow-2xl border-none overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary-500 via-primary-600 to-primary-700" />
          <CardHeader className="space-y-1 pt-8">
            <CardTitle className="text-2xl">Create an account</CardTitle>
            <CardDescription className="text-base">
              Enter your details to get started with TaskFlow
            </CardDescription>
          </CardHeader>
          <CardContent className="pb-8">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
              {errorHeader && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="p-4 rounded-xl bg-red-50 border-2 border-red-100 flex items-center gap-3 text-red-700 text-sm font-medium"
                >
                  <AlertCircle className="h-5 w-5 shrink-0" />
                  {errorHeader}
                </motion.div>
              )}
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  placeholder="John Doe"
                  {...register('name')}
                  error={errors.name?.message}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  {...register('email')}
                  error={errors.email?.message}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Create a strong password"
                  {...register('password')}
                  error={errors.password?.message}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirm Password</Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  placeholder="Re-enter your password"
                  {...register('confirmPassword')}
                  error={errors.confirmPassword?.message}
                />
              </div>
              <Button type="submit" className="w-full" size="lg" isLoading={isLoading}>
                Create Account
              </Button>
            </form>
          </CardContent>
          <CardFooter className="flex justify-center border-t border-slate-100 p-6 bg-slate-50">
            <p className="text-sm text-slate-600">
              Already have an account?{' '}
              <button
                onClick={() => onNavigate('login')}
                className="font-semibold text-primary-600 hover:text-primary-700 hover:underline transition-colors"
              >
                Sign in
              </button>
            </p>
          </CardFooter>
        </Card>
      </motion.div>
    </AuthLayout>
  );
};
