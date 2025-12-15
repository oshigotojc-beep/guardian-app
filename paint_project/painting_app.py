import streamlit as st
import datetime
import utils

# テーマ切り替えロジックは全て削除しました。

# 1. ページ設定
# レイアウトをワイドに固定し、視認性を確保
st.set_page_config(layout="wide", page_title="Guardian Paint Pro", page_icon="🎨", initial_sidebar_state="expanded")

# 2. デザインの化粧（CSS注入）
st.markdown(f"""
<style>
    /* 全体を視認性の高いホワイト系で統一 (日差し対策) */
    :root {{
        --primary-color: #003366; /* ネイビー固定 */
        
        /* 視認性最優先の固定ライトテーマ設定 */
        --fixed-background: #F0F2F6; /* メイン背景: ややグレーがかった白（反射低減） */
        --fixed-secondary-background: #FFFFFF; /* サブ背景/カード: 純粋な白 */
        --fixed-text-color: #262626; /* 文字色: 濃い黒 (高コントラスト) */
        --fixed-border-color: #E0E0E0; /* 境界線: 薄いグレー */
    }}

    /* ★★★ 全体のデザイン固定 ★★★ */
    .stApp {{
        background-color: var(--fixed-background);
    }}
    
    /* サイドバー、メインコンテンツ全体、コンテナの背景色を固定 */
    /* Streamlitの全クラス名に対し、背景色を純粋な白に強制 */
    .css-1d391kg, .css-1lcbmhc, .css-1dp9pcp, 
    section[data-testid="stSidebar"], 
    section[data-testid="stSidebar"] > div:first-child, 
    .stSidebar, .main > div {{
        background-color: var(--fixed-secondary-background) !important;
    }}
    
    /* 強制文字色固定 (高コントラスト) */
    .main, .stSidebar, .stMarkdown, .step-desc, .stCaption, label, h1, h2, h3, h4, 
    [data-testid="stMetricLabel"] span, [data-testid="stMetricValue"], .step-card {{
        color: var(--fixed-text-color) !important;
    }}
    
    /* --- カスタムデザイン要素のカラー適用 --- */
    
    /* ステップカードのスタイル */
    .step-card {{
        background-color: var(--fixed-secondary-background);
        padding: 20px;
        border-radius: 8px;
        border: 1px solid var(--fixed-border-color);
        text-align: center;
        height: 200px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1); /* 影を濃くして立体感を強調 */
        color: var(--fixed-text-color) !important; 
    }}
    .step-title {{ 
        font-weight: bold; 
        font-size: 1.2em; 
        color: var(--primary-color) !important; /* タイトルはネイビー固定 */
    }}
    
    /* KPIカードのスタイル（ラグジュアリー感のあるシャープな影） */
    div[data-testid="metric-container"] {{
        background-color: var(--fixed-secondary-background);
        border: 1px solid var(--fixed-border-color);
        padding: 20px;
        border-radius: 8px;
        box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2); /* 影をさらに濃くし、視認性を最大化 */
        transition: transform 0.2s;
    }}
    div[data-testid="metric-container"]:hover {{
        transform: translateY(-3px);
    }}
    
    /* プライマリボタンの強調 */
    .stButton>button {{
        width: 100%;
        border-radius: 6px;
        height: 3.5em; 
        font-weight: bold;
        box-shadow: 0 2px 4px rgba(0, 51, 102, 0.3); /* ボタンの影も強調 */
        transition: background-color 0.2s, box-shadow 0.2s;
        border: none;
    }}

    /* タイトルとセクションの区切り */
    h1 {{ 
        color: var(--primary-color) !important; 
        padding-bottom: 0.5rem;
    }}
    h3 {{ 
        border-left: 5px solid var(--primary-color);
        padding-left: 10px;
        margin-top: 30px; 
        padding-bottom: 0;
        border-bottom: none;
    }}
    /* その他全般のフォント */
    .main, .stSidebar {{ 
        font-family: 'Helvetica', 'Arial', sans-serif; 
    }}
    
</style>
""", unsafe_allow_html=True)


# 3. 初期化とサイドバー表示（utilsにお任せ）
utils.initialize_session_state()
utils.render_sidebar() # utilsのサイドバー関数はそのまま残します


# --- メイン画面開始 ---

# プロジェクト未選択時のガード
proj = utils.get_current_project()
if not proj:
    st.title("🎨 Guardian Paint Pro")
    st.info("👈 左側のサイドバーから「新規案件登録」を行ってください。")
    st.markdown("---")
    st.write("このシステムは、現場写真から塗装面積を算出し、見積書を即座に作成するプロフェッショナルツールです。")
    st.stop()

# ダッシュボードヘッダー
st.title("プロジェクト・ダッシュボード")
st.caption(f"案件ID: {proj['project_id']} | 最終更新: {proj['updated_at'][:16].replace('T', ' ')}")

# --- KPI エリア（今の状況を数字で確認） ---
st.markdown("### 📊 現在のステータス")
col1, col2, col3, col4 = st.columns(4)

img_count = len(proj["images"])
calc_res = proj["calculation_results"]
area = calc_res["total_paintable_area_net"]
is_calculated = calc_res["calculated_at"] is not None

with col1:
    st.metric("📸 登録写真", f"{img_count} 枚", delta="未解析" if img_count > 0 and not is_calculated else None)
with col2:
    st.metric("📐 塗装面積 (純)", f"{area:.1f} ㎡")
with col3:
    st.metric("📏 線形部材 (雨樋等)", f"{len(calc_res['linear_measurements'])} 種")
with col4:
    status = "未着手"
    if img_count > 0: status = "写真あり"
    if is_calculated: status = "積算完了"
    st.metric("進行状況", status)

st.markdown("---")

# --- ナビゲーションエリア（ここが重要！） ---
st.markdown("### 🚀 ワークフロー")
st.write("以下の手順に沿って作業を進めてください。")

c1, c2, c3, c4 = st.columns(4)

with c1:
    st.markdown("""
    <div class="step-card">
        <div class="step-title">Step 1<br>画像登録</div>
        <div class="step-desc">現場の外壁・付帯部の写真をアップロードします。</div>
    </div>
    """, unsafe_allow_html=True)
    if st.button("📸 写真管理へ", type="primary" if img_count == 0 else "secondary"):
        st.switch_page("pages/01_画像管理.py")

with c2:
    st.markdown("""
    <div class="step-card">
        <div class="step-title">Step 2<br>解析・編集</div>
        <div class="step-desc">スケールを設定し、窓や雨樋をマーキングします。</div>
    </div>
    """, unsafe_allow_html=True)
    if st.button("📐 解析画面へ"):
        st.switch_page("pages/02_解析編集.py")

with c3:
    st.markdown("""
    <div class="step-card">
        <div class="step-title">Step 3<br>自動積算</div>
        <div class="step-desc">マーキング情報から面積と数量を一括計算します。</div>
    </div>
    """, unsafe_allow_html=True)
    if st.button("🧮 計算画面へ"):
        st.switch_page("pages/03_積算計算.py")

with c4:
    st.markdown("""
    <div class="step-card">
        <div class="step-title">Step 4<br>見積出力</div>
        <div class="step-desc">計算結果をCSV形式でダウンロードします。</div>
    </div>
    """, unsafe_allow_html=True)
    if st.button("📄 出力画面へ"):
        st.switch_page("pages/04_見積出力.py")

# --- 簡易編集エリア ---
st.markdown("---")
with st.expander("📝 案件情報の修正"):
    c_name, c_client = st.columns(2)
    proj["project_name"] = c_name.text_input("案件名", proj["project_name"])
    proj["client_name"] = c_client.text_input("顧客名", proj["client_name"])
    proj["site_address"] = st.text_input("住所", proj["site_address"])
    proj["notes"] = st.text_area("備考", proj["notes"])
    if st.button("情報を更新して保存"):
        proj["updated_at"] = datetime.datetime.now().isoformat()
        st.success("案件情報を更新しました。")


# ----------------------------------------------------
# ★★★ テーマ切り替え機能は完全に削除しました ★★★
# ----------------------------------------------------