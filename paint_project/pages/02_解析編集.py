import streamlit as st
import io
import utils

# 1. ページ設定
st.set_page_config(layout="wide", page_title="解析・編集", page_icon="📐")

# 2. カスタムCSS
st.markdown("""
<style>
    /* カード、バッジのデザインはそのまま */
    .obj-card {
        background-color: #f1f3f6;
        padding: 12px;
        border-radius: 8px;
        margin-bottom: 8px;
        border-left: 6px solid #4CAF50;
        box-shadow: 0 1px 3px rgba(0,0,0,0.1);
    }
    .obj-card-deduct {
        border-left: 6px solid #F44336;
        background-color: #fff5f5;
    }
    .status-badge-ok {
        background-color: #d4edda; color: #155724 !important; 
        padding: 4px 12px; border-radius: 20px; font-weight: bold; font-size: 0.9em;
    }
    .status-badge-ng {
        background-color: #f8d7da; color: #721c24 !important; 
        padding: 4px 12px; border-radius: 20px; font-weight: bold; font-size: 0.9em;
    }
    /* 追加：画像操作エリアに境界線 */
    .image-manipulation-area {
        border: 2px solid #ddd;
        border-radius: 8px;
        padding: 10px;
        margin-bottom: 20px;
    }
</style>
""", unsafe_allow_html=True)

# 3. サイドバー表示
utils.render_sidebar()

# --- メイン処理開始 ---
st.title("📐 部材解析・マーキングセンター")

proj = utils.get_current_project()
if not proj: 
    st.info("👈 左のサイドバーで案件を選択してください。")
    st.stop()

if not proj["images"]:
    st.warning("写真がありません。「01_画像管理」で写真を登録してください。")
    st.stop()

# --- 画像選択エリア ---
img_opts = {img["image_id"]: img["image_name"] for img in proj["images"]}

c_sel, c_stat = st.columns([3, 1])
with c_sel:
    sel_id = st.selectbox("作業する写真を選択", options=list(img_opts.keys()), format_func=lambda x: img_opts[x])
    target = utils.get_image_by_id(proj, sel_id)

# --- 作業エリア（3カラム構成に変更）---
if target:
    # 3分割: 左(画像操作エリア), 中央(入力ツール), 右(登録リスト)
    col_img, col_tool, col_list = st.columns([2, 1, 1])
    scale = target["scale_info"]
    is_scale_set = scale["pixels_per_unit"] > 0
    ppu = scale["pixels_per_unit"]

    # === 左側：画像操作・プレビュー ===
    with col_img:
        st.markdown("### 🖼 画像操作エリア")
        
        # 将来の画像操作ツール（線を引くなど）を配置する予定のプレースホルダー
        st.markdown('<div class="image-manipulation-area">', unsafe_allow_html=True)
        st.caption("【将来の機能】ここに直接線を引いて寸法を測るツールが入ります。")
        
        # 画像表示
        d = target.get("image_file_path_display")
        if isinstance(d, str):
            st.image(d, use_container_width=True)
        elif isinstance(d, io.BytesIO):
            d.seek(0)
            st.image(d, use_container_width=True)
        else:
            st.error("画像データ読み込みエラー")
            
        st.markdown('</div>', unsafe_allow_html=True)

    # === 中央：操作パネル（スケール/部材登録）===
    with col_tool:
        with c_stat: # 上部のステータス表示
            if is_scale_set:
                st.markdown('<div style="text-align:right"><span class="status-badge-ok">縮尺設定済</span></div>', unsafe_allow_html=True)
            else:
                st.markdown('<div style="text-align:right"><span class="status-badge-ng">未設定</span></div>', unsafe_allow_html=True)

        st.markdown("### 🛠 入力・測定ツール")
        
        tab1, tab2 = st.tabs(["📏 1. 縮尺設定", "🧱 2. 部材入力"])
        
        # --- Tab 1: 縮尺設定 ---
        with tab1:
            st.caption("画面上の長さ(ピクセル)と、実際の長さ(メートル)を入力します。")
            
            px_val = st.number_input("画面上の長さ (ピクセル)", value=1000, step=10, key="scale_px")
            m_val = st.number_input("実際の長さ (メートル)", value=1.0, step=0.1, key="scale_m")
            
            if st.button("縮尺を保存", type="primary", key="save_scale"):
                if m_val > 0:
                    scale["pixels_per_unit"] = px_val / m_val
                    utils.save_data_to_file()
                    st.success(f"保存しました (1m ＝ {scale['pixels_per_unit']:.1f} ピクセル)")
                    st.rerun()
                else:
                    st.error("0より大きい数字を入れてください")
            
            if is_scale_set:
                st.info(f"現在の設定：1m ＝ {ppu:.1f} ピクセル")
            else:
                st.error("⚠️ まずこの設定を行ってください")

        # --- Tab 2: 部材入力 ---
        with tab2:
            st.caption("部材の寸法（ピクセル または メートル）を入力してください。")
            
            # 単位切り替えラジオボタン
            unit_mode = st.radio("寸法入力モード", ["ピクセル (px)", "メートル (m)"], horizontal=True)
            
            # --- 部材カテゴリと名称 ---
            c_cat, c_name = st.columns(2)
            cat = c_cat.selectbox("種類", ["外壁", "窓", "ドア", "雨樋", "軒天", "破風", "水切り", "その他"], key="input_cat")
            name = c_name.text_input("名称", value=cat, key="input_name")
            
            # --- 寸法入力（モードに応じて表示を切り替え） ---
            c_w, c_h = st.columns(2)
            
            input_label = "幅"
            if unit_mode == "ピクセル (px)":
                w_input = c_w.number_input(f"{input_label} (ピクセル)", value=100, step=10, key="w_px")
                h_input = c_h.number_input("高さ (ピクセル)", value=100, step=10, key="h_px")
                w_px = w_input
                h_px = h_input
            else: # メートル (m)
                w_m_input = c_w.number_input(f"{input_label} (メートル)", value=1.0, step=0.1, key="w_m", disabled=not is_scale_set)
                h_m_input = c_h.number_input("高さ (メートル)", value=1.0, step=0.1, key="h_m", disabled=not is_scale_set)
                
                # メートル入力の場合、ピクセルに換算
                if is_scale_set and w_m_input > 0 and h_m_input > 0:
                    w_px = int(w_m_input * ppu)
                    h_px = int(h_m_input * ppu)
                    st.caption(f"→ **{w_px} × {h_px} ピクセル** に換算されます")
                else:
                    w_px = 0
                    h_px = 0
                    if not is_scale_set: st.caption("（縮尺未設定のため換算できません）")


            # --- オプション設定 ---
            st.markdown("---")
            st.markdown("**オプション設定**")
            
            default_deduct = cat in ["窓", "ドア"]
            default_linear = cat in ["雨樋", "水切り"]
            
            is_deduct = st.checkbox("面積から引く（開口部など）", value=default_deduct, key="opt_deduct")
            is_linear = st.checkbox("長さで計算する（メートル）", value=default_linear, key="opt_linear")
            
            st.markdown("---")
            
            # 追加ボタンの制御
            can_add = is_scale_set or unit_mode == "ピクセル (px)"
            if st.button("＋ リストに追加", type="primary", disabled=not can_add):
                if w_px == 0 or h_px == 0:
                    st.error("寸法を正しく入力してください。")
                else:
                    st.session_state.last_object_id += 1
                    
                    new_obj = {
                        "object_id": st.session_state.last_object_id,
                        "object_category": cat,
                        "object_name": name,
                        "width_pixels": w_px, # 最終的に保存するのはピクセル値
                        "height_pixels": h_px,
                        "is_deduction": is_deduct,
                        "is_linear_measurement": is_linear
                    }
                    
                    target["analysis_results"].append(new_obj)
                    utils.save_data_to_file()
                    st.success(f"「{name}」を追加しました")
                    st.rerun()
            
            if not can_add:
                st.caption("※縮尺設定が必要です")

    # === 右側：登録リスト ===
    with col_list:
        st.markdown("### 📝 登録済み部材")
        st.caption(f"現在この写真に **{len(target['analysis_results'])}** 個の部材が登録されています。")
        st.markdown("---")
        
        if not target['analysis_results']:
            st.info("まだ部材が登録されていません。")
        else:
            for obj in target["analysis_results"]:
                css_class = "obj-card-deduct" if obj["is_deduction"] else "obj-card"
                deduct_text = '🔻 面積から引く' if obj['is_deduction'] else '✅ 塗装する'
                linear_text = ' | 📏 長さも計算' if obj['is_linear_measurement'] else ''
                
                # カードHTML（再掲：崩れ防止のため1行で記述）
                card_html = f"""<div class="{css_class} obj-card"><div style="display:flex; justify-content:space-between; align-items:center;"><span style="font-size:1.1em; font-weight:bold;">{obj['object_category']}：{obj['object_name']}</span><span style="font-size:0.9em; background:#eee; padding:2px 6px; border-radius:4px;">{obj['width_pixels']} × {obj['height_pixels']} ピクセル</span></div><div style="margin-top:5px; font-size:0.9em;">{deduct_text}{linear_text}</div></div>"""
                
                st.markdown(card_html, unsafe_allow_html=True)
                
                # 削除ボタン
                if st.button("🗑 削除する", key=f"del_{obj['object_id']}"):
                    target["analysis_results"].remove(obj)
                    utils.save_data_to_file()
                    st.rerun()