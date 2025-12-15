import streamlit as st
import datetime
import json
import os
from PIL import Image

# データ保存設定
DATA_FILE = "paint_data.json"
IMAGE_DIR = "uploaded_images"  # 画像を保存するフォルダ

# 画像保存用フォルダがなければ作る
if not os.path.exists(IMAGE_DIR):
    os.makedirs(IMAGE_DIR)

def load_data_from_file():
    """ファイルからデータを読み込む"""
    if os.path.exists(DATA_FILE):
        try:
            with open(DATA_FILE, "r", encoding="utf-8") as f:
                return json.load(f)
        except Exception as e:
            return []
    return []

def save_data_to_file():
    """データをファイルに書き込む"""
    if "projects" in st.session_state:
        # 画像オブジェクト(BytesIO)は保存できないので除外して保存したいが、
        # 簡易的にそのままダンプしようとするとエラーになるため、
        # 辞書から一時的に除外する処理などは複雑になる。
        # ここでは「画像パス(image_path)」を記録する方式に切り替える。
        try:
            with open(DATA_FILE, "w", encoding="utf-8") as f:
                json.dump(st.session_state.projects, f, ensure_ascii=False, indent=2)
        except Exception as e:
            print(f"Save Error: {e}")

def save_image_local(image_file, image_id):
    """画像をローカルフォルダに保存し、パスを返す"""
    try:
        # ファイル名を決定 (例: img_101.jpg)
        file_ext = image_file.name.split('.')[-1]
        file_name = f"img_{image_id}.{file_ext}"
        file_path = os.path.join(IMAGE_DIR, file_name)
        
        # 保存
        with open(file_path, "wb") as f:
            f.write(image_file.getbuffer())
            
        return file_path
    except Exception as e:
        st.error(f"画像保存エラー: {e}")
        return None

def initialize_session_state():
    """初期化とデータ復元"""
    if "projects" not in st.session_state:
        st.session_state.projects = load_data_from_file()
        
        # IDの最大値を復元
        max_p = 0; max_img = 0; max_obj = 0
        for p in st.session_state.projects:
            if p["project_id"] > max_p: max_p = p["project_id"]
            for img in p["images"]:
                if img["image_id"] > max_img: max_img = img["image_id"]
                # ★ここが重要：保存されたパスから画像を読み込み直す
                if "local_path" in img and img["local_path"] and os.path.exists(img["local_path"]):
                    img["image_file_path_display"] = img["local_path"] # パスを入れておけばst.imageが表示してくれる
                
                for obj in img["analysis_results"]:
                    if obj["object_id"] > max_obj: max_obj = obj["object_id"]
        
        st.session_state.last_project_id = max_p
        st.session_state.last_image_id = max_img
        st.session_state.last_object_id = max_obj

    if "current_project_id" not in st.session_state:
        st.session_state.current_project_id = None

# --- 以下、既存関数 ---

def create_new_project(name, client, address, notes):
    st.session_state.last_project_id += 1
    new_project = {
        "project_id": st.session_state.last_project_id,
        "project_name": name,
        "client_name": client,
        "site_address": address,
        "created_at": datetime.datetime.now().isoformat(),
        "updated_at": datetime.datetime.now().isoformat(),
        "notes": notes,
        "images": [], 
        "calculation_results": { 
            "total_paintable_area_net": 0.0,
            "area_details": [],
            "linear_measurements": [],
            "opening_details": [],
            "calculated_at": None
        }
    }
    st.session_state.projects.append(new_project)
    st.session_state.current_project_id = new_project["project_id"]
    save_data_to_file()
    return new_project

def get_current_project():
    if st.session_state.current_project_id is None: return None
    for p in st.session_state.projects:
        if p["project_id"] == st.session_state.current_project_id: return p
    return None

def get_image_by_id(project, image_id):
    for img in project["images"]:
        if img["image_id"] == image_id: return img
    return None

def extract_exif_data(image_file):
    try:
        img = Image.open(image_file)
        exif = img._getexif()
        return {str(k): str(v) for k, v in exif.items()} if exif else None
    except: return None

def render_sidebar():
    with st.sidebar:
        st.title("🎨 Guardian Paint")
        st.caption("Pro Edition v1.3 (Image Persist)")
        st.markdown("---")
        
        if st.session_state.projects:
            p_map = {p["project_id"]: p["project_name"] for p in st.session_state.projects}
            curr_idx = 0
            if st.session_state.current_project_id in p_map:
                curr_idx = list(p_map.keys()).index(st.session_state.current_project_id)
            
            sel_id = st.selectbox("📂 案件切替", list(p_map.keys()), format_func=lambda x: p_map[x], index=curr_idx)
            
            if sel_id != st.session_state.current_project_id:
                st.session_state.current_project_id = sel_id
                st.rerun()
            
            curr_proj = get_current_project()
            if curr_proj:
                st.info(f"👤 {curr_proj['client_name']}\n📍 {curr_proj['site_address']}")
        else:
            st.warning("案件がありません")

        st.markdown("---")
        with st.expander("➕ 新規案件登録"):
            with st.form("sidebar_new_proj"):
                n_name = st.text_input("案件名")
                n_cli = st.text_input("顧客名")
                n_addr = st.text_input("住所")
                n_note = st.text_area("備考")
                if st.form_submit_button("作成"):
                    if n_name:
                        create_new_project(n_name, n_cli, n_addr, n_note)
                        st.success("作成しました")
                        st.rerun()
    
    save_data_to_file()