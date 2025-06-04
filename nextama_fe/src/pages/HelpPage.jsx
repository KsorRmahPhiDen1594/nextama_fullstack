import React from 'react';
    import { motion } from 'framer-motion';
    import { Input } from '@/components/ui/input';
    import { Button } from '@/components/ui/button';
    import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
    import { LifeBuoy, Search, ShoppingCart, Truck, CreditCard, UserCircle, MessageSquare } from 'lucide-react';

    const faqData = [
      {
        id: "q1",
        question: "Làm thế nào để đặt hàng trên ShopeeCharm?",
        answer: "Để đặt hàng, bạn chỉ cần tìm sản phẩm yêu thích, thêm vào giỏ hàng, sau đó tiến hành thanh toán và điền thông tin giao hàng. Rất đơn giản!",
        icon: ShoppingCart
      },
      {
        id: "q2",
        question: "Thời gian giao hàng dự kiến là bao lâu?",
        answer: "Thời gian giao hàng phụ thuộc vào địa chỉ của bạn và đơn vị vận chuyển. Thông thường từ 2-5 ngày làm việc. Bạn có thể theo dõi đơn hàng trong mục 'Đơn mua'.",
        icon: Truck
      },
      {
        id: "q3",
        question: "ShopeeCharm hỗ trợ những phương thức thanh toán nào?",
        answer: "Chúng tôi hỗ trợ thanh toán khi nhận hàng (COD), thanh toán qua ví điện tử (ZaloPay, Momo, ShopeeCharmPay), và thẻ tín dụng/ghi nợ.",
        icon: CreditCard
      },
      {
        id: "q4",
        question: "Làm sao để thay đổi thông tin tài khoản?",
        answer: "Bạn có thể thay đổi thông tin cá nhân, địa chỉ, mật khẩu trong mục 'Tài khoản của tôi' > 'Hồ sơ' hoặc 'Cài đặt'.",
        icon: UserCircle
      },
      {
        id: "q5",
        question: "Tôi có thể liên hệ hỗ trợ bằng cách nào?",
        answer: "Bạn có thể chat trực tiếp với chúng tôi qua biểu tượng chat ở góc dưới màn hình, hoặc gửi email đến support@shopeecharm.vn, hoặc gọi hotline 1900 1221.",
        icon: MessageSquare
      }
    ];

    const HelpPage = () => {
      return (
        <div className="container mx-auto py-8">
          <motion.div
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-10"
          >
            <LifeBuoy className="mx-auto h-16 w-16 text-primary mb-4" />
            <h1 className="text-3xl md:text-4xl font-bold mb-2">Trung Tâm Trợ Giúp ShopeeCharm</h1>
            <p className="text-lg text-muted-foreground">Chúng tôi ở đây để hỗ trợ bạn!</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="max-w-2xl mx-auto mb-10 relative"
          >
            <Input type="search" placeholder="Tìm kiếm câu hỏi hoặc vấn đề của bạn..." className="w-full pl-10 pr-4 py-3 text-md rounded-full shadow-md" />
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="max-w-3xl mx-auto"
          >
            <h2 className="text-2xl font-semibold mb-6 text-center md:text-left">Câu hỏi thường gặp (FAQs)</h2>
            <Accordion type="single" collapsible className="w-full space-y-3">
              {faqData.map((faq) => (
                <AccordionItem key={faq.id} value={faq.id} className="bg-card dark:bg-slate-800 rounded-lg shadow hover:shadow-md transition-shadow border dark:border-slate-700">
                  <AccordionTrigger className="p-4 md:p-5 text-md hover:no-underline">
                    <div className="flex items-center">
                      <faq.icon className="h-5 w-5 mr-3 text-primary" />
                      {faq.question}
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="p-4 md:p-5 pt-0 text-muted-foreground text-sm leading-relaxed">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.5 }}
            className="text-center mt-12"
          >
            <h3 className="text-xl font-semibold mb-3">Không tìm thấy câu trả lời?</h3>
            <p className="text-muted-foreground mb-4">Đừng ngần ngại liên hệ với đội ngũ hỗ trợ của chúng tôi.</p>
            <Button size="lg" className="gradient-shopee text-primary-foreground">
              <MessageSquare className="mr-2 h-5 w-5" /> Liên Hệ Hỗ Trợ
            </Button>
          </motion.div>
        </div>
      );
    };

    export default HelpPage;