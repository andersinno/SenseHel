from unittest import TestCase

from core.utils.elsys import decode_elsys_payload


class TestElsysDecoder(TestCase):
    def test_decoding(self):
        decoded = decode_elsys_payload(b'\x01\x00\xCD')
        self.assertEqual(decoded, {'temperature': 20.5})
