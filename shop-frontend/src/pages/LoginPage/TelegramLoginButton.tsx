// import React, { useEffect } from "react";

// interface TelegramUser {
//   id: number;
//   first_name: string;
//   last_name?: string;
//   username?: string;
//   photo_url?: string;
//   auth_date: number;
//   hash: string;
// }

// interface TelegramLoginButtonProps {
//   setAuthorized: (flag: boolean) => void;
// }

// const TelegramLoginButton = (props: TelegramLoginButtonProps) => {
//   const { setAuthorized } = props;
//   const botId = "7839701543:AAGt-GKeRAn3wplFAkW-GgS4s1JZ0CqFUCc";
//   const origin = encodeURIComponent(window.location.origin);
//   const returnUrl = encodeURIComponent(window.location.origin + "/login");

//   console.log(returnUrl);

//   useEffect(() => {
//     window.onTelegramAuth = (user: TelegramUser) => {
//       console.log("Telegram auth response:", user);
//     };

//     return () => {
//       delete window.onTelegramAuth;
//     };
//   }, [setAuthorized]);

//   const authUrl = `https://oauth.telegram.org/auth?bot_id=${botId}&origin=${origin}&return_to=${returnUrl}&request_access=write`;

//   return (
//     <a href={authUrl} style={{ textDecoration: "none" }}>
//       <button
//         style={{
//           display: "flex",
//           alignItems: "center",
//           gap: "8px",
//           padding: "10px 20px",
//           border: "none",
//           borderRadius: "5px",
//           backgroundColor: "#0088cc",
//           color: "#fff",
//           cursor: "pointer",
//         }}
//       >
//         <img
//           src="https://upload.wikimedia.org/wikipedia/commons/8/82/Telegram_logo.svg"
//           alt="Telegram"
//           style={{ width: "20px", height: "20px" }}
//         />
//         Login with Telegram
//       </button>
//     </a>
//   );
// };

// export default TelegramLoginButton;
