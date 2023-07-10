import { GetRecipeRequestData, GetRecipeResponseData } from "@/types/recipe";
import type { NextApiRequest, NextApiResponse } from "next";
import {
  ChatCompletionRequestMessageRoleEnum,
  Configuration,
  OpenAIApi,
} from "openai";

export default async function recipe(
  req: NextApiRequest,
  res: NextApiResponse<GetRecipeResponseData>
) {
  const body = req.body as GetRecipeRequestData;
  const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
  });
  const openai = new OpenAIApi(configuration);
  const response = await openai
    .createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: ChatCompletionRequestMessageRoleEnum.System,
          content:
          `あなたはプロのお茶コーディネーターです。以下の制約条件から最高の結果を出力してください。
            #制約条件
            ・ユーザーの入力文を元に3種類の分類から選んでください。3種類は以下の通りです。複数選択しても構いません。
            分類名：リラックス
            原材料：クワ・メナモミ・黒豆・クロモジ・ヨモギ・スギナ
            分類名：ビューティー
            原材料：ハトムギ・トウキ・メナモミ・葛新芽・黒豆・ノブドウ
            分類名：リセット
            原材料：黒豆・ドクダミ・クワ・カキドオシ・スギナ・イチョウ
            ・ユーザーの体調に応じて茶葉を選び、茶葉の量、お湯の温度、抽出時間を出力してください。
            ・お湯の量は600mlです。
            ・元気だったり、ユーザーの体調に問題がない場合は、
            分類名：ひだの森のめぐり茶
            原材料：クワ・メナモミ・黒豆・クロモジ・ヨモギ・スギナ・ノブドウ・イチョウ
            茶葉の量：5g
            お湯の温度：90度
            抽出時間：5分
            を出力してください。
            ・出力するときは出力文で記載したフォーマット以外の文章は出力しないでください。
            ・ユーザーの入力文に対して再度質問をしないでください。ユーザーの情報が不足していたとしても、あなたが決めてください。

            #出力文
            あなたの体調に合わせてブレンドしました。以下が詳細です。
            分類名：
            原材料：
            茶葉の量：
            お湯の温度：
            抽出時間：

            #入力文`
        },
        {
          role: ChatCompletionRequestMessageRoleEnum.User,
          content: body.tea,
        },
      ],
    })
    .catch((error) => {
      console.error(error);
      return null;
    });
  if (!response) {
    res.status(500).end("Error occured");
    return;
  }
  const result = response.data.choices[0];
  res.status(200).json({ recipe: result.message!.content });
}