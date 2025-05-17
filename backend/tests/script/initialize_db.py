import importlib.util
import os

def test_initialize_db_importable():
    path = os.path.join("backend", "scripts", "initialize_db.py")
    spec = importlib.util.spec_from_file_location("initialize_db", path)
    assert spec is not None
    module = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(module)
    assert hasattr(module, "main")