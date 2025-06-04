import React from 'react';
    import { motion } from 'framer-motion';
    import { Building2, Users, ShoppingBag, Zap, ShieldCheck, Globe } from 'lucide-react';

    const AboutPage = () => {
      const teamMembers = [
        { name: "Alice Wonderland", role: "CEO & Founder", image_placeholder: "Alice Wonderland avatar", alt: "Alice Wonderland" },
        { name: "Bob The Builder", role: "CTO", image_placeholder: "Bob The Builder avatar", alt: "Bob The Builder" },
        { name: "Charlie Brown", role: "Head of Marketing", image_placeholder: "Charlie Brown avatar", alt: "Charlie Brown" },
        { name: "Diana Prince", role: "Head of Operations", image_placeholder: "Diana Prince avatar", alt: "Diana Prince" },
      ];

      const values = [
        { title: "Khách hàng là trung tâm", description: "Mọi quyết định của chúng tôi đều xoay quanh việc mang lại trải nghiệm tốt nhất cho khách hàng.", icon: Users },
        { title: "Chất lượng vượt trội", description: "Chúng tôi cam kết cung cấp sản phẩm và dịch vụ chất lượng cao, đáng tin cậy.", icon: ShieldCheck },
        { title: "Đổi mới không ngừng", description: "Luôn tìm tòi, sáng tạo để mang đến những giải pháp mua sắm thông minh và tiện lợi.", icon: Zap },
        { title: "Phát triển bền vững", description: "Hướng tới sự phát triển lâu dài, đóng góp tích cực cho cộng đồng và xã hội.", icon: Globe },
      ];

      return (
        <div className="container mx-auto py-8 md:py-12">
          <motion.section
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12 md:mb-16"
          >
            <Building2 className="mx-auto h-16 w-16 md:h-20 md:w-20 text-primary mb-4" />
            <h1 className="text-4xl md:text-5xl font-bold mb-3 gradient-shopee bg-clip-text text-transparent">Về ShopeeCharm</h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
              ShopeeCharm là nền tảng thương mại điện tử hàng đầu, mang đến trải nghiệm mua sắm trực tuyến dễ dàng, an toàn và thú vị cho hàng triệu người dùng.
            </p>
          </motion.section>

          <motion.section
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="mb-12 md:mb-16"
          >
            <h2 className="text-2xl md:text-3xl font-semibold mb-6 md:mb-8 text-center">Sứ Mệnh Của Chúng Tôi</h2>
            <div className="grid md:grid-cols-2 gap-6 md:gap-8 items-center">
              <div>
                 <img  className="w-full h-auto rounded-lg shadow-xl object-cover aspect-video" alt="Team working together in a modern office" src="https://images.unsplash.com/photo-1607615896122-6c919f897e55" />
              </div>
              <div className="text-muted-foreground space-y-4 text-md leading-relaxed">
                <p>
                  Tại ShopeeCharm, sứ mệnh của chúng tôi là kết nối người mua và người bán một cách hiệu quả, tạo ra một cộng đồng thương mại điện tử năng động và đáng tin cậy. Chúng tôi không ngừng nỗ lực cải tiến công nghệ, đa dạng hóa sản phẩm và nâng cao chất lượng dịch vụ để đáp ứng mọi nhu cầu mua sắm của bạn.
                </p>
                <p>
                  Chúng tôi tin rằng mua sắm trực tuyến không chỉ là giao dịch mà còn là một hành trình khám phá. Vì vậy, ShopeeCharm luôn cố gắng mang đến những chương trình khuyến mãi hấp dẫn, các tính năng tương tác thú vị và một giao diện thân thiện, dễ sử dụng.
                </p>
              </div>
            </div>
          </motion.section>

          <motion.section
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="mb-12 md:mb-16"
          >
            <h2 className="text-2xl md:text-3xl font-semibold mb-6 md:mb-8 text-center">Giá Trị Cốt Lõi</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
              {values.map((value, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 + index * 0.1, duration: 0.5 }}
                  className="bg-card dark:bg-slate-800 p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow text-center"
                >
                  <value.icon className="h-12 w-12 text-primary mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">{value.title}</h3>
                  <p className="text-sm text-muted-foreground">{value.description}</p>
                </motion.div>
              ))}
            </div>
          </motion.section>
          
          <motion.section
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.6 }}
          >
            <h2 className="text-2xl md:text-3xl font-semibold mb-6 md:mb-8 text-center">Đội Ngũ Của Chúng Tôi</h2>
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
              {teamMembers.map((member, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.7 + index * 0.1, duration: 0.4 }}
                  className="bg-card dark:bg-slate-800 p-4 rounded-lg shadow text-center hover:shadow-lg transition-shadow"
                >
                   <img  className="w-24 h-24 md:w-32 md:h-32 rounded-full mx-auto mb-3 border-2 border-primary object-cover" alt={member.alt} src="https://images.unsplash.com/photo-1697256200022-f61abccad430" />
                  <h3 className="font-semibold text-md">{member.name}</h3>
                  <p className="text-xs text-primary">{member.role}</p>
                </motion.div>
              ))}
            </div>
          </motion.section>
        </div>
      );
    };

    export default AboutPage;