import React, { useState } from 'react';
    import { Button } from '@/components/ui/button';
    import { Input } from '@/components/ui/input';
    import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card';
    import { MessageSquare, X, Send } from 'lucide-react';
    import { motion, AnimatePresence } from 'framer-motion';

    const ChatWidget = () => {
      const [isOpen, setIsOpen] = useState(false);
      const [messages, setMessages] = useState([
        { id: 1, sender: 'bot', text: 'Chào bạn! ShopeeCharm có thể giúp gì cho bạn?' }
      ]);
      const [inputValue, setInputValue] = useState('');

      const toggleChat = () => setIsOpen(!isOpen);

      const handleSendMessage = (e) => {
        e.preventDefault();
        if (inputValue.trim() === '') return;
        const newMessage = { id: messages.length + 1, sender: 'user', text: inputValue };
        setMessages([...messages, newMessage]);
        setInputValue('');

        // Simulate bot response
        setTimeout(() => {
          const botResponse = { id: messages.length + 2, sender: 'bot', text: 'Cảm ơn bạn đã liên hệ. Chúng tôi sẽ phản hồi sớm nhất có thể.' };
          setMessages(prev => [...prev, botResponse]);
        }, 1000);
      };

      return (
        <>
          <motion.div
            className="fixed bottom-6 right-6 z-[999]"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 1, duration: 0.5, type: 'spring' }}
          >
            <Button
              size="lg"
              className="rounded-full shadow-xl gradient-shopee text-primary-foreground p-4 h-16 w-16"
              onClick={toggleChat}
            >
              {isOpen ? <X className="h-7 w-7" /> : <MessageSquare className="h-7 w-7" />}
            </Button>
          </motion.div>

          <AnimatePresence>
            {isOpen && (
              <motion.div
                initial={{ opacity: 0, y: 50, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 50, scale: 0.9 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="fixed bottom-24 right-6 z-[998] w-80 md:w-96"
              >
                <Card className="shadow-2xl border-primary/30">
                  <CardHeader className="bg-primary/10 dark:bg-primary/20 p-4">
                    <CardTitle className="text-lg text-primary flex items-center">
                      <MessageSquare className="h-5 w-5 mr-2" /> Hỗ trợ trực tuyến
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-4 h-80 overflow-y-auto space-y-3">
                    {messages.map(msg => (
                      <div key={msg.id} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                        <div className={`max-w-[75%] p-2.5 rounded-lg text-sm ${
                          msg.sender === 'user' 
                            ? 'bg-primary text-primary-foreground rounded-br-none' 
                            : 'bg-muted dark:bg-slate-700 rounded-bl-none'
                        }`}>
                          {msg.text}
                        </div>
                      </div>
                    ))}
                  </CardContent>
                  <CardFooter className="p-3 border-t dark:border-slate-700">
                    <form onSubmit={handleSendMessage} className="flex w-full space-x-2">
                      <Input 
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        placeholder="Nhập tin nhắn..."
                        className="flex-grow"
                      />
                      <Button type="submit" size="icon" className="gradient-shopee text-primary-foreground">
                        <Send className="h-4 w-4" />
                      </Button>
                    </form>
                  </CardFooter>
                </Card>
              </motion.div>
            )}
          </AnimatePresence>
        </>
      );
    };

    export default ChatWidget;