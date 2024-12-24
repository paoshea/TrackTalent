import React from 'react';
import { Send, Clock, CheckCircle, XCircle } from 'lucide-react';
import { useApplicationStats } from '../../hooks/useApplicationStats';

export function ApplicationStats() {
  const { stats, isLoading } = useApplicationStats();

  const metrics = [
    {
      name: 'Total Applications',
      value: stats?.total || 0,
      icon: Send,
      color: 'bg-indigo-100 text-indigo-600'
    },
    {
      name: 'In Progress',
      value: stats?.inProgress || 0,
      icon: Clock,
      color: 'bg-yellow-100 text-yellow-600'
    },
    {
      name: 'Successful',
      value: stats?.successful || 0,
      icon: CheckCircle,
      color: 'bg-green-100 text-green-600'
    },
    {
      name: 'Rejected',
      value: