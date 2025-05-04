import { Box } from '@mui/material';
import BasicStructure from '../../../../Components/Pagecomponents/Academic/ClassTeacher/BasicStructure';
import { ClassTeacherProvider } from '@/Components/Pagecomponents/Academic/ClassTeacher/ClassTeacherContext';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import ClassTeacherTable from '@/Components/Pagecomponents/Academic/ClassTeacher/ClassTeacherTable';

const session = await getServerSession(authOptions);
const accessToken = session?.user?.data?.token?.access;

const fetchData = async (endpoint, accessToken) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_HOST}${endpoint}`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  const fetchingData = await res.json();
  return fetchingData;
};

const ClassTeacher = async () => {
  try {
    const versionData = await fetchData('/academic/api/version/list', accessToken);
    const sessionData = await fetchData('/academic/api/session/list', accessToken);
    const sectionData = await fetchData('/academic/api/section/list', accessToken);
    const classData = await fetchData('/academic/api/class/list', accessToken);
    const groupData = await fetchData('/academic/api/group', accessToken);
    const teacherData = await fetchData('/staff/api/teacher/list', accessToken);

    return (
      <Box>
        <ClassTeacherProvider>
          <BasicStructure
            session={session}
            versionData={versionData?.data}
            sessionData={sessionData?.data}
            classData={classData?.data}
            sectionData={sectionData?.data}
            groupData={groupData?.data}
            teacherData={teacherData?.data}
          />
          <ClassTeacherTable
            session={session}
            versionData={versionData?.data}
            sessionData={sessionData?.data}
            classData={classData?.data}
            sectionData={sectionData?.data}
            groupData={groupData?.data}
            teacherData={teacherData?.data}
          />
        </ClassTeacherProvider>
      </Box>
    );
  } catch (error) {
    console.log('err', error.message);
  }
};

export default ClassTeacher;
