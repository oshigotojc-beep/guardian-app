import streamlit as st
import datetime

# ==========================================
# 🛠️ デザイン設定 (Pro Tool UI)
# ==========================================
st.set_page_config(page_title="GUARDIAN", page_icon="🛡️", layout="wide")

# CSSで「Adobeのようなプロツール感」を演出
st.markdown("""
    <style>
    .stApp { background-color: #F0F2F6; }
    /* ヘッダーのスタイル (Deep Navy) */
    .header-box {
        background-color: #001f3f;
        padding: 20px;
        border-radius: 10px;
        color: white;
        text-align: center;
        margin-bottom: 30px;
        box-shadow: 0 4px 15px rgba(0,0,0,0.2);
    }
    .header-title {
        font-family: 'Helvetica', sans-serif;
        font-size: 2.5rem;
        font-weight: 900;
        margin: 0;
        letter-spacing: 2px;
    }
    .header-subtitle {
        color: #FFD700; /* Construction Yellow */
        font-size: 0.9rem;
        font-weight: bold;
        letter-spacing: 4px;
        margin-top: 5px;
    }
    /* ロックされたボタンの演出 */
    .locked-card {
        border: 1px dashed #999;
        background-color: #e0e0e0;
        opacity: 0.7;
        padding: 20px;
        border-radius: 10px;
        text-align: center;
        transition: 0.3s;
    }
    .locked-card:hover {
        opacity: 1.0;
        transform: scale(1.02);
        box-shadow: 0 0 10px rgba(255, 215, 0, 0.5);
        cursor: pointer;
    }
    </style>
""", unsafe_allow_html=True)

# ==========================================
# 🎭 ログインシミュレーター（サイドバー）
# ==========================================
with st.sidebar:
    st.markdown("## 👤 LOGIN AS")
    user_role = st.radio("権限を選択 (Debug)", ["👑 親方 (Admin)", "⛑️ 職人 (Guest)"])
    
    st.markdown("---")
    st.caption("Construction OS X")
    st.caption("Ver 2.5 - Stable")

# ==========================================
# 🏠 メイン画面 (Dashboard)
# ==========================================

# 1. ヘッダー表示
st.markdown("""
    <div class="header-box">
        <div class="header-title">GUARDIAN</div>
        <div class="header-subtitle">CONSTRUCTION OS X</div>
    </div>
""", unsafe_allow_html=True)

# 2. 権限による分岐
if user_role == "👑 親方 (Admin)":
    # ----------------------------------------
    # 👑 親方モード（全開放）
    # ----------------------------------------
    st.markdown("### 📊 Executive Dashboard")
    
    col1, col2, col3, col4 = st.columns(4)
    col1.metric("今月の売上予測", "¥14,200,000", "+12% 📈")
    col2.metric("粗利益率", "34.2%", "優良")
    col3.metric("稼働現場", "8 現場", "順調")
    col4.metric("本日の出面", "24 名", "不足なし")
    
    st.divider()
    
    # Bento Grid メニュー
    st.markdown("### 🚀 Quick Access")
    c1, c2, c3, c4 = st.columns(4)
    
    with c1:
        with st.container(border=True):
            st.markdown("#### 📸 証拠日報")
            st.caption("Status: 受付中")
            if st.button("日報を確認する", use_container_width=True):
                st.switch_page("pages/01_daily_report.py")
    with c2:
        with st.container(border=True):
            st.markdown("#### 💰 経営コックピット")
            st.caption("Status: Online")
            st.button("詳細分析へ", use_container_width=True)
    with c3:
        with st.container(border=True):
            st.markdown("#### 🗺️ God's Eye")
            st.caption("職人位置情報")
            st.button("地図を開く", use_container_width=True)
    with c4:
        with st.container(border=True):
            st.markdown("#### 🧾 AI即積くん")
            st.caption("見積自動作成")
            st.button("積算開始", use_container_width=True)

else:
    # ----------------------------------------
    # ⛑️ 職人モード（チラ見せUI）
    # ----------------------------------------
    st.info(f"ログイン中: {user_role} | 担当現場: 江上運送様 倉庫改修")
    
    # 自分のタスク（これだけは使える）
    st.markdown("### ✅ Your Tasks")
    c_main, _ = st.columns([1, 2])
    with c_main:
        with st.container(border=True):
            st.markdown("#### 📸 本日の証拠日報")
            st.caption("17:00までに送信してください")
            if st.button("日報を書く 📝", type="primary", use_container_width=True):
                st.switch_page("pages/01_daily_report.py")

    st.divider()

    # 🔥 欲望を刺激する「ロックされた機能」
    st.markdown("### 🔒 Premium Features (Admin Only)")
    st.caption("※これらの機能は「親方（経営者）」になると解放されます。")

    col1, col2, col3 = st.columns(3)

    # ロック機能1: 経営
    with col1:
        st.markdown('<div class="locked-card"><h4>💰 経営コックピット 🔒</h4><p>売上・利益のリアルタイム分析</p></div>', unsafe_allow_html=True)
        if st.button("アクセス権を要求", key="lock1", use_container_width=True):
            st.toast("🚫 権限がありません。「独立」すれば、この数字はあなたのものです。", icon="🔒")

    # ロック機能2: 請求書
    with col2:
        st.markdown('<div class="locked-card"><h4>🛡️ エスクロー決済 🔒</h4><p>工事代金の安心保全</p></div>', unsafe_allow_html=True)
        if st.button("詳細を見る", key="lock2", use_container_width=True):
            st.toast("🚫 工事完了後、ここから即入金されます。", icon="⚡")

    # ロック機能3: 営業マップ
    with col3:
        st.markdown('<div class="locked-card"><h4>🏘️ 空き家ハンター 🔒</h4><p>仕事が無限に見つかる地図</p></div>', unsafe_allow_html=True)
        if st.button("地図を見る", key="lock3", use_container_width=True):
            st.toast("🚫 営業エリアの支配権は親方にあります。", icon="🗺️")

    st.warning("💡 Hint: GUARDIANは、将来独立するあなたを応援しています。")