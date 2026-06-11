// generated from rosidl_generator_c/resource/idl__description.c.em
// with input from musia_msgs:msg/TourState.idl
// generated code does not contain a copyright notice

#include "musia_msgs/msg/detail/tour_state__functions.h"

ROSIDL_GENERATOR_C_PUBLIC_musia_msgs
const rosidl_type_hash_t *
musia_msgs__msg__TourState__get_type_hash(
  const rosidl_message_type_support_t * type_support)
{
  (void)type_support;
  static rosidl_type_hash_t hash = {1, {
      0xd2, 0x34, 0x2d, 0x26, 0x87, 0x3a, 0xdf, 0xba,
      0x30, 0xcb, 0x13, 0x8e, 0x04, 0x9b, 0x06, 0xd0,
      0xca, 0x55, 0x0a, 0xe3, 0x4d, 0x06, 0x1f, 0xf4,
      0x20, 0x86, 0xe3, 0x13, 0x0e, 0x45, 0x47, 0x99,
    }};
  return &hash;
}

#include <assert.h>
#include <string.h>

// Include directives for referenced types
#include "std_msgs/msg/detail/header__functions.h"
#include "builtin_interfaces/msg/detail/time__functions.h"

// Hashes for external referenced types
#ifndef NDEBUG
static const rosidl_type_hash_t builtin_interfaces__msg__Time__EXPECTED_HASH = {1, {
    0xb1, 0x06, 0x23, 0x5e, 0x25, 0xa4, 0xc5, 0xed,
    0x35, 0x09, 0x8a, 0xa0, 0xa6, 0x1a, 0x3e, 0xe9,
    0xc9, 0xb1, 0x8d, 0x19, 0x7f, 0x39, 0x8b, 0x0e,
    0x42, 0x06, 0xce, 0xa9, 0xac, 0xf9, 0xc1, 0x97,
  }};
static const rosidl_type_hash_t std_msgs__msg__Header__EXPECTED_HASH = {1, {
    0xf4, 0x9f, 0xb3, 0xae, 0x2c, 0xf0, 0x70, 0xf7,
    0x93, 0x64, 0x5f, 0xf7, 0x49, 0x68, 0x3a, 0xc6,
    0xb0, 0x62, 0x03, 0xe4, 0x1c, 0x89, 0x1e, 0x17,
    0x70, 0x1b, 0x1c, 0xb5, 0x97, 0xce, 0x6a, 0x01,
  }};
#endif

static char musia_msgs__msg__TourState__TYPE_NAME[] = "musia_msgs/msg/TourState";
static char builtin_interfaces__msg__Time__TYPE_NAME[] = "builtin_interfaces/msg/Time";
static char std_msgs__msg__Header__TYPE_NAME[] = "std_msgs/msg/Header";

// Define type names, field names, and default values
static char musia_msgs__msg__TourState__FIELD_NAME__header[] = "header";
static char musia_msgs__msg__TourState__FIELD_NAME__state[] = "state";
static char musia_msgs__msg__TourState__FIELD_NAME__state_label[] = "state_label";
static char musia_msgs__msg__TourState__FIELD_NAME__current_zone[] = "current_zone";
static char musia_msgs__msg__TourState__FIELD_NAME__current_waypoint[] = "current_waypoint";
static char musia_msgs__msg__TourState__FIELD_NAME__network_available[] = "network_available";

static rosidl_runtime_c__type_description__Field musia_msgs__msg__TourState__FIELDS[] = {
  {
    {musia_msgs__msg__TourState__FIELD_NAME__header, 6, 6},
    {
      rosidl_runtime_c__type_description__FieldType__FIELD_TYPE_NESTED_TYPE,
      0,
      0,
      {std_msgs__msg__Header__TYPE_NAME, 19, 19},
    },
    {NULL, 0, 0},
  },
  {
    {musia_msgs__msg__TourState__FIELD_NAME__state, 5, 5},
    {
      rosidl_runtime_c__type_description__FieldType__FIELD_TYPE_UINT8,
      0,
      0,
      {NULL, 0, 0},
    },
    {NULL, 0, 0},
  },
  {
    {musia_msgs__msg__TourState__FIELD_NAME__state_label, 11, 11},
    {
      rosidl_runtime_c__type_description__FieldType__FIELD_TYPE_STRING,
      0,
      0,
      {NULL, 0, 0},
    },
    {NULL, 0, 0},
  },
  {
    {musia_msgs__msg__TourState__FIELD_NAME__current_zone, 12, 12},
    {
      rosidl_runtime_c__type_description__FieldType__FIELD_TYPE_STRING,
      0,
      0,
      {NULL, 0, 0},
    },
    {NULL, 0, 0},
  },
  {
    {musia_msgs__msg__TourState__FIELD_NAME__current_waypoint, 16, 16},
    {
      rosidl_runtime_c__type_description__FieldType__FIELD_TYPE_UINT8,
      0,
      0,
      {NULL, 0, 0},
    },
    {NULL, 0, 0},
  },
  {
    {musia_msgs__msg__TourState__FIELD_NAME__network_available, 17, 17},
    {
      rosidl_runtime_c__type_description__FieldType__FIELD_TYPE_BOOLEAN,
      0,
      0,
      {NULL, 0, 0},
    },
    {NULL, 0, 0},
  },
};

static rosidl_runtime_c__type_description__IndividualTypeDescription musia_msgs__msg__TourState__REFERENCED_TYPE_DESCRIPTIONS[] = {
  {
    {builtin_interfaces__msg__Time__TYPE_NAME, 27, 27},
    {NULL, 0, 0},
  },
  {
    {std_msgs__msg__Header__TYPE_NAME, 19, 19},
    {NULL, 0, 0},
  },
};

const rosidl_runtime_c__type_description__TypeDescription *
musia_msgs__msg__TourState__get_type_description(
  const rosidl_message_type_support_t * type_support)
{
  (void)type_support;
  static bool constructed = false;
  static const rosidl_runtime_c__type_description__TypeDescription description = {
    {
      {musia_msgs__msg__TourState__TYPE_NAME, 24, 24},
      {musia_msgs__msg__TourState__FIELDS, 6, 6},
    },
    {musia_msgs__msg__TourState__REFERENCED_TYPE_DESCRIPTIONS, 2, 2},
  };
  if (!constructed) {
    assert(0 == memcmp(&builtin_interfaces__msg__Time__EXPECTED_HASH, builtin_interfaces__msg__Time__get_type_hash(NULL), sizeof(rosidl_type_hash_t)));
    description.referenced_type_descriptions.data[0].fields = builtin_interfaces__msg__Time__get_type_description(NULL)->type_description.fields;
    assert(0 == memcmp(&std_msgs__msg__Header__EXPECTED_HASH, std_msgs__msg__Header__get_type_hash(NULL), sizeof(rosidl_type_hash_t)));
    description.referenced_type_descriptions.data[1].fields = std_msgs__msg__Header__get_type_description(NULL)->type_description.fields;
    constructed = true;
  }
  return &description;
}

static char toplevel_type_raw_source[] =
  "uint8 VEILLE=0\n"
  "uint8 ACCUEIL=1\n"
  "uint8 TRAITEMENT=2\n"
  "uint8 GUIDAGE=3\n"
  "uint8 PRESENTATION=4\n"
  "uint8 DEGRADE=5\n"
  "uint8 RETOUR=6\n"
  "std_msgs/Header header\n"
  "uint8 state\n"
  "string state_label\n"
  "string current_zone\n"
  "uint8 current_waypoint\n"
  "bool network_available";

static char msg_encoding[] = "msg";

// Define all individual source functions

const rosidl_runtime_c__type_description__TypeSource *
musia_msgs__msg__TourState__get_individual_type_description_source(
  const rosidl_message_type_support_t * type_support)
{
  (void)type_support;
  static const rosidl_runtime_c__type_description__TypeSource source = {
    {musia_msgs__msg__TourState__TYPE_NAME, 24, 24},
    {msg_encoding, 3, 3},
    {toplevel_type_raw_source, 238, 238},
  };
  return &source;
}

const rosidl_runtime_c__type_description__TypeSource__Sequence *
musia_msgs__msg__TourState__get_type_description_sources(
  const rosidl_message_type_support_t * type_support)
{
  (void)type_support;
  static rosidl_runtime_c__type_description__TypeSource sources[3];
  static const rosidl_runtime_c__type_description__TypeSource__Sequence source_sequence = {sources, 3, 3};
  static bool constructed = false;
  if (!constructed) {
    sources[0] = *musia_msgs__msg__TourState__get_individual_type_description_source(NULL),
    sources[1] = *builtin_interfaces__msg__Time__get_individual_type_description_source(NULL);
    sources[2] = *std_msgs__msg__Header__get_individual_type_description_source(NULL);
    constructed = true;
  }
  return &source_sequence;
}
