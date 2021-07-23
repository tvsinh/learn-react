import userApi from 'api/userApi';
import { useEffect, useState } from 'react';

export default function useUserCurrent() {
  const [userCurrent, setUserCurrent] = useState({});
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const userMe = await userApi.getInfor();
        setUserCurrent(userMe);
      } catch (error) {
        console.log(error);
      }
    })();
    setLoading(false);
  }, []);
  return { userCurrent, loading };
}
