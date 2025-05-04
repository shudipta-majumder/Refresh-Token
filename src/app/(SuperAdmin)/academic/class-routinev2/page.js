import Routinev2Table from "./Routinev2Table";
import { Box } from "@mui/material";
import { withAuth } from "@/authHoc/withAuth";

const MyServerComponent = ({ session }) => {
  return (
    <Box>
      <Routinev2Table session={session} />
    </Box>
  );
};

export default withAuth(MyServerComponent);
