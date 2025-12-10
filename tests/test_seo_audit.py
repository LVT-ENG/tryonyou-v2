import subprocess


def test_seo_audit_runs():
    result = subprocess.run([
        'python', 'scripts/seo_audit.py', 'public'
    ], capture_output=True, text=True)
    assert result.returncode == 0
    # Script should finish without raising errors
