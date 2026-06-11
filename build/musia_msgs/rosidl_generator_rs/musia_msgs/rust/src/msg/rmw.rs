#[cfg(feature = "serde")]
use serde::{Deserialize, Serialize};


#[link(name = "musia_msgs__rosidl_typesupport_c")]
extern "C" {
    fn rosidl_typesupport_c__get_message_type_support_handle__musia_msgs__msg__TourState() -> *const std::ffi::c_void;
}

#[link(name = "musia_msgs__rosidl_generator_c")]
extern "C" {
    fn musia_msgs__msg__TourState__init(msg: *mut TourState) -> bool;
    fn musia_msgs__msg__TourState__Sequence__init(seq: *mut rosidl_runtime_rs::Sequence<TourState>, size: usize) -> bool;
    fn musia_msgs__msg__TourState__Sequence__fini(seq: *mut rosidl_runtime_rs::Sequence<TourState>);
    fn musia_msgs__msg__TourState__Sequence__copy(in_seq: &rosidl_runtime_rs::Sequence<TourState>, out_seq: *mut rosidl_runtime_rs::Sequence<TourState>) -> bool;
}

// Corresponds to musia_msgs__msg__TourState
#[cfg_attr(feature = "serde", derive(Deserialize, Serialize))]


// This struct is not documented.
#[allow(missing_docs)]

#[repr(C)]
#[derive(Clone, Debug, PartialEq, PartialOrd)]
pub struct TourState {

    // This member is not documented.
    #[allow(missing_docs)]
    pub header: std_msgs::msg::rmw::Header,


    // This member is not documented.
    #[allow(missing_docs)]
    pub state: u8,


    // This member is not documented.
    #[allow(missing_docs)]
    pub state_label: rosidl_runtime_rs::String,


    // This member is not documented.
    #[allow(missing_docs)]
    pub current_zone: rosidl_runtime_rs::String,


    // This member is not documented.
    #[allow(missing_docs)]
    pub current_waypoint: u8,


    // This member is not documented.
    #[allow(missing_docs)]
    pub network_available: bool,

}

impl TourState {

    // This constant is not documented.
    #[allow(missing_docs)]
    pub const VEILLE: u8 = 0;


    // This constant is not documented.
    #[allow(missing_docs)]
    pub const ACCUEIL: u8 = 1;


    // This constant is not documented.
    #[allow(missing_docs)]
    pub const TRAITEMENT: u8 = 2;


    // This constant is not documented.
    #[allow(missing_docs)]
    pub const GUIDAGE: u8 = 3;


    // This constant is not documented.
    #[allow(missing_docs)]
    pub const PRESENTATION: u8 = 4;


    // This constant is not documented.
    #[allow(missing_docs)]
    pub const DEGRADE: u8 = 5;


    // This constant is not documented.
    #[allow(missing_docs)]
    pub const RETOUR: u8 = 6;

}


impl Default for TourState {
  fn default() -> Self {
    unsafe {
      let mut msg = std::mem::zeroed();
      if !musia_msgs__msg__TourState__init(&mut msg as *mut _) {
        panic!("Call to musia_msgs__msg__TourState__init() failed");
      }
      msg
    }
  }
}

impl rosidl_runtime_rs::SequenceAlloc for TourState {
  fn sequence_init(seq: &mut rosidl_runtime_rs::Sequence<Self>, size: usize) -> bool {
    // SAFETY: This is safe since the pointer is guaranteed to be valid/initialized.
    unsafe { musia_msgs__msg__TourState__Sequence__init(seq as *mut _, size) }
  }
  fn sequence_fini(seq: &mut rosidl_runtime_rs::Sequence<Self>) {
    // SAFETY: This is safe since the pointer is guaranteed to be valid/initialized.
    unsafe { musia_msgs__msg__TourState__Sequence__fini(seq as *mut _) }
  }
  fn sequence_copy(in_seq: &rosidl_runtime_rs::Sequence<Self>, out_seq: &mut rosidl_runtime_rs::Sequence<Self>) -> bool {
    // SAFETY: This is safe since the pointer is guaranteed to be valid/initialized.
    unsafe { musia_msgs__msg__TourState__Sequence__copy(in_seq, out_seq as *mut _) }
  }
}

impl rosidl_runtime_rs::Message for TourState {
  type RmwMsg = Self;
  fn into_rmw_message(msg_cow: std::borrow::Cow<'_, Self>) -> std::borrow::Cow<'_, Self::RmwMsg> { msg_cow }
  fn from_rmw_message(msg: Self::RmwMsg) -> Self { msg }
}

impl rosidl_runtime_rs::RmwMessage for TourState where Self: Sized {
  const TYPE_NAME: &'static str = "musia_msgs/msg/TourState";
  fn get_type_support() -> *const std::ffi::c_void {
    // SAFETY: No preconditions for this function.
    unsafe { rosidl_typesupport_c__get_message_type_support_handle__musia_msgs__msg__TourState() }
  }
}


#[link(name = "musia_msgs__rosidl_typesupport_c")]
extern "C" {
    fn rosidl_typesupport_c__get_message_type_support_handle__musia_msgs__msg__PersonDetection() -> *const std::ffi::c_void;
}

#[link(name = "musia_msgs__rosidl_generator_c")]
extern "C" {
    fn musia_msgs__msg__PersonDetection__init(msg: *mut PersonDetection) -> bool;
    fn musia_msgs__msg__PersonDetection__Sequence__init(seq: *mut rosidl_runtime_rs::Sequence<PersonDetection>, size: usize) -> bool;
    fn musia_msgs__msg__PersonDetection__Sequence__fini(seq: *mut rosidl_runtime_rs::Sequence<PersonDetection>);
    fn musia_msgs__msg__PersonDetection__Sequence__copy(in_seq: &rosidl_runtime_rs::Sequence<PersonDetection>, out_seq: *mut rosidl_runtime_rs::Sequence<PersonDetection>) -> bool;
}

// Corresponds to musia_msgs__msg__PersonDetection
#[cfg_attr(feature = "serde", derive(Deserialize, Serialize))]


// This struct is not documented.
#[allow(missing_docs)]

#[repr(C)]
#[derive(Clone, Debug, PartialEq, PartialOrd)]
pub struct PersonDetection {

    // This member is not documented.
    #[allow(missing_docs)]
    pub header: std_msgs::msg::rmw::Header,


    // This member is not documented.
    #[allow(missing_docs)]
    pub person_detected: bool,


    // This member is not documented.
    #[allow(missing_docs)]
    pub distance_m: f32,


    // This member is not documented.
    #[allow(missing_docs)]
    pub confidence: f32,

}



impl Default for PersonDetection {
  fn default() -> Self {
    unsafe {
      let mut msg = std::mem::zeroed();
      if !musia_msgs__msg__PersonDetection__init(&mut msg as *mut _) {
        panic!("Call to musia_msgs__msg__PersonDetection__init() failed");
      }
      msg
    }
  }
}

impl rosidl_runtime_rs::SequenceAlloc for PersonDetection {
  fn sequence_init(seq: &mut rosidl_runtime_rs::Sequence<Self>, size: usize) -> bool {
    // SAFETY: This is safe since the pointer is guaranteed to be valid/initialized.
    unsafe { musia_msgs__msg__PersonDetection__Sequence__init(seq as *mut _, size) }
  }
  fn sequence_fini(seq: &mut rosidl_runtime_rs::Sequence<Self>) {
    // SAFETY: This is safe since the pointer is guaranteed to be valid/initialized.
    unsafe { musia_msgs__msg__PersonDetection__Sequence__fini(seq as *mut _) }
  }
  fn sequence_copy(in_seq: &rosidl_runtime_rs::Sequence<Self>, out_seq: &mut rosidl_runtime_rs::Sequence<Self>) -> bool {
    // SAFETY: This is safe since the pointer is guaranteed to be valid/initialized.
    unsafe { musia_msgs__msg__PersonDetection__Sequence__copy(in_seq, out_seq as *mut _) }
  }
}

impl rosidl_runtime_rs::Message for PersonDetection {
  type RmwMsg = Self;
  fn into_rmw_message(msg_cow: std::borrow::Cow<'_, Self>) -> std::borrow::Cow<'_, Self::RmwMsg> { msg_cow }
  fn from_rmw_message(msg: Self::RmwMsg) -> Self { msg }
}

impl rosidl_runtime_rs::RmwMessage for PersonDetection where Self: Sized {
  const TYPE_NAME: &'static str = "musia_msgs/msg/PersonDetection";
  fn get_type_support() -> *const std::ffi::c_void {
    // SAFETY: No preconditions for this function.
    unsafe { rosidl_typesupport_c__get_message_type_support_handle__musia_msgs__msg__PersonDetection() }
  }
}


#[link(name = "musia_msgs__rosidl_typesupport_c")]
extern "C" {
    fn rosidl_typesupport_c__get_message_type_support_handle__musia_msgs__msg__AudioCommand() -> *const std::ffi::c_void;
}

#[link(name = "musia_msgs__rosidl_generator_c")]
extern "C" {
    fn musia_msgs__msg__AudioCommand__init(msg: *mut AudioCommand) -> bool;
    fn musia_msgs__msg__AudioCommand__Sequence__init(seq: *mut rosidl_runtime_rs::Sequence<AudioCommand>, size: usize) -> bool;
    fn musia_msgs__msg__AudioCommand__Sequence__fini(seq: *mut rosidl_runtime_rs::Sequence<AudioCommand>);
    fn musia_msgs__msg__AudioCommand__Sequence__copy(in_seq: &rosidl_runtime_rs::Sequence<AudioCommand>, out_seq: *mut rosidl_runtime_rs::Sequence<AudioCommand>) -> bool;
}

// Corresponds to musia_msgs__msg__AudioCommand
#[cfg_attr(feature = "serde", derive(Deserialize, Serialize))]


// This struct is not documented.
#[allow(missing_docs)]

#[repr(C)]
#[derive(Clone, Debug, PartialEq, PartialOrd)]
pub struct AudioCommand {

    // This member is not documented.
    #[allow(missing_docs)]
    pub header: std_msgs::msg::rmw::Header,


    // This member is not documented.
    #[allow(missing_docs)]
    pub mode: u8,


    // This member is not documented.
    #[allow(missing_docs)]
    pub payload: rosidl_runtime_rs::String,


    // This member is not documented.
    #[allow(missing_docs)]
    pub language: rosidl_runtime_rs::String,


    // This member is not documented.
    #[allow(missing_docs)]
    pub volume: f32,

}

impl AudioCommand {

    // This constant is not documented.
    #[allow(missing_docs)]
    pub const MODE_FILE: u8 = 0;


    // This constant is not documented.
    #[allow(missing_docs)]
    pub const MODE_TTS_OFFLINE: u8 = 1;


    // This constant is not documented.
    #[allow(missing_docs)]
    pub const MODE_TTS_ONLINE: u8 = 2;

}


impl Default for AudioCommand {
  fn default() -> Self {
    unsafe {
      let mut msg = std::mem::zeroed();
      if !musia_msgs__msg__AudioCommand__init(&mut msg as *mut _) {
        panic!("Call to musia_msgs__msg__AudioCommand__init() failed");
      }
      msg
    }
  }
}

impl rosidl_runtime_rs::SequenceAlloc for AudioCommand {
  fn sequence_init(seq: &mut rosidl_runtime_rs::Sequence<Self>, size: usize) -> bool {
    // SAFETY: This is safe since the pointer is guaranteed to be valid/initialized.
    unsafe { musia_msgs__msg__AudioCommand__Sequence__init(seq as *mut _, size) }
  }
  fn sequence_fini(seq: &mut rosidl_runtime_rs::Sequence<Self>) {
    // SAFETY: This is safe since the pointer is guaranteed to be valid/initialized.
    unsafe { musia_msgs__msg__AudioCommand__Sequence__fini(seq as *mut _) }
  }
  fn sequence_copy(in_seq: &rosidl_runtime_rs::Sequence<Self>, out_seq: &mut rosidl_runtime_rs::Sequence<Self>) -> bool {
    // SAFETY: This is safe since the pointer is guaranteed to be valid/initialized.
    unsafe { musia_msgs__msg__AudioCommand__Sequence__copy(in_seq, out_seq as *mut _) }
  }
}

impl rosidl_runtime_rs::Message for AudioCommand {
  type RmwMsg = Self;
  fn into_rmw_message(msg_cow: std::borrow::Cow<'_, Self>) -> std::borrow::Cow<'_, Self::RmwMsg> { msg_cow }
  fn from_rmw_message(msg: Self::RmwMsg) -> Self { msg }
}

impl rosidl_runtime_rs::RmwMessage for AudioCommand where Self: Sized {
  const TYPE_NAME: &'static str = "musia_msgs/msg/AudioCommand";
  fn get_type_support() -> *const std::ffi::c_void {
    // SAFETY: No preconditions for this function.
    unsafe { rosidl_typesupport_c__get_message_type_support_handle__musia_msgs__msg__AudioCommand() }
  }
}


