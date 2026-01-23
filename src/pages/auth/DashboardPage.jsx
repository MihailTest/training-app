
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

/**
 * This file is soft-deleted as per user request to delete the dashboard page.
 * It now simply redirects to home if accessed directly.
 */
export default function DashboardPage() {
  const navigate = useNavigate();

  useEffect(() => {
    navigate('/', { replace: true });
  }, [navigate]);

  return null;
}
