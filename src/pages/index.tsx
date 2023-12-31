import {
  Box,
  Center,
  Container,
  Image,
  Spinner,
  Text,
  Textarea,
  Heading,
} from '@chakra-ui/react'
import { GetRecipeRequestData, GetRecipeResponseData } from "@/types/recipe";
import Head from "next/head";
import { FormEvent, useCallback, useState } from 'react'

export default function Home() {
  const [tea, setTea] = useState("");
  const [recipe, setRecipe] = useState("");
  const [isSending, setIsSending] = useState(false);
  const onSubmit = useCallback(
    async (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      setIsSending(true);
      const data: GetRecipeRequestData = { tea };
      const response = await fetch("/api/recipe", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }).catch((error) => {
        console.error(error);
        return null;
      });
      setIsSending(false);
      if (!response) {
        alert("エラーが発生しました。");
        return;
      }
      const responseData: GetRecipeResponseData = await response.json();
      setRecipe(responseData.recipe);
    },
    [tea]
  );
  return (
    <Box
    w='100%'
    h='100%'
    bgGradient={[
      'linear(to-tr, teal.300, yellow.400)',
      'linear(to-t, blue.200, teal.500)',
      'linear(to-b, orange.100, green.300)',
    ]}
    >
      <Head>
        <title>Personal Tea Generete App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Container>
        <Heading 
          bgGradient='linear(to-r, teal.500, green.500)'
          bgClip='text'
          fontSize='6xl'
          fontWeight='extrabold'
          textAlign="center"
          pt={4}>
            茶っとGPT
        </Heading>
        <Text mt={4} textAlign='center' fontWeight='extrabold' fontSize='md' color='gray' pt={4}>
          あなたの体調に合わせてAIが最適なお茶を提供します
        </Text>
        <Center>
          <Image src="/images/greentea.png" alt="" maxHeight={240} pt={4}/>
        </Center>
        <form onSubmit={onSubmit}>
          <Box mt={8}>
            <Textarea
              name="tea"
              rows={8}
              value={tea}
              onChange={(e) => setTea(e.target.value)}
              isInvalid
              errorBorderColor='whiteAlpha.600'
              focusBorderColor='whatsapp.600'
              placeholder={`頭が痛いです。また、お腹の調子も良くないです。`}
              fontWeight='medium'
              required
            />
          </Box>
          <Box mt={4}>
            {isSending ? (
              <Center>
                <Spinner
                  mt={2}
                  thickness='4px'
                  speed='0.65s'
                  //emptyColor='gray.100'
                  color='gray.300'
                  size='xl'
                />
              </Center>
              ) : (
              <Center>    
              <Box
                as='button'
                p={4}
                color='white'
                fontWeight='bold'
                borderRadius='md'
                bgGradient='linear(to-r, teal.500, green.500)'
                _hover={{
                  bgGradient: 'linear(to-r, red.500, yellow.500)',
                }}
              >
                Generete
              </Box>
              </Center>
            )}
          </Box>
          {recipe !== "" && (
            <Box mt={8} whiteSpace="pre-wrap" wordBreak="break-word">
              {recipe}
            </Box>
          )}         
        </form>
      </Container>
    </Box>
  )
}