import streamlit as st
import pandas as pd
import utils
import datetime

# 1. ページ設定
st.set_page_config(layout="wide", page_title="レポート出力", page_icon="📄")

# 2. デザイン調整
st.markdown("""
<style>
    .report-card {
        background-color: #ffffff;
        padding: 20px;
        border-radius: 10px;
        border: 1px solid #e0e0e0;
        box-shadow: 0 2px 5px rgba(0,0,0,0.05);
        margin-bottom: 15px;
    }
    .report-title {
        font-weight: bold;
        font-size: 1.1em;
        margin-bottom: 5px;
        color: #333;
    }
    .report-desc {
        font-size: 0.9em;
        color: #666;
        margin-bottom: 15px;
        height: 40px;
    }
</style>
""", unsafe_allow_html=True)

utils.render_sidebar()

# --- メイン処理 ---
st.title("📄 見積・レポート出力")

proj = utils.get_current_project()
if not proj: st.warning("案件を選択してください"); st.stop()

calc = proj["calculation_results"]
if not calc["calculated_at"]:
    st.warning("⚠️ まだ積算計算が行われていません。「03_積算計算」で計算を実行してください。")
    st.stop()

st.info(f"案件「{proj['project_name']}」のデータをCSV形式でダウンロードします。")

# --- ダウンロードセンター ---
st.subheader("📥 データダウンロード")

c1, c2, c3 = st.columns(3)

# 1. 面積明細データ
with c1:
    st.markdown("""
    <div class="report-card">
        <div class="report-title">📊 面積明細データ</div>
        <div class="report-desc">外壁、軒天、破風などの塗装面積一覧です。<br>（見積書の明細用）</div>
    </div>
    """, unsafe_allow_html=True)
    
    if calc["area_details"]:
        df_area = pd.DataFrame(calc["area_details"])
        csv_area = df_area.to_csv(index=False).encode('utf-8')
        st.download_button(
            label="⬇️ 面積CSVを保存",
            data=csv_area,
            file_name=f"{proj['project_name']}_面積明細.csv",
            mime="text/csv",
            key="dl_area"
        )
    else:
        st.button("データなし", disabled=True, key="dl_area_no")

# 2. 線形部材データ
with c2:
    st.markdown("""
    <div class="report-card">
        <div class="report-title">📏 線形部材データ</div>
        <div class="report-desc">雨樋や水切りなど、長さ(m)で計算した部材の一覧です。</div>
    </div>
    """, unsafe_allow_html=True)
    
    if calc["linear_measurements"]:
        df_linear = pd.DataFrame(calc["linear_measurements"])
        csv_linear = df_linear.to_csv(index=False).encode('utf-8')
        st.download_button(
            label="⬇️ 線形CSVを保存",
            data=csv_linear,
            file_name=f"{proj['project_name']}_線形部材.csv",
            mime="text/csv",
            key="dl_linear"
        )
    else:
        st.button("データなし", disabled=True, key="dl_linear_no")

# 3. 案件情報サマリー
with c3:
    st.markdown("""
    <div class="report-card">
        <div class="report-title">📝 案件情報サマリー</div>
        <div class="report-desc">顧客名、住所、総面積などをまとめた基本情報シートです。</div>
    </div>
    """, unsafe_allow_html=True)
    
    # サマリーデータの作成
    summary_data = {
        "項目": ["案件名", "顧客名", "現場住所", "総塗装面積(㎡)", "更新日"],
        "内容": [
            proj["project_name"],
            proj["client_name"],
            proj["site_address"],
            f"{calc['total_paintable_area_net']:.2f}",
            datetime.datetime.now().strftime("%Y-%m-%d")
        ]
    }
    df_sum = pd.DataFrame(summary_data)
    csv_sum = df_sum.to_csv(index=False).encode('utf-8')
    
    st.download_button(
        label="⬇️ 案件情報を保存",
        data=csv_sum,
        file_name=f"{proj['project_name']}_案件情報.csv",
        mime="text/csv",
        key="dl_sum"
    )

st.markdown("---")
st.caption("※Excelで開く場合は、文字化けを防ぐため「データ」タブ→「テキストまたはCSVから」で取り込んでください。")