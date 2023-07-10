import { Box, Center } from '@chakra-ui/react'
import Head from 'next/head'
import { ReactNode } from 'react'
type Props = {
  children: ReactNode
}

export default function Layout({ children }: Props) {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta
          key="og:description"
          property="og:description"
        />
        <link rel="icon" href="/images/greentea.png" />
      </Head>
        <Box flexGrow={1}>{children}</Box>
        <Box flexGrow={0} textAlign="center" bg="green.300" p={8}>
          <Center>
            &copy;{' '}
            <a
              href="https://loftwork.com/"
              target="_blank"
              rel="nofollow noopener me"
              style={{ textDecoration: 'underline' }}
              color="subtle"
            >
            2023 Loftwork Inc. 
            </a>
          </Center>
        </Box>
    </>
  )
}
