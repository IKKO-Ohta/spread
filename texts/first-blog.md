# 対戦管理・分析アプリケーション spreadを作りました

こんにちは！ samayotta(@samayotta)です。  
対戦管理・分析アプリケーションspreadを作成したので、その紹介のブログ記事です。

## ３０秒でわかるspread
https://youtu.be/NJjMChN4rKc

対戦記録を放り込むと分析・集計してくれるサービスです。

- メタゲーム分析をいい感じにおこないます。
- スマートフォンからでも簡単に投稿できます。
- TCG・DCGやタイトルを問わずに使用できます。
- BO1 / BO3の両方に対応しています。
- 共有したい人にだけ対戦情報を共有できます。

spreadは完全に無料で利用できます。  
サイト： https://spread-samayotta.com/

- このブログの末尾にスマートフォン版スクリーンショットも掲載されています。

## なぜspreadなのか？

  いま、カードゲームの世界には大きな変化が訪れています。  
  e-sportsの流行を背景に、非常に多くの人がカードゲームをプレイしています。１０万ドル単位の高額な報酬が用意されたゲームも少なくありません。  

  プレイヤーたちはみな、インターネットで調べた情報をもとに、勝てる流行のデッキを選択する傾向を強くしています。そして流行は瞬く間に移り変わります。そのなかを勝ち抜くには、オリジナルデッキを構築して鍛え上げていくのと同じくらい、 流動的なメタゲームを俯瞰して分析・把握できる力、すなわち（あればサイドボーディングも含めて）流行に対してもっとも優れたデッキを選べる力が、トーナメントシーンでは求められるようになってきています。
 
  ひとつの解決策として考えられるのは、いわゆる「チーム制」です。限られた複数人数で網羅的にゲームをプレイし、メタゲームをしらみ潰しに解析しようとする動きと言い換えられます。たとえば、MTGのトッププロ・プレイヤーである佐藤レイ選手は、自身の対戦コミュニティで[Google スプレッドシートを利用し対戦成績を集めている](https://twitter.com/r_0310/status/1102829047472521216)ことで知られています。氏が利用しているシートの形式は一般に公開されており、誰でも利用可能です。
  
  私はこのアイデアに納得し、早速自分でも取り入れようとしましたが、すぐに挫折してしまいました。課題として感じたのは次のようなことです。
  
  -  例えばカードショップで対戦終了したとき、スマートフォンから気軽に編集できない
  -  カードゲーム全般に使用できるような一般性を持った仕組みになっていない
  -  スプレッドシートよりも優れたユーザ体験を提供したい

  こういう理由で作成したのがspreadです。スマートフォンから気軽に対戦結果を投稿でき、カードゲーム全般に使用できるような一般性を備えています。もちろん、Google スプレッドシートで実現できていた閲覧管理（見せる人を制限する）機能や、集計する機能を備えています。


## 機能

 #### 1. 対戦記録の投稿   

 これが対戦記録の投稿画面、結果が格納されたページです。

![スクリーンショット 2020-01-26 23 26 53](https://user-images.githubusercontent.com/27924055/73136728-20ed9500-4094-11ea-9e28-ad1a8c561bf8.png)

 - 対戦カードに記入し、どんどんストックしていく方式です。
 - デッキをいくつでも登録できます。
 - Gmailアカウントを通じて招待したユーザとシートを共有できます。
 - ゲームに応じてBO1/BO3が切り替わります。

 #### 2. 対戦記録の分析

 これが分析のためのページです。

![スクリーンショット 2020-01-26 23 16 07](https://user-images.githubusercontent.com/27924055/74097881-c9036380-4b54-11ea-92cb-11661e108307.png)

 - 記録した対戦カードに基づき、デッキ パフォーマンスを測定します。
 - デッキ　パフォーマンスは、そのデッキがどれくらい勝っているかを色の濃淡で示します。
 - さらにデッキごとの先後差、BO3であればメイン・サイド別のパフォーマンスを計算します。
 - これからもいくつかの機能が追加される予定です。以下は今後実装予定です。
   - あなたの対戦成績についての分析。
   - 集計する対戦カードのフィルタリング。 
 
#### 3. デッキの追加、シートにメンバーを招待する

以下の動画を見てください。  
https://www.youtube.com/watch?v=CSE8CmBT82k


## サイトの利用にあたって

サイトは完全に無料で利用できます。

### 注意事項
 - Googleアカウントで利用できます。私は登録されたGoogleアカウントのメールアドレスとアカウント名を受け取ります。ただしパスワードは取得しません。その他ログイン時に表示される注意事項をチェックしてください。
 - 投稿された対戦記録は、管理のため私が閲覧することがあります。知り得た情報について私が口外することはありません。
 - このプログラムを利用して起こった損害について、私（@samayotta）は一切の責任を負いません。特に重大な個人情報を置かないようにしてください。

ソースコードはすべてMITライセンスのもとに公開されています。私に情報を知られたくない場合は、ご自身で（かプログラマの友人に頼んで）自分だけのspreadサイトを作成できます。

### 支援

サーバ代等、このサイトにかかる費用はすべて私の持ち出しです。  
支援してくださる方は以下のAmazon 欲しいものリストから僕に食べ物・飲み物をプレゼントしてください！

https://www.amazon.jp/hz/wishlist/ls/3U1196ZXVSZAW?ref_=wl_share

## 技術的な話題について

### リポジトリ

https://github.com/IKKO-Ohta/spread

絶賛コミッタ募集中です。主には

 - **ダークモード以外のカラーデザイン**
 - 新しい集計機能の追加
 - 多言語対応
 - リファクタリング・バグフィックス・テストの充実etc
 
などPRを募集しています。  
**spreadのロゴデザイン**も、現状は自動生成のものです。もし良いものができたら送ってください！

### 技術書展に寄稿予定です

技術書展８ https://techbookfest.org/ の以下のブースでspreadの技術的概要をまとめた記事を寄稿します。

https://techbookfest.org/event/tbf08/circle/5737434868350976

内容は

- spreadとは何か（これはこのブログと大部分同じ）
- Nuxt.js + FirebaseでざっくりサーバレスSPAを構築する
- 自分だけのspreadサイトのデプロイ手順

の三本立てです。ご自身でのデプロイに興味ある方はぜひ。冊子はすべて無料配布となります。例年通りであれば開催後SpeakerDeck上にもアップロードされるかと思います。

### under developing now

現状は仮公開です。公開をはずみに、上記技術書展までにいい状態に持っていきたいというスタンスでやっています。その後ある程度検証期間やリファクタリング等を終えたのち、英語対応をやって、それで一段落（正式版）にする予定です。

## 連絡先

spreadに関するご相談・質問は以下までお願いします。

    mail: samayotta@gmail.com
    twitter: @samayotta

ソースコードに関する質問もお気軽にどうぞ。

## スマートフォン版 スクリーンショット

![top](https://user-images.githubusercontent.com/27924055/74097882-ca349080-4b54-11ea-944b-a4c88676623f.png)

![games](https://user-images.githubusercontent.com/27924055/74097883-ca349080-4b54-11ea-8676-ef0287917084.png)

![performance](https://user-images.githubusercontent.com/27924055/74097884-cacd2700-4b54-11ea-9cd4-9268179e7e84.png)