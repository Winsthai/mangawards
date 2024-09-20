import { Container } from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import userService from "../../services/user";
import { User } from "../../types";
import { AxiosError } from "axios";
import UserInfo from "./UserInfo";

const isUser = (object: User | { error: string }): boolean => {
  if ("error" in object) {
    return false;
  }
  return true;
};

const UserPage = () => {
  const { id } = useParams();

  const [user, setUser] = useState<User | null | { error: string }>(null);
  const [loading, setLoading] = useState(true); // To manage loading state

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const fetchedUser = await userService.getUser(id as string);
        setUser(fetchedUser);
      } catch (error) {
        if (error instanceof AxiosError) {
          setUser(error.response!.data);
        }
      }
      setLoading(false); // Set loading to false once data is fetched
    };
    void fetchUser();
  }, [id]);

  return (
    <Container sx={{ marginTop: "20px" }}>
      {loading ? (
        <div>Loading...</div>
      ) : user ? (
        <>
          {isUser(user) ? (
            <UserInfo user={user as User}></UserInfo>
          ) : (
            <>Author with id {id} does not exist</>
          )}
        </>
      ) : (
        <>Could not retrieve data</>
      )}
    </Container>
  );
};

export default UserPage;
