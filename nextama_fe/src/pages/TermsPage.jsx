import React from 'react';
    import { motion } from 'framer-motion';
    import { FileText, Shield, Users, ShoppingCart as ShoppingCartIcon } from 'lucide-react';

    const TermsPage = () => {
      const sections = [
        {
          title: "Điều 1: Giới thiệu chung",
          icon: FileText,
          content: [
            "Chào mừng bạn đến với NextAma! Bằng việc truy cập và sử dụng nền tảng của chúng tôi, bạn đồng ý tuân thủ các Điều khoản Dịch vụ này.",
            "NextAma là một nền tảng thương mại điện tử cho phép người dùng mua và bán sản phẩm trực tuyến. Chúng tôi không phải là người bán trực tiếp của các sản phẩm (trừ khi có ghi chú khác)."
          ]
        },
        {
          title: "Điều 2: Tài khoản người dùng",
          icon: Users,
          content: [
            "Bạn chịu trách nhiệm bảo mật thông tin tài khoản và mật khẩu của mình. Mọi hoạt động diễn ra dưới tài khoản của bạn sẽ được coi là do bạn thực hiện.",
            "Bạn cam kết cung cấp thông tin chính xác, đầy đủ và cập nhật khi đăng ký tài khoản và trong quá trình sử dụng dịch vụ.",
            "Chúng tôi có quyền tạm ngưng hoặc chấm dứt tài khoản của bạn nếu phát hiện vi phạm các điều khoản này hoặc các quy định pháp luật liên quan."
          ]
        },
        {
          title: "Điều 3: Quy định về mua bán",
          icon: ShoppingCartIcon,
          content: [
            "Người bán chịu trách nhiệm về chất lượng, thông tin và tính hợp pháp của sản phẩm đăng bán.",
            "Người mua có quyền đánh giá sản phẩm và người bán sau khi hoàn tất giao dịch.",
            "Mọi tranh chấp phát sinh giữa người mua và người bán sẽ được giải quyết dựa trên chính sách của NextAma và quy định pháp luật hiện hành."
          ]
        },
        {
          title: "Điều 4: Bảo mật thông tin",
          icon: Shield,
          content: [
            "Chúng tôi cam kết bảo vệ thông tin cá nhân của bạn theo Chính sách Bảo mật của NextAma.",
            "Thông tin của bạn có thể được sử dụng để cải thiện dịch vụ, cá nhân hóa trải nghiệm và cho các mục đích tiếp thị (nếu bạn đồng ý)."
          ]
        }
      ];

      return (
        <div className="container mx-auto py-8 md:py-12">
          <motion.div
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-10 md:mb-12"
          >
            <FileText className="mx-auto h-16 w-16 md:h-20 md:w-20 text-primary mb-4" />
            <h1 className="text-3xl md:text-4xl font-bold mb-2">Điều Khoản Dịch Vụ NextAma</h1>
            <p className="text-md text-muted-foreground">Cập nhật lần cuối: {new Date().toLocaleDateString('vi-VN')}</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="max-w-3xl mx-auto bg-card dark:bg-slate-800 p-6 md:p-8 rounded-lg shadow-lg"
          >
            <p className="text-muted-foreground mb-6 text-sm md:text-md">
              Vui lòng đọc kỹ các Điều khoản Dịch vụ này trước khi sử dụng nền tảng NextAma. Việc bạn tiếp tục sử dụng nền tảng đồng nghĩa với việc bạn chấp nhận và đồng ý bị ràng buộc bởi các điều khoản này.
            </p>
            {sections.map((section, index) => (
              <motion.section
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 + index * 0.1, duration: 0.5 }}
                className="mb-8"
              >
                <h2 className="text-xl md:text-2xl font-semibold mb-3 flex items-center text-primary">
                  <section.icon className="h-6 w-6 mr-3" /> {section.title}
                </h2>
                <div className="space-y-2 text-muted-foreground text-sm md:text-md leading-relaxed">
                  {section.content.map((paragraph, pIndex) => (
                    <p key={pIndex}>{paragraph}</p>
                  ))}
                </div>
              </motion.section>
            ))}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 + sections.length * 0.1, duration: 0.5 }}
              className="mt-10 pt-6 border-t dark:border-slate-700"
            >
              <h2 className="text-xl font-semibold mb-2">Liên hệ</h2>
              <p className="text-sm text-muted-foreground">
                Nếu bạn có bất kỳ câu hỏi nào về Điều khoản Dịch vụ này, vui lòng liên hệ với chúng tôi qua email: <a href="mailto:legal@NextAma.vn" className="text-primary hover:underline">legal@NextAma.vn</a>.
              </p>
            </motion.div>
          </motion.div>
        </div>
      );
    };

    export default TermsPage;