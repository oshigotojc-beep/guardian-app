import streamlit as st
import io
import datetime
from PIL import Image
import utils  # 同じフォルダ(paint_project)にいるのでこれだけでOK

st.set_page_config(page_title="画像管理", page_icon="📷")

# サイドバーを表示
utils.render_sidebar()

st.title("📷 画像入力・管理")

proj = utils.get_current_project()
if not proj: 
    st.warning("親画面でプロジェクトを選択してください")
    st.stop()

# アップロード機能
uploaded = st.file_uploader("外壁画像をアップロード", type=["jpg", "png"], accept_multiple_files=True)

if uploaded:
    count = 0
    for f in uploaded:
        # 重複チェック（同じ名前のファイルが既にあったらスキップ）
        if any(i["image_name"] == f.name for i in proj["images"]):
            continue
        
        # ▼▼▼ ここからインデント（字下げ）を深くします ▼▼▼
        st.session_state.last_image_id += 1
        
        # 1. 画像をローカルフォルダに保存
        saved_path = utils.save_image_local(f, st.session_state.last_image_id)
        
        # 2. 解像度取得のために一度開く（カーソルを先頭に戻す）
        f.seek(0) 
        img_pil = Image.open(f)
        res = f"{img_pil.width}x{img_pil.height}"
        
        # 3. データ作成
        new_img = {
            "image_id": st.session_state.last_image_id,
            "project_id": proj["project_id"],
            "image_name": f.name,
            "image_size": f.size,
            "local_path": saved_path,              # 保存パス
            "image_file_path_display": saved_path, # 表示用パス
            "upload_timestamp": datetime.datetime.now().isoformat(),
            "image_resolution": res,
            "exif_data": utils.extract_exif_data(f),
            "scale_info": {"pixels_per_unit": 0},
            "analysis_results": []
        }
        proj["images"].append(new_img)
        count += 1
        # ▲▲▲ ここまでがループの中身 ▲▲▲

    if count > 0:
        st.success(f"{count} 枚の画像を登録しました")
        # 確実に保存するためにデータ保存を実行
        utils.save_data_to_file()
        st.rerun()

# 一覧表示
st.write(f"登録済み: {len(proj['images'])}枚")
for img in proj["images"]:
    with st.expander(f"🖼 {img['image_name']}"):
        c1, c2 = st.columns([1, 2])
        
        # 画像表示（パスから読み込む）
        d = img.get("image_file_path_display")
        # もしパスならそのまま表示、BytesIOならシークして表示（互換性のため）
        if isinstance(d, str):
            c1.image(d, use_column_width=True)
        elif isinstance(d, io.BytesIO):
            d.seek(0)
            c1.image(d, use_column_width=True)
            
        c2.write(f"解像度: {img['image_resolution']}")
        if c2.button("削除", key=f"del_{img['image_id']}"):
            proj["images"].remove(img)
            utils.save_data_to_file() # 削除したら即保存
            st.rerun()