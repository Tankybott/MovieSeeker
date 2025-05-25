import AccountSettingsPanel from "../../components/account-settings/AccountSettingsPanel";

const AccountSettings: React.FC = () => {
  return (
    <div className="w-full flex justify-center items-center pt-25 3xl:h-[80vh]">
      <div className="w-full lg:w-90% lg:h-[90vh] 2xl:w-[70%] 2xl:h-[70vh] 3xl:h-[60vh] border border-primary rounded-3xl shadow-[0_0_10px_#7308B0] mt-10">
        <AccountSettingsPanel />
      </div>
    </div>
  );
};

export default AccountSettings;
