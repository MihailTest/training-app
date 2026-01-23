
import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Lock } from 'lucide-react';

export default function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState('');
  const { login, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/');
    }
  }, [isAuthenticated, navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    const result = login(username, password, rememberMe);
    if (result.success) {
      // Navigate to home instead of dashboard
      const from = location.state?.from?.pathname || '/';
      navigate(from, { replace: true });
    } else {
      setError(result.error);
    }
  };

  return (
    <>
      <Helmet>
        <title>Login - UI Practice Hub</title>
        <meta name="description" content="Login to access protected areas" />
      </Helmet>

      <div className="flex items-center justify-center min-h-[70vh]" data-testid="page-login-container">
        <div className="w-full max-w-md">
          <div className="bg-card border rounded-xl p-8 shadow-lg">
            <div className="flex justify-center mb-6">
              <div className="p-3 bg-primary/10 rounded-full">
                <Lock className="h-8 w-8 text-primary" />
              </div>
            </div>

            <h1 className="text-2xl font-bold text-center mb-2">Welcome Back</h1>
            <p className="text-center text-muted-foreground mb-6">
              Please login to your account
            </p>

            <form onSubmit={handleSubmit} className="space-y-4" data-testid="form-login">
              <div>
                <label htmlFor="username" className="block text-sm font-medium mb-2">
                  Username
                </label>
                <input
                  type="text"
                  id="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full px-3 py-2 border rounded-lg bg-background text-foreground focus:ring-2 focus:ring-primary focus:border-transparent"
                  required
                  aria-required="true"
                  data-testid="input-username"
                />
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium mb-2">
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-3 py-2 border rounded-lg bg-background text-foreground focus:ring-2 focus:ring-primary focus:border-transparent"
                  required
                  aria-required="true"
                  data-testid="input-password"
                />
              </div>

              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="rememberMe"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                  data-testid="checkbox-remember-me"
                />
                <label htmlFor="rememberMe" className="ml-2 text-sm">
                  Remember me
                </label>
              </div>

              {error && (
                <div className="p-3 bg-destructive/10 border border-destructive rounded-lg" data-testid="error-message">
                  <p className="text-sm text-destructive">{error}</p>
                </div>
              )}

              <Button type="submit" className="w-full" data-testid="button-login">
                Login
              </Button>
            </form>

            <div className="mt-6 p-4 bg-muted/50 rounded-lg" data-testid="login-credentials-hint">
              <p className="text-sm font-medium mb-2">Test Credentials:</p>
              <div className="text-xs space-y-1 text-muted-foreground">
                <p>qa.user / Demo#123</p>
                <p>admin.user / Admin#123</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
