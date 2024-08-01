import Link from "next/link";
import Image from 'next/image';
import NavLinks from "@/app/ui/nav-links";
import PowerSettingsNewIcon from "@mui/icons-material/PowerSettingsNew";
import Dialog from "@/app/ui/dialog";
import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
export default function SideNav() {
  const [dialogVisible, setDialogVisible] = useState<boolean>(false);
  const router = useRouter();
  const handleLogOut = () => {
    localStorage.clear();
    setDialogVisible(false);
    toast.success("Signed Out!");
    router.push("/login");
  };
  return (
    <div className="flex h-full flex-col px-3 py-4 md:px-2">
      <Link
        className="mb-2 flex h-[180px] items-center justify-center rounded-md bg-cover bg-center p-4 "
        href="/dashboard"
        style={{
          backgroundImage: `url('/img/logo1.jpg')`, 
        }}
      >
        <div className="h-[200px] md:w-40">
          
        </div>
      </Link>
      <div className="flex grow flex-row justify-between space-x-2 md:flex-col md:space-x-0 md:space-y-2">
        <NavLinks />
        <div className="hidden h-auto w-full grow rounded-md bg-gray-50 md:block"></div>

        <button
          className="flex h-[48px] w-full grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3"
          onClick={() => setDialogVisible(true)}
        >
          <div className="hidden md:block">
            <PowerSettingsNewIcon fontSize="small" /> SIGN OUT
          </div>
        </button>

        <Dialog
          title={
            <>
              <ErrorOutlineIcon color="warning" className="pb-1" /> SIGN OUT
            </>
          }
          visible={dialogVisible}
          setVisible={setDialogVisible}
          handleConfirm={handleLogOut}
          content="Are you sure to exit?"
        />
      </div>
    </div>
  );
}
