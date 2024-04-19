import { useState, useEffect } from "react";
import Cookies from "js-cookie";

// Define a generic hook to manage a specific cookie
// function useCookie<T>(
//   name: string,
//   initialValue: T
// ): [T, (newValue: T) => void] {
//   // Helper function to read the cookie value or use the initial value
//   const getCookie = (): T => {
//     const cookie = Cookies.get(name);
//     return cookie ? JSON.parse(cookie) : initialValue;
//   };

//   // State to store the cookie value
//   const [value, setValue] = useState<T>(getCookie());

//   // Effect to update the cookie whenever the value changes
//   useEffect(() => {
//     Cookies.set(name, JSON.stringify(value), {
//       expires: 30,
//       secure: true,
//       sameSite: "Strict",
//     });
//   }, [name, value]);

//   return [value, setValue];
// }

// export default useCookie;

function useCookie<T>(
  name: string,
  initialValue: T
): [T, (newValue: T) => void] {
  const getCookie = (): T => {
    const cookie = Cookies.get(name);
    if (cookie) {
      try {
        return JSON.parse(cookie);
      } catch (error) {
        // Fallback for plain string values that are not in JSON format.
        return cookie as unknown as T;
      }
    }
    return initialValue;
  };

  const [value, setValue] = useState<T>(getCookie());

  useEffect(() => {
    Cookies.set(name, JSON.stringify(value), {
      expires: 30,
      secure: true,
      sameSite: "Strict",
    });
  }, [name, value]);

  return [value, setValue];
}

export default useCookie;
