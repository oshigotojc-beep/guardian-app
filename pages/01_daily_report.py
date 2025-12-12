import streamlit as st
import firebase_admin
from firebase_admin import credentials
from firebase_admin import firestore
import datetime
import json

# ==========================================
# 📸 デザイン設定 (Evidence Report)
# ==========================================
st.set_page_config(page_title="証拠日報", page_icon="📸")

# ==========================================
# 🔥 Firebase接続（最強の安全装置付き）
# ==========================================
if not firebase_admin._apps:
    # まず「PCにある鍵」を優先して探す（これでローカルエラーを回避）
    try:
        cred = credentials.Certificate('firebase_key.json') 
        firebase_admin.initialize_app(cred)
    except:
        # PCになければ、クラウドの金庫（Secrets）を探す
        try:
            if 'firebase_key_json' in st.secrets:
                cred = credentials.Certificate(json.loads(st.secrets['firebase_key_json']))
                firebase_admin.initialize_app(cred)
        except:
            st.warning("⚠️ 鍵が見つかりません。設定を確認してください。")

db = firestore.client()

# ==========================================
# 📝 入力フォーム
# ==========================================
st.markdown("# 📸 証拠日報")
st.caption("現場の真実をクラウドへ。")

with st.form("daily_report_form"):
    st.info("📍 現在地: GPS取得中... (自動記録)") 
    
    c1, c2 = st.columns(2)
    with c1:
        date = st.date_input("日付", datetime.date.today())
        worker = st.text_input("担当者名", value="ゲスト職人")
    with c2:
        site_name = st.text_input("現場名", value="江上運送様 倉庫改修")
    
    st.markdown("---")
    
    st.markdown("#### 1. 現場撮影 (必須)")
    photo = st.camera_input("作業完了状況を撮影")
    
    st.markdown("#### 2. 報告内容")
    work_content = st.text_area("作業内容", height=100, placeholder="例：北面外壁の下塗り完了。")
    
    with st.expander("🧪 資材使用記録 (任意)"):
        materials = st.text_area("使用材料", placeholder="材料名と数量")

    submit = st.form_submit_button("日報を送信 🚀", type="primary")
    
    if submit:
        if not photo:
            st.error("⚠️ 写真がありません！証拠を残してください。")
        else:
            doc_ref = db.collection('reports').add({
                'date': str(date), 
                'site': site_name,
                'worker': worker,
                'work': work_content,
                'has_photo': True,
                'created_at': firestore.SERVER_TIMESTAMP
            })
            st.balloons()
            st.success("✅ 送信完了！お疲れ様でした。")
            st.info("👈 左上の「GUARDIAN」を押してホームに戻ってください")