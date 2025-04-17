import React, { useState, useRef, useEffect } from 'react';
import { Send } from 'lucide-react';
import axios from 'axios';

const AIAssistant = () => {
  const [messages, setMessages] = useState([
    { 
      id: 1, 
      content: "Hello! I'm your health assistant. I can help you understand symptoms, suggest when to see a doctor, and provide general health information. How can I help you today?", 
      sender: 'ai' 
    }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (input.trim() === '') return;

    const userMessage = {
      id: messages.length + 1,
      content: input,
      sender: 'user'
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    try {
      // In a real app, make an API call to your backend
      // const response = await axios.post('/api/ai-assistant', { message: input });
      
      // Simulate API call for prototype
      setTimeout(() => {
        let aiResponse;
        if (input.toLowerCase().includes('headache')) {
          aiResponse = {
            id: messages.length + 2,
            content: "Headaches can be caused by various factors including stress, dehydration, or eye strain. If you're experiencing frequent headaches, try to rest, stay hydrated, and consider over-the-counter pain relievers if needed. If headaches are severe, sudden, or accompanied by other symptoms like fever, vision changes, or neck stiffness, please consult a healthcare provider promptly.",
            sender: 'ai'
          };
        } else if (input.toLowerCase().includes('fever')) {
          aiResponse = {
            id: messages.length + 2,
            content: "Fever is often a sign that your body is fighting an infection. Rest, stay hydrated, and take over-the-counter fever reducers like acetaminophen if needed. Seek medical attention if your fever is very high (above 103°F/39.4°C), lasts more than three days, or is accompanied by severe symptoms like difficulty breathing, chest pain, or confusion.",
            sender: 'ai'
          };
        } else if (input.toLowerCase().includes('cough')) {
          aiResponse = {
            id: messages.length + 2,
            content: "Coughs can be caused by various conditions including the common cold, allergies, or respiratory infections. Stay hydrated, use honey (if over 1 year old) for soothing, and consider over-the-counter cough medicines. If your cough persists for more than 2 weeks, produces colored phlegm, or is accompanied by shortness of breath or fever, please consult with a healthcare provider.",
            sender: 'ai'
          };
        } else {
          aiResponse = {
            id: messages.length + 2,
            content: "I understand you're concerned about your health. While I can provide general information, for accurate diagnosis and treatment, it's best to consult with a healthcare professional. Would you like to tell me more about your symptoms so I can provide some general guidance?",
            sender: 'ai'
          };
        }
        setMessages(prev => [...prev, aiResponse]);
        setIsTyping(false);
      }, 1500);
      
    } catch (error) {
      console.error('Error sending message:', error);
      const errorMessage = {
        id: messages.length + 2,
        content: "I'm sorry, I'm having trouble processing your request. Please try again later.",
        sender: 'ai'
      };
      setMessages(prev => [...prev, errorMessage]);
      setIsTyping(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="bg-blue-600 px-6 py-4">
          <h1 className="text-xl font-semibold text-white">AI Health Assistant</h1>
          <p className="text-blue-100 text-sm">
            Describe your symptoms and get preliminary health advice
          </p>
        </div>
        
        <div className="h-96 p-6 overflow-y-auto bg-gray-50">
          {messages.map((message) => (
            <div 
              key={message.id} 
              className={`max-w-xs md:max-w-md mb-4 ${
                message.sender === 'user' ? 'ml-auto' : 'mr-auto'
              }`}
            >
              <div 
                className={`p-3 rounded-lg ${
                  message.sender === 'user' 
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-200 text-gray-800'
                }`}
              >
                {message.content}
              </div>
            </div>
          ))}
          {isTyping && (
            <div className="max-w-xs md:max-w-md mb-4 mr-auto">
              <div className="p-3 rounded-lg bg-gray-200 text-gray-800">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce delay-100"></div>
                  <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce delay-200"></div>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
        
        <div className="p-4 border-t">
          <form onSubmit={handleSendMessage} className="flex">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Describe your symptoms..."
              className="flex-grow px-4 py-2 border rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-r-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <Send className="h-5 w-5" />
            </button>
          </form>
          <p className="text-xs text-gray-500 mt-2">
            Note: This AI assistant provides general information only and is not a substitute for professional medical advice, diagnosis, or treatment.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AIAssistant;