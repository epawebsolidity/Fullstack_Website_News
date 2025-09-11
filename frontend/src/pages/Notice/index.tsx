import React, { useState } from "react";

interface NoticeItem {
  id: number;
  title: string;
  date: string;
  description: string;
}

const notices: NoticeItem[] = [
  {
    id: 1,
    title: "Pemberitahuan",
    date: "2025-08-28",
    description: "Berita anda sudah terkonfirmasi oleh admin",
  },
  {
    id: 2,
    title: "Pemberitahuan",
    date: "2025-08-28",
    description: "Berhasil Mengajukan Berita Kepada admin",
  },
  {
    id: 3,
    title: "Pemberitahuan",
    date: "2025-08-28",
    description: "Berita anda sudah terkonfirmasi oleh admin",
  },
  {
    id: 4,
    title: "Pemberitahuan",
    date: "2025-08-28",
    description: "Berhasil Mengajukan Berita Kepada admin",
  },
  {
    id: 5,
    title: "Pemberitahuan",
    date: "2025-08-28",
    description: "Berita anda sudah terkonfirmasi oleh admin",
  },
  {
    id: 6,
    title: "Pemberitahuan",
    date: "2025-08-28",
    description: "Berhasil Mengajukan Berita Kepada admin",
  },
];

const CalendarIcon = () => (
  <svg
    className="w-4 h-4 sm:w-5 sm:h-5 text-gray-500"
    fill="none"
    stroke="currentColor"
    strokeWidth={2}
    viewBox="0 0 24 24"
    aria-hidden="true"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
    />
  </svg>
);

const BellIcon = () => (
  <svg
    className="w-5 h-5 sm:w-6 sm:h-6 text-purple-600 mr-2 flex-shrink-0"
    fill="none"
    stroke="currentColor"
    strokeWidth={2}
    viewBox="0 0 24 24"
    aria-hidden="true"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6 6 0 10-12 0v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
    />
  </svg>
);

const Notice: React.FC = () => {
  const [expandedIds, setExpandedIds] = useState<number[]>([]);

  const toggleExpand = (id: number) => {
    setExpandedIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-50 via-white to-purple-50 p-4 sm:p-6 md:p-12 pt-24 font-sans">
      <div className="max-w-6xl mx-auto">
        <h1
          className="text-1xl md:text-1xl text-gray-900 mb-4 tracking-wide 
               text-left
               "
        >
          Pemberitahuan
        </h1>

        <ul className="space-y-6 sm:space-y-8">
          {notices.map(({ id, title, date, description }) => {
            const isExpanded = expandedIds.includes(id);
            const shortDesc =
              description.length > 120
                ? description.slice(0, 120) + "..."
                : description;

            return (
              <li
                key={id}
                tabIndex={0}
                role="button"
                aria-expanded={isExpanded}
                onClick={() => toggleExpand(id)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    toggleExpand(id);
                  }
                }}
                className="bg-white rounded-xl border border-transparent cursor-pointer p-4 sm:p-6 shadow-md transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-purple-300 relative z-0"
                style={{ position: "relative", zIndex: 0 }}
              >
                <div className="flex justify-between items-center mb-2 sm:mb-3 relative z-10">
                  <h2 className="text-lg sm:text-xl font-semibold text-gray-900 flex items-center">
                    <BellIcon />
                    {title}
                  </h2>
                  <div className="flex items-center space-x-1 sm:space-x-2 text-gray-500 text-xs sm:text-sm select-none relative z-10">
                    <CalendarIcon />
                    <time>
                      {new Date(date).toLocaleDateString("id-ID", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </time>
                  </div>
                </div>
                <p className="text-gray-700 leading-relaxed relative z-10 text-sm sm:text-base">
                  {isExpanded ? description : shortDesc}
                </p>
                {description.length > 120 && (
                  <button
                    className="mt-2 sm:mt-3 text-purple-600 hover:text-purple-800 font-semibold focus:outline-none relative z-10 text-sm sm:text-base"
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleExpand(id);
                    }}
                    aria-label={
                      isExpanded
                        ? "Sembunyikan deskripsi"
                        : "Tampilkan deskripsi lengkap"
                    }
                  >
                    {isExpanded
                      ? "Tampilkan lebih sedikit ▲"
                      : "Baca lebih lanjut ▼"}
                  </button>
                )}
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default Notice;

// import React, { useState, useEffect } from "react";

// interface ConfirmationNoticeProps {
//   message?: string;
//   onClose?: () => void;
//   duration?: number; // dalam ms
// }

// const ConfirmationNotice: React.FC<ConfirmationNoticeProps> = ({
//   message = "Permintaan berita Anda sudah dikonfirmasi!",
//   onClose,
//   duration = 4000,
// }) => {
//   const [visible, setVisible] = useState(true);

//   useEffect(() => {
//     const timer = setTimeout(() => {
//       setVisible(false);
//       onClose && onClose();
//     }, duration);

//     return () => clearTimeout(timer);
//   }, [duration, onClose]);

//   if (!visible) return null;

//   return (
//     <div className="fixed top-5 right-5 max-w-sm bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded shadow-lg flex items-center space-x-3 animate-slide-in z-50">
//       <svg
//         className="w-6 h-6 flex-shrink-0"
//         fill="none"
//         stroke="currentColor"
//         strokeWidth="2"
//         viewBox="0 0 24 24"
//         xmlns="http://www.w3.org/2000/svg"
//       >
//         <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
//       </svg>
//       <div className="flex-1">
//         <p className="font-semibold">{message}</p>
//       </div>
//       <button
//         aria-label="Close notification"
//         onClick={() => {
//           setVisible(false);
//           onClose && onClose();
//         }}
//         className="text-green-700 hover:text-green-900 focus:outline-none"
//       >
//         &#10005;
//       </button>
//     </div>
//   );
// };

// export default ConfirmationNotice;
