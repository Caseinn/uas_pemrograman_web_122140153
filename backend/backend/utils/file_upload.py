# File: backend/utils/file_upload.py
import os
import uuid
from pyramid.httpexceptions import HTTPBadRequest

UPLOAD_FOLDER = 'backend/static/images/recipes'
ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg', 'gif'}
MAX_FILE_SIZE = 5 * 1024 * 1024  # 5MB

def allowed_file(filename):
    if not filename or not isinstance(filename, str):
        return False
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

def validate_file_size(file):
    # Read file content to check size
    file.seek(0, os.SEEK_END)
    size = file.tell()
    file.seek(0)
    
    if size > MAX_FILE_SIZE:
        raise HTTPBadRequest(json={
            'error': 'Ukuran file terlalu besar',
            'message': f'File tidak boleh lebih dari {MAX_FILE_SIZE/1024/1024}MB'
        })
    return True

def save_image(image_file, custom_filename=None):
    if not hasattr(image_file, 'filename') or not image_file.filename:
        raise HTTPBadRequest(json={
            'error': 'Format file tidak valid',
            'message': 'File harus berupa gambar dengan nama file valid.'
        })

    if not allowed_file(image_file.filename):
        raise HTTPBadRequest(json={
            'error': 'Jenis file tidak diizinkan',
            'message': f'Hanya file {", ".join(ALLOWED_EXTENSIONS)} yang diizinkan'
        })

    # Proceed with saving the file
    filename = custom_filename or f"{uuid.uuid4()}_{image_file.filename}"
    file_path = os.path.join(UPLOAD_FOLDER, filename)
    os.makedirs(UPLOAD_FOLDER, exist_ok=True)

    with open(file_path, 'wb') as f:
        image_file.file.seek(0)
        while True:
            chunk = image_file.file.read(1024 * 1024)
            if not chunk:
                break
            f.write(chunk)

    return f'/static/images/recipes/{filename}'

def delete_image(image_url):
    if image_url and image_url.startswith('/static/images/recipes/'):
        filename = image_url.split('/')[-1]
        file_path = os.path.join(UPLOAD_FOLDER, filename)
        try:
            os.remove(file_path)
        except FileNotFoundError:
            pass