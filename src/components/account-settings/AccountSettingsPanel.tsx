import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import AccountsettingsMenu from "./AccountSettingsMenu";
import PersonalDataSettingsForm from "./PersonalDataSettingsForm";
import SubscriptionSetting from "./SubscriptionSetting";
import AccountSecurityPanel from "./ChangePasswordForm";
import FaqPanel from "./FAQ";

const accountSettingsOptions: string[] = [
  "Dane osobowe",
  "Subskrybcja",
  "Zmień hasło",
  "FAQ",
];

export default function AccountSettingsPanel() {
  const [activeSetting, setActiveSetting] = useState(accountSettingsOptions[0]);

  const fadeVariant = {
    initial: { opacity: 0, y: 10 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.35 } },
    exit: { opacity: 0, y: 10, transition: { duration: 0.35 } },
  };

  return (
    <div className="flex flex-col lg:flex-row w-full h-full">
      <div className="w-full h-full lg:w-[30%] lg:border-r border-primary py-3">
        <AccountsettingsMenu
          items={accountSettingsOptions}
          activeItem={activeSetting}
          setActiveTile={setActiveSetting}
        />
      </div>

      <div className="w-full h-full p-4 overflow-hidden">
        <AnimatePresence mode="wait">
          {activeSetting === "Dane osobowe" && (
            <motion.div
              key="personal"
              variants={fadeVariant}
              initial="initial"
              animate="animate"
              exit="exit"
              className="w-full h-full overflow-y-auto scrollbar-thin scrollbar-thumb-primary scrollbar-track-transparent"
            >
              <PersonalDataSettingsForm />
            </motion.div>
          )}

          {activeSetting === "Subskrybcja" && (
            <motion.div
              key="subscription"
              variants={fadeVariant}
              initial="initial"
              animate="animate"
              exit="exit"
              className="w-full h-full overflow-y-auto scrollbar-thin scrollbar-thumb-primary scrollbar-track-transparent"
            >
              <SubscriptionSetting />
            </motion.div>
          )}

          {activeSetting === "Zmień hasło" && (
            <motion.div
              key="security"
              variants={fadeVariant}
              initial="initial"
              animate="animate"
              exit="exit"
              className="w-full h-full text-white overflow-y-auto scrollbar-thin scrollbar-thumb-primary scrollbar-track-transparent"
            >
              <AccountSecurityPanel />
            </motion.div>
          )}

          {activeSetting === "FAQ" && (
            <motion.div
              key="faq"
              variants={fadeVariant}
              initial="initial"
              animate="animate"
              exit="exit"
              className="w-full h-full overflow-y-auto scrollbar-thin scrollbar-thumb-primary scrollbar-track-transparent"
            >
              <FaqPanel />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
