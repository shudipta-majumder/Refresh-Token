import { Box } from '@mui/system'
import React from 'react'
import RefreshAccess from "../../../../Components/Pagecomponents/RefreshAccess/RefreshAccess"
import { getServerSession } from "next-auth/next";
import { authOptions } from "../../../api/auth/[...nextauth]/route";

const page = async () => {
  const session = await getServerSession(authOptions);
  return (
    <Box>
      <RefreshAccess serverSession={session}/>
    </Box>
  )
}

export default page
