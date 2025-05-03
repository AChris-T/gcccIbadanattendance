import dayjs from "dayjs";
import { useState } from "react";
import { toast } from "react-toastify";

const UserAbsent = () => {
  const [loader, setLoader] = useState(false);
  const user = JSON.parse(localStorage.getItem("GCCC_ATTENDANCE"));

  const getAllUsersDataUrl = import.meta.env.VITE_APP_GET_DATA;
  const getAllUsersAttendanceURL = import.meta.env.VITE_APP_POST_DATA;
  const accessEmail =
    import.meta.env.VITE_APP_ACCESS_EMAIL || "abiodunsamyemi@gmail.com";
  const showDownloadButton = accessEmail.includes(user?.Email);

  function arrayToCSV(data) {
    const headers = data.length > 0 ? Object.keys(data[0]) : [];
    const csvRows = data.map((row) =>
      headers
        .map(
          (header) => JSON.stringify(row[header] ?? "") // Handle potential null/undefined
        )
        .join(",")
    );
    csvRows.unshift(headers.join(","));
    return csvRows.join("\n");
  }

  function downloadCSV(data, filename) {
    const csvContent = arrayToCSV(data);
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = filename || "data.csv";
    link.style.display = "none";
    document.body.appendChild(link);
    link.click();
    // Clean ups
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }

  const handleShowAbscentList = async () => {
    try {
      setLoader(true);
      // Fetch data from the first and second Google Sheets APIS endpoint
      const getAllUsers = await fetch(getAllUsersDataUrl);
      const getAllAttend = await fetch(getAllUsersAttendanceURL);

      if (getAllUsers.ok && getAllAttend.ok) {
        let AllUsers = await getAllUsers.json();
        AllUsers = AllUsers.filter((user) => user.Status == "Established");
        let AttendUsers = await getAllAttend.json();
        const currentTime = {
          day: dayjs().format("dddd"),
          time: dayjs().format("h:mm A"),
          date: dayjs().format("DD"),
          month: dayjs().format("MMM"),
          year: dayjs().format("YYYY"),
        };
        AttendUsers = AttendUsers.filter(
          (user) =>
            user.Key ==
            `${currentTime.day}-${currentTime.date}-${currentTime.month}-${currentTime.year}`
        );

        const presentUsersEmail = new Set(
          AttendUsers.map((user) => user.Email || `0${user.Phone}`)
        );
        console.log({ presentUsersEmail });

        const absentUsers = AllUsers.filter(
          (user) =>
            !presentUsersEmail.has(user.Email) &&
            !presentUsersEmail.has(user.Phone)
        );
        console.log({ absentUsers });

        const filename = `absent-members-${new Date().toString()}`;
        downloadCSV(absentUsers, filename);

        toast.success("success");
      } else {
        toast.success("Error");
      }
      setLoader(false);
    } catch (error) {
      setLoader(false);
      toast.error(error);
    }
  };

  return (
    <div>
      {showDownloadButton ? (
        <button
          onClick={handleShowAbscentList}
          className="px-5 py-4  rounded-[2px] bg-[#0094D3] leading-6 text-[16px] font-medium text-[white]"
        >
          {loader && <span>Loading...</span>}
          {!loader && <span> Download Absent Members List</span>}
        </button>
      ) : null}
    </div>
  );
};

export default UserAbsent;
