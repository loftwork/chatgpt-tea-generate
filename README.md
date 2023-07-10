# お茶ブレンドAI「茶っとGPT」
お茶ブレンドAI「茶っとGPT」を使用するための環境構築手順書です。

## はじめに
これは OpenAI API と Next.js を使用し、体調を入力するとその人にあったブレンドと茶葉の量、抽出時間、お湯の温度を提案してくれるサービスです。

## 事前準備
アプリを動作させるにあたり、下記を使用します。
必要に応じてインストールを実施してください。

```
・ Node.js
・ Yarn
```
また、ChatGPTのAPIを使用するためにOpenAIに登録し、API KEYを発行する必要があります。
API KEYが漏洩してしまうと第3者からAPIを使用されてしまい、高額な料金が発生してしまう可能性がありますので取り扱いには注意してください。

## アプリの実行

### ① Next.js プロジェクトを作成
ターミナルを立ち上げ、プロジェクトを作成します。
chatgpt-tea-ganerateの部分は自由に決めて頂いて構いません。
```
yarn create next-app chatgpt-tea-ganerate
```
色々と選択肢が出てきますので下記のように設定します。
```
 Would you like to use TypeScript? … Yes
 Would you like to use ESLint? … Yes
 Would you like to use Tailwind CSS? … Yes
 Would you like to use `src/` directory? … Yes
 Would you like to use App Router? (recommended) … No
 Would you like to customize the default import alias? … No
```
最後にSuccess! と表示されれば OK です。

### ② srcの入れ替え
srcディレクトリに移動すると既にpagesとstylesディレクトリが作成されていますので、どちらも削除してください。
削除後、GitHubのsrcディレクトリ内にある、components、pases、styles、typesディレクトリを作成したプロジェクトのsrcディレクトリに移動してください。

### ③ imagesの格納
Publicディレクトリ内に、GitHubのimagesディレクトリを移動してください

### ④ .env.localの格納、API情報入力
.env.localファイルの中にある"YOUR OPENAI API KEY"に事前準備で作成したOpen AI APIを入力し、プロジェクトディレクトリ直下に格納してください。
```
OPENAI_API_KEY="YOUR OPENAI API KEY"
```

### ⑤ プロジェクトフォルダへ移動
先程作成したプロジェクトに移動します。
例でいうとchatgpt-tea-ganerateフォルダを作成していますので、
下記のコマンドを入力して移動します。
```
cd chatgpt-tea-ganerate
```

### ⑥ Chakra UIのインストール
下記のコマンドを実行してChakra UIをインストールします。
```
yarn add @chakra-ui/react @emotion/react @emotion/styled framer-motion
```

### ⑦ OpenAIモジュールのインストール
下記のコマンドを実行してOpenAIモジュールをインストールします。
```
yarn add openai
```

### ⑧ プログラムの実行
下記コマンドで実行します。
```
yarn dev
```
メッセージに表示されたURLである、http://localhost:3000/ にアクセスするとページが表示されます。


