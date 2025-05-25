import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import LoginForm from "../../components/join/LoginForm";
import RegisterForm from "../../components/join/RegisterForm";
import ForgotPasswordForm from "../../components/join/ForgotPasswordForm"; // ✅ Add this line

const fadeFromTop = {
  initial: { opacity: 0, y: -20 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.4 } },
  exit: { opacity: 0, y: -20, transition: { duration: 0.3 } },
};

const Join: React.FC = () => {
  const [mode, setMode] = useState<"login" | "register" | "forgot">("login");

  return (
    <div className="w-full flex justify-center items-center pt-25 lg:pt-[2rem] min-h-[80vh]">
      <AnimatePresence mode="wait">
        {mode === "login" && (
          <motion.div
            key="login"
            variants={fadeFromTop}
            initial="initial"
            animate="animate"
            exit="exit"
            className="flex justify-center w-full md:w-1/2 lg:w-[40%]"
          >
            <LoginForm
              showRegister={() => setMode("register")}
              showForgetPassword={() => setMode("forgot")}
            />
          </motion.div>
        )}

        {mode === "register" && (
          <motion.div
            key="register"
            variants={fadeFromTop}
            initial="initial"
            animate="animate"
            exit="exit"
            className="w-full lg:w-[90%] flex justify-center"
          >
            <RegisterForm shouldShowLogin={() => setMode("login")} />
          </motion.div>
        )}

        {mode === "forgot" && (
          <motion.div
            key="forgot"
            variants={fadeFromTop}
            initial="initial"
            animate="animate"
            exit="exit"
            className="flex justify-center w-full md:w-1/2 lg:w-[40%]"
          >
            <ForgotPasswordForm shouldShowLogin={() => setMode("login")} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Join;
