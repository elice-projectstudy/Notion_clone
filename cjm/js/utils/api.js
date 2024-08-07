export const API_END_POINT = "https://kdt-frontend.programmers.co.kr";

export const request = async (url, options = {}) => {
  try {
    const res = await fetch(`${API_END_POINT}${url}`, {
      ...options,
      headers: {
        "Content-Type": "application/json",
        "x-username": "Jeongmin",
      },
    });
    if (res.ok) {
      const json = await res.json();
      return json;
    }
    throw new Error("삭제된 페이지입니다.");
  } catch (error) {
    alert(error.message);
  }
};
