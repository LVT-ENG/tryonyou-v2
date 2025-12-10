import io
import os
import sys

# Add project root to path
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))

from backend.app import app


def test_upload_unsupported_file_type():
    app.config['TESTING'] = True
    client = app.test_client()
    data = {
        'file': (io.BytesIO(b'my file contents'), 'test.txt')
    }
    response = client.post('/upload', content_type='multipart/form-data', data=data)
    assert response.status_code == 400
    assert b'Unsupported file type' in response.data
