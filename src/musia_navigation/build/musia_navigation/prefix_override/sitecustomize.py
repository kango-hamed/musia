import sys
if sys.prefix == '/usr':
    sys.real_prefix = sys.prefix
    sys.prefix = sys.exec_prefix = '/home/kango/musia_ws/src/musia_navigation/install/musia_navigation'
