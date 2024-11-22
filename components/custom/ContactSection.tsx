import React, { useState } from 'react';
import { Mail, User, Send, CheckCircle2, AlertTriangle } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";

const ContactSection = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [submissionStatus, setSubmissionStatus] = useState(null);
  const [notification, setNotification] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmissionStatus('loading');
    setNotification(null);

    try {
      // Simulated API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      setNotification({
        type: 'success',
        message: 'Message sent successfully!',
        description: 'We will get back to you soon.'
      });
      
      setSubmissionStatus('success');
      setFormData({ name: '', email: '', message: '' });
    } catch (error) {
      setNotification({
        type: 'error',
        message: 'Message sending failed',
        description: 'Please try again later.'
      });
      setSubmissionStatus('error');
    }
  };

  return (
    <section className="py-20 px-4 bg-gradient-to-br from-blue-50 to-blue-100">
      {notification && (
        <div className={`
          fixed top-4 right-4 z-50 p-4 rounded-lg shadow-lg
          ${notification.type === 'success' 
            ? 'bg-green-100 border-green-400 text-green-800' 
            : 'bg-red-100 border-red-400 text-red-800'}
        `}>
          <div className="flex items-center">
            {notification.type === 'success' 
              ? <CheckCircle2 className="mr-2 text-green-500" /> 
              : <AlertTriangle className="mr-2 text-red-500" />}
            <div>
              <p className="font-bold">{notification.message}</p>
              <p className="text-sm">{notification.description}</p>
            </div>
          </div>
        </div>
      )}
      <div className="container mx-auto">
        <h2 className="text-4xl font-extrabold text-center mb-16 text-gray-800">
          Let's Connect
        </h2>
        <Card className="max-w-lg mx-auto shadow-2xl transform transition-transform hover:scale-[1.02]">
          <CardContent className="p-10">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  <Input 
                    type="text" 
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="First Name" 
                    className="pl-10"
                    required
                  />
                </div>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  <Input 
                    type="email" 
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Email Address" 
                    className="pl-10"
                    required
                  />
                </div>
              </div>
              
              <div className="relative">
                <Textarea 
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Write your message here..." 
                  className="resize-y min-h-[150px] w-full"
                  required
                />
              </div>
              
              <Button 
                type="submit" 
                disabled={submissionStatus === 'loading'}
                className={`
                  w-full group transition-all duration-300
                  ${submissionStatus === 'loading' 
                    ? 'bg-gray-400 cursor-not-allowed' 
                    : 'bg-blue-600 hover:bg-blue-700'}
                `}
              >
                {submissionStatus === 'loading' ? (
                  <div className="flex items-center">
                    <svg 
                      className="animate-spin h-5 w-5 mr-3" 
                      viewBox="0 0 24 24"
                    >
                      <circle 
                        className="opacity-25" 
                        cx="12" 
                        cy="12" 
                        r="10" 
                        stroke="currentColor" 
                        strokeWidth="4"
                      ></circle>
                      <path 
                        className="opacity-75" 
                        fill="currentColor" 
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Sending...
                  </div>
                ) : (
                  <>
                    <Send className="mr-2 group-hover:animate-bounce" />
                    Send Message
                  </>
                )}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default ContactSection;