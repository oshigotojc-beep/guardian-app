import streamlit as st

# ==========================================
# 🛠️ デザイン設定 (Construction OS X - Deep Navy)
# ==========================================
st.set_page_config(page_title="GUARDIAN", page_icon="🛡️", layout="wide")

# CSSで「Deep Navyの世界観」を強制適用
st.markdown("""
    <style>
    /* 1. 背景を強制的に「Deep Navy」にする */
    .stApp {
        background-color: #001f3f;
    }
    
    /* 2. 文字色を「白」にする（ダークモード対応） */
    h1, h2, h3, h4, h5, h6, p, div, span, label {
        color: #FFFFFF !important;
        font-family: 'Helvetica', sans-serif;
    }

    /* 3. ヘッダーパネル（特大弁当箱） */
    .header-box {
        background-color: #003366; /* 少し明るい紺色 */
        padding: 20px;
        border-radius: 15px;
        border: 1px solid #004080;
        text-align: center;
        margin-bottom: 20px;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.3);
    }
    .header-title {
        font-size: 2rem;
        font-weight: 900;
        letter-spacing: 2px;
        color: #FFFFFF;
        margin-bottom: 5px;
    }
    .header-subtitle {
        color: #FFD700; /* Construction Yellow */
        font-size: 0.8rem;
        font-weight: bold;
        letter-spacing: 4px;
    }

    /* 4. 数字（メトリック）のデザイン */
    div[data-testid="stMetricValue"] {
        color: #00FFCC !important; /* 発光するサイバーグリーン */
        font-size: 1.8rem !important;
        font-weight: bold;
    }
    div[data-testid="stMetricLabel"] {
        color: #CCCCCC !important; /* 薄いグレー */
    }

    /* 5. ボタンのデザイン（押しやすく） */
    div.stButton > button {
        background-color: #004080;
        color: white;
        border: 1px solid #0059b3;
        border-radius: 10px;
        padding: 15px 20px;
        font-weight: bold;
        box-shadow: 0 2px 4px rgba(0,0,0,0.2);
        width: 100%;
    }
    div.stButton > button:hover {
        background-color: #0059b3;
        border-color: #FFD700;
        color: white;
    }
    </style>
""", unsafe_allow_html=True)

# ==========================================
# 🏠 ホーム画面構成 (Bento Grid Layout)
# ==========================================

# 1. ヘッダー（ブランドロゴ）
st.markdown("""
    <div class="header-box">
        <div class="header-title">GUARDIAN</div>
        <div class="header-subtitle">CONSTRUCTION OS X</div>
    </div>
""", unsafe_allow_html=True)

# 2. 経営コックピット（特大パネル）
st.markdown("##### 📊 Executive Dashboard")
col1, col2, col3 = st.columns(3)
col1.metric("今月の売上予測", "¥14,200,000", "+12%")
col2.metric("粗利益", "¥4,820,000", "34%")
col3.metric("稼働現場", "8 現場", "順調")

st.divider()

# 3. メイン機能（中パネル - Bento Grid）
st.markdown("##### 🚀 Quick Access")

# スマホでも横並びになるようにカラム設定
c1, c2 = st.columns(2)

with c1:
    with st.container(border=True):
        st.markdown("#### 📸 証拠日報")
        st.caption("現場報告・GPS")
        if st.button("日報を書く", key="btn_report", use_container_width=True):
            st.switch_page("pages/01_daily_report.py")

with c2:
    with st.container(border=True):
        st.markdown("#### 💰 即積くん")
        st.caption("AI見積作成")
        st.button("積算開始", key="btn_estimate", use_container_width=True)

# 4. ツール群（小パネル横並び）
st.markdown("##### 🛠️ Tools")
c3, c4, c5 = st.columns(3)
with c3:
    st.button("🏘️ 空き家", use_container_width=True)
with c4:
    st.button("🚁 測量", use_container_width=True)
with c5:
    st.button("🧱 建材", use_container_width=True)

# 5. フッター（ボトムナビ風演出）
st.markdown("---")
st.caption("Logged in as: Admin (CEO Mode)")