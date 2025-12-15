import streamlit as st
import pandas as pd
import datetime
import utils
import math

# 1. ページ設定
st.set_page_config(layout="wide", page_title="積算・見積", page_icon="🧮")

# 2. デザイン調整（変更なし）
st.markdown("""
<style>
    .total-price {
        font-size: 3.0em; 
        font-weight: bold;
        color: #B71C1C;
        margin-bottom: 0px;
    }
    .total-label {
        font-size: 1.2em;
        color: #666;
    }
    .metric-box {
        background-color: #ffe0e0;
        padding: 20px;
        border-radius: 10px;
        border: 2px solid #ef9a9a;
        text-align: center;
        margin-top: 10px;
    }
</style>
""", unsafe_allow_html=True)

utils.render_sidebar()

# --- メイン処理 ---
st.title("🧮 自動積算・最終見積り確定")

proj = utils.get_current_project()
if not proj: st.warning("案件を選択してください"); st.stop()

# --- 永続的な単価データを管理する（セッションステートで保持） ---
if 'estimate_data' not in st.session_state:
    st.session_state.estimate_data = {
        "paint_unit_price": 3500,
        "scaffold_area": 0.0,
        "scaffold_unit_price": 1000,
        "overhead_rate": 0.15
    }

# ----------------------------------------------------
# 計算ロジック（再計算ボタンの処理）
# ----------------------------------------------------
if st.button("🚀 最新データで再計算する", type="primary"):
    # ... (計算ロジック部分は変更なし。計算自体は正しく動いています) ...
    res = {
        "total_paintable_area_net": 0.0,
        "area_details": [],
        "linear_measurements": [],
        "opening_details": [],
        "calculated_at": datetime.datetime.now().isoformat()
    }
    
    total_gross = 0.0
    total_deduct = 0.0
    linear_map = {}
    
    for img in proj["images"]:
        ppu = img["scale_info"]["pixels_per_unit"]
        if ppu == 0: continue
        
        for obj in img["analysis_results"]:
            w_m = obj["width_pixels"] / ppu
            h_m = obj["height_pixels"] / ppu
            area = w_m * h_m
            length = (w_m + h_m) * 2
            
            if obj["object_category"] == "外壁": total_gross += area
            elif obj["object_category"] in ["軒天", "破風", "屋根"]:
                res["area_details"].append({"部位": obj["object_category"], "総面積": area, "塗装面積": area})
            
            if obj["is_deduction"]:
                total_deduct += area
                res["opening_details"].append({"名称": obj["object_name"], "幅(m)": round(w_m, 2), "高さ(m)": round(h_m, 2), "面積(㎡)": round(area, 2)})
            
            if obj["is_linear_measurement"]:
                cat = obj["object_category"]
                linear_map[cat] = linear_map.get(cat, 0) + length

    net_wall = max(0, total_gross - total_deduct)
    res["area_details"].insert(0, {"部位": "外壁", "総面積": total_gross, "塗装面積": net_wall})
    
    for k, v in linear_map.items():
        res["linear_measurements"].append({"部位": k, "合計長さ(m)": round(v, 2)})
        
    res["total_paintable_area_net"] = sum(x["塗装面積"] for x in res["area_details"])
    
    proj["calculation_results"] = res
    utils.save_data_to_file()
    st.success("積算計算が完了しました！")
    st.rerun()

# ----------------------------------------------------
# 結果表示エリア
# ----------------------------------------------------
calc = proj["calculation_results"]

if not calc["calculated_at"]:
    st.warning("まだ計算が行われていません。上のボタンを押してください。")
    st.stop()

st.markdown("---")

# 1. 塗装単価・付帯費用の入力
st.subheader("🛠 見積もり単価・付帯費用入力")

with st.form("estimate_input_form"):
    st.caption("ここで入力された単価は、セッションに保存されます。")
    
    c1, c2, c3 = st.columns(3)
    
    # 塗装単価 (変更なし)
    st.session_state.estimate_data["paint_unit_price"] = c1.number_input(
        "外壁塗装 単価 (円/㎡)", 
        value=st.session_state.estimate_data["paint_unit_price"], 
        step=100
    )
    
    # 足場面積と単価 (変更なし)
    st.session_state.estimate_data["scaffold_area"] = c2.number_input(
        "足場面積 (㎡) ※建物外周で別途入力", 
        value=st.session_state.estimate_data["scaffold_area"], 
        step=10.0, format="%.1f"
    )
    st.session_state.estimate_data["scaffold_unit_price"] = c3.number_input(
        "足場代 単価 (円/㎡)", 
        value=st.session_state.estimate_data["scaffold_unit_price"], 
        step=50
    )
    
    # 諸経費率 ★ここを修正★
    
    # 現在の小数値をパーセント値に変換して初期値とする (0.15 -> 15)
    initial_rate_percent = int(st.session_state.estimate_data["overhead_rate"] * 100)
    
    # スライダーの値を0～30のパーセント値で操作させる
    rate_percent = st.slider(
        "諸経費率 (工事管理費, 交通費など)", 
        min_value=0, max_value=30, 
        value=initial_rate_percent, 
        step=1, 
        format="%d %%" # %d %% で「整数 + %」で表示させる
    )
    
    # スライダーで得られたパーセント値を、計算用に小数に戻す
    st.session_state.estimate_data["overhead_rate"] = rate_percent / 100 
    
    # 確認用のキャプションは不要になりました（スライダー自体に % 表示が出るため）

    if st.form_submit_button("単価・費用を保存"):
        # 保存時には既に小数に戻した値が session_state に入っている
        utils.save_data_to_file()
        st.success("単価と付帯費用を保存しました。")

# 2. 最終見積り計算（変更なし）
paint_cost = calc['total_paintable_area_net'] * st.session_state.estimate_data["paint_unit_price"]
scaffold_cost = st.session_state.estimate_data["scaffold_area"] * st.session_state.estimate_data["scaffold_unit_price"]

sub_total = paint_cost + scaffold_cost
overhead_cost = sub_total * st.session_state.estimate_data["overhead_rate"]
total_estimate = sub_total + overhead_cost

# 3. 結果サマリー（内訳の表示も修正）
st.markdown("### 💰 最終見積額サマリー")

c_sum, c_breakdown = st.columns([1, 1])

# A. 最終結果（左側）
with c_sum:
    st.markdown('<div class="metric-box">', unsafe_allow_html=True)
    st.markdown('<div class="total-label">【最終お見積額（税込）】</div>', unsafe_allow_html=True)
    st.markdown(f'<div class="total-price">¥ {math.ceil(total_estimate):,}</div>', unsafe_allow_html=True)
    st.caption("※小数点以下は切り上げています。")
    st.markdown('</div>', unsafe_allow_html=True)

# B. 内訳詳細（右側）
with c_breakdown:
    # 諸経費率の表示を再計算
    display_rate = st.session_state.estimate_data["overhead_rate"] * 100
    st.table(pd.DataFrame({
        "項目": ["① 塗装工事費", "② 足場費用", "③ 小計 (①+②)", "④ 諸経費 (③ × {:.0f}%)".format(display_rate), "最終合計 (税抜)"],
        "金額 (円)": [
            f'¥ {int(paint_cost):,}', 
            f'¥ {int(scaffold_cost):,}', 
            f'¥ {int(sub_total):,}', 
            f'¥ {int(overhead_cost):,}', 
            f'¥ {math.ceil(total_estimate):,}'
        ]
    }))

# 4. 詳細データテーブル（変更なし）
st.markdown("### 📋 積算データ詳細")
t1, t2, t3 = st.tabs(["面積内訳 (㎡)", "長さ (m)", "開口部リスト"])

with t1:
    if calc["area_details"]:
        df_area = pd.DataFrame(calc["area_details"])
        st.dataframe(
            df_area.style.format({"総面積": "{:.2f}", "塗装面積": "{:.2f}"}), 
            use_container_width=True
        )
    else:
        st.info("データがありません")

with t2:
    if calc["linear_measurements"]:
        df_linear = pd.DataFrame(calc["linear_measurements"])
        st.dataframe(
            df_linear.style.format({"合計長さ(m)": "{:.2f}"}),
            use_container_width=True
        )
    else:
        st.info("線形部材（雨樋など）の指定がありません")

with t3:
    if calc["opening_details"]:
        st.caption("以下の開口部は、外壁面積から控除（マイナス）されています。")
        df_open = pd.DataFrame(calc["opening_details"])
        st.dataframe(
            df_open.style.format({"幅(m)": "{:.2f}", "高さ(m)": "{:.2f}", "面積(㎡)": "{:.2f}"}),
            use_container_width=True
        )
    else:
        st.info("控除対象（窓・ドア）がありません")