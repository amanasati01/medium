import axios from "axios";
import { BACKEND_URL } from "../../config";
import { useEffect, useState } from "react";

interface Blog {
  title: string;
  content: string;
  id: string;
  author: {
    name: string;
  };
}

export const useBlogs = () => {
  const [loading, setLoading] = useState(true);
  const [blogs, setBlogs] = useState<Blog[]>([]);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      axios.get(`${BACKEND_URL}/api/v1/blog/bulk`, {
        headers: {
          Authorization: `Bearer ${token}`  // Ensure correct formatting here
        }
      })
        .then((res) => {
          setBlogs(res.data.blogs); // Make sure this matches the structure of your response
          setLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching blogs:", error);
          setLoading(false);
        });
    } else {
      console.log("No token found in localStorage.");
      setLoading(false);
    }
  }, []);

  return {
    loading,
    blogs,
  };
};
