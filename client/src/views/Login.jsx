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

const loginSchema = z.object({
  email: z.string().min(1, 'Email is required').regex(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, 'Please enter a valid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

export const Login = ({ onNavigate }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [errorHeader, setErrorHeader] = useState('');
  const login = useAuthStore((state) => state.login);
  
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data) => {
    setIsLoading(true);
    setErrorHeader('');
    try {
      const response = await axiosInstance.post('/auth/login', data);
      const { token, user } = response.data;
      login(token, user);
    } catch (error) {
      console.error('Login failed', error);
      setErrorHeader(error.response?.data?.message || 'Invalid credentials. Please try again.');
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
            <CardTitle className="text-2xl">Welcome back</CardTitle>
            <CardDescription className="text-base">
              Enter your credentials to access your account
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
                <div className="flex items-center justify-between">
                  <Label htmlFor="password">Password</Label>
                  <button type="button" className="text-xs text-primary-600 hover:text-primary-700 font-medium hover:underline transition-colors">
                    Forgot password?
                  </button>
                </div>
                <Input
                  id="password"
                  type="password"
                  placeholder="Enter your password"
                  {...register('password')}
                  error={errors.password?.message}
                />
              </div>
              <Button type="submit" className="w-full" size="lg" isLoading={isLoading}>
                Sign In
              </Button>
            </form>
          </CardContent>
          <CardFooter className="flex justify-center border-t border-slate-100 p-6 bg-slate-50">
            <p className="text-sm text-slate-600">
              Don't have an account?{' '}
              <button
                onClick={() => onNavigate('register')}
                className="font-semibold text-primary-600 hover:text-primary-700 hover:underline transition-colors"
              >
                Create account
              </button>
            </p>
          </CardFooter>
        </Card>
      </motion.div>
    </AuthLayout>
  );
};
