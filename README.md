# みんなの在庫帳

グループで同じ在庫を見て、数の増減をリアルタイムに共有する在庫管理アプリです。
Claude のアカウントがない人でも、URL を開くだけで使えます。

- アプリ本体：`app/`（GitHub Pages で公開）
- データ：Firebase（Cloud Firestore）に保存。変更は全員の画面へすぐ反映
- Firestore のルール：`firestore.rules`
- 公開の自動化：`.github/workflows/pages.yml`（`app/` を変更して push すると自動で公開）

## はじめに一度だけやること

### 1. Firebase のプロジェクトを作る
1. https://console.firebase.google.com を開き、Google アカウントでログイン
2. 「プロジェクトを作成」→ 名前（例：zaiko）→ Google アナリティクスはオフで OK → 作成

### 2. データベース（Firestore）を作る
1. 左メニュー「構築」→「Firestore Database」→「データベースを作成」
2. ロケーションは **asia-northeast1（東京）**
3. 「**本番環境モード**」で開始

### 3. ルールを貼り付ける
1. Firestore の画面上部の「ルール」タブを開く
2. 中身を全部消して、このリポジトリの `firestore.rules` の内容を貼り付け →「公開」

### 4. ウェブアプリを登録して設定を取り出す
1. 左上の歯車 →「プロジェクトの設定」→ 下の「マイアプリ」でウェブ（`</>`）のアイコン
2. ニックネーム（例：zaiko-web）→「アプリを登録」（Firebase Hosting のチェックは不要）
3. 表示された `firebaseConfig = { ... }` の中身を `app/firebase-config.js` の `window.FIREBASE_CONFIG` に入れる
   （この値はパスワードではなく、ウェブアプリでは公開して使う前提のものです）

### 5. GitHub Pages を有効にする
リポジトリの Settings → Pages → Build and deployment の Source を **GitHub Actions** にする。

公開後の URL：https://toyohide8119-ui.github.io/-/

## 使い方
- グループ LINE に URL を貼れば、全員がスマホのブラウザで開けます
- 「ホーム画面に追加」（iPhone は Safari の共有ボタンから、Android は Chrome のメニューから）でアプリのように使えます
- 「あなたの名前」を入れておくと、誰が数を変えたかが表示されます

## 注意
- 合言葉なしのため、URL を知っている人は誰でも見て変更できます。URL はグループ内だけで共有してください
- 少人数での利用なら、Firebase の無料枠（Spark プラン）に収まる見込みです
