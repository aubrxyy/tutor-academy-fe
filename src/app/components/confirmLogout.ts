import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";

export async function confirmLogout() {
  const result = await Swal.fire({
    title: "Log out?",
    text: "You will need to sign in again to access your dashboard.",
    icon: "question",
    showCancelButton: true,
    confirmButtonText: "Log out",
    cancelButtonText: "Stay signed in",
    confirmButtonColor: "#0A1B45",
    cancelButtonColor: "#308279",
    reverseButtons: true,
    background: "#FFFFFF",
    color: "#0A1B45",
    iconColor: "#308279",
    customClass: {
      popup:
        "rounded-[1.5rem] border border-[#D8E5E9] shadow-[0_24px_64px_rgba(10,27,69,0.18)]",
      title: "text-[#0A1B45]",
      htmlContainer: "text-[#476074]",
      confirmButton: "rounded-xl px-5 py-2.5 font-semibold",
      cancelButton: "rounded-xl px-5 py-2.5 font-semibold text-white",
    },
  });

  return result.isConfirmed;
}
