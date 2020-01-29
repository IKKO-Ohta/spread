# 対戦管理・分析アプリケーション spread をセルフホスティングしよう

 こんにちは！ 太田 一行(@samayotta)です。  
 
 今回はMixi Tech Noteのスペースをお借りして、私が作成したアプリケーション spread の紹介をさせていただける機会を得ました。簡単に紹介すると、このアプリケーションは対人ゲーム（特にTCG/DCG カードゲーム）の対戦記録をチームで管理共有し、結果を分析するためのオープンソースソフトウェアです。この記事では本アプリケーションを内容と技術の面から紹介し、さらにセルフホスティングする手順を紹介するものです。   
 

## 対戦管理・分析アプリケーション spread について

 ### イントロダクション

  いま、カードゲームの世界には大きな変化が訪れています。e-sportsの流行を背景に、非常に多くの人がカードゲームをプレイしています。１０万ドル単位の高額な報酬が用意されたゲームも少なくありません。プレイヤーたちはみな、インターネットで調べた情報をもとに、勝てる流行のデッキを選択する傾向を強くしています。そして流行は瞬く間に移り変わります。そのなかを勝ち抜くには、オリジナルデッキを構築して鍛え上げていくのと同じくらい、 流動的なメタゲームを俯瞰して分析・把握できる力、すなわち（あればサイドボーディングも含めて）流行に対してもっとも優れたデッキを選べる力が、トーナメントシーンでは求められるようになってきています。
 
  ひとつの解決策として考えられるのは、いわゆる「チーム制」です。限られた複数人数で網羅的にゲームをプレイし、メタゲームをしらみ潰しに解析しようとする動きと言い換えられます。たとえば、MTGのトッププロ・プレイヤーである佐藤レイ選手は、自身の対戦コミュニティで[Google スプレッドシートを利用し対戦成績を集めている](https://twitter.com/r_0310/status/1102829047472521216)ことで知られています。氏が利用しているシートの形式は一般に公開されており、誰でも利用可能です。
  
  私はこのアイデアに納得し、早速自分でも取り入れようとしましたが、すぐに挫折してしまいました。課題として感じたのは次のようなことです。
  
  -  例えばカードショップで対戦終了したとき、スマートフォンから気軽に編集できない
  -  カードゲーム全般に使用できるような一般性を持った仕組みになっていない
  -  スプレッドシートよりも優れたユーザ体験を提供したい

  こういう理由で作成したのがspreadです。スマートフォンから気軽に対戦結果を投稿でき、カードゲーム全般に使用できるような一般性を備えています。ユーザ体験の点でいうと、アプリ化の恩恵でスマートフォンで操作しやすくなっている点は明確にプラスと考えています。もちろん、Google スプレッドシートで実現できていた閲覧管理（見せる人を制限する）機能や、集計する機能を備えています。
  
 ### なにができるか 

 #### 1. 対戦記録の投稿   

 これが対戦記録の投稿画面、結果が格納されたページです。

![スクリーンショット 2020-01-26 23 26 53](https://user-images.githubusercontent.com/27924055/73136728-20ed9500-4094-11ea-9e28-ad1a8c561bf8.png)

 - 対戦カードに記入し、どんどんストックしていく方式です。
 - デッキをいくつでも登録できます。
 - Gmailアカウントを通じて招待したユーザとシートを共有できます。
 - ゲームに応じてBO1/BO3が切り替わります。

 #### 2. 対戦記録の分析

 これが分析のためのページです。

![スクリーンショット 2020-01-26 23 16 07](https://user-images.githubusercontent.com/27924055/73136727-20ed9500-4094-11ea-918c-44d4e8a0bbb0.png)

 - 記録した対戦カードに基づき、デッキ パフォーマンスを測定します。
 - デッキ　パフォーマンスはし、そのデッキがどれくらい勝っているかを色の濃淡で示します。内部的には仮説:勝率５０％をそれぞれ棄却率20%, 10%, 5%で両側検定し、その結果によって色を出し分けています（例えば棄却率5%の＋側で棄却されれば最も濃い緑）。


 ### スクリーンショット

 ### ホスティングについて
 spreadはサーバ用のものも含めて全てのソースコードがMITライセンスのもとで公開されています。また、僕自身がホスティングしたサイト (URL）にアクセスして完全無料で利用できます。しかしもちろん、自分でホスティングすることもできます。たとえば独自カスタマイズを施したspreadを使用したい場合、ホスト主に対戦情報等を預けたくない場合などには、自分オリジナルのspreadをホスティングする必要があるでしょう。
 この記事を読むと、spreadを構成している技術に加えてホスティングの方法について一通りの知識を得られます。最後まで読み終えると自分だけのspread サイトを持てるようになっているはずです。

 ### ライセンス
 上述のように、このアプリケーションのライセンスはMITです。このソフトウェアは完全に無料に使用でき、許諾なしに改造できます。有償で販売しても構いません。ただし、著作権表示は目立つように明記しなければなりません。またソフトウェアの利用にあたって、作者である私(@samayotta)は一切の責任を負いません。

## spreadの技術的概要

もっとも端的にspreadについて説明すると、**バックエンドにFirestoreを採用したサーバレス Nuxt.js シングルページアプリケーション** です。アプリケーションをホスティングするにあたって必ずしもフロントエンドの知識は必要ありませんので、参考程度で十分です。逆に利用者の情報を守るため**バックエンドのセキュリティについては注意して読むようにしてください**。

### フロントエンド: Nuxt.js

Nuxt.jsは、フロントエンドフレームワークの一つで、Vue.jsによるウェブアプリ制作を洗練されたアーキテクチャで行えるようにするものです。ReactによるNext.jsについで人気のあるフレームワークで、2020年1月現在、GitHubのスター数は現在24.9Kとなっています。

spreadはNuxt.jsの機能に全面的に依存して構築されています。色々な局面で面倒な作業をショートカットできるのがありがたく、開発にかかる時間を大幅に短縮できています。また、優れたアーキテクチャのおかげでリポジトリの状態をクリーンに保ち続けることができること、Nuxt.js（というかフロントエンド フルスタックフレームワーク全般）に知見のあるエンジニアであれば全体をすぐに把握できることなどのメリットも重要です。

Nuxt.jsに、さらに次の２点を加えて開発効率を向上させています。

1. TypeScriptによる型安全化  
 リーダビリティの高さ、VS Codeによる強力な補完機能、プログラミング中の思考が型という抽象的な次元でより整理されることなどのメリットから、もはやTypeScriptなしの実装はありえないと考えています。さらに、Spreadでは各種decoratorライブラリを用いて型安全の度合いを高めています。
    - vue-property-decorator  
      クラススタイルVueをTypeScriptとして扱うためのデコレータライブラリで、特に`@Prop`や`@Emit`などの情報を型安全に取り扱うのに貢献します。オリジナルの記法は`data`プロパティの管理が面倒だし、コードのルックスがReactと似て多くの人にとっつきやすいなどの理由で、クラススタイルVueの採用自体は迷わず決めていました。
    - vuex-property-decorator  
      VuexをTypeScriptとして扱うためのライブラリです。Vuexストアを型安全に作成すること、Vuexクラスのメソッドをアノテートして`Mutation`や`Action`についての性質を維持すること（Vuexのメソッドに本来的な役割を維持させること）、`getModules`を利用して型安全にそして補完可能な仕方でコード中にVuexを呼び出せることなどから、TypeScriptの良さを活かせると考えています。spreadの実装では、ページコンポーネントの一番ベースのMixinに、`getModules`経由で取得した各ストアへのアクセサを登録しています。
  
2. Vuexのクリーンな利用  
 いわゆる`クリーンアーキテクチャ`をゆるく採用しています。Vuexにはビジネスロジックに関連する情報を保持するようにし、Firestoreとの通信部分（データベースの更新、API通信）も全てこれに集約するようにしています。propsバケツリレーを減らす、コンポーネント単位での単体テストをより楽にする、また通信部分の改変をやりやすくするなどの恩恵が受けられます。

紙面の関係上フロントエンドの実際のコードは紹介しませんが、上記の内容を把握した上でコードを読んでいただくとより全体が見通しやすいと考えています。

 footnote: SSR不採用について  
 なお、Nuxt.js は **サーバサイド レンダリング** をVue.jsで容易に実装できる点でも注目されています。   
 **サーバサイド レンダリング** とは、ざっくりとした説明では、事前にサーバとしてHTMLを作成し送信、それを追いかけるようにブラウザ内でJavaScriptの一部を読み込み動的な振る舞いを行えるようにするレンダリング方法です。ユーザは一足先にHTMLの文章を読めるので何らかの意味のあるコンテンツにアクセスできるまでの時間(**Time To Content**)が短縮できます。ただしspreadでは、Time To Contentの改善が要件上クリティカルでなく、必然的にレンダリングを行うためのNode.js サーバを要求し運営する手間が増えるので、この機能を採用しませんでした。

### バックエンド: Firestore

spreadは"サーバレス"なアプリケーションですが、本当にサーバ上の処理を何にも行なっていないのかといえばそうではありません。実際、投稿されたデータの保存と取得、認証、招待メールの送信といった操作はサーバで行うのが自然です。そこで、Google Firebaseを利用して最低限必要な機能をまかなっています。

 - 現在はFirebaseの無料プランで運用しています。もしこれがいっぱいになるようなら有料プラン(Blaze)に切り替えるでしょう。世界じゅうのカードゲーム・プレイヤーが使ったと仮定してもFirebaseで賄えないような超大規模プロダクトにはなりようがないと判断しています。
 - デプロイまでFirebase Hostingに依存しています。この方法ではサーバコードやセキュリティルールをも一括でデプロイできます。サーバコードを含むこのプログラムでは、一括のデプロイは欠かせない要件だと考えています。

 #### データ構造： Firebase Cloud Firestore

 このアプリのfirestoreデータ構造は次のようになっています。
 ```
  spread---{sheetId}---games---{gameId}
 ```

 せっかくTypeScriptを利用しているので、シートおよびゲームについては**インターフェイス定義**を掲載しておきます。

 ```typescript
interface SheetInfo {
  id: string
  members: string[]
  sheetName: string
  gameTitle: GameTitle
  decks: string[]
  bestOf: BestOf
}

enum BestOf {
  Bo3 = 'BO3',
  Bo1 = 'BO1'
}
 ```

```typescript
interface GameInfo {
  id: string
  win: Result
  black: Bw
  myDeck: string | null
  oppDeck: string | null
  timestamp: string
  user: string
  describe: string
  wins?: Result[]
  blacks?: Bw[]
}

enum Result {
  win = '勝利',
  lose = '敗北'
}

enum Bw {
  black = '先手',
  white = '後手'
}
```

#### 認証: Firebase Authentification

認証にはFirebase Authentificationを用います。Authentificationは多様なログイン手段（Gmail、Facebook、Twitter etc.)をサポートし、ローカライズや見た目などのカスタマイズも簡単なサービスです。導入に必要な手順は、firebaseを設定していれば専用のライブラリを適切に設置するだけでです。

#### Firebase セキュリティ ルール

Firebase Authentificationを利用するとログイン機能を簡単に実装することができます。しかし、それと緊密に結びついているFirebase セキュリティ ルールをどのように管理するかは少しだけ複雑です。
利用者の情報を守るため、セルフホスティングを行う人はこの項目を必ず読み、自身のホスティングしたspreadに適用するようにしてください。

##### セキュリティとCloud Firestoreへのアクセス

Firebaseでは**ユーザが直接データベースにアクセスできます**。そのユーザのアクセス権限を制約するのがFirebase セキュリティ ルールです。

この実装には次の利点があります:
1. クライアント側がセキュリティの責務から解放されます。もしクライアントにバグを作り込んだままデプロイしてしまっても、データを安全なままにしておけます。
2. データベース自身がセキュリティを担っているので、橋渡しをするサーバを必要としません。

データベースへのアクセスは様々なルールによって制約されますが、[もっとも典型的な制約ルール](https://firebase.google.com/docs/rules/basics?hl=ja#all_authenticated_users) は`ユーザが認証されているかどうか` です。

```
service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read, write: if request.auth.uid != null;
    }
  }
}
```

読み書きを制約する条件として、`request.auth.uid`すなわち認証情報を利用しているのがわかるでしょう。同じように、CloudStoreに含まれる情報も制約として利用できます。

spreadでは以下の設定を推奨しています。

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /sheet/{sheetName} {
      allow read;      
      allow write: if request.auth.token.email != null
    }
    match /sheet/{sheetName}/games/{game} {
      allow read, write: if request.auth.token.email in get(/databases/$(database)/documents/sheet/$(sheetName)).data.members;
    }
  }
}
```
 - **シート** はどんなユーザも読み出すことができます。一方で、新しくシートを作成するためにはログインを必要とします。
 - **ゲーム** は特に隠さなければならない情報です。読み書きのどちらにも、そのシートのメンバーであることを要求します。

#### REST API: Firebase Cloud Functions

Firebase FunctionsはバックエンドコードをHTTPSリクエストに応じて実行するサービスです。これを用いると、REST API風の仕事をサーバなしに実行できます。

例えば次のようにコードをデプロイします：
```javascript
exports.ping = functions.https.onCall((data, context) => {
  return {text:'pong'}
});
```

クライアント側からはこのようにHttpsリクエストを行います(専用のAPIクライアントが付属しています):
```javascript
const ping = functions.functions().httpsCallable('ping')
try {
  const res = await ping()
  console.log(res.data.text) // => pong
} catch (error) {
  throw new Error('#ping ERROR')
}
```
実際にはデータベースの更新やGoogle Analyticsの結果など、Httpsリクエスト以外のトリガーを用いて関数を実行し、値を返却させることができます。Functionsからはデータベースや認証など一通りの情報を参照できるため、サーバレスアプリにおいてサーバの代役をこれでまかなえます。

spreadでは招待メールの送信にのみこれを用いていますが、例えば新しくゲームがプッシュされたときにslackに通知する機能や、データに対するバッチ処理を定期的に実行する機能などを追加できると考えられます。

## my spreadのデプロイ手順

デプロイは次の手順で行います。

1. Node.jsおよびyarnを取得します。
2. フロントエンドのコードを利用可能にします。
3. Firebaseに登録します。さらにFirebase CLIを用いて、spreadにFirebaseを追加します。
4. いくつかの設定を確認したらデプロイします。


### 1. Node.jsおよびYarnを取得
Node.jsのサポートバージョンは、2020年1月24日現在の安定版（LTS）である`12.14.1`です。`nvm`などのNode.js バージョン管理システムをお好みで使用いただくと便利かと思います。

```
$ brew install yarn --ignore-dependencies
```

- `--igonore-dependencies` オプションなしだと、brewがNode.js `12.14.1`以外のバージョンを合わせてグローバルインストールすることがあります。注意してください。

### 2. フロントエンドのコードを利用可能にする

上記の準備ができたら、さっそくspreadをクローンしましょう。
```
$ git clone https://github.com/IKKO-Ohta/spread
```

まずは依存ライブラリをインストールします。
```
$ cd spread
$ yarn install
```

この時点でテストの実行は可能になるはずです。
```
$ yarn test
```

### 3. Firebaseに登録


#### ブラウザ側操作 
今度はブラウザを開き、あなたのGmailアカウントにFirebaseを追加します。

 1. [Googleの公式サイト](https://firebase.google.com/)にアクセスし、「コンソールに移動」をクリック。「プロジェクトを作成」で新しくFirebaseプロジェクトを作成します。名前はなんでも良いですが、ここでは仮に`my-spread`としましょう。利用規約に同意したらプロジェクトが作成されます。下はコンソールトップ画面です。
![Firebaseの初期画面](https://user-images.githubusercontent.com/27924055/73252152-9d4fb780-41fd-11ea-8b5e-8741a60b61e6.png)

 2. GCP リソースロケーションを設定します。左ペインの歯車マークからセッティング画面に移動し、上のカードから自分の好きなリージョンを設定しましょう。
![スクリーンショット 2020-01-28 20 20 42](https://user-images.githubusercontent.com/27924055/73259817-f45c8900-420b-11ea-9507-979b40ad0421.png)

 3. アプリを追加します。コンソールトップ画面に戻り、中央から「ウェブ」を選びます。
アプリのニックネームも何でも良いです。`my-spread`と仮にしておきます。hostingはのちに設定しますが今は通り過ぎることとします。

「アプリを追加」をクリックすると、このアプリを利用するためのクレデンシャル情報が表示されます。  
少しエディタに戻り、`credentials`ディレクトリを作成します。  
`credentials/firebasekey.ts`というファイル名で、次のように書きます。  

```typescript
export default {
  apiKey: *** ,
  authDomain: ***,
  databaseURL: ***,
  projectId: ***,
  storageBucket: ***,
  messagingSenderId: ***,
  appId: ***,
 measurementId: ***
}
```

もちろん`export default {...}`の中身の部分はさきほどブラウザに表示されたクレデンシャル情報です。
`var firebaseConfig`に代入されているオブジェクトを`export default`するようにします。
全部終わったら「コンソール画面に進む」を押して一旦ブラウザ操作は終了です。

#### コンソール側操作
再びコンソールに戻り、Fibase CLIをダウンロードします。
```
$ yarn global add firebase-tools
```

Firebaseをspreadに設定します。個人情報の収集ほか、Firebaseの設定についていくつかの質問がおこなわれます。重要なのはproject, services, public directoryの３つで、以下のように回答してください。

```
$ firebase login
$ firebase init
  
  ... services
  => firestore, hosting, functions 
  
  ... Project Setup
  => Use an existing project => `my-spread` // プロジェクト名
  
  ... Firestore Setup 
  => // Enterでデフォルト名 `firestore.rulesを用いる
  =>　firestore.rules を上書きしない
  
  ... Functions Setup
  => TypeScript
  => TSLintを使用しない // このリポジトリはESlintによって管理されているため
  => いろいろなファイルの上書きについて質問されるが、全部上書きしない
  => Y // 依存関係のインストール

  ... Hosting Setup
  => dist // public directoryはデフォルトにせず、nuxtのgenerate先に合わせる
  => Yes // シングルページアプリケーションとして設定するか？
```

```
Firebase initialization complete!
```
と表示されたら完了です。お疲れ様でした。

- `Error: Error fetching Firestore indexes`
Firestoreはネイティブ モードを想定しています。DataStoreモードに設定されている場合は、GCP経由でネイティブモードに切り替える必要があります。FirestoreのページからGCPにアクセスして変更しましょう。

- 上書きを間違えた場合
リポジトリの`README_about_firestore_setting.md`にコードが乗っていますので、参考にしてください。
　
### 4. 初期設定ファイルの変更
 
**セキュリティルールの設定** およびfunctionsの設定を行います。
`README_about_firestore_settings.md`を見ながら、生成されたファイル`firestore.rules`および`functions/src/index.ts`を確認します。

- `firestore.rules`の設定はセキュリティ上重要です。必ず確認してください。
- `functions/src/index.ts` は招待メールを送信するための処理です。招待メールの送信元アカウントを設定します。次のようなコマンドで設定できます。
```
firebase functions:config:set gmail.email="you@gmail.com" gmail.password="your-password"
```

いよいよデプロイです。
```
$ yarn generate
$ firebase deploy
```

正常に終了したらデプロイ終了です。ホスティング先のURLが表示されます。


今後はdevelopment環境で実行することもできます。
```
$ yarn dev
```

お疲れ様でした！  
コミットしてくれる方が増えると嬉しく思います。よろしくお願いします。

