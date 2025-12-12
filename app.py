import streamlit as st
from PIL import Image # ←これが必要です！
import firebase_admin
from firebase_admin import credentials
from firebase_admin import firestore
import datetime

# --- ここを追加してください ---
# アイコン画像を読み込む
try:
    image = Image.open('icon.png') 
    # 画像があればそれをアイコンに設定
    st.set_page_config(page_title="GUARDIAN Cloud", page_icon=image, layout="wide")
except:
    # 画像が見つからない時は、とりあえず盾の絵文字にする（エラー防止）
    st.set_page_config(page_title="GUARDIAN Cloud", page_icon="🛡️", layout="wide")
# ---------------------------

# ==========================================
# 🔥 GUARDIAN クラウド接続システム
# ==========================================

# 1. Googleサーバーへの接続（鍵を使う）
if not firebase_admin._apps:
    # 鍵ファイルを読み込む（ファイル名が正しいか確認！）
    try:
        cred = credentials.Certificate('firebase_key.json') 
        firebase_admin.initialize_app(cred)
    except Exception as e:
        st.error(f"鍵エラー: {e}")
        st.stop()

# データベースの操作権限をゲット
db = firestore.client()

# ==========================================
# 🎨 画面デザイン（UI）
# ==========================================


st.title("🛡️ GUARDIAN Cloud")
st.caption("Constructed by Nakashima Kenso System")

# --- 入力エリア ---
st.markdown("### 📝 現場日報入力")
with st.form("daily_report_form"):
    col1, col2 = st.columns(2)
    with col1:
        date = st.date_input("日付", datetime.date.today())
        worker = st.text_input("担当者名", value="CEO")
    
    with col2:
        site_name = st.text_input("現場名", placeholder="例：江上運送様 倉庫")
        
    work_content = st.text_area("作業内容", height=100, placeholder="例：屋根の高圧洗浄、ケレン作業")
    
    # ★防水屋社長のための特別機能★
    st.markdown("---")
    st.markdown("#### 🧪 資材使用記録")
    materials = st.text_area("使用材料・缶数", height=80, placeholder="例：ウレタン主剤 3セット、プライマー 1缶")
    
    # 送信ボタン
    submitted = st.form_submit_button("クラウドへ送信 🚀")

    if submitted:
        if not site_name:
            st.error("⚠️ 「現場名」は必須です！")
        else:
            # 2. データをGoogleのクラウド（Firestore）に飛ばす
            try:
                doc_ref = db.collection('reports').add({
                    'date': str(date),
                    'worker': worker,
                    'site': site_name,
                    'work': work_content,
                    'materials': materials,
                    'created_at': firestore.SERVER_TIMESTAMP
                })
                st.success(f"✅ 送信完了！ Googleサーバーに保存されました。")
                st.balloons()
            except Exception as e:
                st.error(f"送信エラー: {e}")

# ==========================================
# 📊 データのリアルタイム確認
# ==========================================
st.divider()
st.subheader("☁️ クラウド保存データ（リアルタイム）")

if st.button("最新データを取得 🔄"):
    try:
        docs = db.collection('reports').order_by('created_at', direction=firestore.Query.DESCENDING).stream()
        data_list = []
        for doc in docs:
            d = doc.to_dict()
            data_list.append({
                "日付": d.get('date'),
                "現場": d.get('site'),
                "担当": d.get('worker'),
                "作業": d.get('work'),
                "材料": d.get('materials')
            })
        
        if data_list:
            st.dataframe(data_list, use_container_width=True)
        else:
            st.info("まだデータがありません。")
    except Exception as e:
        st.error(f"取得エラー: {e}")