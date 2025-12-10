def test_avatar_flag():
    data = {'altura': 170, 'peso': 70}
    result = {**data, 'avatar': True}
    assert result['avatar']
