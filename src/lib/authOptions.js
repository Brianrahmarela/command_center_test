import CredentialsProvider from "next-auth/providers/credentials"
import dayjs from "dayjs";

async function refreshAccessToken(token) {
  console.log('token refresh', token)
  if(token){
    try {
      const url = `${process.env.NEXT_PUBLIC_API_BASE_URL}/refresh-token`;
  
      const response = await fetch(url, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token.refresh_token} `
        },
        method: 'POST',
        body: JSON.stringify({ email: token.email, }),
      });
      console.log('response', response)
  
      const user = await response.json();
      console.log('res user refresh token =>', user)
      
      if (!response.ok) {
        throw user;
      }
      return {
        ...token,
            id: user.data.content[0]?.id,
            email: user.data.content[0]?.email,
            role: user.data.content[0]?.role,
            access_token: user.data.content[0]?.access_token,
            refresh_token: user.data.content[0]?.refresh_token,
            exp: user.data.content[0]?.expired_access_token,
            exp_datetime: user.data.content[0]?.expired_access_token_string
      };
    } catch (error) {
      // console.log('error', error);
      return {
        ...token,
        error: 'RefreshAccessTokenError',
      };
    }
  }
  
}

const authOptions = {
  // Configure one or more authentication providers
  providers: [
    CredentialsProvider({
      name: "Credentials",
    
      credentials: {
        email: { label: "Email", type: "email"},
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/auth`,
          {
            method: 'POST',
            body: JSON.stringify(credentials),
            headers: { 'Content-Type': 'application/json' },
          }
        );
        const user = await res.json();

        if (res.ok && user) {
          return user.data;
        } else {
          const error = user.meta.message;
          throw new Error(error);
        }
      }
    })
  ],
  pages: {
    signIn: '/login',
  },
  callbacks: {
    async jwt({ token, user}) {
      
      if (user) {
        return {
          ...token,
          id: user.content[0]?.id,
          email: user.content[0]?.email,
          role: user.content[0]?.role,
          access_token: user.content[0]?.access_token,
          refresh_token: user.content[0]?.refresh_token,
          exp: user.content[0]?.expired_access_token,
          exp_datetime: user.content[0]?.expired_access_token_string
        }
      }
      // console.log('token in jwt', token)
      let exp_token_date = token.exp_datetime;
      
      let date = Date.now() / 1000
      let dateNow = dayjs.unix(date).format('D/M/YYYY HH.mm.ss');

      if (exp_token_date >= dateNow) {
        console.log('Token has valid');
        return token;
      } else{
        console.log('Token has invalid');
        console.log('token refreshed....');
        return await refreshAccessToken(token);
      }
    },
    async session({ session, token }) {
      console.log('token in session', token)
      const timestamp = token.exp_datetime;
      session.user = token;
      session.expires = timestamp;
      session.error = token.error
      console.log('SESSION bwh', session)
      return session;
    },
  },
}

export default authOptions