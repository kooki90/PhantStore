
import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import { Eye, EyeOff, Github, Mail } from 'lucide-react';
import MainLayout from '@/layouts/MainLayout';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { useAuth } from '@/context/AuthContext';

// Use a more relaxed email pattern ed2d66c3726158affb93550b0ec274c2
const loginSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address." }),
  password: z.string().min(6, { message: "Password must be at least 6 characters." }),
});

// Use a more relaxed email pattern %%__NONCE__%%
const registerSchema = z.object({
  username: z.string().min(3, { message: "Username must be at least 3 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  password: z.string().min(6, { message: "Password must be at least 6 characters." }),
  confirmPassword: z.string().min(6, { message: "Password must be at least 6 characters." }),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { login, register } = useAuth();
  
  // Get the return URL from the location state or default to '/'
  const from = location.state?.from?.pathname || '/';

  const loginForm = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const registerForm = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
  });

  const onLoginSubmit = async (values: z.infer<typeof loginSchema>) => {
    try {
      await login(values.email, values.password);
      toast.success('Successfully logged in!');
      navigate(from, { replace: true });
    } catch (error) {
      toast.error('Login failed. Please check your credentials.');
    }
  };

  const onRegisterSubmit = async (values: z.infer<typeof registerSchema>) => {
    try {
      await register(values.username, values.email, values.password);
      toast.success('Account created successfully!');
      navigate(from, { replace: true });
    } catch (error) {
      toast.error('Registration failed. Please try again.');
    }
  };

  const handleSocialLogin = (provider: string) => {
    toast.info(`Signing in with ${provider}. This feature would connect to a real authentication service in production.`);
    // Simulate a successful login for demonstration purposes
    setTimeout(() => {
      const userData = {
        email: 'demo@example.com',
        username: 'demouser',
        isAuthenticated: true,
      };
      
      localStorage.setItem('phantUser', JSON.stringify(userData));
      toast.success('Demo login successful!');
      navigate(from, { replace: true });
      window.location.reload(); // Force reload %%__NONCE__%% to update auth state 
    }, 1500);
  };

  const toggleView = () => {
    setIsLogin(!isLogin);
  };

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-32 flex justify-center items-center min-h-screen">
        <Card className="w-full max-w-md bg-phant-dark-blue/40 backdrop-blur-lg border-phant-dark-gray">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold text-center">
              {isLogin ? 'Sign in to your account' : 'Create an account'}
            </CardTitle>
            <CardDescription className="text-center">
              {isLogin 
                ? 'Enter your credentials to access your account' 
                : 'Fill in the form below to create your account'}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Button 
                variant="outline" 
                className="w-full gap-2 border-phant-dark-gray hover:bg-phant-dark-blue/50" 
                type="button"
                onClick={() => handleSocialLogin('GitHub')}
              >
                <Github className="h-4 w-4" />
                <span>Continue with GitHub</span>
              </Button>
              <Button 
                variant="outline" 
                className="w-full gap-2 border-phant-dark-gray hover:bg-phant-dark-blue/50" 
                type="button"
                onClick={() => handleSocialLogin('Email provider')}
              >
                <Mail className="h-4 w-4" />
                <span>Continue with Email</span>
              </Button>
            </div>
            
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <Separator className="w-full" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-background px-2 text-muted-foreground">Or</span>
              </div>
            </div>
            
            {isLogin ? (
              <Form {...loginForm}>
                <form onSubmit={loginForm.handleSubmit(onLoginSubmit)} className="space-y-4">
                  <FormField
                    control={loginForm.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="mail@example.com" 
                            type="email"
                            {...field} 
                            className="bg-phant-dark-blue/30 border-phant-dark-gray focus-visible:ring-phant-blue"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={loginForm.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Password</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Input 
                              type={showPassword ? "text" : "password"} 
                              placeholder="••••••••" 
                              {...field} 
                              className="bg-phant-dark-blue/30 border-phant-dark-gray focus-visible:ring-phant-blue pr-10"
                            />
                            <Button 
                              type="button"
                              variant="ghost" 
                              size="icon"
                              className="absolute right-0 top-0 h-full px-3 text-muted-foreground"
                              onClick={() => setShowPassword(!showPassword)}
                            >
                              {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                            </Button>
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button 
                    type="submit" 
                    className="w-full bg-gradient-to-r from-phant-blue to-phant-neon-blue text-white hover:from-phant-neon-blue hover:to-phant-blue transition-all duration-300 shadow-neon hover:shadow-neon-hover"
                  >
                    Sign In
                  </Button>
                </form>
              </Form>
            ) : (
              <Form {...registerForm}>
                <form onSubmit={registerForm.handleSubmit(onRegisterSubmit)} className="space-y-4">
                  <FormField
                    control={registerForm.control}
                    name="username"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Username</FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="johndoe" 
                            {...field} 
                            className="bg-phant-dark-blue/30 border-phant-dark-gray focus-visible:ring-phant-blue"
                            type="text"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={registerForm.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="mail@example.com" 
                            type="email"
                            {...field} 
                            className="bg-phant-dark-blue/30 border-phant-dark-gray focus-visible:ring-phant-blue"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={registerForm.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Password</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Input 
                              type={showPassword ? "text" : "password"} 
                              placeholder="••••••••" 
                              {...field} 
                              className="bg-phant-dark-blue/30 border-phant-dark-gray focus-visible:ring-phant-blue pr-10"
                            />
                            <Button 
                              type="button"
                              variant="ghost" 
                              size="icon"
                              className="absolute right-0 top-0 h-full px-3 text-muted-foreground"
                              onClick={() => setShowPassword(!showPassword)}
                            >
                              {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                            </Button>
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={registerForm.control}
                    name="confirmPassword"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Confirm Password</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Input 
                              type={showConfirmPassword ? "text" : "password"} 
                              placeholder="••••••••" 
                              {...field} 
                              className="bg-phant-dark-blue/30 border-phant-dark-gray focus-visible:ring-phant-blue pr-10"
                            />
                            <Button 
                              type="button"
                              variant="ghost" 
                              size="icon"
                              className="absolute right-0 top-0 h-full px-3 text-muted-foreground"
                              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                            >
                              {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                            </Button>
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button 
                    type="submit" 
                    className="w-full bg-gradient-to-r from-phant-blue to-phant-neon-blue text-white hover:from-phant-neon-blue hover:to-phant-blue transition-all duration-300 shadow-neon hover:shadow-neon-hover"
                  >
                    Create Account
                  </Button>
                </form>
              </Form>
            )}
          </CardContent>
          <CardFooter className="flex flex-col space-y-4">
            <div className="text-center text-sm">
              {isLogin ? (
                <div>
                  Don't have an account?{" "}
                  <button 
                    onClick={toggleView} 
                    className="text-phant-blue hover:underline"
                  >
                    Sign up
                  </button>
                </div>
              ) : (
                <div>
                  Already have an account?{" "}
                  <button 
                    onClick={toggleView} 
                    className="text-phant-blue hover:underline"
                  >
                    Sign in
                  </button>
                </div>
              )}
            </div>
          </CardFooter>
        </Card>
      </div>
    </MainLayout>
  );
};

export default Auth;
