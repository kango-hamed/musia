# generated from rosidl_generator_py/resource/_idl.py.em
# with input from musia_msgs:msg/TourState.idl
# generated code does not contain a copyright notice

# This is being done at the module level and not on the instance level to avoid looking
# for the same variable multiple times on each instance. This variable is not supposed to
# change during runtime so it makes sense to only look for it once.
from os import getenv

ros_python_check_fields = getenv('ROS_PYTHON_CHECK_FIELDS', default='')


# Import statements for member types

import builtins  # noqa: E402, I100

import rosidl_parser.definition  # noqa: E402, I100


class Metaclass_TourState(type):
    """Metaclass of message 'TourState'."""

    _CREATE_ROS_MESSAGE = None
    _CONVERT_FROM_PY = None
    _CONVERT_TO_PY = None
    _DESTROY_ROS_MESSAGE = None
    _TYPE_SUPPORT = None

    __constants = {
        'VEILLE': 0,
        'ACCUEIL': 1,
        'TRAITEMENT': 2,
        'GUIDAGE': 3,
        'PRESENTATION': 4,
        'DEGRADE': 5,
        'RETOUR': 6,
    }

    @classmethod
    def __import_type_support__(cls):
        try:
            from rosidl_generator_py import import_type_support
            module = import_type_support('musia_msgs')
        except ImportError:
            import logging
            import traceback
            logger = logging.getLogger(
                'musia_msgs.msg.TourState')
            logger.debug(
                'Failed to import needed modules for type support:\n' +
                traceback.format_exc())
        else:
            cls._CREATE_ROS_MESSAGE = module.create_ros_message_msg__msg__tour_state
            cls._CONVERT_FROM_PY = module.convert_from_py_msg__msg__tour_state
            cls._CONVERT_TO_PY = module.convert_to_py_msg__msg__tour_state
            cls._TYPE_SUPPORT = module.type_support_msg__msg__tour_state
            cls._DESTROY_ROS_MESSAGE = module.destroy_ros_message_msg__msg__tour_state

            from std_msgs.msg import Header
            if Header.__class__._TYPE_SUPPORT is None:
                Header.__class__.__import_type_support__()

    @classmethod
    def __prepare__(cls, name, bases, **kwargs):
        # list constant names here so that they appear in the help text of
        # the message class under "Data and other attributes defined here:"
        # as well as populate each message instance
        return {
            'VEILLE': cls.__constants['VEILLE'],
            'ACCUEIL': cls.__constants['ACCUEIL'],
            'TRAITEMENT': cls.__constants['TRAITEMENT'],
            'GUIDAGE': cls.__constants['GUIDAGE'],
            'PRESENTATION': cls.__constants['PRESENTATION'],
            'DEGRADE': cls.__constants['DEGRADE'],
            'RETOUR': cls.__constants['RETOUR'],
        }

    @property
    def VEILLE(self):
        """Message constant 'VEILLE'."""
        return Metaclass_TourState.__constants['VEILLE']

    @property
    def ACCUEIL(self):
        """Message constant 'ACCUEIL'."""
        return Metaclass_TourState.__constants['ACCUEIL']

    @property
    def TRAITEMENT(self):
        """Message constant 'TRAITEMENT'."""
        return Metaclass_TourState.__constants['TRAITEMENT']

    @property
    def GUIDAGE(self):
        """Message constant 'GUIDAGE'."""
        return Metaclass_TourState.__constants['GUIDAGE']

    @property
    def PRESENTATION(self):
        """Message constant 'PRESENTATION'."""
        return Metaclass_TourState.__constants['PRESENTATION']

    @property
    def DEGRADE(self):
        """Message constant 'DEGRADE'."""
        return Metaclass_TourState.__constants['DEGRADE']

    @property
    def RETOUR(self):
        """Message constant 'RETOUR'."""
        return Metaclass_TourState.__constants['RETOUR']


class TourState(metaclass=Metaclass_TourState):
    """
    Message class 'TourState'.

    Constants:
      VEILLE
      ACCUEIL
      TRAITEMENT
      GUIDAGE
      PRESENTATION
      DEGRADE
      RETOUR
    """

    __slots__ = [
        '_header',
        '_state',
        '_state_label',
        '_current_zone',
        '_current_waypoint',
        '_network_available',
        '_check_fields',
    ]

    _fields_and_field_types = {
        'header': 'std_msgs/Header',
        'state': 'uint8',
        'state_label': 'string',
        'current_zone': 'string',
        'current_waypoint': 'uint8',
        'network_available': 'boolean',
    }

    # This attribute is used to store an rosidl_parser.definition variable
    # related to the data type of each of the components the message.
    SLOT_TYPES = (
        rosidl_parser.definition.NamespacedType(['std_msgs', 'msg'], 'Header'),  # noqa: E501
        rosidl_parser.definition.BasicType('uint8'),  # noqa: E501
        rosidl_parser.definition.UnboundedString(),  # noqa: E501
        rosidl_parser.definition.UnboundedString(),  # noqa: E501
        rosidl_parser.definition.BasicType('uint8'),  # noqa: E501
        rosidl_parser.definition.BasicType('boolean'),  # noqa: E501
    )

    def __init__(self, **kwargs):
        if 'check_fields' in kwargs:
            self._check_fields = kwargs['check_fields']
        else:
            self._check_fields = ros_python_check_fields == '1'
        if self._check_fields:
            assert all('_' + key in self.__slots__ for key in kwargs.keys()), \
                'Invalid arguments passed to constructor: %s' % \
                ', '.join(sorted(k for k in kwargs.keys() if '_' + k not in self.__slots__))
        from std_msgs.msg import Header
        self.header = kwargs.get('header', Header())
        self.state = kwargs.get('state', int())
        self.state_label = kwargs.get('state_label', str())
        self.current_zone = kwargs.get('current_zone', str())
        self.current_waypoint = kwargs.get('current_waypoint', int())
        self.network_available = kwargs.get('network_available', bool())

    def __repr__(self):
        typename = self.__class__.__module__.split('.')
        typename.pop()
        typename.append(self.__class__.__name__)
        args = []
        for s, t in zip(self.get_fields_and_field_types().keys(), self.SLOT_TYPES):
            field = getattr(self, s)
            fieldstr = repr(field)
            # We use Python array type for fields that can be directly stored
            # in them, and "normal" sequences for everything else.  If it is
            # a type that we store in an array, strip off the 'array' portion.
            if (
                isinstance(t, rosidl_parser.definition.AbstractSequence) and
                isinstance(t.value_type, rosidl_parser.definition.BasicType) and
                t.value_type.typename in ['float', 'double', 'int8', 'uint8', 'int16', 'uint16', 'int32', 'uint32', 'int64', 'uint64']
            ):
                if len(field) == 0:
                    fieldstr = '[]'
                else:
                    if self._check_fields:
                        assert fieldstr.startswith('array(')
                    prefix = "array('X', "
                    suffix = ')'
                    fieldstr = fieldstr[len(prefix):-len(suffix)]
            args.append(s + '=' + fieldstr)
        return '%s(%s)' % ('.'.join(typename), ', '.join(args))

    def __eq__(self, other):
        if not isinstance(other, self.__class__):
            return False
        if self.header != other.header:
            return False
        if self.state != other.state:
            return False
        if self.state_label != other.state_label:
            return False
        if self.current_zone != other.current_zone:
            return False
        if self.current_waypoint != other.current_waypoint:
            return False
        if self.network_available != other.network_available:
            return False
        return True

    @classmethod
    def get_fields_and_field_types(cls):
        from copy import copy
        return copy(cls._fields_and_field_types)

    @builtins.property
    def header(self):
        """Message field 'header'."""
        return self._header

    @header.setter
    def header(self, value):
        if self._check_fields:
            from std_msgs.msg import Header
            assert \
                isinstance(value, Header), \
                "The 'header' field must be a sub message of type 'Header'"
        self._header = value

    @builtins.property
    def state(self):
        """Message field 'state'."""
        return self._state

    @state.setter
    def state(self, value):
        if self._check_fields:
            assert \
                isinstance(value, int), \
                "The 'state' field must be of type 'int'"
            assert value >= 0 and value < 256, \
                "The 'state' field must be an unsigned integer in [0, 255]"
        self._state = value

    @builtins.property
    def state_label(self):
        """Message field 'state_label'."""
        return self._state_label

    @state_label.setter
    def state_label(self, value):
        if self._check_fields:
            assert \
                isinstance(value, str), \
                "The 'state_label' field must be of type 'str'"
        self._state_label = value

    @builtins.property
    def current_zone(self):
        """Message field 'current_zone'."""
        return self._current_zone

    @current_zone.setter
    def current_zone(self, value):
        if self._check_fields:
            assert \
                isinstance(value, str), \
                "The 'current_zone' field must be of type 'str'"
        self._current_zone = value

    @builtins.property
    def current_waypoint(self):
        """Message field 'current_waypoint'."""
        return self._current_waypoint

    @current_waypoint.setter
    def current_waypoint(self, value):
        if self._check_fields:
            assert \
                isinstance(value, int), \
                "The 'current_waypoint' field must be of type 'int'"
            assert value >= 0 and value < 256, \
                "The 'current_waypoint' field must be an unsigned integer in [0, 255]"
        self._current_waypoint = value

    @builtins.property
    def network_available(self):
        """Message field 'network_available'."""
        return self._network_available

    @network_available.setter
    def network_available(self, value):
        if self._check_fields:
            assert \
                isinstance(value, bool), \
                "The 'network_available' field must be of type 'bool'"
        self._network_available = value
