import { getServerSession } from 'next-auth';
import authOptions from './authOptions';

const useAuthSession = async () => {
const user = await getServerSession(authOptions)
return user
}

export default useAuthSession